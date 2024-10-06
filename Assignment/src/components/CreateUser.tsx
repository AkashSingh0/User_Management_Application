// EditUserPopup.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { z } from 'zod';
import { RESOURCE_URL } from '../constant/Apis';
import { useUsersContext } from '../utils/UserContext'


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




interface CreateDataAttribute {
    trigger: boolean;
    setTrigger: (val: boolean) => void;
}

const formSchema = z.object({
    name: z.string().min(3, 'Name is required'),
    phone: z.string().length(10, 'Please enter a valid phone number'),
    username: z.string(),
    email: z.string().email('Invalid email address'),
    address: z.string().min(3, 'Please enter a valid address').readonly(),
    companyName: z.string().min(3, 'Company name must be at least 3 characters').optional(),
    website: z.string().url().optional(),
});

type FormData = z.infer<typeof formSchema>;

const CreateUser: React.FC<CreateDataAttribute> = ({ trigger, setTrigger }) => {
    const { users, addUser } = useUsersContext();
    const userCreatedSuccessfully = () => {
        toast("User Created Successfully!", {
            autoClose: 2000, // Adjust as needed
            onClose: () => setTrigger(false),
        });

    };
    const [formData, setFormData] = useState<FormData>({
        name: '',
        username: '',
        email: '',
        address: '',
        companyName: '',
        website: '',
        phone: ''
    })
    const [errors, setErrors] = useState<Partial<FormData>>({});

    //  Handle form submission
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // parse and validate form data
        const response = formSchema.safeParse(formData);
        console.log(response);
        if (!response.success) {
            const formDataErrors: Partial<FormData> = {};
            response.error.errors.forEach((error) => {
                const name = error.path[0] as keyof FormData;
                formDataErrors[name] = error.message
            })
            setErrors(formDataErrors);
            console.log(errors);
        } else {
            setErrors({});
            
            try {
                const createResponse = await axios.post(RESOURCE_URL, response.data);
                console.log(createResponse.data);
                if (createResponse.status === 201) {
                    const userData = [createResponse.data]
                    addUser(userData);
                    setFormData({
                        name: '',
                        username: '',
                        email: '',
                        address: '',
                        companyName: '',
                        website: '',
                        phone: ''
                    })
                    userCreatedSuccessfully()
                    
                } else {
                    alert('Something went wrong, please try again later')
                    // setTrigger(false);
                }
            } catch (error) {
                console.log(error);
                alert('Something went wrong, please try again later')
                // setTrigger(false);
            }
        }
    }
    return (
        <>
            <ToastContainer />
            <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center px-5">
                <form onSubmit={handleSubmit}>
                    <div className="bg-white p-5 rounded-lg shadow-lg">
                        <h2 className="text-2xl mb-4 font-semibold">Create User</h2>
                        <input
                            type="text"
                            name='name'
                            value={formData.name}
                            onChange={(e) => setFormData({
                                ...formData,
                                name: e.target.value,
                                username: `USER-${e.target.value}` 
                            })}
                            placeholder="Name"
                            className="border rounded p-2 mb-2 w-full"
                        />
                        {errors.name && <p className='text-xs text-red-700 font-semibold'>{errors.name}</p>}
                        <input
                            type="email"
                            name='email'
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="Email"
                            className="border rounded p-2 mb-2 w-full"
                        />
                        {errors.email && <p className='text-xs text-red-700 font-semibold'>{errors.email}</p>}
                        <input
                            type="text"
                            name='address'
                            value={formData.address}
                            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                            placeholder="Address"
                            className="border rounded p-2 mb-2 w-full"
                        />
                        {errors.address && <p className='text-xs text-red-700 font-semibold'>{errors.address}</p>}
                        <input
                            type="text"
                            name='companyName'
                            value={formData.companyName}
                            onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                            placeholder="CompanyName"
                            className="border rounded p-2 mb-2 w-full"
                        />
                        {errors.companyName && <p className='text-xs text-red-700 font-semibold'>{errors.companyName}</p>}
                        <input
                            type="text"
                            name='website'
                            value={formData.website}
                            onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                            placeholder="Website"
                            className="border rounded p-2 mb-2 w-full"
                        />
                        {errors.website && <p className='text-xs text-red-700 font-semibold'>{errors.website}</p>}
                        <input
                            type="text"
                            name='name'
                            value={formData.username}
                            placeholder="Username"
                            className="border rounded p-2 mb-2 w-full"
                        />
                        <input
                            type="text"
                            name='phone'
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            placeholder="Phone"
                            className="border rounded p-2 mb-2 w-full"
                        />
                        {errors.phone && <p className='text-xs text-red-700 font-semibold'>{errors.phone}</p>}
                        {/* Add additional fields here */}
                        <button className="bg-slate-900 text-white p-2 rounded">
                            Submit
                        </button>
                        <button className="bg-red-800 text-white p-2 rounded ml-2" onClick={() => setTrigger(false)}>
                            Cancel
                        </button>
                    </div>
                </form>

            </div>
        </>
    );
};

export default CreateUser;
