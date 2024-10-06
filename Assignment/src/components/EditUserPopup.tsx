// EditUserPopup.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { z } from 'zod';
import { RESOURCE_URL } from '../constant/Apis';
import { UserAttribute } from './HomePage';
import { useUsersContext } from '../utils/UserContext';

interface EditableAttribute {
    id: number;
    trigger: boolean;
    setTrigger: (val: boolean) => void;
}

const formSchema = z.object({
    name: z.string().min(3, 'Name is required'),
    phone: z.string().length(10, 'Please enter a valid phone number'),
    username: z.string().min(3, 'Username is too short').readonly(),
    email: z.string().email('Invalid email address'),
    address: z.string().min(3, 'Please enter a valid address').readonly(),
    companyName: z.string().min(3, 'Company name must be at least 3 characters').optional(),
    website: z.string().url().optional(),
});

type FormData = z.infer<typeof formSchema>;

const EditUserPopup: React.FC<EditableAttribute> = ({ id, trigger, setTrigger }) => {
    const [user, setUser] = useState<UserAttribute | null>(null);
    const [formData, setFormData] = useState<FormData | null>(null);
    const {updateUser} = useUsersContext();
    async function fetchUser() {
        try {
            const response = await axios.get(`${RESOURCE_URL}/${id}`);
            if (response.status === 200) {
                setUser(response.data);
                setFormData(response.data); // Set form data to user data
            } else {
                throw new Error('Something went wrong');
            }
        } catch (error) {
            alert(error);
        }
    }

    useEffect(() => {
        if (trigger) {
            fetchUser(); // Fetch user data when modal is triggered
        }
    }, [trigger, id]);

    async function handleUpdate() {
        try {
            // Validate the form data using Zod
            const validatedData = formSchema.parse(formData);
            const newObj:typeof user = {
                id: user?.id as number,
                name: validatedData.name as string,
                address: {
                    city: validatedData.address,
                    street: ''
                },
                company: {
                    name: validatedData.name,
                    catchPhrase: '',
                    bs:''
                },
                email: validatedData.email,
                phone: validatedData.phone,
                
            } 
            await axios.put(`${RESOURCE_URL}/${id}`, validatedData);
            updateUser(id, newObj)
            setTrigger(false); // Close modal after update
        } catch (error) {
            console.error(error);
            alert('Failed to update user data');  
            setTrigger(false); 
      }
    }

    if (!trigger) return null; // Do not render if not triggered

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center px-5">
            <div className="bg-white p-5 rounded-lg shadow-lg">
                <h2 className="text-2xl mb-4">Edit User</h2>
                <input
                    type="text"
                    value={formData?.name || ''}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Name"
                    className="border rounded p-2 mb-2 w-full"
                />

                <input
                    type="email"
                    value={formData?.email || ''}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="Email"
                    className="border rounded p-2 mb-2 w-full"
                />

                <input
                    type="text"
                    value={user?.address.street + ', '+user?.address.city || ''}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="Address"
                    readOnly
                    className="border rounded p-2 mb-2 w-full"
                />

                <input
                    type="text"
                    value={formData?.companyName || 'N/A'}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    placeholder="CompanyName"
                    className="border rounded p-2 mb-2 w-full"
                />

                <input
                    type="text"
                    value={formData?.website || ''}
                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                    placeholder="Website"
                    className="border rounded p-2 mb-2 w-full"
                />

                <input
                    type="text"
                    value={'USER-'+formData?.username || ''}
                    readOnly
                    placeholder="Username"
                    className="border rounded p-2 mb-2 w-full"
                />


                <input
                    type="text"
                    value={formData?.phone || ''}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="Phone"
                    className="border rounded p-2 mb-2 w-full"
                />
                {/* Add additional fields here */}
                <button className="bg-slate-900 text-white p-2 rounded" onClick={handleUpdate}>
                    Update
                </button>
                <button className="bg-red-800 text-white p-2 rounded ml-2" onClick={() => setTrigger(false)}>
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default EditUserPopup;
