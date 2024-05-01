import auth from '@react-native-firebase/auth';

function UpdateDisplayName(newDisplayName) {
  const user = auth().currentUser;

  if (user) {
    user
      .updateProfile({
        displayName: newDisplayName,
      })
      .then(() => {
        console.log('Display name updated!', newDisplayName);
        // Optionally, update the local state or perform other actions after the update
      })
      .catch(error => {
        console.error('Error updating display name:', error);
      });
  }
}

export default UpdateDisplayName;
