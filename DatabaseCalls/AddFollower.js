import firestore from '@react-native-firebase/firestore';

const AddFollower = async (followerUsername, followeeUsername) => {
  const followerRef = firestore().collection('users').doc(followerUsername);
  const followeeRef = firestore().collection('users').doc(followeeUsername);

  try {
    // Transaction to ensure atomicity of the follow operation
    await firestore().runTransaction(async transaction => {
      const followerDoc = await transaction.get(followerRef);
      const followeeDoc = await transaction.get(followeeRef);

      if (!followerDoc.exists || !followeeDoc.exists) {
        throw 'One of the user documents does not exist!';
      }

      // Update the follower's 'following' array
      transaction.update(followerRef, {
        following: firestore.FieldValue.arrayUnion(followeeUsername),
      });

      // Update the followee's 'followers' array
      transaction.update(followeeRef, {
        followers: firestore.FieldValue.arrayUnion(followerUsername),
      });
    });

    // console.log('Follow status updated successfully');
  } catch (error) {
    console.error('Error updating follow status:', error);
  }
};

export default AddFollower;
