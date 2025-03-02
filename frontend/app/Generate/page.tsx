'use client'

import React, { useState } from 'react'
import SideBar from '../components/SideBar'
import "../sass/generate.scss"
import { CircleXIcon, SparklesIcon, SaveIcon, DownloadIcon, ShareIcon } from 'lucide-react'
import ImageSkeleton from '../components/Skeleton';
import axios from 'axios';

function Page() {
  const [activeResolution, setActiveResolution] = useState('1024X1024(1:1)');
  const [prompt, setPrompt] = useState('');
  const [negativePrompt, setNegativePrompt] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<{
    [x: string]: any; imageUrl: string 
} | null>(null);
  const [error, setError] = useState('');

  // Handle image generation
  const handleGenerateImage = async () => {
    if (!prompt.trim()) {
      setError('Please enter a prompt');
      return;
    }

    setError('');
    setIsGenerating(true);
    
    try {
      const response = await axios.post('http://localhost:5000/api/images/generate', {
        prompt,
        negativePrompt,
        resolution: activeResolution,
        color: selectedColor
      });
      
      setGeneratedImage(response.data.data);
      setIsGenerating(false);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const axiosError = err as axios.AxiosError;
        setError(axiosError.response?.data?.error || 'Failed to generate image');
      } else {
        setError('Failed to generate image');
      }
      setIsGenerating(false);
    }
  };

  // Handle image saving
  const handleSaveImage = async () => {
    if (!generatedImage) return;
    
    try {
      await axios.post('http://localhost:5000/api/images/save');
      alert('Image saved successfully!');
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError((err as any).response?.data?.error || 'Failed to save image');
      } else {
        setError('Failed to save image');
      }
    }
  };

  // Handle image download
  const handleDownloadImage = () => {
    if (!generatedImage) return;
    
    // Extract filename from URL
    const filename = generatedImage.imageUrl.split('/').pop();
    window.location.href = `/api/images/download/${filename}`;
  };

  // Handle sharing to community
  const handleShareImage = async () => {
    if (!generatedImage) return;
    
    try {
      await axios.post(`http://localhost:5000/api/images/${generatedImage.id}/share`);
      alert('Image shared to community!');
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError((err as any).response?.data?.error || 'Failed to share image');
      } else {
        setError('Failed to share image');
      }
    }
  };

  // Handle color selection
  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
  };

  return (
    <div className='flex sm:flex-col md:flex-row lg:flex-row w-full h-[100vh] text-white main-container'>
      <div className="sidebar w-18">
        <SideBar/>
      </div>
      
      <div className="flex-1 content-container p-8 ml-12">
        <div className="prompts flex flex-col">
          <div className="prompt-container">
            <div className="prompt-title">
              Prompt
            </div>
            <div className="prompt-area">
              <textarea 
                placeholder='Enter prompt to generate image...' 
                className="prompt-put lg:w-[500px]"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
              />
            </div>
          </div>
          <div className="negative-prompt">
            <div className="negative-prompt-title">
              Negative Prompt (Optional)
            </div>
            <div className="negative-prompt-area">
              <textarea 
                placeholder='Enter the prompt' 
                className="negative-prompt-put lg:w-[550px]"
                value={negativePrompt}
                onChange={(e) => setNegativePrompt(e.target.value)}
              />
            </div>
          </div>
          <div className="colors-section">
            <div className="colors-title">
              Colors
            </div>
            <div className="colors-options">
              <div className="color-option">
                <button 
                  className={`bg-[#ff5c5c] w-7 h-7 rounded-full ${selectedColor === '#ff5c5c' ? 'ring-2 ring-white' : ''}`}
                  onClick={() => handleColorSelect('#ff5c5c')}
                ></button>
              </div>
              <div className="color-option">
                <button 
                  className={`bg-[#ff9f5c] w-7 h-7 rounded-full ${selectedColor === '#ff9f5c' ? 'ring-2 ring-white' : ''}`}
                  onClick={() => handleColorSelect('#ff9f5c')}
                ></button>
              </div>
              <div className="color-option">
                <button 
                  className={`bg-[#5cff7f] w-7 h-7 rounded-full ${selectedColor === '#5cff7f' ? 'ring-2 ring-white' : ''}`}
                  onClick={() => handleColorSelect('#5cff7f')}
                ></button>
              </div>
              <div className="color-option">
                <button 
                  className={`bg-[#5c7fff] w-7 h-7 rounded-full ${selectedColor === '#5c7fff' ? 'ring-2 ring-white' : ''}`}
                  onClick={() => handleColorSelect('#5c7fff')}
                ></button>
              </div>
              <div className="color-option">
                <button 
                  className={`bg-[#a05cff] w-7 h-7 rounded-full ${selectedColor === '#a05cff' ? 'ring-2 ring-white' : ''}`}
                  onClick={() => handleColorSelect('#a05cff')}
                ></button>
              </div>
              <div className="color-option">
                <button 
                  className={`bg-[#ffffff] w-7 h-7 rounded-full ${selectedColor === '#ffffff' ? 'ring-2 ring-white' : ''}`}
                  onClick={() => handleColorSelect('#ffffff')}
                ></button>
              </div>
              <div className="color-option">
                <CircleXIcon 
                  className={`icon-circle w-8 h-8 ${selectedColor === '' ? 'text-white' : 'text-gray-600'}`} 
                  onClick={() => handleColorSelect('')}
                />
              </div>
            </div>
          </div>
          <div className="resolution-section">
            <div className="resolution-title">
              Resolution
            </div>
            <div className="resolution-options flex flex-wrap gap-4 lg:w-[500px]">
              <div className="resolution-option">
                <button 
                  className={`w-[150px] h-[40px] rounded-xl ${activeResolution === '1024X1024(1:1)' ? 'bg-gradient-to-r from-[#6366f1] via-[#4f46e5] to-[#7c3aed]' : 'bg-gray-800'} tex-[12px] font-semibold`}
                  onClick={() => setActiveResolution('1024X1024(1:1)')}
                >
                  1024 × 1024 (1:1)
                </button>
              </div>
              <div className="resolution-option">
                <button 
                  className={`w-[150px] h-[40px] rounded-xl ${activeResolution === '1152X896(9:7)' ? 'bg-gradient-to-r from-[#6366f1] via-[#4f46e5] to-[#7c3aed]' : 'bg-gray-800'} tex-[12px] font-semibold`}
                  onClick={() => setActiveResolution('1152X896(9:7)')}
                >
                  1152 × 896 (9:7)
                </button>
              </div>
              <div className="resolution-option">
                <button 
                  className={`w-[150px] h-[40px] rounded-xl ${activeResolution === '896X1152(7:9)' ? 'bg-gradient-to-r from-[#6366f1] via-[#4f46e5] to-[#7c3aed]' : 'bg-gray-800'} tex-[12px] font-semibold`}
                  onClick={() => setActiveResolution('896X1152(7:9)')}
                >
                  896 × 1152 (7:9)
                </button>
              </div>
              <div className="resolution-option">
                <button 
                  className={`w-[150px] h-[40px] rounded-xl ${activeResolution === '1344X768(7:4)' ? 'bg-gradient-to-r from-[#6366f1] via-[#4f46e5] to-[#7c3aed]' : 'bg-gray-800'} tex-[12px] font-semibold`}
                  onClick={() => setActiveResolution('1344X768(7:4)')}
                >
                  1344 × 768 (7:4)
                </button>
              </div>
              <div className="resolution-option">
                <button 
                  className={`w-[150px] h-[40px] rounded-xl ${activeResolution === '768X1344(4:7)' ? 'bg-gradient-to-r from-[#6366f1] via-[#4f46e5] to-[#7c3aed]' : 'bg-gray-800'} tex-[12px] font-semibold`}
                  onClick={() => setActiveResolution('768X1344(4:7)')}
                >
                  768 × 1344 (4:7)
                </button>
              </div>
            </div>
            <div className="generate-button-container mt-8">
              <button 
                className="generate-button w-[500px] h-[50px] bg-gradient-to-r from-[#6366f1] via-[#4f46e5] to-[#7c3aed] rounded-xl flex items-center justify-center gap-2"
                onClick={handleGenerateImage}
                disabled={isGenerating}
              >
                <SparklesIcon size={20} />
                <span>{isGenerating ? 'Generating...' : 'Generate Image'}</span>
              </button>
              {error && <p className="text-red-500 mt-2">{error}</p>}
            </div>
          </div>
        </div>
        <div className="image-container lg:ml-8">
          {isGenerating ? (
            <ImageSkeleton />
          ) : generatedImage ? (
            <div className="relative">
              <img 
                src={generatedImage.imageUrl} 
                alt="Generated image" 
                className="rounded-lg max-w-full h-auto"
              />
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-black bg-opacity-50 flex justify-center gap-4">
                <button 
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 rounded-lg"
                  onClick={handleSaveImage}
                >
                  <SaveIcon size={16} />
                  Save
                </button>
                <button 
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 rounded-lg"
                  onClick={handleDownloadImage}
                >
                  <DownloadIcon size={16} />
                  Download
                </button>
                <button 
                  className="flex items-center gap-2 px-4 py-2 bg-purple-600 rounded-lg"
                  onClick={handleShareImage}
                >
                  <ShareIcon size={16} />
                  Share
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center border-2 border-dashed border-gray-700 rounded-lg w-full h-[400px]">
              <p className="text-gray-500">Generated image will appear here</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Page