import { FileEntity as Entity } from "@/file_uploader/domain/entities"
import { FileUploadRepository as Repository } from "@/file_uploader/domain/repositories"
import { FileUploader } from "@/file_uploader/domain/services"
import { FileValidator } from "@/file_uploader/domain/services"
import { CreateEntityException } from "@/shared/exceptions"
import { FileUploadException, FileValidatorException } from "@/file_uploader/domain/exceptions"
import { UploadedFile } from "express-fileupload"

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

    async run(files: UploadedFile | UploadedFile[] | undefined, tableName: string, fid: string): Promise<boolean> {
        
        if(!files) throw new FileUploadException()

        let request_files : UploadedFile[] = []

        if (files instanceof Array) {
            request_files = files;
        } else {
            request_files = [files!];
        }
        

        const files_uploaded = Promise.all(
            request_files.map(async (file) => {
                const is_file_valid = this._file_validator.run(file)
    
                if(!is_file_valid) throw new FileValidatorException()
    
                const file_uploaded : any = await this._file_uploader.upload(file)                       
                return file_uploaded
            })
        )

        files_uploaded.then(async (results : string[]) => {
            console.log(results)
            const entity: boolean = await this._repository.save(results, tableName, fid)

            if(!entity) throw new CreateEntityException()
        })
        

        return true
    }
}
