import firestore from '@react-native-firebase/firestore';
import firebase from 'firebase/app';

async function FindUsernameByEmail(email) {
  const db = firebase.firestore();

  try {
    const usersRef = db.collection('users');
    const snapshot = await usersRef.where('email', '==', email).get();

    if (snapshot.empty) {
      console.log('No matching documents.');
      return null;
    }

    let username = null;
    snapshot.forEach(doc => {
      console.log(doc.id, '=>', doc.data());
      username = doc.data().username;
    });
    console.log('USERNAME IN FINDUSERNAMEBYEMAIL', username);
    return username;
  } catch (error) {
    console.error('Error fetching user data:', error);
    return null;
  }
}

export default FindUsernameByEmail;
