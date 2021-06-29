import AsyncStorage from '@react-native-async-storage/async-storage';

const storeContacts = async (key,value) => {
    try {
      if (value) {
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem(key, jsonValue);
      }
    } catch (e) {
      // saving error
    }
  }

  
const getContacts = async (key) => {
    try {
      let value = await AsyncStorage.getItem(key) || '[]';
      return JSON.parse(value);

    } catch(e) {
      // error reading value
    }
  }
  export default { storeContacts, getContacts };