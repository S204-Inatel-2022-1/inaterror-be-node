import User from "../model/UserModel";

export default class LoginController {
  user = new User();

}

async function View() {
  const lc = new LoginController();

}

// View();
