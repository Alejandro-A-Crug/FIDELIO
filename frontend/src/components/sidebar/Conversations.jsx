import React from 'react'
import Conversation from './Conversation'
import useGetConversations from '../../hooks/useGetConversations'

const Conversations = () => {
  const { loading, conversations } = useGetConversations();
  
  return (
    <div className='py-2 flex flex-col overflow-auto'> {/*Se ajusta con la altura necesaria*/}
    {/** se mapea la conversacion, cada una con su idx, y cada una de las conversaciones en la base de datos
     * se usa en un objeto conversacion
     */}
      {conversations.map((conversation, idx) => (
        <Conversation
          key={conversation._id}
          conversation={conversation}
          lastIdx={idx === conversations.length - 1}
        />
      ))}
      {loading ? <span className='loading loading-spinner'></span> : null}
    </div>
  )
}

export default Conversations
