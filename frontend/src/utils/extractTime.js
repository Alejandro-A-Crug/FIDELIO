import React from 'react'

const extractTime = (dateString) => {
    console.log('Fecha recibida:', dateString);
    const date = new Date(dateString);
    if (isNaN(date)) {
      console.warn('Fecha inválida:', dateString);
      return '--:--';
    }
    const hours = padZero(date.getHours());
    const minutes = padZero(date.getMinutes());
    return `${hours}:${minutes}`;
  };
  

export default extractTime


function padZero(number){
    return number.toString().padStart(2,"0");
}