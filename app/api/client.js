import {create} from 'apisauce';
import AuthStore from '../auth/AuthStore';

const client = create({
    baseURL :  'http://192.168.1.8:5000/api/user'
})

client.addAsyncRequestTransform(async (request) => {
    const authToken = await AuthStore.getToken();
    if (!authToken) return;
    request.headers["x-auth-token"] = authToken;
  });
export default client;