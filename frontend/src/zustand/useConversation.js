// Se importa la función 'create' desde zustand para crear el store
import { create } from 'zustand';

// Se crea un hook personalizado llamado 'useConversation'
// Este hook contiene el estado global para manejar conversaciones y mensajes
const useConversation = create((set) => ({
  // Estado: conversación actualmente seleccionada
  selectedConversation: null,

  // Función para actualizar la conversación seleccionada
  setSelectedConversation: (conversation) =>
    set({ selectedConversation: conversation }),

  // Estado: lista de mensajes de la conversación activa
  messages: [], 

  // Función para establecer todos los mensajes (por ejemplo, al cargar una conversación)
  setMessages: (messages) => set({ messages }),
}));

// Se exporta el hook para usarlo en cualquier parte de la app
export default useConversation;
