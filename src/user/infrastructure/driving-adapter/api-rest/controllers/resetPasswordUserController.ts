import { NextFunction, Request, Response } from "express"
import { PostgresDBUserRepository } from "../../../implementation/sequelize"
import { UserResetPasswordUseCase } from "../../../../application/use_cases"
import { transporter } from "../../../../../shared/infrastructure/driven-adapter/nodemailer-conector"
import { User } from "../../../../domain/entities"

export const resetPassword = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const userEmail = req.params.email

        const postgresDBUserRepository = new PostgresDBUserRepository()
    
        const userResetPasswordUseCase = new UserResetPasswordUseCase(postgresDBUserRepository)

        const { userUpdated, generatePassword } = await userResetPasswordUseCase.run(userEmail)

        await transporter.sendMail({
            from: 'Mensaje enviado Automáticamente',
            to: userEmail,
            subject: 'Recuperación de contraseña Geoportal Azzorti + Livva',
            html: `
                <div style="text-align: center;">
                <img style="width: 310px; height: 37px; " src="${process.env.FRONT_LOGIN}/assets/logo_Azzorti-J1UaD77_.png" alt="Logo" />
                    <h1>Hola ${userUpdated.nombres} ${userUpdated.apellidos}</h1>
                    <p>Recibimos una solicitud para restablecer tu contraseña.</p>
                    <p>Usuario: ${userEmail}</p>
                    <p>Tu nueva contraseña es: <strong>${generatePassword}</strong></p>
                    <button><a href="${process.env.FRONT_LOGIN}" style="cursor: pointer;">Inicia Sesión</a></button>
                </div>
                `,
        })
        
        const { password, ...userMapped } = userUpdated

        res.status(200).json({
            status: "success",
            code: 200,
            message: "Contraseña restablecida exitosamente",
            data: {
                user: userMapped as User
            }
        })

    } catch (error) {
        next(error)
    }
}

