import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import { UserAttribute } from './HomePage'
import DeleteUserPopup from './DeleteUserPopup';
import { useUsersContext } from '../utils/UserContext';
import EditUserPopup from './EditUserPopup';


const UserList = () => {
    const { users } = useUsersContext();
    const [value, setValue] = useState(0)
    const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
    const [isEditablePopupOpen, setIsEditablePopupOpen] = useState(false);
    function handleDelete(userId: number) {
        setValue(userId);
        setIsDeletePopupOpen(true);
    }

    function handleEdit(userId: number) {
        setValue(userId);
        setIsEditablePopupOpen(true);
    }
    return (
        <div className='w-full h-[70vh] overflow-auto px-5 pb-5 flex-col flex gap-'>
            {/* User-data in table format */}
            <div className='w-full h-fit overflow-scroll'>
                <table className="w-full h-auto border-collapse border border-gray-300 text-white">
                    <thead>
                        <tr className="bg-gray-800">
                            <th className="p-3 border border-gray-500">Name</th>
                            <th className="p-3 border border-gray-500">Phone</th>
                            <th className="p-3 border border-gray-500">Company</th>
                            <th className="p-3 border border-gray-500">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user: Partial<UserAttribute>) => {
                                return (<tr className="odd:bg-gray-700 even:bg-gray-600">
                                    <td className="p-3 border border-gray-500">
                                        <Link to={`/user/${user.id}`} className="text-white hover:underline">{user.name}</Link>
                                    </td>
                                    <td className="p-3 border border-gray-500">
                                        <Link to={`/user/${user.id}`} className="text-white hover:underline">{user.phone}</Link>
                                    </td>
                                    <td className="p-3 border border-gray-500">
                                        <Link to={`/user/${user.id}`} className="text-white hover:underline">{user.company?.name || user.companyName}</Link>
                                    </td>
                                    <td className="p-3 border border-gray-500">
                                        <div className='flex flex-col gap-1'>
                                            <button className='p-1 bg-slate-900 rounded-lg' onClick={() => handleEdit(user.id as number)}>Edit</button>
                                            <button className='p-2 bg-slate-900 rounded-lg' onClick={() => handleDelete(user.id as number)}>Delete</button>
                                        </div>
                                    </td>
                                </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
            {isDeletePopupOpen && <DeleteUserPopup id={value} trigger={isDeletePopupOpen} setTrigger={setIsDeletePopupOpen} />}
            {isEditablePopupOpen && <EditUserPopup id={value} trigger={isEditablePopupOpen} setTrigger={setIsEditablePopupOpen} />}
        </div>
    )
}

export default UserList