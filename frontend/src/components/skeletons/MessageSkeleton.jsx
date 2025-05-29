import React from 'react'

const MessageSkeleton = () => {
  return (
    <>
   {/** esto es un placeholder para mientras los mensajes cargan */}
        <div className="flex items-center gap-4">
        <div className="skeleton h-16 w-16 shrink-0 rounded-full"></div>
         <div className="flex flex-col gap-4">
         <div className="skeleton h-4 w-20"></div>
         <div className="skeleton h-4 w-28"></div>
        </div>
        </div>
        <div className="flex items-center gap-4 justify-end">
        <div className="skeleton h-16 w-16 shrink-0 rounded-full"></div>
         <div className="flex flex-col gap-4">
         <div className="skeleton h-4 w-20"></div>
         <div className="skeleton h-4 w-28"></div>
        </div>
        </div>
 
  
    </>
  )
}

export default MessageSkeleton
