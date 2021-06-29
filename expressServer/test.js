const mongoose = require("mongoose");

const Joi = require("@hapi/joi");
const jwt = require('jsonwebtoken');
const _ = require('underscore');

mongoose
  .connect("mongodb://localhost/db9")
  .then(() => {
    console.log("Connected to DB ShonoGolpo");
  })
  .catch((err) => {
    console.log("Could not connect to MongoDB ShonoGolpo : ", err.message);
  });

const userSchema = new mongoose.Schema({
  phone: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 12,
    required: true,
  },
  password: {
    type: String,
    minlength: 5,
    maxlength: 255,
    required: true,
  },
  socketId: {
    type: String,
  },
  socketIdUpdateTime: {
    type: Date
  },
  pushToken: {
    type: String
  },
 
});
userSchema.methods.generateAuthToken = function () {
  const user = _.omit(this._doc, 'password');
  const jwtToken = jwt.sign(user, 'jwtPrivateKey'); // to store this key in environment variable
  return jwtToken;
};
let UserDetails = mongoose.model('UserDetails', userSchema);
async function getData() {
    var data = await UserDetails.findOne({phone : '8885322732'});
    console.log(data.password);

}
getData();