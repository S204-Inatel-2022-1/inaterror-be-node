import { expect, test, describe } from "@jest/globals";
import Sighting from "./sighting";

describe("Sighting", () => {
  test("Criando objeto User", () => {
    const name = "Eratos";
    const city = "test";
    const img = "test";
    const rarity = "test";
    const sighting = new Sighting(city, name, img, rarity);
    expect(sighting.city).toBe(city);
    expect(sighting.name).toBe(name);
    expect(sighting.img).toBe(img);
    expect(sighting.rarity).toBe(rarity);
  });
});
