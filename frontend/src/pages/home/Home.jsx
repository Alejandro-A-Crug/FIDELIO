import React from 'react'

import Sidebar from '../../components/sidebar/Sidebar'
import MessageContainer from '../../components/messageContainer/messageContainer'

const Home = () => {
  return (
    <div className='flex h-screen'>
      <Sidebar />
      <div className='flex-grow overflow-hidden'>
        <MessageContainer />
      </div>
    </div>
  )
}

export default Home
