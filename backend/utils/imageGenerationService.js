// utils/imageGenerationService.js

const axios = require('axios');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

/**
 * Service to handle image generation from different AI providers
 */
class ImageGenerationService {
  constructor() {
    // Initialize with your preferred API, fallback to others if needed
    this.primaryProvider = process.env.PRIMARY_AI_PROVIDER || 'openai';
    
    // Configure API keys from environment variables
    this.apiKeys = {
      openai: process.env.OPENAI_API_KEY,
      stability: process.env.STABILITY_API_KEY,
      leonardo: process.env.LEONARDO_API_KEY
    };
    
    // Path for temporary storage of generated images
    this.tempStoragePath = path.join(__dirname, '../temp');
    
    // Create temp directory if it doesn't exist
    if (!fs.existsSync(this.tempStoragePath)) {
      fs.mkdirSync(this.tempStoragePath, { recursive: true });
    }
  }
  
  /**
   * Generate an image using the preferred AI provider
   * @param {string} prompt - The text prompt for image generation
   * @param {object} options - Additional options (size, style, etc.)
   * @returns {Promise<object>} - Object containing image data and metadata
   */
  async generateImage(prompt, options = {}) {
    // Sanitize the prompt to prevent inappropriate content
    const sanitizedPrompt = this._sanitizePrompt(prompt);
    
    try {
      // Try primary provider first
      switch (this.primaryProvider) {
        case 'openai':
          return await this._generateWithOpenAI(sanitizedPrompt, options);
        case 'stability':
          return await this._generateWithStability(sanitizedPrompt, options);
        case 'leonardo':
          return await this._generateWithLeonardo(sanitizedPrompt, options);
        default:
          return await this._generateWithOpenAI(sanitizedPrompt, options);
      }
    } catch (error) {
      console.error(`Error with primary provider ${this.primaryProvider}:`, error.message);
      
      // Fallback to secondary provider if primary fails
      try {
        if (this.primaryProvider !== 'openai' && this.apiKeys.openai) {
          console.log('Falling back to OpenAI');
          return await this._generateWithOpenAI(sanitizedPrompt, options);
        } else if (this.primaryProvider !== 'stability' && this.apiKeys.stability) {
          console.log('Falling back to Stability AI');
          return await this._generateWithStability(sanitizedPrompt, options);
        } else {
          throw new Error('All available providers failed');
        }
      } catch (fallbackError) {
        console.error('Fallback provider also failed:', fallbackError.message);
        throw new Error('Image generation failed with all providers');
      }
    }
  }
  
  /**
   * Generate an image using OpenAI's DALL-E
   * @private
   */
  async _generateWithOpenAI(prompt, options) {
    if (!this.apiKeys.openai) {
      throw new Error('OpenAI API key not configured');
    }
    
    const size = options.size || '1024x1024';
    
    try {
      const response = await axios.post(
        'https://api.openai.com/v1/images/generations',
        {
          prompt,
          n: 1,
          size,
          response_format: 'b64_json'
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.apiKeys.openai}`
          }
        }
      );
      
      // Save image to temporary storage
      const imageData = response.data.data[0].b64_json;
      const imageId = crypto.randomUUID();
      const imagePath = path.join(this.tempStoragePath, `${imageId}.png`);
      
      // Convert base64 to buffer and save
      fs.writeFileSync(imagePath, Buffer.from(imageData, 'base64'));
      
      return {
        id: imageId,
        provider: 'openai',
        prompt,
        path: imagePath,
        createdAt: new Date(),
        metadata: {
          size,
          model: 'dall-e-3'
        }
      };
    } catch (error) {
      console.error('OpenAI generation error:', error.response?.data || error.message);
      throw new Error(`OpenAI generation failed: ${error.message}`);
    }
  }
  
  /**
   * Generate an image using Stability AI
   * @private
   */
  async _generateWithStability(prompt, options) {
    if (!this.apiKeys.stability) {
      throw new Error('Stability API key not configured');
    }
    
    const engineId = options.engineId || 'stable-diffusion-xl-1024-v1-0';
    
    try {
      const response = await axios.post(
        `https://api.stability.ai/v1/generation/${engineId}/text-to-image`,
        {
          text_prompts: [
            {
              text: prompt,
              weight: 1
            }
          ],
          cfg_scale: 7,
          height: options.height || 1024,
          width: options.width || 1024,
          samples: 1
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${this.apiKeys.stability}`
          }
        }
      );
      
      // Save image to temporary storage
      const imageData = response.data.artifacts[0].base64;
      const imageId = crypto.randomUUID();
      const imagePath = path.join(this.tempStoragePath, `${imageId}.png`);
      
      // Convert base64 to buffer and save
      fs.writeFileSync(imagePath, Buffer.from(imageData, 'base64'));
      
      return {
        id: imageId,
        provider: 'stability',
        prompt,
        path: imagePath,
        createdAt: new Date(),
        metadata: {
          size: `${options.width || 1024}x${options.height || 1024}`,
          model: engineId
        }
      };
    } catch (error) {
      console.error('Stability AI generation error:', error.response?.data || error.message);
      throw new Error(`Stability AI generation failed: ${error.message}`);
    }
  }
  
  /**
   * Generate an image using Leonardo AI
   * @private
   */
  async _generateWithLeonardo(prompt, options) {
    if (!this.apiKeys.leonardo) {
      throw new Error('Leonardo API key not configured');
    }
    
    try {
      // First create the generation
      const createResponse = await axios.post(
        'https://cloud.leonardo.ai/api/rest/v1/generations',
        {
          prompt,
          modelId: options.modelId || 'e316348f-7773-490e-adcd-46757c738eb7', // Leonardo Creative
          width: options.width || 1024,
          height: options.height || 1024,
          num_images: 1
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.apiKeys.leonardo}`
          }
        }
      );
      
      const generationId = createResponse.data.sdGenerationJob.generationId;
      
      // Poll for results (Leonardo is asynchronous)
      let attempts = 0;
      let generationResult = null;
      
      while (attempts < 30) {
        await new Promise(resolve => setTimeout(resolve, 2000)); // Wait 2 seconds
        
        const resultResponse = await axios.get(
          `https://cloud.leonardo.ai/api/rest/v1/generations/${generationId}`,
          {
            headers: {
              'Authorization': `Bearer ${this.apiKeys.leonardo}`
            }
          }
        );
        
        if (resultResponse.data.generations_by_pk.status === 'COMPLETE') {
          generationResult = resultResponse.data.generations_by_pk;
          break;
        }
        
        attempts++;
      }
      
      if (!generationResult) {
        throw new Error('Leonardo generation timed out');
      }
      
      // Download the generated image
      const imageUrl = generationResult.generated_images[0].url;
      const imageResponse = await axios.get(imageUrl, { responseType: 'arraybuffer' });
      
      // Save image to temporary storage
      const imageId = crypto.randomUUID();
      const imagePath = path.join(this.tempStoragePath, `${imageId}.png`);
      
      fs.writeFileSync(imagePath, Buffer.from(imageResponse.data));
      
      return {
        id: imageId,
        provider: 'leonardo',
        prompt,
        path: imagePath,
        createdAt: new Date(),
        metadata: {
          size: `${options.width || 1024}x${options.height || 1024}`,
          model: options.modelId || 'leonardo-creative'
        }
      };
    } catch (error) {
      console.error('Leonardo AI generation error:', error.response?.data || error.message);
      throw new Error(`Leonardo AI generation failed: ${error.message}`);
    }
  }
  
  /**
   * Sanitize prompt to prevent inappropriate content
   * @private
   */
  _sanitizePrompt(prompt) {
    // Basic sanitization - you may want to use a more sophisticated approach
    const forbiddenTerms = ['nude', 'naked', 'porn', 'explicit', 'violent'];
    
    let sanitized = prompt;
    forbiddenTerms.forEach(term => {
      const regex = new RegExp(`\\b${term}\\b`, 'gi');
      sanitized = sanitized.replace(regex, '***');
    });
    
    return sanitized;
  }
  
  /**
   * Clean up temporary files older than specified age
   * @param {number} maxAgeHours - Maximum age in hours before cleanup
   */
  async cleanupTempFiles(maxAgeHours = 24) {
    const files = fs.readdirSync(this.tempStoragePath);
    const now = new Date();
    
    for (const file of files) {
      const filePath = path.join(this.tempStoragePath, file);
      const stats = fs.statSync(filePath);
      const fileAgeHours = (now - stats.mtime) / (1000 * 60 * 60);
      
      if (fileAgeHours > maxAgeHours) {
        fs.unlinkSync(filePath);
        console.log(`Cleaned up temporary file: ${file}`);
      }
    }
  }
}

module.exports = new ImageGenerationService();