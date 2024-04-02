import React from 'react'
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch } from 'react-redux';
import { closeHandler } from '../../slices/slideUp';

const ModalNavbar = () => {
    const dispatch=useDispatch();
    const handleClose=()=>{
        dispatch(closeHandler());
    }
  return (
    <div className="bg-black flex justify-end items-center p-4">
        <div>
            <CloseIcon sx={{color:'white',cursor:'pointer'}} onClick={handleClose}/>
        </div>
    </div>
  )
}

export default ModalNavbar;