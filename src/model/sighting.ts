import SightingDAO from '../controller/database/sightingDAO';

export default class Sighting {
    city: string;
    name: string;
    img: string;
    rarity: String;
    sightingDao = new SightingDAO();

    constructor(city: string, name: string, img: string, rarity: String) {
        this.city = city;
        this.name = name;
        this.img = img;
        this.rarity = rarity;
    }
}
