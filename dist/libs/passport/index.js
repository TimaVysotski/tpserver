"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const passport_local_1 = __importDefault(require("passport-local"));
const user_1 = __importDefault(require("../../models/user"));
const LocalStrategy = passport_local_1.default.Strategy;
passport_1.default.serializeUser((user, done) => {
    done(null, user.id);
});
passport_1.default.deserializeUser((id, done) => {
    user_1.default.findById(id, (err, user) => {
        if (err) {
            done(err);
        }
        else {
            done(null, user);
        }
    });
});
passport_1.default.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
}, (username, password, done) => {
    user_1.default.findOne({ username: username }, (err, user) => {
        if (err) {
            done(err);
        }
        if (user) {
            if (password === user.password) {
                done(null, user);
            }
            else {
                done(null, false, { message: 'Incorrect password.' });
                done(null, false, { message: 'Incorect username.' });
            }
        }
    });
}));
exports.default = passport_1.default;
// user.findOne({ username: username},(err, user) => {
//     return err ? done(err) : user 
//     ? password === user.password 
//     ? done(null, user)
//     : done(null, false, {message: 'Incorrect password.'})
//     : done(null, false, {message: 'Incorect username.'})
// });
