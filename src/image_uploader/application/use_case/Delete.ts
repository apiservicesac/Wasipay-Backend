import { ImageUploadRepository as Repository } from "@/image_uploader/domain/repositories"

export class DeleteUseCase {

    private readonly _repository: Repository

    constructor(
        repository: Repository
    ) {
        this._repository = repository
    }

    async run(ids: string[]): Promise<void> {        
        await this._repository.delete(ids)        
    }
}
