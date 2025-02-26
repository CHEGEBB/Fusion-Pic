'use client'

import Image, { StaticImageData } from 'next/image';
import SideBar from '../components/SideBar';
import aiImage from "../assets/ai.jpg"
import aiImage2 from "../assets/ai2.jpeg"
import aiImage3 from "../assets/ai3.jpeg"

import userProf1 from "../assets/user.jpg"

function Page() {
  interface PostedImage {
    imageUrl: StaticImageData;
    avatarUrl: StaticImageData;
    userName: string;
    bookmarked?: boolean;
  }

  // Sample data for the gallery grid
  const images: PostedImage[] = [
    {
      imageUrl: aiImage,
      avatarUrl: userProf1,
      userName: 'Michael Bacon',
      bookmarked: true
    },
    {
      imageUrl: aiImage2,
      avatarUrl: '/assets/user2.jpg',
      userName: 'Sonja Smith',
      bookmarked: true
    },
    {
      imageUrl: aiImage3,
      avatarUrl: '/assets/user3.jpg',
      userName: 'Brady Williams',
      bookmarked: true
    },
    {
      imageUrl: '/assets/portal.jpg',
      avatarUrl: '/assets/user4.jpg',
      userName: 'Ashli Brown',
      bookmarked: true
    },
    {
      imageUrl: '/assets/temple.jpg',
      avatarUrl: '/assets/user5.jpg',
      userName: 'Li Wei',
      bookmarked: false
    },
    {
      imageUrl: '/assets/desert.jpg',
      avatarUrl: '/assets/user6.jpg',
      userName: 'Carlos Rodriguez',
      bookmarked: false
    },
    {
      imageUrl: '/assets/cat-japanese.jpg',
      avatarUrl: '/assets/user7.jpg',
      userName: 'Yuki Tanaka',
      bookmarked: false
    },
    {
      imageUrl: '/assets/mountains.jpg',
      avatarUrl: '/assets/user8.jpg',
      userName: 'Alex Johnson',
      bookmarked: false
    }
  ];

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
        
        {/* Image grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {images.map((image, index) => (
            <div key={index} className="relative group rounded-lg overflow-hidden bg-gray-800">
              <div className="aspect-w-1 aspect-h-1 w-full h-[350px]">
                <Image 
                  src={image.imageUrl} 
                  alt={`Posted by ${image.userName}`}
                  width={500}
                  height={500}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="absolute bottom-0 left-0 w-full p-2 flex items-center justify-between bg-gradient-to-t from-black/80 to-transparent">
                <div className="flex items-center">
                  <div className="w-6 h-6 rounded-full overflow-hidden mr-2 bg-gray-300">
                    <Image 
                      src={image.avatarUrl} 
                      alt={image.userName} 
                      width={24} 
                      height={24}
                      className="object-cover"
                    />
                  </div>
                  <span className="text-sm font-medium truncate">{image.userName}</span>
                </div>
                {image.bookmarked && (
                  <div className="text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
                    </svg>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Page;