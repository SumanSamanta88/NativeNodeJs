import client from './client';

const sendMessageUrl = '/sendMessage';

const sendPrivateMessage = (data) => client.post(sendMessageUrl,data);

export default {
    sendPrivateMessage
};