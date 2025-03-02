// services/imageGenerationService.js
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

class ImageGenerationService {
  constructor() {
    this.replicateApiKey = process.env.REPLICATE_API_KEY;
    this.tempImageDir = path.join(__dirname, '../temp');
    
    // Ensure temp directory exists
    if (!fs.existsSync(this.tempImageDir)) {
      fs.mkdirSync(this.tempImageDir, { recursive: true });
    }
  }

  /**
   * Generate an image using Stability AI via Replicate
   * @param {string} prompt - The user's positive prompt
   * @param {string} negativePrompt - The user's negative prompt (optional)
   * @param {string} resolution - The desired resolution
   * @param {string} userId - The ID of the user generating the image
   * @returns {Promise<Object>} - The generated image data
   */
  async generateImage(prompt, negativePrompt = "", resolution = "1024x1024", userId) {
    try {
      // Parse resolution to get width and height
      const [width, height] = resolution.split('x').map(Number);
      
      // Start the prediction
      const startResponse = await axios.post(
        'https://api.replicate.com/v1/predictions',
        {
          version: "2b017d9b67edd2ee1401238df49d75da53c523f36e363881e057f5dc3ed3c5b2", // Stability AI model
          input: {
            prompt: prompt,
            negative_prompt: negativePrompt,
            width: width,
            height: height,
            num_outputs: 1
          }
        },
        {
          headers: {
            'Authorization': `Token ${this.replicateApiKey}`,
            'Content-Type': 'application/json'
          }
        }
      );

      const predictionId = startResponse.data.id;
      
      // Poll for the result
      let result = await this.pollForResult(predictionId);
      
      // Create a unique filename
      const filename = `${uuidv4()}.png`;
      const imageUrl = result.output[0]; // Assuming only one image is generated
      
      // Save the image temporarily
      const localPath = await this.saveImageLocally(imageUrl, filename);
      
      return {
        id: predictionId,
        prompt,
        negativePrompt,
        resolution,
        imageUrl,
        localPath,
        filename,
        userId,
        createdAt: new Date()
      };
    } catch (error) {
      console.error('Error generating image:', error);
      throw new Error(`Failed to generate image: ${error.message}`);
    }
  }

  /**
   * Poll the Replicate API for the prediction result
   * @param {string} predictionId - The ID of the prediction to poll for
   * @returns {Promise<Object>} - The prediction result
   */
  async pollForResult(predictionId) {
    let status = 'processing';
    let result;
    
    while (status === 'processing' || status === 'starting') {
      const response = await axios.get(
        `https://api.replicate.com/v1/predictions/${predictionId}`,
        {
          headers: {
            'Authorization': `Token ${this.replicateApiKey}`,
            'Content-Type': 'application/json'
          }
        }
      );
      
      result = response.data;
      status = result.status;
      
      if (status === 'succeeded') {
        return result;
      } else if (status === 'failed') {
        throw new Error(`Prediction failed: ${result.error}`);
      }
      
      // Wait for 1 second before polling again
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
    
    return result;
  }

  /**
   * Save an image from a URL to the local filesystem
   * @param {string} imageUrl - The URL of the image to save
   * @param {string} filename - The filename to save the image as
   * @returns {Promise<string>} - The local path to the saved image
   */
  async saveImageLocally(imageUrl, filename) {
    try {
      const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
      const localPath = path.join(this.tempImageDir, filename);
      
      fs.writeFileSync(localPath, Buffer.from(response.data));
      
      return localPath;
    } catch (error) {
      console.error('Error saving image locally:', error);
      throw new Error(`Failed to save image: ${error.message}`);
    }
  }
}

module.exports = new ImageGenerationService();