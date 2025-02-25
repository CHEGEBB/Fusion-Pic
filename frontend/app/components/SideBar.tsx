import { FolderDown, HistoryIcon, LayoutDashboard, Sparkles } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import "../sass/Sidebar.scss"

function SideBar() {
  return (
    <div className='container'>
        <div className="logo"></div>
        <div className="flex flex-col justify-center bg-gray-800 border-gray-600 border-r-[1px] h-[100vh] bo nav">
            <div className="nav-element">
                <Sparkles className="icon-sparkles" width={20} height={20} />
            <Link href='Generate' className='nav-item' />
            </div>
            <div className="nav-element">
                <LayoutDashboard  className="icon-layout-dashboard" width={20} height={20}/>
                <Link href='Dashboard' className='nav-item' />
            </div>
            <div className="nav-element">
                <HistoryIcon className='icon-history' width={20} height={20} />
                <Link href='History' className='nav-item' />
            </div>
            <div className="nav-element">
                <FolderDown className='icon-folder-down' width={20} height={20} />
                <Link href='Files' className='nav-item' />
            </div>
        </div>

      
    </div>
  )
}

export default SideBar
