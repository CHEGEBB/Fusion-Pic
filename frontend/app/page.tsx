import React from 'react'
import  SideBar from  './components/SideBar'

function Page() {
  return (
    <div className='flex flex-row w-full h-[100vh] text-white main-container'>
      <div className="w-[5%] sidebar">
      <SideBar/>
      </div>
          <div className="flex-1 content-container w">
          page
          </div>
     
      </div>
  )
}

export default Page