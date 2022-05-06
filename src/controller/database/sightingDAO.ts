import mongoose from "mongoose";
import global from "../../../global";

export type SightingType = {
  city: string;
  name: string;
  img: string;
  rarity: String;
};

export default class SightingDAO {
  sightingsSchema:
    | mongoose.Schema<any, mongoose.Model<any, any, any, any>, any, any>
    | undefined;
  SightingsModel: any | undefined;

  public async connect() {
    const connectionString: string = await global.connectionString;

    await mongoose.connect(connectionString);
    this.sightingsSchema = new mongoose.Schema({
      city: "string",
      name: "string",
      img: "string",
      rarity: "String",
    });

    if (mongoose.models.sightings) {
      this.SightingsModel = mongoose.model("sightings");
    } else {
      this.SightingsModel = mongoose.model("sightings", this.sightingsSchema);
    }
  }

  public async closeConnection() {
    await mongoose.connection.close();
  }

  public async getSightings() {
    const result = await this.SightingsModel.find({});
    if (result.length === 0) {
      return false;
    }
    return result;
  }

  public async getSighting(id: string) {
    const result = await this.SightingsModel.findById(id);
    if (result === null) {
      return false;
    }
    return result;
  }

  public async createSightings({ city, name, img, rarity }: SightingType) {
    const sightings = await new this.SightingsModel({
      city: city,
      name: name,
      img: img,
      rarity: rarity,
    });

    const result = await sightings.save((err: any, result: any) => {
      if (err) {
        console.log(err.data);
        return { status: false, message: "Erro ao criar o registro" };
      }
      console.log({
        status: true,
        message: "Registro criado com sucesso",
        result,
      });
      return { status: true, message: "Registro criado com sucesso", result };
    });

    return result;
  }
}
