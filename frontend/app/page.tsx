'use client'

import React from 'react'
import SideBar from './components/SideBar'
import "./sass/generate.scss"
import {CircleXIcon } from 'lucide-react'

function Page() {
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
              <textarea placeholder='Enter prompt to generate image...' className="prompt-put lg:w-[550px]"/>
            </div>
          </div>
          <div className="negative-prompt">
            <div className="negative-prompt-title">
              Negative Prompt(optional)
            </div>
            <div className="negative-prompt-area">
              <textarea placeholder='Enter the prompt' className="negative-prompt-put lg:w-[550px]"/>
            </div>
          </div>
          <div className="colors-section">
            <div className="colors-title">
              Color
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
                  <CircleXIcon  className="icon-circle w-8 h-8" color='#666' />
                </div>
            </div>
    
          </div>
          <div className="resolution-section">
            <div className="resolution-title">
              Resolution
              </div>
              <div className="resolution-options flex flex-wrap gap-4 lg:w-[700px]">
                <div className="resolution-option">
                  <button className='w-[150px] h-[40px] rounded-xl bg-gray-800 tex-[12px] font-semibold'>1024X1024(1:1)</button>
                </div>
                <div className="resolution-option">
                  <button className='w-[150px] h-[40px] rounded-xl bg-gray-800 tex-[12px] font-semibold'>1152X896(9:7)</button>
                  </div>
                  <div className="resolution-option">
                    <button className='w-[150px] h-[40px] rounded-xl bg-gray-800 tex-[12px] font-semibold'>896X1152(7:9)</button>
                  </div>
                  <div className="resolution-option">
                    <button className='w-[150px] h-[40px] rounded-xl bg-gray-800 tex-[12px] font-semibold'>1344X768(7:4)</button>
                  </div>
                  <div className="resolution-option">
                    <button className='w-[150px] h-[40px] rounded-xl bg-gray-800 tex-[12px] font-semibold'>768X1344(4:7)</button>
                  </div>
              </div>
              <div className="slider-guide">
                
              </div>
          </div>
        </div>
        <div className="image-container"></div>
      </div>
    </div>
  )
}

export default Page