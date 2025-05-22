import React, { useState } from 'react'
import Searchinput from './Searchinput'
import Conversations from './Conversations'
import Logoutbutton from './Logoutbutton'
import {ArrowRight} from 'react-bootstrap-icons'
import DeletionButton from './DeletionButton'




const Sidebar = () => {
  const [open, setOpen] = useState(true);
  return (
<div className="flex">
  <div className={`bg-gray-800 h-screen flex flex-col ${open ? "w-90" : "w-45"} duration-200 relative`}>

    <ArrowRight
      className={`bg-white text-black text-3xl rounded-full absolute -right-3 top-8 border-2 cursor-pointer transition-transform duration-200 ${open && "rotate-180"} z-50`}
      onClick={() => setOpen(!open)}
    />

    
    <div className="flex items-center gap-4 px-7 pt-8">
      <img src="/mascara-de-carnaval.png" alt="Logo" className="w-9 h-9 rounded-full bg-white" />
      {open && (
        <h1 className="text-white text-xl font-bold">
          <span className="text-yellow-300">FIDEL</span>.IO
        </h1>
      )}
    </div>

    
    <div className="px-7 mt-4">
      <Searchinput />
    </div>

    <div className="divider px-3" />

   
    <div className="flex-1 overflow-y-auto px-2 mt-2">
      <Conversations />
    </div>

    
<div className="px-4 py-3 border-t border-slate-600 flex flex-row  justify-center items-center gap-5">
  
    <Logoutbutton />
    <DeletionButton/>
    <h1 className='text-white'> Log Out / Delete</h1>
</div>


  </div>
</div>

  )
}

export default Sidebar


/*const Sidebar = () => {
  return (
    <div className='border-r border-slate-500 p-4 flex flex-col h-full'>
      
        
        <Searchinput />
        
        <div className='divider px-3'></div>
        <Conversations />
        <Logoutbutton />
      
    </div>
  )
}

export default Sidebar*/
