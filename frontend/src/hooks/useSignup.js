import { useState } from "react"
import { toast } from "react-toastify";
import { useAuthContext } from "../context/AuthContext";


const useSignup = () => {
const [loading, setLoading] = useState(false);
const {authUser,setAuthUser} = useAuthContext();

const signup = async({fullName,username,password,confirmPassword, gender}) => {
    const success = handleInputErrors({fullName,username,password,confirmPassword,gender})
    if(!success) return;
    setLoading(true);
    try {
        const res = await fetch("/api/auth/signup", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({fullName,username,password,confirmPassword,gender})
            
        })

        const data = await res.json();
        if(data.error){
            throw new Error(data.error)
        }
        //localstorage
        localStorage.setItem("chatUser", JSON.stringify(data));
        //authuser
        setAuthUser(data);
        
    } catch (error) {
        toast.error(error.message)
    } finally {
        setLoading(false);
    }
}

return {loading, signup};
}

export default useSignup

function handleInputErrors({fullName, username, password, confirmPassword, gender}){
    if(!fullName || !username || !password || !confirmPassword || !gender){
        toast.error("Fill all the fields before proceeding");
        return false;
    }

    if(password !== confirmPassword){
        toast.error("Passwords do not match");
        return false;
    }

    if(password.length < 6){
        toast.error("Password must, at least, have 6 characters")
        return false
    }

    if(!/[^\w\s]/.test(password)) {
        toast.error("Password must have, at least, one special character")
        return false
    }

    toast.success('Username has been registered succesfully')
    return true;
}
