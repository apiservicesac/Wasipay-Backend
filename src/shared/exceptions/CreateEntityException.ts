export class CreateEntityException extends Error {
    constructor (message: string = "Error al crear el registro") {
        super(message)
    }
}