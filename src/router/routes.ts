import { Router, Request, Response, query } from "express";
import LoginController from "../controller/LoginController";
import { SightingType } from "../types";
import SightingController from './../controller/SightingController';

const userRouter = Router();

userRouter.post("/login", async (req: Request, res: Response) => {
  const controller = new LoginController();

  const name: string = String(req.body.name);
  const pass: string = String(req.body.pass);

  const users = await controller.login({ name: name, pass: pass });

  if (users) {
    res.send(users);
  } else {
    res.sendStatus(401);
  }
});

userRouter.post("/create", async (req: Request, res: Response) => {
  const controller = new LoginController();

  const name: string = String(req.body.name);
  const pass: string = String(req.body.pass);

  const result = await controller.register({ name: name, pass: pass });

  console.log(result);
  if (result) res.send(result);
  else res.sendStatus(500);
});

userRouter.post("/sightings", async (req: Request, res: Response) => {
  const controller = new SightingController()
  const userId: string = String(req.body.userId);
  const sighting: SightingType = req.body.sighting;
  const result = await controller.sendSighting(userId, sighting);
  console.log(result);
  res.send(result);
});

userRouter.get("/sightings", async (req: Request, res: Response) => {
  const controller = new SightingController()
  const name: string = String(req.body.name);
  const pass: string = String(req.body.pass);


  const result = await controller.getSighting({ name: name, pass: pass });

  res.send(result);
  
});

export default userRouter;
