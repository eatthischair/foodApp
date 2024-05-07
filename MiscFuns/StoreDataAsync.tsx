import AsyncStorage from '@react-native-async-storage/async-storage';

const StoreDataAsync = (revs, yets) => {
  // console.log('in async storagte, boss');
  if (revs) {
    AsyncStorage.setItem('revs', JSON.stringify(revs));
  }
  if (yets) {
    AsyncStorage.setItem('yets', JSON.stringify(yets));
  }
};

export default StoreDataAsync;
