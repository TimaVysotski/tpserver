import passport from "passport";
import passportLocal from "passport-local";

import user, { IUser } from "../../models/user";

const LocalStrategy = passportLocal.Strategy;

passport.serializeUser((user: IUser, done) => {
    done(null, user.id);
});
  
  
passport.deserializeUser((id, done) => {
    user.findById(id, (err,user) => {
        if (err) { 
            done(err)
        } else {
            done(null,user);
        }    
    });
});

passport.use(
    new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password',
    },(username, password, done) => {
        user.findOne({ username: username},(err, user) => {
            if (err) { 
                done(err)
            } 
            if (user) {
                if(password === user.password){
                    done(null, user)
                } else {
                    done(null, false, {message: 'Incorrect password.'})
                    done(null, false, {message: 'Incorect username.'})
                }
            } 
        });
    }
));

export default passport;


// user.findOne({ username: username},(err, user) => {
        //     return err ? done(err) : user 
        //     ? password === user.password 
        //     ? done(null, user)
        //     : done(null, false, {message: 'Incorrect password.'})
        //     : done(null, false, {message: 'Incorect username.'})
        // });