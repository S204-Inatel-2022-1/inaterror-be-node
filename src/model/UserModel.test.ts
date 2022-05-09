import UserModel from "./UserModel";
import { expect, test, describe, beforeAll } from "@jest/globals";
import { SightingType, UserType } from "../types";
import { ObjectId } from "mongodb";

function randomString(length: number) {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

describe("Testes UserModel", () => {
  test("Inserindo usuario no banco de dados", async () => {
    const model = new UserModel();

    const user: UserType = {
      name: randomString(10),
      pass: randomString(10),
    };
    await model.db.connect();
    const response = await model.postUser(user);
    await model.db.closeConnection();

    expect(response.result).toBe(true);
    expect(response.message).toBe("valid user");
  });

  test("Inserindo aparição dentro do usuario", async () => {
    const model = new UserModel();

    const user: UserType = {
      name: randomString(10),
      pass: randomString(10),
    };
    await model.db.connect();
    const response = await model.postUser(user);
    const userId = response.data._id;

    const sighting: SightingType = {
      name: randomString(10),
      img: randomString(10),
      rarity: randomString(10),
      type: randomString(10),
      location: randomString(10),
    };

    await model.addSighting(sighting, userId);

    const queryResponse = await model.db.find({
      $and: [
        { _id: new ObjectId(userId) },
        {
          sighting: {
            $elemMatch: {
              name: sighting.name,
              img: sighting.img,
              rarity: sighting.rarity,
              type: sighting.type,
              location: sighting.location,
            },
          },
        },
      ],
    });
    expect(queryResponse.length).toBe(1);
    expect(queryResponse[0].sighting[0].name).toBe(sighting.name);
    expect(queryResponse[0].sighting[0].img).toBe(sighting.img);
    expect(queryResponse[0].sighting[0].rarity).toBe(sighting.rarity);
    expect(queryResponse[0].sighting[0].type).toBe(sighting.type);
    expect(queryResponse[0].sighting[0].location).toBe(sighting.location);
    await model.db.closeConnection();
  });
});
