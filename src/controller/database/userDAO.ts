import mongoose from "mongoose";
import { mainModule } from "process";
import global from "../../../global";

export type UserType = {
  name: string;
  pass: string;
};

export default class UserDAO {
  userSchema:
    | mongoose.Schema<any, mongoose.Model<any, any, any, any>, any, any>
    | undefined;

  UserModel: any;

  public async connect() {
    const connectionString: string = global.connectionString;

    await mongoose.connect(connectionString);
    this.userSchema = new mongoose.Schema({ name: "string", pass: "string" });

    if (mongoose.models.user) {
      this.UserModel = mongoose.model("user");
    } else {
      this.UserModel = mongoose.model("user", this.userSchema);
    }
  }

  public async closeConnection() {
    await mongoose.connection.close();
  }

  public async getUser({ name, pass }: UserType) {
    const result = await this.UserModel.find({ name: name, pass: pass }).then(
      (user: any) => user
    );
    return result;
  }

  public async createUser({ name, pass }: UserType) {
    const user = await new this.UserModel({ name: name, pass: pass });

    if (name != "" && pass != "") {
      return await user
        .save()
        .then((user: any) => user)
        .catch((err: any) => err);
    } else {
      return false;
    }
  }
}
