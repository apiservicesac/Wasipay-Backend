export interface AddressEntity {
    _id?: string;
    customer_id?: string;
    street?: string;
    city?: string;
    state?: string;
    postal_code?: string;
    coordinates?: Coordinates;
    country?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

interface Coordinates {
    latitude: number,
    longitude: number
}