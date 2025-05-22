import React, { useEffect, useState } from 'react'
import useConversation from '../zustand/useConversation'
import { toast } from 'react-toastify'

const useGetMessages = () => {
    const [loading, setLoading] = useState(false)
    const { messages, setMessages, selectedConversation } = useConversation();

    useEffect(() => {
        const getMessages = async () => {
            setLoading(true)
            try {
                const res = await fetch(`/api/messages/${selectedConversation._id}`);
                const data = await res.json();

                if (data.error) throw new Error(data.error);

                // Asegurarse de que sea un array 
                setMessages(Array.isArray(data) ? data : []);
            } catch (error) {
                toast.error(error.message);
                setMessages([]); // opcional: limpiar mensajes si hay error
            } finally {
                setLoading(false)
            }
        }

        if (selectedConversation?._id) getMessages()
    }, [selectedConversation?._id, setMessages]);

    return { messages, loading };
}

export default useGetMessages;
