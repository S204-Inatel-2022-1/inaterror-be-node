import UserModel from '../model/UserModel';
import {UserType} from '../types';

export default class LoginController {
	model = new UserModel();

	public async login({name, pass}: UserType) {
		await this.model.db.connect();
		const user = await this.model.getUserByLogin({
			name,
			pass,
		});
		console.log('user', user);
		await this.model.db.closeConnection();
		return user;
	}

	public async register({name, pass}: UserType) {
		await this.model.db.connect();
		const user = await this.model.postUser({name, pass});
		await this.model.db.closeConnection();
		return user;
	}
}

// Async function View() {
//   const lc = new LoginController();

//   const user = await lc.login({ name: "test", pass: "test" });
//   console.log("user", user);
// }

// View();
