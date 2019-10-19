# Bitcoin OP_RETURN API with Node.js, Express and Postgresql.

## Project

The purpose of this project is to store and index Bitcoin OP_RETURN data. This data will then be served as JSON on a HTTP endpoint.

The app should have one endpoint:

```
/opreturn/${opReturnData}
```

It should then return the associated transaction hash and block hash. You can use http://coinsecrets.org/ to check your work.

## Rules

- A) Use either Node.js v10 or v12
- B) You can use ANY 3rd-party npm library
- C) You must use Postgres as the database
- D) You can use the Bitcoin mainnet or testnet
- E) You must use bitcoind

If you're using the mainnet, index higher than the blockheight 500,000. If you're using the testnet only index higher than 1,000,000.

## Setup

First make sure to install Node.js v12 ([here](https://nodejs.org/en/download/)), Postgresql v11 ([here](https://www.postgresql.org/download/)) and Bitcoin Core ([here](https://bitcoin.org/en/download)). Be sure to check the requirements for Bitcoin Core because it is very large! 🧨

Clone the repo and cd into project root.

Currently the app supports a development and test environment. Before you start you will need to setup environment variables for each environment. Create a dev.env and test.env in src/config

```
touch src/config/dev.env src/config/test.env
```

The env variables to set in each file should be pretty straightforward and are listed below.

```
NODE_ENV=development || test
PORT=4000

RPC_USERNAME=
RPC_PASSWORD=
RPC_PORT=18332

DB_USER=
DB_NAME=
DB_PORT=5432

ZMQ_URL=tcp://127.0.0.1:3000

BLOCKHEIGHT_INDEX=1000000
```

Bitcoin Core is the primary software for the Bitcoin protocol. Our Node server needs to be able to communicate with bitcoind to seed the database and to listen for new blocks. Fortunately, Bitcoin has a RPC API which will allow us to do this.

The RPC env variables declared above must match what is declared here to create a connection to bitcoind. Your bitcoin.conf should look somethhing like this.

```
rpcuser=bitcoinuser
rpcpassword=bitcoinpassword
tindex=1

# The address here is the URL where bitcoind will listen for new ZeroMQ connection requests.
zmqpubhashblock=tcp://127.0.0.1:3000
zmqpubhashtx=tcp://127.0.0.1:3000
```

Once you have changed your bitcoin.conf file. Restart bitcoind and then you should be ready to install the dependancies.

```
npm install
```

It's always a good idea to test.
```
npm run test
```

These tests will verify that your connections are setup correctly and that bitcoind is fully synced with tindex enabled.

Once all tests are passing you should be ready to seed the database, go away and do something else, it will take a while (~8 hours / 32 million records at the time of writing this)...

```
npm run db:seed
```

While seeding the database we also listen for new blocks. When the database has been seeded we can create the index

```
npm run db:migrate
```

When the database has finished seeding the server will start automatically. But if you would like to start the server manually you can run.

```
npm start
```
