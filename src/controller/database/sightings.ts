import mongoose from "mongoose";
import global from "../../../global";

export type SightingsType = {
  lat: string;
  lon: string;
  time: string;
};

export default class SightingsDAO {
  sightingsSchema: mongoose.Schema<
    any,
    mongoose.Model<any, any, any, any>,
    any,
    any
  >;
  SightingsModel: any;

  constructor() {
    const connectionString: string = global.connectionString;

    mongoose.connect(connectionString);
    this.sightingsSchema = new mongoose.Schema({
      lat: "string",
      lon: "string",
      time: "string",
    });

    if (mongoose.models.sightings) {
      this.SightingsModel = mongoose.model("sightings");
    } else {
      this.SightingsModel = mongoose.model("sightings", this.sightingsSchema);
    }
  }

  public async getSightings() {
    const result = await this.SightingsModel.find({});
    if (result.length === 0) {
      return false;
    }
    return result;
  }

  public async createSightings({ lat, lon, time }: SightingsType) {
    const sightings = new this.SightingsModel({ lat: lat, lon: lon, time: time });

    sightings.save(function (err: any) {
      if (err) {
        console.log(err.data);
        return false;
      }
      console.log(true);
      return true;
    });
  }
}
