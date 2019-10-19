import { createConnection, Connection } from 'typeorm'
import * as zmq from 'zeromq'

import { NODE_ENV, ZMQ_URL } from '../config/env'
import bitcoin from '../services/bitcoin'
import findOPReturns from '../utils/findOPReturns'
import { Block } from '../types/bitcoin'
import OPReturn from '../entities/OPReturn'

class DB {
  setup = async (): Promise<Connection> => {
    const connection = await createConnection()

    console.log('connected to db: ', connection.options.database)

    if (NODE_ENV !== 'test') this.syncWithBitcoind()

    return connection
  }

  private syncWithBitcoind = async (): Promise<void> => {
    try {
      const socket = zmq.socket('sub')

      socket.connect(ZMQ_URL)

      socket.subscribe('hashblock')

      console.log('listening for updates from bitcoind...')

      socket.on('message', async (topic, message) => {
        const messageType = topic.toString()
        const hash = message.toString('hex')

        if (messageType === 'hashblock') {
          console.log('message received: new block')
          const block: Block = await bitcoin('getblock', [hash, 2])

          let opReturns: OPReturn[] = []
          opReturns = findOPReturns(block, opReturns)

          await OPReturn.save(opReturns)
        }
      })
    } catch (error) {
      console.error(error)
    }
  }
}

export default new DB()
