import * as request from 'supertest'

import app from '../app'
import { setupDatabase, shutdownDatabase, inputData } from './utils/shared'

beforeAll(setupDatabase)

afterAll(shutdownDatabase)

test('GET /api/test - should return ok', async () => {
  await request(app)
    .get('/api/test')
    .expect(200)
})

test('GET /api/opreturn/:opReturnData - should return ok', async () => {
  const res = await request(app)
    .get(`/api/opreturn/${inputData.body}`)
    .expect(200)

  console.log('res.text: ', res.text)

  const output = {
    body: inputData.body,
    txhash: inputData.txhash,
    blockhash: inputData.blockhash
  }

  console.log('output: ', output)

  expect(JSON.parse(res.text)).toMatchObject([output])
})
