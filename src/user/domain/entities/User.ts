import { UserRole } from "../enums";

export interface UserEntity {
    id?: string;
    first_name?: string;
    last_name?: string;
    phone_number?: string;
    email?: string;
    password?: string;
    role?: UserRole;
    shopid?: string;
    createdAt?: Date;
    updatedAt?: Date;

}