import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import UserList from './UserList';
import Shimmer from './Shimmer';
import axios from 'axios';
import { RESOURCE_URL } from '../constant/Apis';
import { useUsersContext } from '../utils/UserContext';
import CreateUser from './CreateUser';

import 'react-toastify/dist/ReactToastify.css';

export interface UserAttribute {
    id: number,
    name: string,
    email: string,
    phone: string,
    username?: string,
    address: {
        city: string,
        street: string
    }
    company: {
        name: string,
        catchPhrase: string,
        bs: string
    },
    companyName?:string
}

const HomePage = () => {
    const [searchValue, setSearchValue] = useState('');
    const {users, addUser} = useUsersContext();
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    // const [users, setUsers] = useState<UserAttribute[] | null>(null);

    function handleChange(e: React.ChangeEvent<HTMLInputElement>){
        setSearchValue(e.target.value)
    }

    async function fetchUser(){
        try {
            const response = await axios.get(RESOURCE_URL);
            if(response.status === 200){
                addUser(response.data);
            } else {
                throw "Not able to fetch users"
            }
        } catch (error) {
            alert('Not able to fetch users')
        }
    }
    useEffect(() => {
        fetchUser();
    }, [])
    return (
        <div className='min-h-screen w-full bg-slate-900'>
            {/* Nav bar */}
            <Navbar />
            
            {/* Filter user section */}
            <div className='h-fit w-full px-5 py-5 flex justify-between items-center'>
                <input 
                    className='h-12 w-4/5 rounded-lg border-2 outline-none px-3 text-lg'
                    type='text'
                    name='search'
                    placeholder='Search user'
                    value={searchValue}
                    onChange={handleChange}
                />
                <button className='h-fit w-fit border-2 rounded-lg p-2'><img className='h-8 invert' src='/search.svg'/></button>
            </div>
            
            {/* Add User section */}
            <div className='h-fit w-full p-5 flex justify-center items-center'>
                <button className='h-fit w-fit border-2 rounded-lg p-2 text-slate-900 text-lg bg-white font-bold hover:bg-slate-900 hover:text-white transition-all' onClick={() => setIsCreateOpen(true)}>Create User</button>
            </div>
            <h1 className='text-3xl text-white font-bold text-center pb-5'>All User's</h1>
            
            {users ? <UserList /> : <Shimmer />}
            {isCreateOpen && <CreateUser trigger = {isCreateOpen} setTrigger={ setIsCreateOpen}/>}
            
        </div>
    )
}

export default HomePage