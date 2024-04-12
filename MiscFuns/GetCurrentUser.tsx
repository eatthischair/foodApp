import auth from '@react-native-firebase/auth';

const GetCurrentUser = () => {
  const user = auth().currentUser;
  if (user) {
    // console.log('User is logged in', user);
    return user.displayName;
  }
};

export default GetCurrentUser;
