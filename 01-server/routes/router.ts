import { Request, Response, Router } from "express";

export const router = Router();

router.get("/messages", (req: Request, res: Response) => {
  res.json({
    error: false,
    message: "All its ok"
  });
});

router.post("/messages", (req: Request, res: Response) => {
  res.json({
    error: false,
    message: "POST ready"
  });
});
