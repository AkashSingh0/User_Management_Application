import axios from 'axios'
import React from 'react'
import { RESOURCE_URL } from '../constant/Apis'

import { useUsersContext } from '../utils/UserContext'
interface DeleteAttribute{
  id: number,
  trigger: boolean,
  setTrigger: (val:boolean) => void,
}

const DeleteUserPopup: React.FC<DeleteAttribute> = ({id, trigger, setTrigger}) => {
  const {deleteUser} = useUsersContext();
  async function handleDelete(){
    try {
      await axios.delete(RESOURCE_URL+`/${id}`);
      deleteUser(id);
      setTrigger(!trigger)
    } catch (error) {
      console.log(error);
    }  
  } 
  return (
    <div className='bg-black bg-opacity-40 h-screen w-full flex items-center justify-center absolute top-0 left-0 overflow-hidden'>
        <div className='bg-white h-[25vh] w-3/4 text-slate-900 flex flex-col gap-7 rounded-xl p-5 items-center justify-center'>
            <h1 className='text-2xl font-semibold'>Are you sure?</h1>
            <div className='w-full flex justify-around items-center text-white'>
              <button className='py-2 px-4 text-lg w-fit bg-slate-900 rounded-lg' onClick={() => setTrigger(false)}>Cancel</button>
              <button className='py-2 px-4 text-lg w-fit bg-slate-900 rounded-lg' onClick={handleDelete}>Delete</button>
            </div>
        </div>
    </div>
  )
}

export default DeleteUserPopup