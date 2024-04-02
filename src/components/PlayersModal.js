import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import PlayerList from './MainComponents/FantasyGameComponents/PlayerList';
import { useDispatch, useSelector } from 'react-redux';
import userTeamSlice, { addCaptain, addViceCaptain, removeCaptain, removeViceCaptain } from '../slices/userTeamSlice';
import classes from "../components/MainComponents/FantasyGameComponents/PlayerList.module.css";
import DoneIcon from "@mui/icons-material/Done";
import { IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { toast } from 'react-toastify';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  // width: 300,
  height:600,
  overflow:"scroll",
  border: '2px solid #fff',
  boxShadow: 24,
  p: 4,
};

const PlayersModal = ({open,close,submitHandler,captain,viceCaptain}) => {

    const {team} = useSelector((state)=>state.userTeamSlice)
   
    
   console.log(captain.length == 0 || viceCaptain.length == 0 ,'--')
    
    const dispatch = useDispatch();

    

    console.log(captain,viceCaptain)

  

    const AddViceCaptain=(data)=>{
      if(viceCaptain.length !== 0 ){
        toast.info("ViceCaptain Already Selected.");
      }
      else if(data.captain == true){
        toast.info("This Player is Captain.")
      }
      else if(viceCaptain.length == 0 && data.captain !== true){
        dispatch(addViceCaptain(data?.id))
      } 
    }

    const AddCaptain=(data)=>{
      if(captain.length !== 0 ){
        toast.info("Captain Already Selected.");
      }
      else if(data.viceCaptain == true){
        toast.info("This Player is viceCaptain.")
      }
      else if(captain.length == 0 && data.viceCaptain !== true){
        dispatch(addCaptain(data?.id))
      }
      
    }

  return (
    <div>
    <Modal
      open={open}
      onClose={close}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style} className=" w-[300px] md:w-[430px] bg-background_navbar p-4 rounded-lg text-white">
      <div className='w-[23rem]'>

      
      <p className='text-center text-xl font-bold underline-offset-2 p-3'>Your Team</p>

      <div className="flex w-full">
        <div className='w-1/2'>
        </div>
        <div className='w-1/2 flex'>
        <div className='w-1/2 text-right'>
        Vice Captain
        </div>
        <div className='w-1/2 text-right'>
        Captain
        </div>
        </div>
      </div>
      </div>

       {
        team?.map((dataItem,idx)=>(
            <>
            <div key={dataItem?.id} className={`w-[440px] p-2 flex justify-between`}>
        <div className={`w-1/2 flex justify-self-start items-center gap-4`}>
          <div className={classes.player_info}>
            <div className={classes.player_image}>
              <img
                src={dataItem?.photo}
                alt={dataItem?.name}
                className={classes.img}
              />
            </div>
          </div>
          <div className={classes.player_name}>
            <p className='max-w-[100px] overflow-hidden text-ellipsis'>
              {dataItem?.name} <br />
              ({dataItem?.teamName})
            </p>
          </div>
       <div>
       </div>
       </div>
       <div className=' w-1/2 flex gap-16'>
       <div className="flex justify-center items-center">
       {dataItem?.viceCaptain == true
        ? (
          <IconButton
            aria-label="delete"
            color="success"
            onClick={() => dispatch(removeViceCaptain(dataItem?.id))}
            sx={{ backgroundColor: "rgba(255,255,255,1)" }}
          >
            <DoneIcon />
          </IconButton>
        ) : (
          <IconButton
            aria-label="delete"
            color="success"
            onClick={()=>{AddViceCaptain(dataItem)}}
            sx={{ backgroundColor: "rgba(255,255,255,1)" }}
          >
            <AddIcon />
          </IconButton>
        )}
       </div>
       <div className="flex justify-center items-center">
       {dataItem?.captain == true
        ? (
          <IconButton
            aria-label="delete"
            color="success"
            onClick={() => dispatch(removeCaptain(dataItem?.id))}
            sx={{ backgroundColor: "rgba(255,255,255,1)" }}
          >
            <DoneIcon />
          </IconButton>
        ) : (
          <IconButton
            aria-label="delete"
            color="success"
            onClick={() =>{AddCaptain(dataItem)}}
            sx={{ backgroundColor: "rgba(255,255,255,1)" }}
          >
            <AddIcon />
          </IconButton>
        )}
</div>
    
</div>
     

       
       
      </div>
      <div className={classes.underline}></div>
      </>
        ))
       }

<div className='w-[25rem] flex justify-center p-4'>
       <button  type="button"
      
      //  disabled={(captain.length == 0 || viceCaptain.length == 0)? true:false }
              class="w-1/2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              onClick={submitHandler}>Submit</button>
    </div>
      </Box>
    </Modal>
  </div>
  )
}

export default PlayersModal
