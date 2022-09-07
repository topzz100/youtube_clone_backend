import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import { connectDB } from './config/db.js'

const app = express()
dotenv.config()
connectDB()
const port = process.env.PORT || 5000


app.listen(port, console.log(`app listening on port ${port}`))