import { Request, Response, Router } from "express";
import { Server } from '../classes/server';
import { conectedUser } from "../sockets/sockets";
import { Graph } from "../classes/graph";

export const router = Router();

const graph = new Graph();

router.get("/graph", (req: Request, res: Response) => {
  res.json(graph.getGraphData());
});

router.get("/graph/bar", (req: Request, res: Response) => {
  res.json(graph.getBarGraphData());
});

router.post("/graph", (req: Request, res: Response) => {
  const month = req.body.month;
  const value = Number(req.body.value);

  graph.changeValueLineGraph(month, value)

  const server = Server.instance;
  server.io.emit('graph-data', graph.getGraphData());

  res.json(graph.getGraphData());
});

router.post("/graph/bar", (req: Request, res: Response) => {
  const index = req.body.index;
  const value = Number(req.body.value);

  graph.changeValueBarGraph(index, value)

  const server = Server.instance;
  server.io.emit('bar-graph-data', graph.getBarGraphData());

  res.json(graph.getBarGraphData());
});

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

router.get("/users/details", (req: Request, res: Response) => {
  conectedUser.getList()
  res.json({
    error: false,
    clienst: conectedUser.getList()
  });
});
