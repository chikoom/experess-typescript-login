import express, { Request, Response } from 'express'
require('dotenv').config()

const app = express()

app.get('/', (req: Request, res: Response) => {
  res.send(`
    <div> 
      <h1> Hello Express </h1> 
    </div>
  `)
})

const { PORT } = process.env
app.listen(PORT, () => {
  console.log(`Server UP! listen on PORT : ${PORT}`)
})
