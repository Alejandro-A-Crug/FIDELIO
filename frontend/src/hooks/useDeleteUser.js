import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";


const useDeleteUser = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { logout } = useAuthContext();

  const deleteUser = async () => {
    setLoading(true);
    setError(null);
    //se borra el usuario
    try {
      const response = await fetch("/api/auth/delete", {
        method: "DELETE",
        credentials: "include",
      });
//se espera la respuesta
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to delete user");
      }
//se quita el usuario de AuthUser yse quita la sesion, con la cookie y el localstorage
      logout();

      setLoading(false);
      return data.message;
    } catch (err) {
      setError(err.message);
      setLoading(false);
      return null;
    }
  };

  return { deleteUser, loading, error };
};

export default useDeleteUser;
