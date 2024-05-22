import { FileEntity as Entity } from "@/file_uploader/domain/entities"
import { FileUploadRepository as Repository } from "@/file_uploader/domain/repositories"
import { FileUploader } from "@/file_uploader/domain/services"
import { FileValidator } from "@/file_uploader/domain/services"
import { CreateEntityException } from "@/shared/exceptions"
import { FileUploadException, FileValidatorException } from "@/file_uploader/domain/exceptions"
import { UploadedFile } from "express-fileupload"

// SHOP
import { UpdateFieldUseCase as UpdateFieldUseCaseShop } from "@/shop/application/use_cases"
import { ImplementationMongoose as ImplementationMongooseShop } from "@/shop/infrastructure/implementation/mongoose"
// PRODUCT
import { UpdateFieldUseCase as UpdateFieldUseCaseProduct } from "@/product/application/use_cases"
import { ImplementationMongoose as ImplementationMongooseProduct } from "@/product/infrastructure/implementation/mongoose"

export class SaveUseCase {

    private readonly _repository: Repository
    private readonly _file_validator: FileValidator
    private readonly _file_uploader: FileUploader

    constructor(
        repository: Repository
    ) {
        this._repository = repository
        this._file_validator = new FileValidator()
        this._file_uploader = new FileUploader()
    }

    async run(type: string, id: string, files: UploadedFile | UploadedFile[] | undefined): Promise<Entity[]> {
        
        if(!files) throw new FileUploadException()

        let request_files : UploadedFile[] = []

        if (files instanceof Array) {
            request_files = files;
        } else {
            request_files = [files!];
        }
        
        const entities_response : any = await Promise.all(
            request_files.map(async (file) => {
                const is_file_valid = this._file_validator.run(file)
                if(!is_file_valid) throw new FileValidatorException()
                const file_uploaded : any = await this._file_uploader.upload(file)
                const newEntity : Entity = {
                    name: file_uploaded.file_name,
                    url: file_uploaded.file_path
                }
                const entity: Entity | null = await this._repository.save(newEntity)
                if(entity === null) throw new CreateEntityException()
                return entity
            })  
        )      
        if(type === 'shop') {
            const mongooseRepository = new ImplementationMongooseShop()
            const useCase = new UpdateFieldUseCaseShop(mongooseRepository)
            await useCase.run(id, 'file', entities_response[0]._id)
        }
        if(type === 'product') {
            const mongooseRepository = new ImplementationMongooseProduct()
            const useCase = new UpdateFieldUseCaseProduct(mongooseRepository)
            await useCase.run(id, 'file', entities_response.map((file:any) => file._id))
        }

        return entities_response
    }
}
