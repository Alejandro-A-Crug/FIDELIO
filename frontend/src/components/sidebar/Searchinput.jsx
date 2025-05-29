import React, { useState } from 'react'
import { FaSearchengin } from "react-icons/fa6";
import useConversation from '../../zustand/useConversation';
import useGetConversations from '../../hooks/useGetConversations';
import { toast } from 'react-toastify';

import ErrorSound from '../../assets/sounds/Error1.mp3';


const errorSound = new Audio(ErrorSound);
const Searchinput = () => {
  const [search, setSearch] = useState("");
  const  {setSelectedConversation} = useConversation();
  const {conversations} = useGetConversations();

  //manejar la busqueda
  const handleSubmit = (e) => {
    e.preventDefault();
    if(!search) return;
    if(search.length < 2) {
      errorSound.play();
      return toast.error('Search term must be at least 2 characters  long')
    }
//busca la conversacion por el nombre, pone el fullname a minusculas y la busqueda tambien
    const conversation = conversations.find((c) => c.fullName.toLowerCase().includes(search.toLowerCase()));

    //si hay conversación se establece automáticamente
    if(conversation){
      setSelectedConversation(conversation);
      setSearch('')
    } else {
      errorSound.play();
      toast.error(`That user, ${search} , is nonexistent`)
    }
  }
  
  return (
    <form className='flex items-center gap-2' onSubmit={handleSubmit}>
       <input
  type='text'
  placeholder='Search...'
  className='input input-bordered rounded-full'
  value={search}
  onChange={(e) => setSearch(e.target.value)}
/>

        <button type='submit' className='btn btn-circle bg-sky-500 text-white'>
        <FaSearchengin className='w-6 h-6 outline-none'/>
        </button>
    </form>
  )
}

export default Searchinput
