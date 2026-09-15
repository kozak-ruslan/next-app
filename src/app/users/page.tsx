import Link from 'next/link';
import { getClient } from '@/lib/apollo/rsc';

import UserForm from '@/components/userForm/UserForm';
import { GET_USERS } from '@/lib/graphql/queries/user';
import { CREATE_USER } from '@/lib/graphql/mutations/createUser';
import { UserList } from '@/components/User/UserList';

import { IGetUsersData, IUser } from './types';
import { revalidatePath } from 'next/cache';

interface UserProps {
    searchParams: Promise<{
        page: string;
    }>;
}

export default async function User({ searchParams }: UserProps) {
    const awaitedSearchParams = await searchParams;

    const { data: { users } = {} } = await getClient().query<IGetUsersData>({
        query: GET_USERS,
        // variables: {
        //     filter: {
        //         code: {
        //             eq: 'EU',
        //         },
        //     },
        // },
    });

    if (!users?.data || users.data.length === 0) {
        return <div>No users found</div>;
    }
    // console.log('>>> continents', continents[0].countries);
    const page = Number.parseInt(awaitedSearchParams.page) || 1;
    console.log('>>> page', page);
    const step = 5;
    const startIndex = (page - 1) * step;
    const endIndex = page * step;
    const pageUsers = users.data.slice(startIndex, endIndex);

    const handleCreateUser = async (formData: IUser) => {
        'use server';
        try {
            const { data } = await getClient().mutate({
                mutation: CREATE_USER,
                variables: {
                    input: formData,
                },
            });
            console.log('User created:', data);
            revalidatePath('/users');
        } catch (error) {
            console.error('Error creating user:', error);
        }
    };

    return (
        <>
            <h3>Users</h3>
            <UserForm onSubmit={handleCreateUser} />
            <UserList users={pageUsers} />

            <Link
                href={`/users?${new URLSearchParams({ page: (page + 1).toString() }).toString()}`}
            >
                Next Page
            </Link>
        </>
    );
}
