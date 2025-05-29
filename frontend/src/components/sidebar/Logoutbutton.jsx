import React from 'react';
import { BiLogOut } from 'react-icons/bi';
import useLogout from '../../hooks/useLogout';
import Swal from 'sweetalert2';

const Logoutbutton = () => {
  const { loading, logout } = useLogout();

  //se usa sweetalert2 para las alertas
  const handleClick = async () => {
const result = await Swal.fire({
      title: 'Are you sure?',
    text: 'Do you really want to log out?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Yes, log out!',
    cancelButtonText: 'Cancel'
});
//si el resultado no es afirmativo, no se procede
  if (!result.isConfirmed) return;
//se realiza la funcon log out y se envia un mensaje, se navega al login
  const message = await logout();

   if (message) {
      await Swal.fire({
        title: 'Logged out',
        text: message,
        icon: 'success',
        confirmButtonText: 'OK'
      });
  
      navigate('/login');
    }
  }

  return (
    <div className="mt-auto">
      {/** depende de si el logout esta cargando o no, aparece una animación */}
      {!loading ? (
        <button
          onClick={handleClick} 
          className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-700 text-white hover:bg-gray-800 transition duration-200"
        >
          <BiLogOut className="w-6 h-6" />
        </button>
      ) : (
        <span className="loading loading-spinner"></span>
      )}
    </div>
  );
};

export default Logoutbutton;
