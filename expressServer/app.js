const express = require("express");
const auth = require("./middleware/auth");
const app = express();
const mongoose = require("mongoose");
const httpServer = require("http").createServer(app);
const io = require("socket.io")(httpServer, {
  // cors: {
  //   origin: "http://localhost:8080",
  // },
});

const user = require("./routes/user");

/* connect to db*/
mongoose
  .connect("mongodb://localhost/db9")
  .then(() => {
    console.log("Connected to DB ShonoGolpo");
  })
  .catch((err) => {
    console.log("Could not connect to MongoDB ShonoGolpo : ", err.message);
  });

/* express.js middlewares */

app.use('/images' , express.static('images')); 
app.use(express.json());

app.use("/api/user", user);

/* Socket middlewares*/
io.use((socket, next) => {
  const username = socket.handshake.auth.username;
  if (!username) {
    return next(new Error("invalid username"));
  }
  socket.username = username;
  next();
});
require('./scoketroutes/socket')(io)
/* Start > Before socket introduction */ 
const port = app.get("PORT") || 5000;
// app.listen(port, () => {
//   console.log(`Listenig to port ${port}`);
// });
/* < End */
/* Only for socket - but works for APIs as well*/
httpServer.listen(5000, () => console.log('socker server running on 5000'))

