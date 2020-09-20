import express, { Request, Response } from 'express'
import { router } from './routes/loginRoutes'
import cookieSession from 'cookie-session'
require('dotenv').config()

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(cookieSession({ keys: ['cookey'] }))
app.use('/', router)

const { PORT } = process.env
app.listen(PORT, () => {
  console.log(`Server UP! listen on PORT : ${PORT}`)
})
