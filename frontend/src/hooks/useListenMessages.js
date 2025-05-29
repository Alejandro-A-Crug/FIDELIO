import React, { useEffect } from 'react';
import { useSocketContext } from '../context/SocketContext';
import useConversation from '../zustand/useConversation';
import Notification from '../assets/sounds/Notification1.mp3';
import crypto from 'crypto-js';
import ErrorSound from '../assets/sounds/Error1.mp3';
//temporal
const secretKey = 'And4feiferea123_';

const useListenMessages = () => {
  const { socket } = useSocketContext();
  const { messages, setMessages } = useConversation();
//se hace instantaneamente, y se usa la conversacion 
  useEffect(() => {
    //al recibir un mensaje, al ultimo se le aplica la clase que lo hace moverse, y se añade al array de mensajes nada mas recibirse
    socket?.on("newMessage", (newMessage) => {
      newMessage.shouldShake = true;
      const sound = new Audio(Notification);
      sound.play();

      // Desencriptar el mensaje antes de añadirlo al estado
      const decryptedMessage = decryptMessage(newMessage.message);

      setMessages([...messages, { ...newMessage, message: decryptedMessage }]);
    });
//se apaga el mensaje emitido por socket io
    return () => socket?.off("newMessage");
  }, [socket, setMessages, messages]);

  const decryptMessage = (encryptedMessage) => {
    try {
      const bytes = crypto.AES.decrypt(encryptedMessage, secretKey);
      const decryptedMessage = bytes.toString(crypto.enc.Utf8);

      // Verificar si la desencriptación fue exitosa
      if (!decryptedMessage) {
        throw new Error('Desencriptación fallida o datos corruptos');
      }

      return decryptedMessage;
    } catch (error) {
      
      console.error('Error al desencriptar mensaje:', error.message);
      return ''; // Retornar un string vacía si la desencriptación falla
      
    }
  };
};

export default useListenMessages;
