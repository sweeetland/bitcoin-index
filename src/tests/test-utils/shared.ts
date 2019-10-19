import { Connection } from 'typeorm'

import OPReturn from '../../entities/OPReturn'
import db from '../../database'

let connection: Connection

export const setupDatabase = async () => {
  connection = await db.setup()
  await OPReturn.clear()
  return connection
}

export const shutdownDatabase = async () => await connection.close()
