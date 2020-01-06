import express, { Request, Response, NextFunction } from 'express';
import passport from 'passport';
import bcrypt from 'bcrypt';
// model
import { User, UserDocument } from '../models/user';

const router = express.Router();
const CLIENT_HOME_PAGE_URL = "http://localhost:3000";

// when login is successful, retrieve user info
router.get("/login/success", (req: Request, res: Response) => {
  console.log(req.user)
  if (req.user) {
    res.json({
      success: true,
      message: "user has successfully authenticated",
      user: req.user,
      cookies: req.cookies
    });
  }
});

// when login failed, send failed msg
router.get("/login/failed", (req: Request, res: Response) => {
  res.status(401).json({
    success: false,
    message: "user failed to authenticate."
  });
});

// When logout, redirect to client
router.get("/logout", (req: Request, res: Response) => {
  req.logout();
  res.redirect(CLIENT_HOME_PAGE_URL);
});

router.get("/facebook", passport.authenticate("facebook"));
router.get(
  "/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: CLIENT_HOME_PAGE_URL,
    failureRedirect: "/auth/login/failed"
  })
);


router.get('/google', passport.authenticate("google", {
  scope: ["profile", "email"]
}))
router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: CLIENT_HOME_PAGE_URL,
    failureRedirect: "/auth/login/failed"
  })
);


// local Strategy
router.post('/register', function (req: Request, res: Response) {
  const { displayName, username, email, password, password2 } = req.body;
  //確認是否都有值
  req.checkBody("displayName", "姓名未填寫").notEmpty()
  req.checkBody("username", "帳號未填寫").notEmpty()
  req.checkBody("email", "信箱未填寫").notEmpty()
  req.checkBody("password", "密碼未填寫").notEmpty()
  req.checkBody("password2", "密碼不相符合").equals(req.body.password)

  let errors = req.validationErrors();
  // 檢查是否有人用過此帳號
  User.find({ username: username }, function (err, users) {
    if (users.length != 0) {
      if (errors) {
        errors.push({ msg: "此帳號已有人使用" })
      } else {
        errors = [{ msg: "此帳號已有人使用" }]
      }
    }
    if (errors) {
      res.status(500).json({
        errors: errors
      })
    } else {
      const newUser = new User({
        displayName: displayName,
        username: username,
        password: password,
        email: email,
        accountType: "local"
      })

      bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(newUser.password, salt, function (err, hash) {
          if (err) {
            console.log(err);
          }
          newUser.password = hash;
          newUser.save(function (err) {
            if (err) {
              console.log(err);
              return;
            } else {
              res.status(200).json({
                message: "註冊成功"
              })
            }
          });
        });
      })
    }
  })

})

router.post('/login', function (req: Request, res: Response, next: NextFunction) {
  req.checkBody('username', '帳號未填寫').notEmpty();
  req.checkBody('password', '密碼未填寫').notEmpty();
  let errors = req.validationErrors();
  if (errors) {
    res.status(500).json({
      errors: errors
    })
  } else {
    passport.authenticate('local', function (err: Error, user: UserDocument, info) {
      if (err) { return next(err) }
      if (!user) {
        res.status(404).json({ error: "沒有此使用者" })
      }
      req.logIn(user, function (err) {
        if (err) { return next(err) }
        let userData = {
          id: user.id,
          displayName: user.displayName,
          username: user.username,
          email: user.email,
          accountType: user.accountType
        }
        res.status(200).json({ user: userData })
      })
    })(req, res, next);
  }
})

export = router;
