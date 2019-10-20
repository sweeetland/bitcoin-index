import 'reflect-metadata'
import * as express from 'express'
import * as compression from 'compression'
import * as morgan from 'morgan'

import { api } from './routes/api'

export const app = express()

app.use('/api', api)
app.use(compression())
app.use(morgan('short'))
