import mongoose from "mongoose";
import global from "../../../global";

export type UserType = {
  name: string;
  pass: string;
};

export default class UserDAO {
  userSchema: mongoose.Schema<
    any,
    mongoose.Model<any, any, any, any>,
    any,
    any
  >;
  User: any;

  constructor() {
    const connectionString: string = global.connectionString;

    mongoose.connect(connectionString);
    this.userSchema = new mongoose.Schema({ name: "string", pass: "string" });

    if (mongoose.models.user) {
      this.User = mongoose.model("user");
    } else {
      this.User = mongoose.model("user", this.userSchema);
    }
  }

  public async getUser({ name, pass }: UserType) {
    const result = await this.User.find({ name: name, pass: pass });
    if (result.length === 0) {
      return false;
    }
    return true;
  }

  public async createUser({ name, pass }: UserType) {
    const user = new this.User({ name: name, pass: pass });

    if(name != "" || pass!= "") {
      
      user.save(function (err: any) {
        if (err) {
          console.log(err.data);
          return false;
        }
        console.log(true);
        return true;
      });
    } else {
      return false;
    }

  }
}
