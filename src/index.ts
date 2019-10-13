import app from './app';
import { port } from './config/env';

app.listen(port, () => {
  console.log(`🚀 server started: http://localhost:${port}`);
});
