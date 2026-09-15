'use client';
import React, { useState } from 'react';

export default function UserForm() {
    const [formData, setFormData] = useState<{ name: string; email: string }>({ name: '', email: '' });
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
    }

    return (
        <div>
            <h3>User Form</h3>
            {isValidEmail ? null : <p style={{ color: 'red' }}>Invalid email address</p>}
            <form
                onSubmit={handleSubmit}
            >
                <ul>
                    <li>
                        <label htmlFor="name">Name:</label>
                        <input
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
                        <label htmlFor="email">Email:</label>
                        <input
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
                    type="submit"
                >
                    Submit
                </button>
            </form>
        </div>
    );
}
