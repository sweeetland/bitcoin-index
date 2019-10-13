# Bitcoin opreturn API using Node.js, Express and Postgresql.

## Project

The purpose of this project is to store and index Bitcoin OP_RETURN data. This data will then be served as JSON on a HTTP endpoint.

The app should have one endpoint:

```
/opreturn/${opReturnData}
```

It should then return the associated transaction hash and block hash. You can use http://coinsecrets.org/ to check your work.

## Rules

A) Use either Node.js v10 or v12
B) You can use ANY 3rd-party npm library
C) You must use Postgres as the database
D) You can use the Bitcoin mainnet or testnet
E) You must use bitcoind

If you're using the mainnet, index higher than the blockheight 500,000. If you're using the testnet only index higher than 1,000,000.

## Setup

First make sure to install Node.js ([here](https://nodejs.org/en/download/)), Postgresql ([here](https://www.postgresql.org/download/)) and Bitcoin Core ([here](https://bitcoin.org/en/download)). Be sure to check the requirements for Bitcoin Core because it is very large! 🧨

Clone the repo and cd into project root

### Environments:

Currently the app supports a development and test environment. Create a dev.env and test.env in src/config

```
touch src/config/dev.env src/config/test.env
```

The env variables to set in each file are:

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
```

### bitcoin.conf:

The RPC env variables declared above must match what is declared here to create a connection to bitcoind.

```
rpcuser=bitcoinuser
rpcpassword=bitcoinpassword

# The address here is the URL where bitcoind will listen for new ZeroMQ connection requests.
zmqpubhashblock=tcp://127.0.0.1:3000
zmqpubhashtx=tcp://127.0.0.1:3000
```

Next install dependancies with:

```
npm install
```

Seed the dev database:

```
npm run seed:db
```

Start the dev server and listen for updates from bitcoind:

```
npm start
```

Run automated tests in the test environment:

```
npm run test
```
