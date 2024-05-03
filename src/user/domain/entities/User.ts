import { UserRole } from "../enums";
import { UserInterface as Interface } from "../interface";

export class UserEntity implements Interface {
    private _id?: string;
    private _first_name?: string;
    private _last_name?: string;
    private _phone_number?: string;
    private _email?: string;
    private _login_date?: Date;
    private _password?: string;
    private _role?: UserRole;
    private _createdAt?: Date;
    private _updatedAt?: Date;

    constructor(data?: Partial<Interface>) {
        this._id = data?.id || '';
        this._first_name = data?.first_name || '';
        this._last_name = data?.last_name || '';
        this._phone_number = data?.phone_number || '';
        this._email = data?.email || '';
        this._login_date = data?.login_date;
        this._password = data?.password || '';
        this._role = data?.role! || '';
        this._createdAt = data?.createdAt;
        this._updatedAt = data?.updatedAt;
    }
    
    getId(): string | undefined {
        return this._id;
    }

    setId(id: string): void {
        this._id = id;
    }

    getFirstName(): string | undefined {
        return this._first_name;
    }

    setFirstName(firstName: string): void {
        this._first_name = firstName;
    }

    getLastName(): string | undefined {
        return this._last_name;
    }

    setLastName(lastName: string): void {
        this._last_name = lastName;
    }

    getPhoneNumber(): string | undefined {
        return this._phone_number;
    }

    setPhoneNumber(phoneNumber: string): void {
        this._phone_number = phoneNumber;
    }

    getEmail(): string | undefined {
        return this._email;
    }

    setEmail(email: string): void {
        this._email = email;
    }

    getLoginDate(): Date | undefined {
        return this._login_date;
    }

    setLoginDate(loginDate: Date): void {
        this._login_date = loginDate;
    }

    getPassword(): string | undefined {
        return this._password;
    }

    setPassword(password: string): void {
        this._password = password;
    }

    getRole(): UserRole | undefined {
        return this._role;
    }

    setRole(role: UserRole): void {
        this._role = role;
    }

    getCreatedAt(): Date | undefined {
        return this._createdAt;
    }

    setCreatedAt(createdAt: Date): void {
        this._createdAt = createdAt;
    }

    getUpdatedAt(): Date | undefined {
        return this._updatedAt;
    }

    setUpdatedAt(updatedAt: Date): void {
        this._updatedAt = updatedAt;
    }

}
