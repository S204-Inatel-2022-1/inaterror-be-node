import { Router, Request, Response, query } from "express";
import SightingsDAO from "../database/sightings";
import UserDAO, { UserType } from "../database/user";

const userRouter = Router();

userRouter.get("/", async (req: Request, res: Response) => {
  const db = new UserDAO();

  const name: string = String(req.query.name);
  const pass: string = String(req.query.pass);

  const users = await db.getUser({ name: name, pass: pass });
  res.send(users);
});

userRouter.post("/create", async (req: Request, res: Response) => {
  const db = new UserDAO();

  const name: string = String(req.body.name);
  const pass: string = String(req.body.pass);

  const result = await db.createUser({ name: name, pass: pass });

  console.log(result);
  if (result == false) 
    res.sendStatus(500);
  else
    res.sendStatus(200);
});

userRouter.post("/login", async (req: Request, res: Response) => {
  const db = new UserDAO();

  const name: string = String(req.body.name);
  const pass: string = String(req.body.pass);

  const aux = await db.getUser({ name: name, pass: pass });

  if (aux) res.sendStatus(200);
  else res.sendStatus(401);
});

userRouter.get("/sightings", async (req: Request, res: Response) => {
  const db = new SightingsDAO();

  const result = await db.getSightings();
  console.log(result);
  res.send(result);
});

userRouter.post("/sightings", async (req: Request, res: Response) => {
  const db = new SightingsDAO();

  const lat: string = String(req.body.lat);
  const lon: string = String(req.body.lon);
  const time: string = String(req.body.time);

  const result = await db.postSightings({ lat, lon, time });
  console.log(result);
  res.send(result);
});

export default userRouter;
