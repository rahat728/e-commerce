// backend/server.js
import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import userRouter from './routes/userRoute.js'
import productRouter from './routes/productRoute.js'
import cartRouter from './routes/cartRoute.js'
import orderRouter from './routes/orderRoutes.js'

const app = express()
app.use(express.json())
app.use(cors())

// Lazy one-time init so cold starts connect once per container
let initialized = false
async function ensureInit() {
  if (!initialized) {
    await Promise.all([connectDB(), connectCloudinary()])
    initialized = true
  }
}

// Ensure init before handling routes
app.use(async (req, res, next) => {
  try {
    await ensureInit()
    next()
  } catch (err) {
    console.error('Init error:', err)
    res.status(500).json({ error: 'Initialization failed' })
  }
})

// API routes
app.use('/api/user', userRouter)
app.use('/api/product', productRouter)
app.use('/api/cart', cartRouter)
app.use('/api/order', orderRouter)

app.get('/', (req, res) => {
  res.send('API Working')
})

// Export a handler for Vercel
export default (req, res) => app(req, res)

// Optional: run locally with `node server.js` or `nodemon`
// Vercel sets VERCEL=1 in its runtime
const port = process.env.PORT || 4000
if (process.env.VERCEL !== '1') {
  app.listen(port, () => console.log('Server started on PORT:', port))
}