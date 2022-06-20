"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserModel_1 = __importDefault(require("./model/UserModel"));
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    const model = new UserModel_1.default();
    // Const user: UserType  = {
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
    yield model.db.connect();
    const a = yield model.db.find({
        $and: [
            { name: 'RZkXPX2yjd' },
            { sighting: { $elemMatch: { name: '82mJlUgRWH' } } },
        ],
    });
    console.log('a', a);
    yield model.db.closeConnection();
});
main();
