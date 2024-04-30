export enum UserType {
    CUSTOMER = 'CUSTOMER',
    BUSINESS = 'BUSINESS',
}

export interface UserEntity {
    id?: number;
    email?: string;
    password?: string;
    user_type?: UserType;
    createdAt?: Date;
    updatedAt?: Date;
}
