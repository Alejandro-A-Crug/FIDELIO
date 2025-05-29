import { useState, useRef } from 'react';
import { toast } from 'react-toastify';
import useConversation from '../zustand/useConversation';
import crypto from 'crypto-js';

const RATE_LIMIT_INTERVAL = 2000; // 2 segundos entre mensaje y mensaje
//La app usa esta variable temporalmente 
const secretKey = 'And4feiferea123_'

const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const lastSentRef = useRef(0); //Ultimo mensaje para la referencia del ratelimiter
  const { messages, setMessages, selectedConversation } = useConversation();


const encryptMessage = (message) => {
  return crypto.AES.encrypt(message, secretKey).toString(); // Devuelve base64
};


const decryptMessage = (encryptedMessage) => {
  try {
    if (!encryptedMessage) return ""; // No hay mensaje que desencriptar
// desencripta el mensaje pasandolo a bytes, y transforma los bytes en un string
    const bytes = crypto.AES.decrypt(encryptedMessage, secretKey);
    const decryptedMessage = bytes.toString(crypto.enc.Utf8);
//si no hay nada, se muestra el error, que por cierto, esto puede deberse a que el mensaje también sea una imagen
    if (!decryptedMessage) throw new Error('Desencriptación fallida o datos corruptos');
    return decryptedMessage;

  } catch (error) {
    console.error('Error desencriptando el mensaje:', error.message);
    return "";
  }
};


//se envia la imagen y el archivo imagen como null
  const sendMessage = async (textMessage, imageFile = null) => {
    if (!selectedConversation?._id) {
      toast.error("No conversation selected.");
      return;
    }

    // Rate limiter
    const now = Date.now();
    if (now - lastSentRef.current < RATE_LIMIT_INTERVAL) {
      toast.warn("You're sending messages too quickly. Please wait.");
      return;
    }
    //para que el botón cargue
    setLoading(true);
//el mensaje enviado es encriptado 
    const encryptedMessage = encryptMessage(textMessage);
    try {
      let imageBase64 = null;
//la imagen es codificada a base64
      if (imageFile) {
        imageBase64 = await fileToBase64(imageFile);
      }
//se envia la petición al backend en formato json
      const res = await fetch(`/api/messages/send/${selectedConversation._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: encryptedMessage, image: imageBase64 }),
      });

      const data = await res.json();

      if (data.error) throw new Error(data.error);

 const decryptedMessage = data.message
  ? decryptMessage(data.message)
  : "";
//se cambia el array de mensajes para que enseñe uno nuevo y se establece el mensaje enviado a la fecha de enviado el mensaje
     setMessages([...messages, { ...data, message: decryptedMessage }]);
    lastSentRef.current = now;
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, sendMessage };
};

export default useSendMessage;

//codificar la imagen en base 64
const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};
