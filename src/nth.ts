import UserModel from "./model/UserModel";
import { SightingType, UserType } from "./types";
import { query } from "express";

const main = async () => {
  const model = new UserModel();

  // const user: UserType  = {
  //   name: "Robertaa",
  //   pass: "monsa450PPaaa",
  // };

  // const sighting: SightingType = {
  //   name: "Monsa",
  //   img: "https://www.dicaspetz.com.br/wp-content/uploads/2019/01/como-cuidar-de-passarinho3.jpg",
  //   rarity: "Common",
  //   type: "Bird",
  //   location: "New York",
  // };

  // await model.db.connect();
  // const response = await model.postUser(user);
  // console.log("response", response);
  // await model.db.closeConnection();
  await model.db.connect();
  const a = await model.db.find({
    $and: [
      { name: "RZkXPX2yjd" },
      { sighting: { $elemMatch: { name: "82mJlUgRWH" } } },
    ],
  });
  console.log("a", a);

  await model.db.closeConnection();
};

main();
