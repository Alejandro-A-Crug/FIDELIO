import React, { useEffect, useRef } from 'react';
import Message from './Message';
import useConversation from '../../zustand/useConversation';
import useGetMessages from '../../hooks/useGetMessages';
import MessageSkeleton from '../skeletons/MessageSkeleton';
import useListenMessages from '../../hooks/useListenMessages';

const Messages = () => {
  const { messages } = useConversation(); // 
  const { loading } = useGetMessages();
  useListenMessages();
  const lastMessageRef = useRef();

  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  }, [messages]);

  return (
    <div className='px-4 flex-1 overflow-auto'>
      {!loading && Array.isArray(messages) && messages.length > 0 && messages.map((message, idx) => {
        const isLast = idx === messages.length - 1;
        return (
          <div key={message._id} ref={isLast ? lastMessageRef : null}>
            <Message message={message} />
          </div>
        );
      })}

      {loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}

      {!loading && Array.isArray(messages) && messages.length === 0 && (
        <div className='flex items-center justify-center h-full'>
          <p className='text-white text-3xl blinking-text'>Don't be Shy, Start the conversation!</p>
        </div>
      )}
    </div>
  );
};

export default Messages;
