import React from 'react';
import useDeleteUser from '../../hooks/useDeleteUser';
import { BiX } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

const DeletionButton = () => {
  const { deleteUser, loading, error } = useDeleteUser();
  const navigate = useNavigate();

  const handleClick = async () => {
    const confirm = window.confirm("Are you sure you want to delete your account?");
    if (!confirm) return;

    const message = await deleteUser();
    if (message) {
      alert(message);
      navigate("/login");
    }
  };

  return (
    <div className="mt-auto">
      {!loading ? (
        <button
          onClick={handleClick}
          className="flex items-center justify-center w-10 h-10 rounded-full bg-red-600 text-white hover:bg-red-700 transition duration-200"
        >
          <BiX className="w-6 h-6" />
        </button>
      ) : (
        <span className="loading loading-spinner"></span>
      )}
      {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}
    </div>
  );
};

export default DeletionButton;
