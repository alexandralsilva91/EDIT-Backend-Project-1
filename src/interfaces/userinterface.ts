
export enum Role {
    ADMIN = 'Administrator',
    USER = 'User'
}

export interface IUser {
    id: string,
    name: string,
    email: string,
    password: string,
    roles: Role
}