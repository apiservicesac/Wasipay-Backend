export class FileValidatorException extends Error {
    constructor () {
        super("Formato de archivo no valido.")
    }
}