const { Expo } = require('expo-server-sdk');
const jwt = require('jsonwebtoken');
const _ = require("lodash");
const express = require("express");
const bcrypt = require('bcrypt');
const router = express.Router();

const createResponse = require("../httpRequestResponse/response");
const { UserDetails, validateUser, Contact } = require("../models/userDetails");
const auth = require("../middleware/auth");

router.post("/signup", async (req, res) => {
  try {

    const { error } = validateUser(req.body);
    if (error) return res.send(createResponse(400, error.details[0].message));

    let userData = await UserDetails.findOne({ phone: req.body.phone });
    if (userData) return res.send(createResponse(400, 'User already registered'));

    let userDetails = new UserDetails({
      phone: req.body.phone,
      password: req.body.password,
    });

    const salt = await bcrypt.genSalt(10);  // to do set it in some environment variable
    userDetails.password = await bcrypt.hash(userDetails.password, salt);
    await userDetails.validate();

    userDetails = await userDetails.save();

    userData = await UserDetails.findOne({ phone: req.body.phone });
    const jwtToken = userData.generateAuthToken();

    res.send(createResponse(200, "Successfully registered the user", jwtToken));

  } catch (ex) {
    res.send(createResponse(400, ex.message));
  }
});
router.post("/auth", async (req, res) => {
  try {
    const { error } = validateUser(req.body);
    if (error) return res.send(createResponse(400, error.details[0].message));

    let userData = await UserDetails.findOne({ phone: req.body.phone });
    if (!userData) return res.send(createResponse(400, 'Invalid username or password'));

    const validPassword = await bcrypt.compare(req.body.password, userData.password);
    if (!validPassword) res.send(createResponse(400, 'Invalid username or password'));

    const jwtToken = userData.generateAuthToken();
    res.send(createResponse(200, "Login successful", jwtToken));

  } catch (ex) {
    res.send(createResponse(400, ex.message));
  }
});

router.post("/pushToken", auth, async (req, res) => {
  try {
    let userData = await UserDetails.findOne({ phone: req.user.phone });

    userData.pushToken = req.body.pushToken.data;
    const user = await userData.save();
    userData = await UserDetails.findOne({ phone: req.user.phone });

    const jwtToken = userData.generateAuthToken();
    res.send(createResponse(200, "Successfully updated Push token", jwtToken));
  } catch (ex) {
    res.send(createResponse(400, ex.message));
  }
});

/// req = { toPerson : phoneNumber , message :  'Helloss'}
router.post("/sendMessage", auth, async (req, res) => {
  try {
    console.log('test');

    let receiverData = await UserDetails.findOne({ phone: req.body.toPerson });
    console.log('toPerson', req.body.toPerson, req.body.message);
    const receiverPushToken = receiverData.pushToken;

    let test = await UserDetails.find({ "contacts.phone": req.user.phone });
    console.log('check', test);
    let messages = [];
    let expo = new Expo({ accessToken: process.env.EXPO_ACCESS_TOKEN });
    messages.push({
      to: receiverPushToken,
      sound: 'default',
      title: 'From Suman Jio',
      body: req.body.message,
      data: { _displayInForeground: true },
    });
    let chunks = expo.chunkPushNotifications(messages);
    console.log('chunks', chunks);
    let tickets = [];
    (async () => {
      for (let chunk of chunks) {
        try {
          let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
          console.log(ticketChunk);
          tickets.push(...ticketChunk);
        } catch (error) {
          console.error(error);
        }
      }
    })();
    res.send(createResponse(200, "Successfully sent the message", {}));
  } catch (ex) {
    res.send(createResponse(400, ex.message));
  }
});
router.post("/updateContacts", auth, async (req, res) => {
  try {

    let userData = await UserDetails.findOne({ phone: req.user.phone.toString() });
    let contacts = req.body.contacts;
    let userContacts = [];
    let userContactCache = [];
    for (let contactIndex = 0; contactIndex < contacts.length; contactIndex++) {
      let contact = contacts[contactIndex];
      for (let contactPhIndex = 0; contactPhIndex < contact.phoneNumbers.length; contactPhIndex++) {
        let phoneNumber = contact.phoneNumbers[contactPhIndex];
        let contactUser = await UserDetails.findOne({ phone: phoneNumber });
        if (contactUser) {
          if (contacts[contactIndex].phoneNumbers[contactPhIndex] != req.user.phone) {
            let userContact = { isUser: true, phone: phoneNumber, dp: '', name: contacts[contactIndex].name };
            userContacts.push(new Contact(userContact));
            userContact['pushToken'] = contactUser.pushToken;
            userContact['id'] = userContactCache.length;
            userContactCache.push(userContact)
          }
        }
      }
    }
    userData.contacts = userContacts;
    const user = await userData.save();

    res.send(createResponse(200, "Successfully updated Contacts", user.contacts.toObject()));
  } catch (ex) {
    console.log('Exception:>', ex.message);
    res.send(createResponse(400, ex.message));
  }
});
module.exports = router;
