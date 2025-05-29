import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter} from 'react-router-dom';
import { AuthContextProvider } from './context/AuthContext.jsx';
import { SocketContextProvider } from './context/SocketContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/** para redireccionar */}
    <BrowserRouter>
    {/** para todo el contexto del auth user */}
    <AuthContextProvider>
      {/** para redireccionar el socket y los usuarios en linea */}
      <SocketContextProvider>
    <App />
    </SocketContextProvider>
    </AuthContextProvider>
    </BrowserRouter>
  </StrictMode>,
)
