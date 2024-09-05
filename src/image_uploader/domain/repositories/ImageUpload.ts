import { ImageEntity as Entity } from "../entities"

export interface ImageUploadRepository {    
    getById: (id: string) => Promise<Entity | null>

    save: (entity: Entity) => Promise<Entity | null>

    delete: (id: string) => Promise<void | null>
}
