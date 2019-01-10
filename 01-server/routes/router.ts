import { Request, Response, Router } from "express";
import { Server } from '../classes/server';

export const router = Router();

router.get("/messages", (req: Request, res: Response) => {
  res.json({
    error: false,
    message: "All its ok!!"
  });
});

router.post("/messages", (req: Request, res: Response) => {
  const text = req.body.text;
  const from = req.body.from;

  const payload = {from, text};

  const server = Server.instance;
  server.io.emit('new-message', payload);

  res.json({
    error: false,
    text,
    from
  });
});

router.post("/messages/:id", (req: Request, res: Response) => {
  const text = req.body.text;
  const from = req.body.from;
  const id = req.params.id;

  const payload = {from, text};

  const server = Server.instance;
  server.io.in(id).emit('private-message', payload);

  res.json({
    error: false,
    text,
    from,
    id
  });
});


router.get("/users", (req: Request, res: Response) => {
  const server = Server.instance;
  server.io.clients( (err: any, clients: string) => {
    if (err) {
      return res.json({
        error: true,
        message: err
      });
    }

    res.json({
      error: false,
      clients
    });
  });
});
