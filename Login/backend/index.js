const express = require("express");
const cors = require("cors");

require("./db/config");
const User = require("./db/user");


const app = express();

app.use(express.json());
app.use(cors());
app.post("/register", async (req, res) => {
  let user = new User(req.body);
  let result = await user.save();
  result = result.toObject();
  delete result.password;
  // console.log(result);-
  res.send(result);
});

app.post("/login", async (req, res) => {
  let user = await User.findOne(req.body).select("-password");
  if (req.body.email && req.body.password) {
    if (user) {
      res.send(user);
    } else {
      res.send("user not found");
    }
  } else {
    res.send("user not found");
  }

  // if(user){
  //     res.send(user);
  // }else{
  //     res.send("user not found");
  // }
});





app.listen(8000);
