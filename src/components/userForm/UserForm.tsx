'use client';
import { IUser } from '@/app/users/types';
import React, { useState } from 'react';

interface IUserForm {
    onSubmit: (formData: IUser) => void;
}

export default function UserForm({ onSubmit }: IUserForm) {
    const [formData, setFormData] = useState<{ name: string; email: string }>({
        name: '',
        email: '',
    });
    const [isValidEmail, setIsValidEmail] = useState(true);

    const validateEmail = (email: string) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        e.stopPropagation();
        console.log('>>> formData', formData);
        setIsValidEmail(validateEmail(formData.email));
        onSubmit({
            address: { city: '' },
            id: '',
            name: formData.name,
            username: '',
            email: formData.email,
            phone: '',
        });
    };

    return (
        <div className="max-w-dvh border-2 border-blue-100 rounded-md p-4">
            <h3>User Form</h3>
            {isValidEmail ? null : (
                <p className="text-red-500">Invalid email address</p>
            )}
            <form onSubmit={handleSubmit}>
                <ul className="flex flex-col gap-2">
                    <li>
                        <label
                            className="block text-sm font-medium text-gray-700"
                            htmlFor="name"
                        >
                            Name:
                        </label>
                        <input
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm bg-red-50 text-black pl-2"
                            onChange={(e) =>
                                setFormData((prev) => ({
                                    ...prev,
                                    name: e.target.value,
                                }))
                            }
                            type="text"
                            id="name"
                            name="name"
                        />
                    </li>
                    <li>
                        <label
                            className="block text-sm font-medium text-gray-700"
                            htmlFor="email"
                        >
                            Email:
                        </label>
                        <input
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm bg-red-50 text-black pl-2"
                            type="text"
                            id="email"
                            name="email"
                            // pattern="^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$"
                            onChange={(e) =>
                                setFormData((prev) => ({
                                    ...prev,
                                    email: e.target.value,
                                }))
                            }
                        />
                    </li>
                </ul>
                <button
                    className="bg-blue-500 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-none mt-2"
                    type="submit"
                >
                    Submit
                </button>
            </form>
        </div>
    );
}
