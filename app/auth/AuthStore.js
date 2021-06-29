import * as SecureStore from 'expo-secure-store';

const key = 'jwtToken';

const storeToken = async (value) => { 
    try {
        await SecureStore.setItemAsync(key, value);
    } catch (error) {
        console.log('Error storing token', error);
    }
};

const getToken= async ()=> {
    try {
        return await SecureStore.getItemAsync(key);
    } catch (error) {
        console.log('Error getting token', error);
    }
}
const removeToken = async () => {
    try {
        await SecureStore.deleteItemAsync(key);
    } catch (error) {
        console.log('Error deleting token', error);
    }
}

export default { storeToken, getToken, removeToken };