import React from 'react'
import {useAuthContext} from '../../context/AuthContext';
import useConversation from '../../zustand/useConversation';
import extractTime from '../../utils/extractTime';

const Message = ({message}) => {
  const {authUser} = useAuthContext();
  const {selectedConversation} = useConversation();
  const self = message.senderId === authUser._id;
  const Atime = extractTime(message.createdAt);

  const chatClassName = self ? 'chat-end': 'chat-start';
  const profilePicture = self ? authUser.profilePic: selectedConversation.profilePic;
  const messageColor = self ? 'bg-blue-500' : 'bg-gray-400';
  const shakeClass = message.shouldShake ? "shake" : "";

  return (
    
         
    <div className={`chat ${chatClassName}`}>
         {/* Mostrar imagen si existe */}
        {message.image && (
          <img
            src={message.image}
            alt="sent"
            className="max-w-xs mt-2 rounded-lg border border-gray-300"
          />
        )}
      <div className='chat-image avatar'>
        <div className='w-10 rounded-b-full'> 
          <img src={profilePicture} alt="profile" />
        </div>
      </div>
      <div>
        <div className={`chat-bubble text-white ${messageColor} ${shakeClass}`}>
          {message.message}
        </div>



        <div className='chat-footer opacity-50 text-xs flex gap-1 items-center text-white'>
          {Atime}
        </div>
      </div>
    </div>
  
  )
}

export default Message
