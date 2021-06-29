const { UserDetails, validateUser } = require("../models/userDetails");

async function updateUserSocketId(phone,socketId) {
    let userData = await UserDetails.findOne({ phone: phone });
    userData.socketId = socketId;
    return await userData.save();
}
module.exports = (io) => {
    io.on("connection", (socket) => {
        for (let [id, socket] of io.of("/").sockets) {
            console.log('connected : ' + id + ' , phone : ' + socket.username);
            updateUserSocketId(socket.username,id);
        }
        // // forward the private message to the right recipient
        socket.on("private message", async ({ content, to }) => {
            
            let userData = await UserDetails.findOne({ phone: to });
            to = userData.socketId;
            console.log('to', to);
            socket.to(to).emit("private message", {
                content,
                from: socket.id,
            });
        });

        // notify users upon disconnection
        socket.on("disconnect", () => {
            socket.broadcast.emit("user disconnected22", socket.id);
        });
    });
}