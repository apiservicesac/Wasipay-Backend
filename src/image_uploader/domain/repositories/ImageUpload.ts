import { ImageEntity as Entity } from "../entities"

export interface ImageUploadRepository {    
    getById: (id: string) => Promise<Entity | null>

    save: (entity: Entity) => Promise<Entity | null>

    delete: (ids: string[]) => Promise<void | null>
}
