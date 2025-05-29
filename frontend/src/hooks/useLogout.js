import React, { useState } from 'react'
import { useAuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';

const useLogout = () => {
    const [loading, setLoading] = useState(false);
    const {setAuthUser}= useAuthContext();
  const logout = async () => {
    //loading es mas que nada para deshablitar el botón para evitar el clic masivo 
    setLoading(true);
    try {
        //se espera una respuesta del backend
        const res = await fetch("/api/auth/logout", {
            method: "POST",
            headers: {"Content-Type": "application/json"}
        })
        
        const data = await res.json();
        if(data.error){
            throw new Error(data.error)
        }

        //se borra el item del chatUser 
        localStorage.removeItem("chatUser")
        setAuthUser(null);
    } catch (error) {
        toast.error(error.message);
    } finally {
        setLoading(false);
    }
  }

  return {loading,logout};
}

export default useLogout
