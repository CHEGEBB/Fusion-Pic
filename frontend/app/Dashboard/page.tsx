'use client'

import SideBar from '../components/SideBar'



function Page() {

  return (
    <div className='flex sm:flex-col md:flex-row  lg:flex-row   w-full h-[100vh] text-white main-container'>
      <div className="sidebar w-18">
        <SideBar/>
      </div>

    </div>
  )
}

export default Page