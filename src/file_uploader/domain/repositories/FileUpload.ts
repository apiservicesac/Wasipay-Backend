import { FileEntity as Entity } from "../entities"

export interface FileUploadRepository {
    getAll: () => Promise<Entity[]>
    getById: (id: string) => Promise<Entity | null>
    save: (entity: Entity) => Promise<Entity | null>
    update: (entity: Entity) => Promise<Entity | null>    
    delete: (id: string) => Promise<void | null>
}
