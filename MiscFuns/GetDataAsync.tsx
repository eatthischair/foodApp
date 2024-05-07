import AsyncStorage from '@react-native-async-storage/async-storage';

const GetDataAsync = async dataName => {
  console.log('getdataasync dataname', dataName);
  try {
    const userDataJson = await AsyncStorage.getItem(dataName);
    if (userDataJson !== null) {
      // console.log('revs from async', userDataJson);
      return JSON.parse(userDataJson);
    }
    throw new Error('No local data found');
  } catch (error) {
    console.error('Failed to fetch user data from local storage:', error);
  }
};

export default GetDataAsync;
