'use client'

import React, { useState } from 'react'
import SideBar from './components/SideBar'
import "./sass/generate.scss"
import { CircleXIcon, SparklesIcon } from 'lucide-react'
import ImageSkeleton from './components/Skeleton';


function Page() {
  const [activeResolution, setActiveResolution] = useState('1024X1024(1:1)');

  return (
    <div className='flex flex-row w-full h-[100vh] text-white main-container'>
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
              <textarea placeholder='Enter prompt to generate image...' className="prompt-put lg:w-[500px]"/>
            </div>
          </div>
          <div className="negative-prompt">
            <div className="negative-prompt-title">
              Negative Prompt (Optional)
            </div>
            <div className="negative-prompt-area">
              <textarea placeholder='Enter the prompt' className="negative-prompt-put lg:w-[550px]"/>
            </div>
          </div>
          <div className="colors-section">
            <div className="colors-title">
              Colors
            </div>
            <div className="colors-options">
              <div className="color-option">
                <button className="bg-[#ff5c5c] w-7 h-7 rounded-full"></button>
              </div>
              <div className="color-option">
                <button className="bg-[#ff9f5c] w-7 h-7 rounded-full"></button>
              </div>
              <div className="color-option">
                <button className="bg-[#5cff7f] w-7 h-7 rounded-full"></button>
              </div>
              <div className="color-option">
                <button className="bg-[#5c7fff] w-7 h-7 rounded-full"></button>
                </div>
                <div className="color-option">
                <button className="bg-[#a05cff] w-7 h-7 rounded-full"></button>
                </div>
                <div className="color-option">
                <button className="bg-[#ffffff] w-7 h-7 rounded-full"></button>
                </div>
                <div className="color-option">
                  <CircleXIcon className="icon-circle w-8 h-8" color='#666' />
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
                <button className="generate-button w-[500px] h-[50px] bg-gradient-to-r from-[#6366f1] via-[#4f46e5] to-[#7c3aed] rounded-xl flex items-center justify-center gap-2">
                  <SparklesIcon size={20} />
                  <span>Generate Image</span>
                </button>
              </div>
          </div>
        </div>
        <div className="image-container lg:ml-8">
          <ImageSkeleton/>
        </div>
      </div>
    </div>
  )
}

export default Page