export interface IUser {
    id: string;
    name: string;
    username: string;
    email: string;
    address: {
        city: string;
    };
    phone: string;
}

export interface IGetUsersData {
    users: {
        data: IUser[];
    };
}
