import React from 'react';
import { BiLogOut } from 'react-icons/bi';
import useLogout from '../../hooks/useLogout';

const Logoutbutton = () => {
  const { loading, logout } = useLogout();

  return (
    <div className="mt-auto">
      {!loading ? (
        <button
          onClick={logout}
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
