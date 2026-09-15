'use client'
import { IUser } from '@/app/users/types';

import { List } from '@/components/ui/List/List';

export const UserList = ({ users }: { users: IUser[] }) => {
    const listItems = users.map((user) => ({
        key: user.id,
        name: user.name,
        link: `/users/${user.id}`,
        desc: <ul className="text-sm text-gray-400">
            <li>Email: {user.email}</li>
            <li>Username: {user.username}</li>
            <li>City: {user.address.city}</li>
            <li>Phone: {user.phone}</li>
        </ul>,
    }));

    return <>
        <h2 className='text-lg text-red-500 text-center'>Users list</h2>
        <List list={listItems} />
        </>
}
