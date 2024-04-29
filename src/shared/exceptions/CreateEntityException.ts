export class CreateEntityException extends Error {
    constructor () {
        super("Error al crear el registro")
    }
}