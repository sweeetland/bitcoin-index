import db from '../database'

test('should connect to database', async () => {
  const connection = await db.setup()
  expect(connection.isConnected).toBe(true)
})
