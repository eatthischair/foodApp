import firestore from '@react-native-firebase/firestore';

const UserCaller = async username => {
  try {
    const documentSnapshot = await firestore()
      .collection('users')
      .doc(username)
      .get();

    if (documentSnapshot.exists) {
      // console.log('User document:', documentSnapshot.data());
      return documentSnapshot.data(); // Returns the document data
    } else {
      console.log('No document found with username:', username);
      return null; // Handle the case where the document does not exist
    }
  } catch (error) {
    console.error('Error fetching user by username:', error);
  }
};

export default UserCaller;
