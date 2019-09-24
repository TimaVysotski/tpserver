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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const models_1 = __importStar(require("./models"));
const session_handler_1 = require("./handlers/session-handler");
const passport_handler_1 = require("./handlers/passport-handler");
const user_1 = require("./seeds/user");
const cookieParser_handler_1 = require("./handlers/cookieParser-handler");
const auth_1 = require("./routes/auth");
const frontpage_1 = require("./routes/frontpage");
const body_parser_1 = __importDefault(require("body-parser"));
dotenv_1.default.config();
const app = express_1.default();
const eraseDatabaseOnSync = true;
// bodyParserHandler.init(app);
// app.use(bodyParser.urlencoded({
//     extended: true
//   }));
app.use(body_parser_1.default.json());
cookieParser_handler_1.cookieParserHandler.init(app);
session_handler_1.sessionHandler.init(app);
passport_handler_1.passportHandler.init(app);
models_1.connectDB().then(() => __awaiter(void 0, void 0, void 0, function* () {
    if (eraseDatabaseOnSync) {
        yield Promise.all([
            models_1.default.User.deleteMany({}),
            models_1.default.Post.deleteMany({})
        ]);
        user_1.createUserWithMessages();
    }
    app.listen(process.env.PORT, () => {
        console.log(`Server running on port :${process.env.PORT}`);
        console.log("DATABASE_URL : " + process.env.DATABASE_URL);
    });
})).catch(error => console.log(error));
app.get('/', frontpage_1.frontPage.get);
app.post("/login", auth_1.login.post);
app.post("/logout", auth_1.logout.post);
