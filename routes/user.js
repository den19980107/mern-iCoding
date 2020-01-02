const router = require("express").Router();
const User = require('../models/user');

router.get('/getUser', function (req, res) {
   if (req.user) {
      User.findById(req.user._id, function (err, user) {
         res.json(user)
      })
   } else {
      res.status(500).json({ message: "尚未登入" })
   }
})

module.exports = router;
