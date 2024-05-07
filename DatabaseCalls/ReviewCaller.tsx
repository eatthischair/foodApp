import firestore from '@react-native-firebase/firestore';

const ReviewCaller = async (collectionName, username) => {
  // console.log('REVIEW CALLER PARAMS', collectionName, username);
  let documents;
  try {
    const querySnapshot = await firestore()
      .collection(collectionName)
      .where('username', '==', username)
      .get();

    let docs = querySnapshot.docs.map(doc => doc.data());
    docs = docs.filter(place => place.Coordinates !== '');
    docs.map(place => {
      let {lat, lng} = place.coords;
      place.Coordinates = {
        lat,
        lng,
      };
    });
    docs = docs.filter(
      place =>
        !Number.isNaN(place.Coordinates.latitude) &&
        !Number.isNaN(place.Coordinates.longitude),
    );
    documents = docs;
    // Update state with fetched data
  } catch (error) {
    console.error(`Error fetching documents from ${collectionName}: `, error);
  } finally {
    // console.log('RETURN DOCS IN REVIEW CALLER', documents);
    return documents;
  }
};

export default ReviewCaller;
