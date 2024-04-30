import { NextFunction, Request, Response } from "express"
import { PostgresDBUserRepository } from "../../../implementation/sequelize"
import { UserChangePasswordUseCase, UserResetPasswordUseCase } from "../../../../application/use_cases"
import { transporter } from "../../../../../shared/infrastructure/driven-adapter/nodemailer-conector"
import { User } from "../../../../domain/entities"

export const changePassword = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const userLogin: User = {
            email: req.body.email,
            password: req.body.password,            
        }

        const newPassword = req.body.new_password

        const postgresDBUserRepository = new PostgresDBUserRepository()
    
        const userChangePasswordUseCase = new UserChangePasswordUseCase(postgresDBUserRepository)

        const { userUpdated } = await userChangePasswordUseCase.run(userLogin, newPassword)

        await transporter.sendMail({
            from: 'Mensaje enviado Automáticamente',
            to: userUpdated.email,
            subject: 'Se cambió la contraseña Geoportal Azzorti + Livva',
            html: `
                <div style="text-align: center;">
                    <img style="width: 310px; height: 37px; " src="${process.env.FRONT_LOGIN}/assets/logo_Azzorti-J1UaD77_.png" alt="Logo" />
                    <h1>Hola ${userUpdated.nombres} ${userUpdated.apellidos}</h1>
                    <p>Te informamos que se ha cambiado tu contraseña con éxito.</p>
                    <p>Usuario: ${userUpdated.email}</p>
                    <button><a href="${process.env.FRONT_LOGIN}" style="cursor: pointer;">Inicia Sesión</a></button>
                </div>
            `,
        })

        res.status(200).json({
            status: "success",
            code: 200,
            message: "Contraseña actualizada exitosamente"
        })

    } catch (error) {
        next(error)
    }
}

