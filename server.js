'use strict'
const express = require('express')
import routes from '../backend/src/routes'
const swaggerJSDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')
const dotenv = require('dotenv')

dotenv.config({ path: '.env' })

const app = express()
const port = process.env.PORT || 3000
const host = '0.0.0.0';
const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Supermercado SQ',
            version: '1.0.0',
            description: "Documentação para utilização da API \"Supermercado SQ\"."
        },
        host: `http://localhost:${port}`,
        basepath: '/',
        tags: [
            {
                name: 'usuarios',
                description: 'Tudo sobre nossos usuários'
            },
            {
                name: 'produtos',
                description: 'Tudo sobre nossos produtos'
            },
            {
                name: 'comentarios',
                description: 'Tudo sobre os comentários realizados no site'
            },
        ],
        schemes: 
        - 'http'
    },
    apis: ['./src/**/*-routes.js']
}
const swaggerDocs = swaggerJSDoc(swaggerOptions)
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))


app.use(express.json())

app.use('/', routes)

app.listen(port, host, () => {
    console.log('Server running on port 3000')
})
