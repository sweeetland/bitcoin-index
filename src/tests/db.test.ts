import { Connection } from 'typeorm'
import { setupDatabase, shutdownDatabase } from './test-utils/shared'

let connection: Connection

beforeAll(async () => {
  connection = await setupDatabase()
})

afterAll(shutdownDatabase)

test('should connect to database', async () => {
  expect(connection.isConnected).toBe(true)
})
