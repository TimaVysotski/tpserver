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
const passport_1 = __importDefault(require("../libs/passport"));
exports.login = {
    post: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        yield passport_1.default.authenticate('local', (err, user, info) => __awaiter(void 0, void 0, void 0, function* () {
            console.log(user);
            if (err) {
                throw err;
            }
            if (user) {
                req.logIn(user, (error) => {
                    if (error) {
                        console.error("error = ", error);
                    }
                });
                // res.send("Console error")
                res.send({ username: user.username, gender: user.gender });
            }
            else {
                res.status(401);
                res.send(info);
            }
        }))(req, res, next);
    }),
};
exports.logout = {
    post: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        req.logOut();
        res.send("Log Out is done!!!");
    })
};
