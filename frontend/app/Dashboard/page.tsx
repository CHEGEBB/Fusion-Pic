'use client'

import { useState } from 'react';
import Image, { StaticImageData } from 'next/image';
import SideBar from '../components/SideBar';
import aiImage from "../assets/ai.jpg"
import aiImage2 from "../assets/ai2.jpeg"
import aiImage3 from "../assets/ai3.jpeg"
import aiImage4 from "../assets/1 (1).jpeg"
import aiImage5 from "../assets/1 (2).jpeg"
import aiImage6 from "../assets/1 (3).jpeg"
import aiImage7 from "../assets/1 (4).jpeg"
import aiImage8 from "../assets/1 (5).jpeg"
import aiImage9 from "../assets/1 (6).jpeg"
import aiImage10 from "../assets/1 (7).jpeg"
import aiImage11 from "../assets/1 (8).jpeg"
import aiImage12 from "../assets/1 (9).jpeg"

import userProf1 from "../assets/user.jpg"
import { Bookmark } from 'lucide-react';

function Page() {
  interface PostedImage {
    id: number;
    imageUrl: StaticImageData;
    avatarUrl: StaticImageData | string;
    userName: string;
    bookmarked: boolean;
    aspectRatio?: string; 
  }

  // Sample data for the gallery grid with varying aspect ratios
  const initialImages: PostedImage[] = [
    {
      id: 1,
      imageUrl: aiImage,
      avatarUrl: userProf1,
      userName: 'Michael Bacon',
      bookmarked: true,
      aspectRatio: "3/4" // Taller
    },
    {
      id: 2,
      imageUrl: aiImage2,
      avatarUrl: '/assets/user2.jpg',
      userName: 'Sonja Smith',
      bookmarked: true,
      aspectRatio: "16/9" // Wider
    },
    {
      id: 3,
      imageUrl: aiImage3,
      avatarUrl: '/assets/user3.jpg',
      userName: 'Brady Williams',
      bookmarked: true,
      aspectRatio: "1/1" // Square
    },
    {
      id: 4,
      imageUrl: aiImage4,
      avatarUrl: '/assets/user4.jpg',
      userName: 'Ashli Brown',
      bookmarked: true,
      aspectRatio: "4/5" // Taller
    },
    {
      id: 5,
      imageUrl: aiImage5,
      avatarUrl: '/assets/user5.jpg',
      userName: 'Li Wei',
      bookmarked: false,
      aspectRatio: "16/9" // Wider
    },
    {
      id: 6,
      imageUrl: aiImage6,
      avatarUrl: '/assets/user6.jpg',
      userName: 'Carlos Rodriguez',
      bookmarked: false,
      aspectRatio: "3/2" // Standard
    },
    {
      id: 7,
      imageUrl: aiImage7,
      avatarUrl: '/assets/user7.jpg',
      userName: 'Yuki Tanaka',
      bookmarked: false,
      aspectRatio: "9/16" // Very tall
    },
    {
      id: 8,
      imageUrl: aiImage8,
      avatarUrl: '/assets/user8.jpg',
      userName: 'Brayo Chege',
      bookmarked: false,
      aspectRatio: "1/1" // Square
    },
    {
      id: 9,
      imageUrl: aiImage9,
      avatarUrl: '/assets/user8.jpg',
      userName: 'Alex Johnson',
      bookmarked: false,
      aspectRatio: "4/3" // Standard
    },
    {
      id: 10,
      imageUrl: aiImage10,
      avatarUrl: '/assets/user8.jpg',
      userName: 'Marcela Martinez',
      bookmarked: false,
      aspectRatio: "2/3"
    },
    {
      id: 11,
      imageUrl: aiImage11,
      avatarUrl: '/assets/user8.jpg',
      userName: 'Jakob Wilson',
      bookmarked: true,
      aspectRatio: "1/1.5"
    },
    {
      id: 12,
      imageUrl: aiImage12,
      avatarUrl: '/assets/user8.jpg',
      userName: 'Belinda Davis',
      bookmarked: false,
      aspectRatio: "3/2" 
    },
  ];

  const [images, setImages] = useState<PostedImage[]>(initialImages);

  // Function to toggle bookmark status
  const toggleBookmark = (id: number) => {
    setImages(prevImages => 
      prevImages.map(image => 
        image.id === id 
          ? { ...image, bookmarked: !image.bookmarked } 
          : image
      )
    );
  };

  return (
    <div className='flex flex-row w-full h-screen bg-gray-900 text-white'>
      {/* Sidebar */}
      <div className="w-20 flex-shrink-0">
        <SideBar />
      </div>
      
      {/* Main content */}
      <div className="flex-1 overflow-auto p-4">
        {/* Search bar */}
        <div className="mb-6 px-2">
          <div className="relative">
            <input 
              type="text" 
              placeholder="Search images by keywords" 
              className="w-full bg-gray-800 rounded-lg px-4 py-2 pl-10 text-white border border-gray-700 focus:border-blue-500 focus:outline-none"
            />
            <svg className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
        
        {/* Image grid - using masonry-like layout with varying heights */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {images.map((image) => (
            <div 
              key={image.id} 
              className="relative group rounded-lg overflow-hidden bg-gray-800 border-2 border-gray-800 hover:border-gray-700 transition-all"
              style={{ height: 'auto' }} // Let height be determined by content and aspect ratio
            >
              <div 
                className="w-full" 
                style={{ 
                  aspectRatio: image.aspectRatio || '1/1',
                }}
              >
                <Image 
                  src={image.imageUrl} 
                  alt={`Posted by ${image.userName}`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover"
                />
              </div>
              <div className="absolute bottom-0 left-0 w-full p-2 flex items-center justify-between bg-gradient-to-t from-black/80 to-transparent">
                <div className="flex items-center">
                  <div className="w-6 h-6 rounded-full overflow-hidden mr-2 bg-gray-300">
                    {typeof image.avatarUrl === 'string' ? (
                      <div className="w-full h-full bg-gray-400"></div>
                    ) : (
                      <Image 
                        src={image.avatarUrl} 
                        alt={image.userName} 
                        width={24} 
                        height={24}
                        className="object-cover"
                      />
                    )}
                  </div>
                  <span className="text-sm font-medium truncate">{image.userName}</span>
                </div>
                <div 
                  className={`text-white ${image.bookmarked ? 'bg-indigo-500' : 'bg-gray-700 bg-opacity-70 hover:bg-gray-600'} w-7 h-7 rounded-[4px] p-1 cursor-pointer transition-colors`}
                  onClick={() => toggleBookmark(image.id)}
                >
                  <Bookmark width={20} height={20} className="" fill={image.bookmarked ? 'currentColor' : 'none'}/>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Page;