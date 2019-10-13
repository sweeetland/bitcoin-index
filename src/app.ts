// app instance is separate from index for testing purposes (supertest)

import * as express from 'express';

const app = express();

app.get('/', (req, res) => {
  res.send('Hello world!');
});

export { app as default };
