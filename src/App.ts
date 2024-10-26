import { Backend } from '@/core/Backend'

try {
    process.loadEnvFile()
    new Backend().start()
}catch (error) {
    console.log(error)
}