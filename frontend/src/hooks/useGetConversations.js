import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';


const useGetConversations = () => {
  const [loading, setLoading] = useState(false);
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    const getConversations = async () => {
      //se obtienen los usuarios de la bbdd
      setLoading(true);
      try {
        const res = await fetch('/api/users');
        const data = await res.json();

        if(data.error){
          throw new Error(data.error);
        }
        setConversations(data);
      } catch (error) {
        toast.error(error.message)
      } finally {
        setLoading(false);
      }
    }
    getConversations();
    //todos los usuarios se obtienen en forma de array
  }, [])

  return {loading, conversations};
}

export default useGetConversations
