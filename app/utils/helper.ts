import AsyncStorage from '@react-native-async-storage/async-storage';

export const LOCAL_KEYS = {
  AUTH: 'AUTH',
  IS_NEWLY_INSTALLED: 'IS_NEWLY_INSTALLED',
  REMEMBER_ME: 'REMEMBER_ME',
  IS_FIRST_TIME_OPEN: 'IS_FIRST_TIME_OPEN',
};

const setLocalUser = async (value: any) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(LOCAL_KEYS.AUTH, jsonValue);
    console.log('local user set', jsonValue);
  } catch (e: any) {
    throw new Error(e.message);
  }
};


const getLocalUser = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(LOCAL_KEYS.AUTH);
    if (jsonValue === null) return null;
    return JSON.parse(jsonValue);
  } catch (e: any) {
    throw new Error(e?.message);
  }
};

const destroyLocalStorage = async () => {
  try {
    await AsyncStorage.removeItem(LOCAL_KEYS.AUTH);
    await AsyncStorage.removeItem(LOCAL_KEYS.IS_NEWLY_INSTALLED);
  } catch (e: any) {
    throw new Error(e?.message);
  }
};

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

export {setLocalUser, getLocalUser, destroyLocalStorage, getRandomColor};



