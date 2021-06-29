import AsyncStorage from '@react-native-async-storage/async-storage';

const storeData = async (key,value) => {
    try {
      if (value) {
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem(key, jsonValue);
      }
    } catch (e) {
      // saving error
    }
  }

  
const getData = async (key) => {
    try {
      let value = await AsyncStorage.getItem(key) || '[]';
      return JSON.parse(value);

    } catch(e) {
      // error reading value
    }
  }
  export default { storeData, getData };