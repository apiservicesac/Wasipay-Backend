import dotenv from 'dotenv'
import { Backend } from '@/core/Backend'

try {
    dotenv.config({
        path: '../.env'
    })
    new Backend().start()
}catch (error) {
    console.log(error)
}