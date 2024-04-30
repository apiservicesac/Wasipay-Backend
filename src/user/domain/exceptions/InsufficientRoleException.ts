export class InsufficientRoleException extends Error {
    constructor () {
        super("Esta acción requiere permisos de Administrador")
    }
}