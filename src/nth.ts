import SightingsDAO from "./controller/database/sightings";
import * as dotenv from 'dotenv';
dotenv.config();
const db = new SightingsDAO();

db.postSightings({ lat: "xsax", lon: "saxcas", time: "saxas" });


