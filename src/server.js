import express from 'express'
import morgan from 'morgan'

const app = express()
app.disable('x-powered-by')
// Adding morgan for logging
// tiny format: :method :url :status :res[content-length] - :response-time ms
app.use(morgan('tiny'))

// Get the port from process variable or use default one
const PORT = process.env.PORT || 2000

/**
 * Starts express server
 */
export default function startServer() {
  try {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`)
    })
  } catch (e) {
    console.log(e)
  }
}
