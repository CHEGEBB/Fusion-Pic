"use client"

import { FolderDown, HistoryIcon, LayoutDashboard, Sparkles, LogOut, User } from 'lucide-react'
import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Logo from '../assets/logo2.png'
import "../sass/Sidebar.scss"
import { usePathname } from 'next/navigation'

interface Route {
    path: string;
    label: string;
}

function SideBar() {
  const pathname = usePathname();
  const [activeLink, setActiveLink] = useState('');

  // Set active link based on current path on component mount and when path changes
  useEffect(() => {
    if (pathname === '/') {
      setActiveLink('Auth');
    } else {
      const currentPath = pathname.substring(1); // Remove the leading slash
      setActiveLink(currentPath);
    }
  }, [pathname]);

  return (
    <div className="flex flex-col justify-between bg-gray-900 border-r-2 border-r-gray-700 h-full py-6 px-3">
        <div className="bg- p-2 rounded-lg w-10 h-10 flex items-center justify-center mb-12">
            <Image src={Logo} alt='logo' width={28} height={28} className="object-contain" />
        </div>
        
        <div className="flex flex-col space-y-8">
            {/* Auth link (default route) */}
            <div className="relative group">
                <div className={`p-3 rounded-lg cursor-pointer transition-all duration-300 flex items-center justify-center ${
                    activeLink === 'Auth' || activeLink === ''
                    ? 'bg-gradient-to-r from-indigo-500 via-indigo-600 to-purple-600 text-white' 
                    : 'hover:bg-gray-700 text-gray-300'
                }`}>
                    <User className="w-5 h-5" />
                    <Link href="/" className="absolute inset-0" aria-label="Auth" />
                </div>
                <div className="absolute left-14 top-1 whitespace-nowrap bg-gray-700 text-white px-2 py-1 rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                    Auth
                </div>
            </div>

            <div className="relative group">
                <div className={`p-3 rounded-lg cursor-pointer transition-all duration-300 flex items-center justify-center ${
                    activeLink === 'Generate' 
                    ? 'bg-gradient-to-r from-indigo-500 via-indigo-600 to-purple-600 text-white' 
                    : 'hover:bg-gray-700 text-gray-300'
                }`}>
                    <Sparkles className="w-5 h-5" />
                    <Link href="/Generate" className="absolute inset-0" aria-label="Generate" />
                </div>
                <div className="absolute left-14 top-1 whitespace-nowrap bg-gray-700 text-white px-2 py-1 rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                    Generate
                </div>
            </div>

            <div className="relative group">
                <div className={`p-3 rounded-lg cursor-pointer transition-all duration-300 flex items-center justify-center ${
                    activeLink === 'Dashboard' 
                    ? 'bg-gradient-to-r from-indigo-500 via-indigo-600 to-purple-600 text-white' 
                    : 'hover:bg-gray-700 text-gray-300'
                }`}>
                    <LayoutDashboard className="w-5 h-5" />
                    <Link href="/Dashboard" className="absolute inset-0" aria-label="Dashboard" />
                </div>
                <div className="absolute left-14 top-1 whitespace-nowrap bg-gray-700 text-white px-2 py-1 rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                    Dashboard
                </div>
            </div>

            <div className="relative group">
                <div className={`p-3 rounded-lg cursor-pointer transition-all duration-300 flex items-center justify-center ${
                    activeLink === 'History' 
                    ? 'bg-gradient-to-r from-indigo-500 via-indigo-600 to-purple-600 text-white' 
                    : 'hover:bg-gray-700 text-gray-300'
                }`}>
                    <HistoryIcon className="w-5 h-5" />
                    <Link href="/History" className="absolute inset-0" aria-label="History" />
                </div>
                <div className="absolute left-14 top-1 whitespace-nowrap bg-gray-700 text-white px-2 py-1 rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                    History
                </div>
            </div>

            <div className="relative group">
                <div className={`p-3 rounded-lg cursor-pointer transition-all duration-300 flex items-center justify-center ${
                    activeLink === 'Files' 
                    ? 'bg-gradient-to-r from-indigo-500 via-indigo-600 to-purple-600 text-white' 
                    : 'hover:bg-gray-700 text-gray-300'
                }`}>
                    <FolderDown className="w-5 h-5" />
                    <Link href="/Files" className="absolute inset-0" aria-label="Files" />
                </div>
                <div className="absolute left-14 top-1 whitespace-nowrap bg-gray-700 text-white px-2 py-1 rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                    My Files
                </div>
            </div>
        </div>

        {/* Logout at bottom */}
        <div className="relative group mt-auto">
            <div className={`p-3 rounded-lg cursor-pointer transition-all duration-300 flex items-center justify-center ${
                activeLink === 'Logout' 
                ? 'bg-gradient-to-r from-indigo-500 via-indigo-600 to-purple-600 text-white' 
                : 'hover:bg-gray-700 text-gray-300'
            }`}>
                <LogOut className="w-5 h-5" />
                <Link href="/Logout" className="absolute inset-0" aria-label="Logout" />
            </div>
            <div className="absolute left-14 top-1 whitespace-nowrap bg-gray-700 text-white px-2 py-1 rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                Logout
            </div>
        </div>
    </div>
  );
}

export default SideBar