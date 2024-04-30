import express from 'express'
import cors from 'cors'
import * as http from 'http'
import routes_v1 from './routes/v1'
import { error } from 'console'
import swaggerDocV1 from './swagger/swagger'
import { logger,log4js } from '@/shared/utils/Logger'
import fileUpload from 'express-fileupload'

export class Server {
    
    private readonly _port: number
    private readonly _host: string
    private readonly _app: express.Express
    private _httpServer?: http.Server

    constructor (host : string, port: number) {
        this._host = host
        this._port = port
        this._app = express()
        
        const corsOptions = {
            origin: process.env.HOST_FRONT,
            optionsSuccessStatus: 200
        };

        this._app.use(cors(corsOptions)) 
        
        this._app.use(fileUpload({
            limits: { fileSize: 50 * 1024 * 1024 },
        }));

        this._app.use((_req : any, _res : any, next : any) => {
            next();
        });

        this._app.use(express.json())
        this._app.use(express.urlencoded({ extended : false }))
        this._app.use(routes_v1)

        this._app.use(swaggerDocV1)
        this._app.use(log4js.connectLogger(logger, { level: 'auto' }))
        this._app.use(log4js.connectLogger(logger, { level: 'auto', format: ':method :url' }))

    }

    async listen (): Promise<void> {
            
        return await new Promise(resolve => {
            this._httpServer = this._app.listen(this._port, this._host, () => {

                logger.info(`Backend App iniciado en http://localhost:${this._port}`)
            
                logger.info(
                    `Version 1 Docs disponible en http://${this._host}:${this._port}/api/v1/docs`
                )
                logger.info(' Presione CTRL-C para detener\n')

                resolve()
            })
        })
    }

    async stop (): Promise<void> {
        return await new Promise((resolve, reject) => {
            if ( this._httpServer != null ) {
                if( error != null ) {
                    return reject(error)
                }
                return resolve()
            }

            resolve()
        })
    }
}
