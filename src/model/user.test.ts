import User from "./user";
import { expect, test, describe, beforeAll } from "@jest/globals";
import Sighting from "./sighting";

describe("User", () => {
  test("Criando objeto User", () => {
    const name = "Bruno";
    const pass = "bruno123";
    const user = new User(name, pass);
    expect(user.name).toBe(name);
  });

  test("Adicionando Sighting no User", () => {
    const name = "Bruno";
    const pass = "bruno123";
    const user = new User(name, pass);
    const sighting = new Sighting("test", "test", "test", "test");

    user.addSighting(sighting);

    const sightingString = JSON.stringify(user.getSightings());
    expect(sightingString).toBe('[{"city":"test","name":"test","img":"test","rarity":"test"}]');
  });
});
