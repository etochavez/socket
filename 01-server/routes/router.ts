import { Request, Response, Router } from "express";

export const router = Router();

router.get("/messages", (req: Request, res: Response) => {
  res.json({
    error: false,
    message: "All its ok"
  });
});

router.post("/messages", (req: Request, res: Response) => {
  const text = req.body.text;
  const from = req.body.from;

  res.json({
    error: false,
    text,
    from,
  });
});

router.post("/messages/:id", (req: Request, res: Response) => {
  const text = req.body.text;
  const from = req.body.from;
  const id = req.params.id;

  res.json({
    error: false,
    text,
    from,
    id,
  });
});
