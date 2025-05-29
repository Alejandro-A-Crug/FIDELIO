import React from 'react'
import useConversation from '../../zustand/useConversation'
import { useSocketContext } from '../../context/SocketContext';

const Conversation = ({conversation, lastIdx}) => {
  //se selecciona la conversación, y se necesita saber cuál es para tener el fondo azul
  const {selectedConversation, setSelectedConversation} = useConversation();
  const isSelected = selectedConversation?._id === conversation._id;
  //se sacan los usuarios online del contexto del socket 
  const {onlineUsers} = useSocketContext();
  //se saca si el usuario se ha conectado cuando como minimo, uno de los id de las conversaciones en linea
  //coincide con el de esta conversacion
  const isOnline = onlineUsers.some(id => id === conversation._id.toString());

  return (
    <>
  {/**si pasamos el ratón o seleccionamos la conversación, el fondo se vuelve azul*/}
    <div className={`flex gap-2 items-center rounded-2xl p-2 py-1 cursor-pointer 
  hover:bg-sky-500 ${isSelected ? "bg-sky-500" : ""} transition-all`}
  onClick={() => setSelectedConversation(conversation)}>
    {/**si el otro está en línea, se muestra el puntito verde de daisyUI */}
        <div className={`avatar ${isOnline ? "avatar-online" : ""}`}>
           <div className='w-12 rounded-full'>
            <img src={conversation.profilePic} alt="user avatar" />
           </div>
        </div>
        <div className='flex flex-col flex-1'>
            <div className='flex gap-3 justify-between'>
                <p className=' text-white'>{conversation.fullName}</p>
            </div>
        </div>
      </div>
     

      {!lastIdx && <div className='divider my-0 py-0 h-1'></div>}
    </>
  )
}

export default Conversation
