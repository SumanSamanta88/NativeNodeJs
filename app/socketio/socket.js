import  io  from "socket.io-client";

const URL = "http://192.168.1.8:5000";
const socket = io(URL, { autoConnect: true });

socket.onAny((event, ...args) => {
  console.log(event, args);
});

export default socket;