import { FileEntity as Entity } from "../entities"

export interface FileUploadRepository {
    getAll: () => Promise<Entity[]>
    getById: (id: string) => Promise<Entity | null>
    save: (urls: string[], tableName: string, fid: string) => Promise<boolean>
    update: (entity: Entity) => Promise<Entity | null>    
    delete: (id: string) => Promise<void | null>
}
