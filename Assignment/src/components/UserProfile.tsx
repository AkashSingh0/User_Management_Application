import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { UserAttribute } from './HomePage';
import axios from 'axios';
import { RESOURCE_URL } from '../constant/Apis';
import Navbar from './Navbar';
const UserProfile = () => {
  const userId = useParams();
  const [user, setUser] = useState<UserAttribute | null>(null);
  async function fetchUser() {
      try {
        const response = await axios.get(RESOURCE_URL + `/${userId.id}`);
        if(response.status === 200){
          setUser(response.data);
        } else{
          throw "Something went wrong"
        }
      } catch (error) {
        alert(error)
      }
  }
  useEffect(() => {
    fetchUser();
  }, [])
  return (
    <div className='h-screen w-full bg-slate-900 text-white'>
        <Navbar />
        <div className='p-5'>
        <h1 className='text-4xl text-center font-bold underline'>User Details</h1>
        <h1 className='text-xl pt-3 font-medium '>Name: {user?.name}</h1>
        <h1 className='text-xl pt-3 font-medium '>Email: {user?.email}</h1>
        <h1 className='text-xl pt-3 font-medium '>Username: USER-{user?.name}</h1>
        <h1 className='text-xl pt-3 font-medium '>Phone: {user?.phone}</h1>
        <h1 className='text-xl pt-3 font-medium '>Address: {user?.address.street}, {user?.address.city}</h1>
        <h1 className='text-xl pt-3 font-medium '>Company: {user?.company.name}</h1>
        </div>
    </div>
  )
}

export default UserProfile