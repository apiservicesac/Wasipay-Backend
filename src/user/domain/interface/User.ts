import { UserRole } from "../enums";

export interface UserInterface {
    id?: string;
    first_name?: string;
    last_name?: string;
    phone_number?: string;
    email?: string;
    login_date?: Date;
    password?: string;
    role?: UserRole;
    shop_id?: string;
    createdAt?: Date;
    updatedAt?: Date;
    
    getId(): string | undefined;
    setId(id: string): void;
    
    getFirstName(): string | undefined;
    setFirstName(firstName: string): void;
    
    getLastName(): string | undefined;
    setLastName(lastName: string): void;
    
    getPhoneNumber(): string | undefined;
    setPhoneNumber(phoneNumber: string): void;
    
    getEmail(): string | undefined;
    setEmail(email: string): void;
    
    getLoginDate(): Date | undefined;
    setLoginDate(loginDate: Date): void;
    
    getPassword(): string | undefined;
    setPassword(password: string): void;
    
    getRole(): UserRole | undefined;
    setRole(role: UserRole): void;

    getShopId(): string | undefined;
    setShopId(shop_id: string): void;
    
    getCreatedAt(): Date | undefined;
    setCreatedAt(createdAt: Date): void;
    
    getUpdatedAt(): Date | undefined;
    setUpdatedAt(updatedAt: Date): void;

}