import Sighting from "./sighting";
import UserDAO from "../controller/database/userDAO";

export default class User {
  name: string;
  private pass: string;
  sightings = new Array<Sighting>();
  userDAO = new UserDAO();

  constructor(name: string, pass: string) {
    this.name = name;
    this.pass = pass;
  }

  public addSighting(sighting: Sighting) {
    this.sightings.push(sighting);
  }

  public getSightings() {
    return this.sightings.map((sighting) => {
      return {
        "city": sighting.city,
        "name": sighting.name,
        "img": sighting.img,
        "rarity": sighting.rarity
      };
    });
  }
}
