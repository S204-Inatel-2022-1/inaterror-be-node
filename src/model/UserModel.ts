import { ResponseType, SightingType, UserType } from "../types";
import UserDAO from "./database/userDAO";

export default class UserModel {
  db = new UserDAO();

  public async checkValidUser(
    name: string,
    pass: string
  ): Promise<ResponseType> {
    const user = await this.db.getUserByLogin({ name, pass });

    const userNotExists = user.length === 0;
    const validUser = name != "" && pass != "";

    const response: ResponseType = {
      message: [],
      result: undefined,
    };

    if (!userNotExists) {
      response.message.push("user already exists");
      response.result = false;
    }

    if (!validUser) {
      response.message.push("name or pass is empty");
      response.result = false;
    }

    if (userNotExists && validUser) {
      response.message.push("valid user");
      response.result = true;
    }

    return response;
  }

  public async postUser(user: UserType): Promise<ResponseType> {
    const { name, pass } = user;

    const validUser = await this.checkValidUser(name, pass);
    console.log("validUser", validUser);
    if (validUser.result) {
      const data = await this.db.createUser(user);

      validUser.data = data;
      return validUser;
    } else {
      return validUser;
    }
  }

  public async getUserByLogin({ name, pass }: UserType): Promise<ResponseType> {
    const response: ResponseType = {
      result: undefined,
      message: [],
    };
    return await this.db
      .getUserByLogin({ name, pass })
      .then((data: any) => {
        data = data[0];
        console.log("data", data);
        if (data === undefined) {
          response.message.push("user not found");
          response.result = false;
        } else {
          const user: UserType = {
            _id: data._id.toString(),
            name: data.name,
            pass: data.pass,
            sighting: data.sighting,
          };
          response.data = user;
          response.result = true;
          response.message.push("user found");
        }
        return response;
      })
      .catch((err: any) => err);
  }

  public async addSighting(
    sighting: SightingType,
    userId: string
  ): Promise<ResponseType> {
    const response: ResponseType = {
      result: undefined,
      message: [],
    };

    await this.db
      .insertSighting(sighting, userId)
      .then((data: any) => {
        response.data = data;
        response.result = true;
        response.message.push("sighting added");
      })
      .catch((err: any) => {
        response.message.push(err);
        response.result = false;
        response.message.push("sighting not added");
      });

    return response;
  }
}
