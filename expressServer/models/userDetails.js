const mongoose = require("mongoose");
const Joi = require("@hapi/joi");
const jwt = require('jsonwebtoken');
const _ = require('underscore');
// joi passwordcomplexity
const contactSchema = new mongoose.Schema({
  name: String,
  phone: String,
  dp: String,
  isUser: Boolean
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
  contacts: [contactSchema],
  image : String
});
userSchema.methods.generateAuthToken = function () {
  const user = _.omit(this._doc, 'password');
  const jwtToken = jwt.sign(user, 'jwtPrivateKey'); // to store this key in environment variable
  return jwtToken;
};
const UserDetails = mongoose.model("UserDetails", userSchema);
const Contact = mongoose.model("Contact", contactSchema);

function validateUserDetails(data) {
  const schema = Joi.object({
    phone: Joi.string().min(10).max(12).required(),
    socketId: Joi.any().optional(),
    pushToken: Joi.any().optional(),
    password: Joi.string()
      .min(5)
      .max(1024)
      .required()
      .pattern(
        new RegExp(
          "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
        )
      )
      .message(
        "Your password must contain at least one uppercase letter,at least one lowercase letter, at least one number digit, atlest one special character "
      ),
  });
  return schema.validate(data);
}
exports.UserDetails = UserDetails;
exports.validateUser = validateUserDetails;
exports.Contact = Contact;
