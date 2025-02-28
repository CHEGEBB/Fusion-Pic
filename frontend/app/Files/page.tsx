'use client'
import React, { useState } from 'react';
import Image from 'next/image';
import { StaticImageData } from 'next/image';
import Image1 from "../assets/1 (1).jpeg";
import SideBar from '../components/SideBar';

// Mock user data - would come from auth system in production
const userData = {
  name: "Alex Johnson",
  email: "alex@example.com",
  profilePic: "/profile-placeholder.jpg",
  storageUsed: 68,
  plan: "Premium",
  joinDate: "Nov 2024"
};

interface FileItem {
  id: number;
  imageUrl: StaticImageData;
  title: string;
  date: string;
  size: string;
  aspectRatio: string;
  tags: string[];
  isFavorite: boolean;
}

export default function MyFilesPage() {
  const [activeTab, setActiveTab] = useState<'saved' | 'downloads'>('saved');
  const [selectedFiles, setSelectedFiles] = useState<number[]>([]);
  const [isSelecting, setIsSelecting] = useState(false);

  // Sample files data - would come from backend in production
  const files: FileItem[] = [
    {
      id: 1,
      imageUrl: Image1,
      title: "Mystic Owl Illustration",
      date: "Feb 25, 2025",
      size: "1.2 MB",
      aspectRatio: "6/7",
      tags: ["illustration", "fantasy"],
      isFavorite: true
    },
    {
      id: 2,
      imageUrl: Image1,
      title: "Night City Panorama",
      date: "Feb 24, 2025",
      size: "2.4 MB",
      aspectRatio: "16/9",
      tags: ["landscape", "city"],
      isFavorite: false
    },
    {
      id: 3,
      imageUrl: Image1,
      title: "Abstract Art Concept",
      date: "Feb 23, 2025",
      size: "0.8 MB",
      aspectRatio: "1/1",
      tags: ["abstract", "art"],
      isFavorite: true
    },
    {
      id: 4,
      imageUrl: Image1,
      title: "Portrait Study",
      date: "Feb 22, 2025",
      size: "1.5 MB",
      aspectRatio: "3/4",
      tags: ["portrait", "study"],
      isFavorite: false
    },
    {
      id: 5,
      imageUrl: Image1,
      title: "Fantasy Landscape",
      date: "Feb 21, 2025", 
      size: "3.1 MB",
      aspectRatio: "16/9",
      tags: ["fantasy", "landscape"],
      isFavorite: false
    }
  ];

  // Filter files based on active tab
  const downloads = files.filter((_, index) => index % 2 === 0); // Mock filter logic
  const savedFiles = files;
  const displayedFiles = activeTab === 'saved' ? savedFiles : downloads;

  // Toggle file selection
  const toggleFileSelection = (id: number) => {
    if (selectedFiles.includes(id)) {
      setSelectedFiles(selectedFiles.filter(fileId => fileId !== id));
    } else {
      setSelectedFiles([...selectedFiles, id]);
    }
  };

  // Toggle favorite status
  const toggleFavorite = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    // In a real app, you would update the backend here
    console.log(`Toggled favorite for file ${id}`);
  };

  // Delete selected files
  const deleteSelectedFiles = () => {
    // In a real app, you would call an API here
    console.log(`Deleting files: ${selectedFiles.join(', ')}`);
    setSelectedFiles([]);
    setIsSelecting(false);
  };

  // Download selected files
  const downloadSelectedFiles = () => {
    // In a real app, you would trigger actual downloads here
    console.log(`Downloading files: ${selectedFiles.join(', ')}`);
    setSelectedFiles([]);
    setIsSelecting(false);
  };

  // Handle file click
  const handleFileClick = (fileId: number) => {
    if (isSelecting) {
      toggleFileSelection(fileId);
    } else {
      // Navigate programmatically in the client component
      window.location.href = `/file/${fileId}`;
    }
  };

  return (
    <div className='flex flex-row w-full h-screen bg-gray-900 text-white overflow-hidden'>
      {/* Sidebar */}
      <div className="w-16 md:w-20 flex-shrink-0">
        <SideBar />
      </div>
      
      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4 md:p-6 lg:p-8">
          
          {/* User Profile Section */}
          <div className="mb-8 bg-gray-800 rounded-xl p-4 md:p-6">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              {/* Profile Picture */}
              <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden bg-gray-700 flex-shrink-0">
                <div className="absolute inset-0 flex items-center justify-center text-gray-500 text-2xl font-bold">
                  {userData.name.charAt(0)}
                </div>
                {/* This would be a real image in production */}
                {/* <Image src={userData.profilePic} alt={userData.name} fill className="object-cover" /> */}
              </div>
              
              {/* User Info */}
              <div className="flex-grow">
                <h2 className="text-xl md:text-2xl font-bold text-white">{userData.name}</h2>
                <p className="text-gray-400">{userData.email}</p>
                <p className="text-gray-500 text-sm mt-1">Member since {userData.joinDate}</p>
              </div>
              
              {/* Storage Usage */}
              <div className="w-full md:w-auto mt-4 md:mt-0">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-400">Storage</span>
                  <span className="text-sm text-gray-300">{userData.storageUsed}% used</span>
                </div>
                <div className="w-full md:w-48 h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${userData.storageUsed > 90 ? 'bg-red-500' : 'bg-purple-500'}`} 
                    style={{width: `${userData.storageUsed}%`}}
                  ></div>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {userData.plan === "Premium" ? "Premium Plan" : "Free Plan"}
                </p>
              </div>
              
              {/* Profile Actions */}
              <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto mt-4 md:mt-0">
                <button className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-white text-sm transition-colors">
                  Edit Profile
                </button>
                <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-white text-sm transition-colors">
                  Upgrade Plan
                </button>
              </div>
            </div>
          </div>
          
          {/* Files Section */}
          <div>
            {/* Tabs and Actions Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              {/* Tabs */}
              <div className="flex gap-4 border-b border-gray-700 w-full sm:w-auto">
                <button 
                  className={`pb-2 px-1 text-sm font-medium transition-colors ${activeTab === 'saved' ? 'text-purple-400 border-b-2 border-purple-400' : 'text-gray-400 hover:text-gray-300'}`} 
                  onClick={() => setActiveTab('saved')}
                >
                  Saved Files
                </button>
                <button 
                  className={`pb-2 px-1 text-sm font-medium transition-colors ${activeTab === 'downloads' ? 'text-purple-400 border-b-2 border-purple-400' : 'text-gray-400 hover:text-gray-300'}`} 
                  onClick={() => setActiveTab('downloads')}
                >
                  Downloads
                </button>
              </div>
              
              {/* Actions */}
              <div className="flex gap-2 w-full sm:w-auto justify-between sm:justify-start">
                {isSelecting ? (
                  <>
                    <span className="text-sm text-gray-400 self-center mr-2">
                      {selectedFiles.length} selected
                    </span>
                    <button 
                      className="px-3 py-1.5 bg-red-600 hover:bg-red-700 rounded-lg text-white text-sm transition-colors"
                      onClick={deleteSelectedFiles}
                      disabled={selectedFiles.length === 0}
                    >
                      Delete
                    </button>
                    <button 
                      className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 rounded-lg text-white text-sm transition-colors"
                      onClick={downloadSelectedFiles}
                      disabled={selectedFiles.length === 0}
                    >
                      Download
                    </button>
                    <button 
                      className="px-3 py-1.5 bg-gray-700 hover:bg-gray-600 rounded-lg text-white text-sm transition-colors"
                      onClick={() => {
                        setIsSelecting(false);
                        setSelectedFiles([]);
                      }}
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button 
                      className="px-3 py-1.5 bg-gray-700 hover:bg-gray-600 rounded-lg text-white text-sm transition-colors"
                      onClick={() => setIsSelecting(true)}
                    >
                      Select Files
                    </button>
                    <select className="bg-gray-800 text-gray-300 px-3 py-1.5 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 border border-gray-700">
                      <option>Sort by: Newest</option>
                      <option>Sort by: Oldest</option>
                      <option>Sort by: Name (A-Z)</option>
                      <option>Sort by: Size</option>
                    </select>
                  </>
                )}
              </div>
            </div>
            
            {/* Search Bar */}
            <div className="mb-6">
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Search files by name or tag..." 
                  className="bg-gray-800 text-gray-200 px-4 py-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-purple-500 pl-10 border border-gray-700"
                />
                <svg className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
            
            {/* Files Grid */}
            {displayedFiles.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                {displayedFiles.map((file) => (
                  <div 
                    key={file.id} 
                    className={`group relative rounded-xl overflow-hidden bg-gray-800 border transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer
                      ${selectedFiles.includes(file.id) ? 'border-purple-500 ring-2 ring-purple-500' : 'border-gray-700 hover:border-gray-600'}`}
                    onClick={() => handleFileClick(file.id)}
                  >
                    {/* Selection Checkbox */}
                    {isSelecting && (
                      <div className="absolute top-2 left-2 z-10">
                        <div 
                          className={`w-5 h-5 rounded border ${selectedFiles.includes(file.id) ? 'bg-purple-500 border-purple-500' : 'border-gray-400 bg-gray-800'} flex items-center justify-center`}
                        >
                          {selectedFiles.includes(file.id) && (
                            <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </div>
                      </div>
                    )}
                    
                    {/* Favorite Button */}
                    <button 
                      className={`absolute top-2 right-2 z-10 p-1.5 rounded-full ${file.isFavorite ? 'bg-yellow-500 text-gray-900' : 'bg-black/40 text-gray-400'} hover:bg-yellow-500 hover:text-gray-900 transition-colors`}
                      onClick={(e) => toggleFavorite(file.id, e)}
                      title={file.isFavorite ? "Remove from favorites" : "Add to favorites"}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill={file.isFavorite ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                      </svg>
                    </button>
                    
                    {/* Image */}
                    <div 
                      className="w-full h-40" 
                      style={{ 
                        aspectRatio: file.aspectRatio || '1/1',
                      }}
                    >
                      <div className="relative w-full h-full">
                        <Image 
                          src={file.imageUrl} 
                          alt={file.title}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    </div>
                    
                    {/* File Info */}
                    <div className="p-3">
                      <h3 className="text-white font-medium text-sm truncate" title={file.title}>{file.title}</h3>
                      <div className="flex justify-between items-center mt-1">
                        <span className="text-gray-400 text-xs">{file.date}</span>
                        <span className="text-gray-400 text-xs">{file.size}</span>
                      </div>
                      {/* Tags */}
                      <div className="mt-2 flex flex-wrap gap-1">
                        {file.tags.map((tag, idx) => (
                          <span key={idx} className="px-2 py-0.5 bg-gray-700 rounded-full text-gray-300 text-xs">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    {/* Quick Actions Overlay */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                      <button className="p-2 rounded-full bg-gray-800 hover:bg-purple-600 text-white transition-colors" title="View Details">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </button>
                      <button className="p-2 rounded-full bg-gray-800 hover:bg-blue-600 text-white transition-colors" title="Download">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                      </button>
                      <button className="p-2 rounded-full bg-gray-800 hover:bg-red-600 text-white transition-colors" title="Delete">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                </svg>
                <h3 className="text-xl font-medium text-gray-400 mb-2">No files found</h3>
                <p className="text-gray-500 max-w-md">
                  {activeTab === 'saved' ? 'Save some files to see them here.' : 'Download some files to see them here.'}
                </p>
                <button className="mt-4 px-6 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-white transition-colors">
                  Generate New Image
                </button>
              </div>
            )}
            
            {/* Pagination (when needed) */}
            {displayedFiles.length > 12 && (
              <div className="mt-8 flex justify-center">
                <nav className="flex items-center gap-1">
                  <button className="w-8 h-8 flex items-center justify-center rounded-md bg-gray-800 text-gray-400 hover:bg-gray-700">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button className="w-8 h-8 flex items-center justify-center rounded-md bg-purple-600 text-white">1</button>
                  <button className="w-8 h-8 flex items-center justify-center rounded-md bg-gray-800 text-gray-400 hover:bg-gray-700">2</button>
                  <button className="w-8 h-8 flex items-center justify-center rounded-md bg-gray-800 text-gray-400 hover:bg-gray-700">3</button>
                  <span className="px-2 text-gray-500">...</span>
                  <button className="w-8 h-8 flex items-center justify-center rounded-md bg-gray-800 text-gray-400 hover:bg-gray-700">8</button>
                  <button className="w-8 h-8 flex items-center justify-center rounded-md bg-gray-800 text-gray-400 hover:bg-gray-700">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </nav>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}