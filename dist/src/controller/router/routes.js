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
const express_1 = require("express");
const sightings_1 = __importDefault(require("../database/sightings"));
const user_1 = __importDefault(require("../database/user"));
const userRouter = (0, express_1.Router)();
userRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const db = new user_1.default();
    const name = String(req.query.name);
    const pass = String(req.query.pass);
    const users = yield db.getUser({ name: name, pass: pass });
    res.send(users);
}));
userRouter.post("/create", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const db = new user_1.default();
    const name = String(req.body.name);
    const pass = String(req.body.pass);
    const result = yield db.createUser({ name: name, pass: pass });
    console.log(result);
    if (result == false)
        res.sendStatus(500);
    else
        res.sendStatus(200);
}));
userRouter.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const db = new user_1.default();
    const name = String(req.body.name);
    const pass = String(req.body.pass);
    const aux = yield db.getUser({ name: name, pass: pass });
    if (aux)
        res.sendStatus(200);
    else
        res.sendStatus(401);
}));
userRouter.get("/sightings", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const db = new sightings_1.default();
    const result = yield db.getSightings();
    console.log(result);
    res.send(result);
}));
userRouter.post("/sightings", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const db = new sightings_1.default();
    const lat = String(req.body.lat);
    const lon = String(req.body.lon);
    const time = String(req.body.time);
    const result = yield db.postSightings({ lat, lon, time });
    console.log(result);
    res.send(result);
}));
exports.default = userRouter;
