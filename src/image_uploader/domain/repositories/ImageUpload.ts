import { ImageEntity as Entity } from "../entities"

export interface ImageUploadRepository {    
    save: (entity: Entity) => Promise<Entity | null>
    delete: (ids: string[]) => Promise<void | null>
}
