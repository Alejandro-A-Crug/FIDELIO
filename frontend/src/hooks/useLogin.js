import React, { useState } from 'react'
import { useAuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';
import ErrorSound from '../assets/sounds/Error1.mp3';


const errorSound = new Audio(ErrorSound);


const useLogin = () => {
const [loading, setLoading] = useState(false);
const {setAuthUser} = useAuthContext();

const login = async (username, password) => {
    const success = handleInputErrors({username,password})
    if(!success) return;
    //en caso de falta de errores se envia el login al servidor 
    try {
        const res = await fetch("/api/auth/login", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({username, password})
        })
        //se espera una respuesta del servidor 
        const data = await res.json();

        if(data.error){
            throw new Error(data.error); 
        }
        toast.success("You have joined succesfully")
        //se meten los datos de la respuesta en localstorage para redirigir al usuario
        localStorage.setItem("chatUser", JSON.stringify(data))
        //se va a authContext 
        setAuthUser(data);
    } catch (error) {
        toast.error(error.message)
        errorSound.play();
    } finally {
        setLoading(false);
    }
}

return {loading, login};
}

export default useLogin

//se manejan los errores
function handleInputErrors({username,password}){
    if(!username || !password){
        toast.error("Please, fill al the fields");
        errorSound.play();
        return false;
    }


   return true;
}
