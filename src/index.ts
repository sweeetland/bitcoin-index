import app from './app'
import db from './database'
import { PORT } from './config/env'
;(async () => {
  try {
    await db.setup()

    app.listen(PORT, () => {
      console.log(`🚀 server started: http://localhost:${PORT}`)
    })
  } catch (error) {
    console.error(error)
  }
})()
