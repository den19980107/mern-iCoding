import { Strategy as FacebookStrategy } from 'passport-facebook'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import { Strategy as LocalStrategy } from 'passport-local'
import bcrypt from 'bcrypt';
import keys from './keys';
import { User, UserDocument } from '../models/user';

module.exports = function (passport) {
  // serialize the user.id to save in the cookie session
  // so the browser will remember the user when login
  passport.serializeUser((user: UserDocument, done) => {
    done(null, user.id);
  });

  // deserialize the cookieUserId to user in the database
  passport.deserializeUser((id: string, done) => {
    User.findById(id)
      .then(user => {
        done(null, user);
      })
      .catch(e => {
        done(new Error("Failed to deserialize an user"));
      });
  });

  // Facebook Strategy
  passport.use(new FacebookStrategy({
    clientID: keys.FACEBOOK.clientID,
    clientSecret: keys.FACEBOOK.clientSecret,
    callbackURL: "/auth/facebook/callback",
    profileFields: ['id', 'email', 'gender', 'link', 'locale', 'name', 'timezone', 'updated_time', 'verified']
  }, async (accessToken, refreshToken, profile, done) => {
    let userData = { ...profile }
    const currentUser = await User.findOne({
      accountId: userData.id
    });

    if (!currentUser) {
      const newUser = await new User({
        accountId: userData._json.id,
        username: userData._json.displayName ? userData._json.displayName : userData._json.id,
        email: userData._json.email ? userData._json.email : null,
        accountType: "facebook"
      }).save();
      if (newUser) {
        done(null, newUser);
      }
    } else {
      return done(null, currentUser)
    }
  }))


  // Google Strategy
  passport.use(new GoogleStrategy({
    clientID: keys.GOOGLE.clientID,
    clientSecret: keys.GOOGLE.clientSecret,
    callbackURL: "/auth/google/callback",
    scope: [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email'
    ]
  }, async (accessToken, refreshToken, profile, done) => {
    let userData = { ...profile }
    const currentUser = await User.findOne({
      accountId: userData.id
    });

    if (!currentUser) {
      const newUser = await new User({
        accountId: userData.id,
        username: userData._json.name ? userData._json.name : userData.id,
        email: userData._json.email ? userData._json.email : null,
        accountType: "google"
      }).save();
      if (newUser) {
        done(null, newUser);
      }
    } else {
      return done(null, currentUser)
    }
  }))


  // Local Strategy
  passport.use(new LocalStrategy(function (username, password, done) {
    console.log("local")
    let query = {
      username: username
    }
    User.findOne(query, function (err, user) {
      if (err) console.log(err)
      if (!user) {
        return done(null, false, {
          message: "找不到使用者"
        })
      }

      // 檢驗是否匹配
      bcrypt.compare(password, user.password, function (err, isMatch) {
        if (err) console.log(err)
        if (isMatch) {
          return done(null, user)
        } else {
          return done(null, false, {
            message: "密碼錯誤"
          })
        }
      })

    })
  }))
}