import React, { useEffect, useState } from 'react';
import useConversation from '../zustand/useConversation';
import { toast } from 'react-toastify';
import crypto from 'crypto-js';

const secretKey = 'And4feiferea123_';
// este es para recibir los mensajes pasados de la base de datos 
const useGetMessages = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();

//funcion para desencriptar mensajes
  const decryptMessage = (encryptedMessage) => {
  try {
    const bytes = crypto.AES.decrypt(encryptedMessage, secretKey);
    const decryptedMessage = bytes.toString(crypto.enc.Utf8);
//si no hay mensaje se echa un error
    if (!decryptedMessage) {
      throw new Error('Desencriptación fallida o datos corruptos');
    }
//se devuelve el mensaje desencriptado
    return decryptedMessage;
  } catch (error) {
    console.error('Error desencriptando el mensaje:', error.message);
    return '';
  }
};

  useEffect(() => {
    const getMessages = async () => {
      //se obtienen los mensajes y se pone a cargar
      setLoading(true);
      try {
        //se esperan los mensajes de la conversacion seleccionada
        const res = await fetch(`/api/messages/${selectedConversation._id}`);
        const data = await res.json();
        //en caso de error
        if (data.error) throw new Error(data.error);

        // Desencriptar los mensajes recibidos
      const decryptedMessages = data.map((message) => ({
         ...message,
      message: message.message ? decryptMessage(message.message) : '[Mensaje vacío]',
      }));
        //se usa la funcion de la conversacion con los mensajes desencriptados
        setMessages(decryptedMessages);
      } catch (error) {
        toast.error(error.message);
        setMessages([]); // opcional: limpiar mensajes si hay error
      } finally {
        setLoading(false);
      }
    };

    if (selectedConversation?._id) getMessages();
  }, [selectedConversation?._id, setMessages]);

 
  return { messages, loading };
};

export default useGetMessages;
