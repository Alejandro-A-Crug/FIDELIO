import React, { useEffect, useRef } from 'react';
import Message from './Message';
import useConversation from '../../zustand/useConversation';
import useGetMessages from '../../hooks/useGetMessages';
import MessageSkeleton from '../skeletons/MessageSkeleton';
import useListenMessages from '../../hooks/useListenMessages';

const Messages = () => {
  const { messages } = useConversation(); //se usa la confersacion cargada de zutand para saber que mensajes mostrar 
  const { loading } = useGetMessages();
  useListenMessages(); //esto se usa para actualizar los mensajes en tiempo real 
  const lastMessageRef = useRef();

  //para que cuando se escriba, siempre se vea el mensaje de abajo
  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  }, [messages]);

  return (
    
    <div className='px-4 flex-1 overflow-auto'>
      {/**si hay un array de mensajes y es de mas de cero, se mapea cda mensaje con su id, y se usa el idx para ver
       * cuál es el último, por cada mensaje mapeado se usa el objeto mensaje
       */}
      {!loading && Array.isArray(messages) && messages.length > 0 && messages.map((message, idx) => {
        const isLast = idx === messages.length - 1;
        return (
          <div key={message._id} ref={isLast ? lastMessageRef : null}>
            <Message message={message} />
          </div>
        );
      })}
{/** se usa un esqueleto para hacer más estética la carga de mensajes */}
      {loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}
{/** si los mensajes son iguales a cero, se emplea esta pantalla alterna para incitar la conversación */}
      {!loading && Array.isArray(messages) && messages.length === 0 && (
        <div className='flex items-center justify-center h-full'>
          <p className='text-white text-3xl blinking-text'>Don't be Shy, Start the conversation!</p>
        </div>
      )}
    </div>
  );
};

export default Messages;
