import React from 'react';

// Función para extraer la hora (hh:mm) de una fecha en formato ISO o timestamp
const extractTime = (dateString) => {
   // Se convierte el string en un objeto Date
   const date = new Date(dateString);

   // Si la fecha no es válida, se muestra una advertencia y se retorna un marcador vacío
   if (isNaN(date)) {
     console.warn('Fecha inválida:', dateString);
     return '--:--';
   }

   // Se obtiene la hora y los minutos, asegurando que tengan siempre dos dígitos
   const hours = padZero(date.getHours());
   const minutes = padZero(date.getMinutes());

   // Se retorna el tiempo en formato HH:MM
   return `${hours}:${minutes}`;
};

// Se exporta por defecto para poder usarlo fácilmente 
export default extractTime;

// Función auxiliar para asegurar que los números siempre tengan dos números
function padZero(number) {
  return number.toString().padStart(2, "0");
}
