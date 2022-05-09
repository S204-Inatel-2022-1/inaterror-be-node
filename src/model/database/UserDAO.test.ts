import { expect, test, describe } from "@jest/globals";
import UserDAO from "./userDAO";

function randomString(length: number) {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

describe("SightingDAO", () => {
  test("Postando Usuario no Banco de dados ", async () => {
    const name = randomString(10);
    const pass = randomString(10);
  
    const userDAO = new UserDAO();
    await userDAO.connect();
    const aux = await userDAO.createUser({ name: name, pass: pass });

    const result = await userDAO.getUserByLogin({ name: aux.name, pass: aux.pass });
    await userDAO.closeConnection();

    expect(result[0].name).toBe(name);
    expect(result[0].pass).toBe(pass);
  });
});
