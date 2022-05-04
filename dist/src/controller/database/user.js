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
class UserDAO {
    constructor() {
        const connectionString = global_1.default.connectionString;
        mongoose_1.default.connect(connectionString);
        this.userSchema = new mongoose_1.default.Schema({ name: "string", pass: "string" });
        if (mongoose_1.default.models.user) {
            this.User = mongoose_1.default.model("user");
        }
        else {
            this.User = mongoose_1.default.model("user", this.userSchema);
        }
    }
    getUser({ name, pass }) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.User.find({ name: name, pass: pass });
            if (result.length === 0) {
                return false;
            }
            return true;
        });
    }
    createUser({ name, pass }) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = new this.User({ name: name, pass: pass });
            if (name != "" && pass != "") {
                user.save(function (err) {
                    if (err) {
                        console.log(err.data);
                        return false;
                    }
                    console.log(true);
                    return true;
                });
            }
            else {
                return false;
            }
        });
    }
}
exports.default = UserDAO;
