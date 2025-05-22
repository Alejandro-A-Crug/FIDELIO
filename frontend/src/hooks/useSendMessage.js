import { useState, useRef } from 'react';
import { toast } from 'react-toastify';
import useConversation from '../zustand/useConversation';

const RATE_LIMIT_INTERVAL = 2000; // 2 segundos

const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const lastSentRef = useRef(0); //Ultimo mensaje para la referencia del ratelimiter
  const { messages, setMessages, selectedConversation } = useConversation();

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

    setLoading(true);
    try {
      let imageBase64 = null;

      if (imageFile) {
        imageBase64 = await fileToBase64(imageFile);
      }

      const res = await fetch(`/api/messages/send/${selectedConversation._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: textMessage, image: imageBase64 }),
      });

      const data = await res.json();

      if (data.error) throw new Error(data.error);

      setMessages([...messages, data]);
      lastSentRef.current = now; // Update timestamp after successful send

    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, sendMessage };
};

export default useSendMessage;

const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};
