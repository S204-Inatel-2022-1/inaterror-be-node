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
const mongoose_1 = __importDefault(require("mongoose"));
const global_1 = __importDefault(require("../../../global"));
class SightingsDAO {
    constructor() {
        const connectionString = global_1.default.connectionString;
        mongoose_1.default.connect(connectionString);
        this.sightingsSchema = new mongoose_1.default.Schema({
            lat: "string",
            lon: "string",
            time: "string",
        });
        if (mongoose_1.default.models.sightings) {
            this.Sightings = mongoose_1.default.model("sightings");
        }
        else {
            this.Sightings = mongoose_1.default.model("sightings", this.sightingsSchema);
        }
    }
    getSightings() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.Sightings.find({});
            if (result.length === 0) {
                return false;
            }
            return result;
        });
    }
    postSightings({ lat, lon, time }) {
        return __awaiter(this, void 0, void 0, function* () {
            const sightings = new this.Sightings({ lat: lat, lon: lon, time: time });
            sightings.save(function (err) {
                if (err) {
                    console.log(err.data);
                    return false;
                }
                console.log(true);
                return true;
            });
        });
    }
}
exports.default = SightingsDAO;
