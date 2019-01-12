import { Request, Response, Router } from "express";
import { Server } from '../classes/server';
import { conectedUser } from "../sockets/sockets";
import { Graph } from "../classes/graph";
import { Map } from '../classes/map';
import { TicketArrayRepository } from "../repositories/ticketArrayRepository";
import { TicketEscritorioArrayRepository } from "../repositories/ticketEscritorioArrayRepository";

export const router = Router();

//#region colas
// Tickets
const ticketRepository =  TicketArrayRepository.instance;
const ticketEscritorioRepository = TicketEscritorioArrayRepository.instance;

router.get("/currentTicket", (req: Request, res: Response) => {
  let ticket: number; 
  try{
    ticket = ticketRepository.last();
  } catch(e) {
    return res.json({
      error: true,
      message: e
    });
  }
  res.json({error: false, ticket});
});

router.get("/newTicket", (req: Request, res: Response) => {
  let ticket: number; 
  try{
    ticket = ticketRepository.add();
  } catch(e) {
    return res.json({
      error: true,
      message: e
    });
  }

  const server = Server.instance;
  server.io.emit('last-ticket', ticketRepository.last());
  res.json({error: false, ticket});
});

router.get("/ticketsEscritorios", (req: Request, res: Response) => {
  let ticketsEscritorios; 
  try{
    ticketsEscritorios = ticketEscritorioRepository.getAll();
  } catch(e) {
    return res.json({
      error: true,
      message: e
    });
  }
  res.json({error: false, ticketsEscritorios});
});

router.post("/nextClient", (req: Request, res: Response) => {
  const escritorio = Number(req.body.escritorio);

  let ticket;
  let ticketEscritorio;
  try{
    ticket = ticketRepository.del();
    ticketEscritorio = ticketEscritorioRepository.add(ticket, escritorio);
  } catch(e) {
    return res.json({
      error: true,
      message: e
    });
  }

  const server = Server.instance;
  server.io.emit('update-attend-tickets', ticketEscritorioRepository.getAll());
  console.log(ticketEscritorioRepository.getAll());
  res.json({error: false, ticket});


});

//#endregion colas

//#region Map
// Maps
export const map = new Map();
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
//#endregion map

//#region Graph
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
//#endregion Graph

//#region message
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
//#endregion message
