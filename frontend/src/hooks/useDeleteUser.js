import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";

const useDeleteUser = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { logout } = useAuthContext();

  const deleteUser = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/auth/delete", {
        method: "DELETE",
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to delete user");
      }

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
