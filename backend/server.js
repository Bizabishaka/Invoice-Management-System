import app from './src/app.js'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('DB connected')
    app.listen(5000, () => console.log('API running on :5000'))
  })
