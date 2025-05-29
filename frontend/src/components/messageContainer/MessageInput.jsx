import React, { useRef, useState, useEffect } from 'react'
import { BiSolidSend } from 'react-icons/bi'
import useSendMessage from '../../hooks/useSendMessage'
import EmojiPicker from 'emoji-picker-react';
import sentSound from '../../assets/sounds/Sent.mp3';
const sent = new Audio(sentSound);


const MessageInput = () => {
  //variables
   const [message, setMessage] = useState("");
  const{loading, sendMessage}=useSendMessage();
  const [open, setOpen] = useState(false);
    const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const emojiRef = useRef();

  //envío del mensaje
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim() && !image) return;

    //espera al hook de sendmessage 
    await sendMessage(message, image);
    //suena el sonido y se vacía todo
    sent.play();
    setMessage("");
    setImage(null);
    setImagePreview(null);
  }
//esto devuelve la interfaz de emojis de vuelta a donde estaba al clicar afuera
  useEffect(() => {
  const handleClickOutside = (e) => {
    if (emojiRef.current && !emojiRef.current.contains(e.target)) {
      setOpen(false);
    }
  };
  document.addEventListener("mousedown", handleClickOutside);
  return () => document.removeEventListener("mousedown", handleClickOutside);
}, []);
//este mensaje permite seleccionar el emoji de la interfaz de emojis y ponerlo en el mensaje
const handleEmojiClick = (emojiData) => {
  setMessage((prev) => prev + emojiData.emoji);
};
//selecciona la imagen para enviar y que aparezca en la vista previa
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };
//elimina la imagen
   const removeImage = () => {
    setImage(null);
    setImagePreview(null);
  };


  return (
    //al subir el mensaje, pasa por las funciones de arriba para luego enviar la informacion al servidor
   <form className='px-4 my-3' onSubmit={handleSubmit}>
<div className="flex items-center w-full space-x-2">
{/**selector de imagenes */}
<input
  type="file"
  accept="image/*"
  onChange={handleImageChange}
  className="text-white p-2 bg-gray-600 hover:bg-blue-400 rounded-2xl"
/>
{/**vista previa de imágenes*/}
{imagePreview && (
  <div className="mt-2 relative w-32">
    <img src={imagePreview} alt="preview" className="rounded-md border border-gray-300" />
    <button
      type="button"
      onClick={removeImage}
      className="absolute top-0 right-0 bg-red-600 text-white rounded-full w-6 h-6 text-xs flex items-center justify-center transform translate-x-1/2 -translate-y-1/2"
    >
      ×
    </button>
  </div>
)}

  {/** Emojis e interfaz de uso de emojis */}
   <div className="relative" ref={emojiRef}>
    <button
      type="button"
      onClick={() => setOpen(prev => !prev)}
      className="h-10 w-10 flex items-center justify-center bg-gray-700 rounded-lg hover:bg-yellow-200"
    >
      <img src="/emoticono.png" alt="select an emoji" className="h-6 w-6" />
    </button>

    {open && (
      <div className="absolute bottom-12 left-0 z-50">
        <EmojiPicker onEmojiClick={handleEmojiClick} theme="dark" />
      </div>
    )}
  </div>

 {/**span usado para envío de texto con un input de texto */}
  <div className="relative flex-1">
    <input
      type="text"
      className="w-full pr-12 pl-4 py-2 text-sm text-white bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      placeholder="Send a message"
      value={message}
      onChange={(e) => setMessage(e.target.value)}
    />
    <button
      type="submit"
      className="absolute inset-y-0 right-0 flex items-center justify-center px-3 text-white rounded-r-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      {loading ? <div className='loading loading-spinner'></div> : <BiSolidSend className="text-xl" />}
    </button>
  </div>
</div>


   </form>
  )
}

export default MessageInput
