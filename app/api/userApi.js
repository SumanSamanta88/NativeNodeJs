import client from './client';

const registerUserUrl = '/signup';
const authUrl = '/auth';
const pushTokenUrl = '/pushToken';
const updateContactsUrl = '/updateContacts';

const registerUser = (data) => client.post(registerUserUrl,data);
const authUser = (data) => client.post(authUrl,data);
const pushToken = (data) => client.post(pushTokenUrl,data);
const updateContacts = (data) => client.post(updateContactsUrl,data);


export default {
    registerUser,
    authUser,
    pushToken,
    updateContacts
};