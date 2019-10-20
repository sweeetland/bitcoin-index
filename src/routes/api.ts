import { Router, Request, Response } from 'express'

import { OPReturn } from '../entities/OPReturn'

export const api = Router()

api.get('/test', (req: Request, res: Response) =>
  res.json({ msg: 'api online!' })
)

api.get('/opreturn/:opReturnData', async (req: Request, res: Response) => {
  try {
    const { opReturnData } = req.params

    const query = await OPReturn.find({ body: opReturnData })

    if (query.length === 0) {
      return res.status(404).send(`No match found for : ${opReturnData}`)
    }

    const data = query.map(q => ({
      body: q.body,
      txhash: q.txhash,
      blockhash: q.blockhash
    }))

    return res.json(data)
  } catch (error) {
    console.error(error)
    return res.status(500).send('Ooops, something went wrong there!')
  }
})
