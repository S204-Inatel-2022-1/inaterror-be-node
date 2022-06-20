import {
	Router, Request, Response,
} from 'express';
import LoginController from '../controller/LoginController';
import SightingController from '../controller/SightingController';
import OrbDAO from './../model/Orb';
import axios from 'axios';
const userRouter = Router(); // eslint-disable-line

userRouter.post('/login', async (req: Request, res: Response) => {
	const controller = new LoginController();

	const name: string = String(req.body.name);
	const pass: string = String(req.body.pass);

	const users = await controller.login({name, pass});

	if (users) {
		res.send(users);
	} else {
		res.sendStatus(401);
	}
});

userRouter.post('/create', async (req: Request, res: Response) => {
	const controller = new LoginController();

	const name: string = String(req.body.name);
	const pass: string = String(req.body.pass);

	const result = await controller.register({name, pass});

	console.log(result);
	if (result) {
		res.send(result);
	} else {
		res.sendStatus(500);
	}
});

userRouter.post('/sightings', async (req: Request, res: Response) => {
	const controller = new SightingController();
	const userId: string = String(req.body.userId);
	const {sighting} = req.body;
	const result = await controller.sendSighting(userId, sighting);
	console.log(result);
	res.send(result);
});

userRouter.get('/sightings', async (req: Request, res: Response) => {
	const controller = new SightingController();
	const name: string = String(req.body.name);
	const pass: string = String(req.body.pass);

	const result = await controller.getSighting({name, pass});

	res.send(result);
});

userRouter.post('/orb', async (req: Request, res: Response) => {
	const orbDAO = new OrbDAO();
	await axios.get(`https://inaterror-api.herokuapp.com/api/info/${req.body.geo}/ghost`).then( async (resp: any)  => {
		
		await orbDAO.connect();
		console.log(resp.data);
		const result = await orbDAO.createOrb({
			nome: resp.data.Nome,
			tipo: resp.data.Tipo,
			localização: resp.data.Localização,
			raridade: resp.data.Raridade,
			id: resp.data.Id,
			invert: resp.data.Invert,
		});
	});
	res.send('result');
});

userRouter.get('/orb', async (req: Request, res: Response) => {
	const orbDAO = new OrbDAO();
	await orbDAO.connect();
	const result = await orbDAO.getOrb();

	res.send(result);
});

export default userRouter;
