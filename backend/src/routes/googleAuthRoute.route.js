const router = require("express").Router();
const passport = require("passport");
const jwt = require("jsonwebtoken")
const CLIENT_URL = "http://localhost:3000/";
const db = require("../models");
const User = db.user;
router.get("/login/success", async (req, res) => {
  if (req.user) {
    const mail = req.user.emails[0].value;
    var user = await User.findOne({ username:mail });
    if (!user) {
        let findId= await User.aggregate([{$sort:{id:-1}}, {$limit:1}])
        var id = 1;
        if (findId.length != 0){
            id = findId[0].id+1;
        }
        const data=await new User({
            id: id,
            username: mail,
            role:"user",
            password: "",
          }).save();
          user = await User.findOne({ username:mail });
    }
    const secretKey = process.env.SECRET_JWT || "";
    const token = jwt.sign({ user_id: user._id.toString(), role: user.role.toString() }, secretKey);
    const url=CLIENT_URL+"login/google"
    console.log("[GET] login with google")
    res.status(200).json({
      jwt: token,
    });
  }
});

router.get("/login/failed", (req, res) => {
  res.status(401).json({
    success: false,
    message: "failure",
  });
});

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect(CLIENT_URL);
});

router.get("/google", passport.authenticate("google", { scope: ["profile","email"] }));


// router.get(
//   "/google/callback",
//   passport.authenticate("google", {
//     successRedirect: CLIENT_URL,
//     failureRedirect: "/login/failed",
//   })
// );
router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/login', failureMessage: true }),
  async function(req, res) {
    // const mail = req.user.emails[0].value;

    // var user = await User.findOne({ username:mail });
    // if (!user) {
    //     let findId= await User.aggregate([{$sort:{id:-1}}, {$limit:1}])
    //     var id = 1;
    //     if (findId.length != 0){
    //         id = findId[0].id+1;
    //     }
    //     const data=await new User({
    //         id: id,
    //         username: mail,
    //         role:"user",
    //         password: "",
    //       }).save();
    //       user = await User.findOne({ username:mail });
    // }
    // const secretKey = process.env.SECRET_JWT || "";
    // const token = jwt.sign({ user_id: user._id.toString(), role: user.role.toString() }, secretKey);
    // //const url=CLIENT_URL+"login/"+token
    const url=CLIENT_URL+"login/google";
    console.log("[GET] google login callback");
    res.redirect(url);
  });


module.exports = router