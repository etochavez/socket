import { Request, Response, Router } from "express";
import { Server } from '../classes/server';
import { conectedUser } from "../sockets/sockets";
import { Graph } from "../classes/graph";
import { Map } from '../classes/map';

export const router = Router();

const map = new Map();
const places = [
  {
    id: '1',
    name: 'Udemy',
    lat: 37.784679,
    lng: -122.395936
  },
  {
    id: '2',
    name: 'Bahía de San Francisco',
    lat: 37.798933,
    lng: -122.377732
  },
  {
    id: '3',
    name: 'The Palace Hotel',
    lat: 37.788578,
    lng: -122.401745
  }
];

// inseta en el push cada elemento por separado
map.bookmarkers.push(...places);

router.get("/markers", (req: Request, res: Response) => {
  res.json(map.getBookmarkers());
});


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
