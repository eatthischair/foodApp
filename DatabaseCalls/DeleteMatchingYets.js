import {useEffect} from 'react';
import firestore from '@react-native-firebase/firestore';

const DeleteMatchingYets = async (placeName, username) => {
  try {
    const querySnapshot = await firestore()
      .collection('test2')
      .where('placeName', '==', placeName)
      .where('username', '==', username)
      .get();

    querySnapshot.forEach(doc => {
      doc.ref.delete();
    });
  } catch (error) {
    console.error('Error querying or deleting documents from test2:', error);
  }
};

export default DeleteMatchingYets;
