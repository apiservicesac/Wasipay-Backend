export class UserUpdateFailedException extends Error {
    constructor() {
        super("No se pudo actualizar el usuario.")
    }
}
