import { Router, Request, Response } from 'express';

const api = Router();

api.get('/test', (req: Request, res: Response) =>
  res.json({ msg: 'api online!' })
);

api.get('/opreturn/:op_return', async (req: Request, res: Response) => {
  try {
    const { op_return } = req.params;

    return res.json({ op_return });
  } catch (error) {
    console.error(error);
    return res.status(500).send('Ooops, something went wrong there!');
  }
});

export { api as default };
