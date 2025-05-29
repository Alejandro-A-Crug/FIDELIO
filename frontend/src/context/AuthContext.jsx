// context/AuthContext.jsx
import { createContext, useContext, useState } from "react";
//se exporta el contexto
export const AuthContext = createContext();

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }) => {
  //se usa el localstorage para tener el item del localstorage 
  const [authUser, setAuthUser] = useState(
    JSON.parse(localStorage.getItem("chatUser")) || null
  );
//se quita todo de localstorage 
  const logout = () => {
    setAuthUser(null);
    localStorage.removeItem("chatUser");
  };

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
