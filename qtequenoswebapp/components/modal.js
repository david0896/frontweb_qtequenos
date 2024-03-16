import { useState } from "react"

const Modal = ({isVisible, onClose, children}) => {
    if(!isVisible)
        return null;

    const handleClose = (e) => {
        if(e.target.id === "wrapper")
            onClose();
    }

    return (
        <div id="wrapper" onClick={handleClose} className="fixed inset-0 bg-black/25 backdrop-blur-md flex justify-center items-center z-[99]">
            <div className="w-[70%] lg:w-[50%] flex flex-col">
                <button className=" text-xl font-semibold text-white place-self-end" onClick={()=>onClose()}>X</button>
                <div className=" bg-slate-50 p-5 rounded-lg">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default Modal