import React, { useEffect } from 'react'
import Messages from './Messages'
import MessageInput from './MessageInput'
import useConversation from '../../zustand/useConversation'
import { useAuthContext } from '../../context/AuthContext'
import { useSocketContext } from '../../context/SocketContext'

const MessageContainer = () => {
  const {selectedConversation, setSelectedConversation} =useConversation();
    const {onlineUsers} = useSocketContext();
   const isOnline = selectedConversation && onlineUsers.some(id => id === selectedConversation._id.toString());

  
  useEffect(() => {
    return() => setSelectedConversation(null);
  }, [setSelectedConversation]);
  return (
   //depende de si hay mensajes o no
    <div className="md:min-w-[450px] flex flex-col h-full p-5 backdrop-blur-md bg-white/10 border border-white/20 rounded-xl shadow-lg">
  {!selectedConversation ? (
    <NoChatSelected />
  ) : (
    <>
      {/** el color del texto superior depende de si el usuario está en línea o no */}
      <div className="bg-slate-500 px-4 py-2 sticky top-0 z-10 rounded-md">
        <span className="label-text text-white">To:</span>{" "}
        <span className={`${isOnline ? "text-green-500" : "text-red-600"} font-bold`}>
          {selectedConversation.fullName}
        </span>
      </div>

      {/** mensajes y cargar mensajes */}
      <div className="flex flex-col h-screen flex-1 overflow-y-auto my-4">
        <Messages />
      </div>

      {/** envio de mensajes*/}
      <div className="mt-auto">
        <MessageInput />
      </div>
    </>
  )}
</div>

    
  )
}



export default MessageContainer

const NoChatSelected = () => {
  const {authUser} = useAuthContext();
  return(
    <div className='flex items-center justify-center w-full h-full'>
      <div className='px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2'>
        <p>Welcome, {authUser.fullName}</p>
        <p>Please, select a conversation to start messaging</p>
      </div>
    </div>
  )
}
