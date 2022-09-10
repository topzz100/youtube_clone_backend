import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import morgan from 'morgan'
import { connectDB } from './config/db.js'
import auth from './routes/auth.js'
import user from './routes/user.js'
import video from './routes/video.js'

const app = express()
dotenv.config()
connectDB()
const port = process.env.PORT || 5000;
app.use(express.json())
app.use(morgan('tiny'))

app.use('/api/auth', auth)
app.use('/api/user', user)
app.use('api/video', video)

//error handler
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong"
  return res.status(status).json({
    success: false,
    status,
    message
  })
})

app.listen(port, console.log(`app listening on port ${port}`))