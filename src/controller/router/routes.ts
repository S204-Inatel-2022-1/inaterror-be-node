import { Router, Request, Response, query } from "express";
import SightingsDAO from "../database/sightings";
import UserDAO, { UserType } from "../database/user";

const userRouter = Router();

userRouter.get("/", async (req: Request, res: Response) => {
  const db = new UserDAO();

  const user: string = String(req.query.user);
  const pass: string = String(req.query.pass);

  const users = await db.getUser({ name: user, pass: pass });
  res.send(users);
});

userRouter.post("/create", async (req: Request, res: Response) => {
  const db = new UserDAO();

  const user: string = String(req.body.user);
  const pass: string = String(req.body.pass);

  const result = await db.createUser({ name: user, pass: pass });
  res.send(result);
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
