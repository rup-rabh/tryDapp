import React from 'react'
import Navbar from './Navbar'

const Layout = ({children}) => {
  return (
    <div>
        <Navbar/>
        <div className='flex flex-col justify-around items-center min-h-screen bg-slate-900'>
        
        {
            children
        }

        </div>

    </div>
  )
}

export default Layout
