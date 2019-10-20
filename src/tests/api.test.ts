import * as request from 'supertest'

import { app } from '../app'
import { setupDatabase, shutdownDatabase } from './test-utils/shared'
import { OPReturn } from '../entities/OPReturn'

const inputData = {
  body: 'testestestestest',
  txhash: 'txhashtxhashtxhash',
  blockhash: 'blockhashblockhashblockhash',
  blockheight: 1
}

beforeAll(async () => {
  await setupDatabase()
  OPReturn.insert(inputData)
})

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

  const output = {
    body: inputData.body,
    txhash: inputData.txhash,
    blockhash: inputData.blockhash
  }

  expect(JSON.parse(res.text)).toMatchObject([output])
})
