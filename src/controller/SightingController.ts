import UserModel from "../model/UserModel";
import { SightingType, UserType } from "../types";

export default class SightingController {
  model = new UserModel();

  public async sendSighting(userId: string, sighting: SightingType) {
    await this.model.db.connect();
    const response = await this.model.addSighting(sighting, userId);
    await this.model.db.closeConnection();
    return response;
  }

  public async getSighting({ name, pass }: UserType) {
    await this.model.db.connect();
    const response = await this.model.getUserByLogin({
      name: name,
      pass: pass,
    });
    await this.model.db.closeConnection();
    return response.data.sighting;
  }
}

// async function View() {
//   const lc = new LoginController();

//   const user = await lc.login({ name: "test", pass: "test" });
//   console.log("user", user);
// }

// View();
