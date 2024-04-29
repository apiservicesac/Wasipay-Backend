import swaggerUi from 'swagger-ui-express'
import swaggerJSDoc from 'swagger-jsdoc'
import { Router } from 'express'

const swaggerDocV1 = Router()

const options = {
  definition: {
    openapi: '3.0.0',
    info: { title: 'API BACKEND LOGIN', version: '1.0.0' },
  },
  apis: [
    'src/user/infrastructure/driving-adapter/api-rest/routes/user.routes.ts',
  ]
  
}
const swaggerSpec = swaggerJSDoc(options)

swaggerDocV1.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
swaggerDocV1.use('/api/v1/docs.json', (_, res) => {
  res.setHeader('Content-Type', 'application/json')
  res.send(swaggerSpec)

})

export default swaggerDocV1