import React from 'react';
import SideBar from '../components/SideBar';
import Image1 from "../assets/1 (1).jpeg";
import Image from 'next/image';
import { StaticImageData } from 'next/image';

function HistoryPage() {
    interface HistoryCard {
        id: number;
        imageUrl: StaticImageData;
        aspectRatio?: string;
        title?: string;
        date?: string;
    }
    
    // Sample data - expand this with more images when available
    const history: HistoryCard[] = [
        {
            id: 1,
            imageUrl: Image1,
            aspectRatio: "6/7",
            title: "Mystic Owl",
            date: "Feb 25, 2025"
        },
        // These would be replaced with actual images
        {
            id: 2,
            imageUrl: Image1,
            aspectRatio: "4/3",
            title: "Night City",
            date: "Feb 24, 2025"
        },
        {
            id: 3,
            imageUrl: Image1,
            aspectRatio: "1/1",
            title: "Abstract Art",
            date: "Feb 23, 2025"
        },
        {
            id: 4,
            imageUrl: Image1,
            aspectRatio: "16/9",
            title: "Landscape",
            date: "Feb 22, 2025"
        },
        {
            id: 5,
            imageUrl: Image1,
            aspectRatio: "3/4",
            title: "Portrait Style",
            date: "Feb 21, 2025"
        },
        {
            id: 6,
            imageUrl: Image1,
            aspectRatio: "5/4",
            title: "Concept Art",
            date: "Feb 20, 2025"
        }
    ];

    return (
        <div className='flex flex-row w-full h-screen bg-gray-900 text-white overflow-hidden'>
            {/* Sidebar */}
            <div className="w-16 md:w-20 flex-shrink-0">
                <SideBar />
            </div>
            
            {/* Main Content */}
            <div className="flex-1 overflow-y-auto">
                <div className="p-4 md:p-6 lg:p-8">
                    <h1 className="text-2xl font-semibold text-white mb-6">Generation History</h1>
                    
                    {/* Filter/Search Options */}
                    <div className="mb-6 flex flex-col sm:flex-row gap-3 items-start sm:items-center">
                        <div className="relative">
                            <input 
                                type="text" 
                                placeholder="Search generations..." 
                                className="bg-gray-800 text-gray-200 px-4 py-2 rounded-lg w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-purple-500 pl-10"
                            />
                            <svg className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                        <select className="bg-gray-800 text-gray-200 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
                            <option>All Time</option>
                            <option>Last Week</option>
                            <option>Last Month</option>
                            <option>Last Year</option>
                        </select>
                    </div>
                    
                    {/* Image Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                        {history.map((item) => (
                            <div 
                                key={item.id} 
                                className="group relative rounded-xl overflow-hidden bg-gray-800 border border-gray-700 hover:border-purple-500 transition-all duration-300 shadow-lg hover:shadow-xl"
                            >
                                <div 
                                    className="w-full h-full" 
                                    style={{ 
                                        aspectRatio: item.aspectRatio || '1/1',
                                    }}
                                >
                                    <div className="relative w-full h-full">
                                        <Image 
                                            src={item.imageUrl} 
                                            alt={item.title || 'Generated image'}
                                            fill
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                        
                                        {/* Overlay with info */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
                                            {item.title && (
                                                <h3 className="text-white font-medium text-sm md:text-base">{item.title}</h3>
                                            )}
                                            {item.date && (
                                                <p className="text-gray-300 text-xs md:text-sm">{item.date}</p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                
                                {/* Action buttons that appear on hover */}
                                <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <button className="p-1.5 rounded-full bg-black/40 hover:bg-purple-600 text-white" title="Download">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                        </svg>
                                    </button>
                                    <button className="p-1.5 rounded-full bg-black/40 hover:bg-purple-600 text-white" title="Delete">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                    
                    {/* Empty state (visible when no images) */}
                    {history.length === 0 && (
                        <div className="flex flex-col items-center justify-center py-16 text-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <h3 className="text-xl font-medium text-gray-400 mb-2">No generations yet</h3>
                            <p className="text-gray-500 max-w-md">Start creating amazing images using our AI generator and they'll appear here</p>
                        </div>
                    )}
                    
                    {/* Load More Button (when needed) */}
                    {history.length > 0 && (
                        <div className="mt-8 flex justify-center">
                            <button className="px-6 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-gray-300 hover:text-white transition-colors">
                                Load More
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default HistoryPage;