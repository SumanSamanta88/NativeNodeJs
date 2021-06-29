import io from 'socket.io-client';

const sendMessageEvent = 'Send Message';
let socket = io('http://192.168.1.8:5000');
const sendChat= (chatMessage) => {
    let socketClient = io('http://192.168.1.8:5000');
    socketClient.emit(sendMessageEvent,chatMessage);
    return;
}

const joinChat = (phone) => {
    let socketClient = io('http://192.168.1.8:5000');
    socketClient.emit('Join',{phone : phone});
    return;
}

export default { sendChat , joinChat , socket}; 