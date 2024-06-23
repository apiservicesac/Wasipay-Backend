import { ImageEntity } from "@/image_uploader/domain/entities";

export interface ClientLocation {
    latitude?: number;
    longitude?: number;
}

export interface ClientEntity {
    _id?: string;
    name?: string;
    last_name?: string; 
    vat?: string;
    business_name?: number;
    address?: number;
    coordinates?: ClientLocation;
    image?: ImageEntity;
}