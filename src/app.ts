import express from "express"
import cors from "cors"
import bodyParser from "body-parser"
import cookieParser from 'cookie-parser'
import session from 'express-session'
import { router } from "./routes"
import { SECRET_ACCESS_TOKEN } from './config'

const app = express()

declare global {
  namespace Express {
    interface Request {
      user?: Record<string,any>
    }
  }
 }

app.use(bodyParser.json())

app.use(cookieParser())

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}))

app.use(session({
  secret: SECRET_ACCESS_TOKEN,
  resave: false,
  saveUninitialized: true,
}))

app.use(router)

app.use('/uploads', express.static('uploads'))

app.listen(4000, () => {
  console.log("Server is running on port 4000")
})
