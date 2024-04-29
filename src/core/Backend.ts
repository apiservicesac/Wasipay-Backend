import { Server } from './Server'

export class Backend {
    server?: Server

    async start (): Promise<void> {
        const host: string = process.env.HOST_JS || '0.0.0.0' 
        const port: number = parseInt(process.env.PORT_JS!) || parseInt('4500')
        this.server = new Server(host, port)
        return await this.server.listen()
    }

    async stop (): Promise<void> {
        return await this.server?.stop()
    }

}