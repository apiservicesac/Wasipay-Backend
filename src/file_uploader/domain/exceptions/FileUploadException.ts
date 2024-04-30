export class FileUploadException extends Error {
    constructor () {
        super("Ocurrio un error al subir el archivo.")
    }
}