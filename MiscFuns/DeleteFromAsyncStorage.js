import AsyncStorage from '@react-native-async-storage/async-storage';
import GetDataAsync from './GetDataAsync.tsx';

const DeleteFromAsyncStorage = async (placeName, username) => {
  try {
    let keyToRemove = null;

    const keys = await AsyncStorage.getAllKeys();
    console.log('KEYS IN DELETE', keys);
    // yets = JSON.parse(yets);
    for (const key of yets) {
      // console.log('inside yets in deltefromasync', yets[key]);
      // Retrieve the value associated with the current key
      const value = yets[key];
      if (value) {
        // Parse the value as JSON if it's stored in JSON format
        const item = JSON.parse(value);

        // Check if the placeName and username match the provided criteria
        if (item.placeName === placeName && item.username === username) {
          keyToRemove = key;
          break; // Exit the loop after finding the matching item
        }
      }
    }
    if (keyToRemove !== null) {
      await AsyncStorage.removeItem(keyToRemove);
      console.log(`Successfully removed item with key: ${keyToRemove}`);
    }
  } catch (error) {
    console.error('Error deleting items from AsyncStorage:', error);
  }
};

// Usage example:
export default DeleteFromAsyncStorage;
