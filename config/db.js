import mongoose from 'mongoose'
import colors from 'colors/safe.js'

export const connectDB = async() => {
  const conn = await mongoose.connect(process.env.MONGO_URI)
  console.log(colors.cyan.underline(`mongoDB connected: ${conn.connection.host}`))
}