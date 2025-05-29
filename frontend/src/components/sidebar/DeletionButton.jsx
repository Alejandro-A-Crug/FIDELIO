import React from 'react';
import useDeleteUser from '../../hooks/useDeleteUser';
import { BiX } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

const DeletionButton = () => {
  const { deleteUser, loading, error } = useDeleteUser();
  const navigate = useNavigate();
//se confirma con una notificacion usando sweetalert
const handleClick = async () => {
  const result = await Swal.fire({
    title: 'Are you sure?',
    text: 'Do you really want to delete your account?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'Cancel'
  });
//en caso de que la respuesta es negativa
  if (!result.isConfirmed) return;


  //se borra el usuario y se va al login
  const message = await deleteUser();

  if (message) {
    await Swal.fire({
      title: 'Deleted!',
      text: message,
      icon: 'success',
      confirmButtonText: 'OK'
    });

    navigate('/login');
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
