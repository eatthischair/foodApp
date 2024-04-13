import React, {useState} from 'react';
import {View, TextInput, Button, Text, Alert} from 'react-native';
import auth from '@react-native-firebase/auth';

import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import {useUser} from '../../UserContext'; // Path to your UserContext

const SignupScreen = () => {
  const navigation = useNavigation();

  const {userId, setUserId} = useUser();

  const handleSubmit = () => {
    let sendObj = {
      username,
      email,
      followers: [],
      following: [],
      reviews: 0,
    };
    const addNewUser = async userData => {
      try {
        const username = userData.username;

        const userDoc = await firestore()
          .collection('users')
          .doc(username)
          .get();
        if (userDoc.exists) {
          console.log('Username already exists. Choose a different username.');
          return null; // Or throw an error or handle as appropriate for your app
        }

        await firestore().collection('users').doc(username).set(userData);
        console.log('Document added with username as ID: ', username);
        setUserId(username); // Assuming `setUserId` updates state or context with the new user ID

        return username; // Return the username used as the document ID
      } catch (error) {
        console.error('Error adding document: ', error);
        return null; // Indicate failure, adjust as needed for your error handling
      }
    };
    addNewUser(sendObj);
  };

  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');

  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignUp = async () => {
    try {
      await auth().createUserWithEmailAndPassword(email, password);
      handleSubmit();
      Alert.alert('Signup Success', 'You are successfully registered!', [
        {
          text: 'OK',
          onPress: () =>
            navigation.navigate('Login', {email: email, username: username}),
        },
      ]);
      // eslint-disable-next-line no-catch-shadow
    } catch (error) {
      console.error(error);
      Alert.alert('Signup Failed', error.message);
    }
  };

  return (
    <View>
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />

      <TextInput
        placeholder="Password"
        value={password}
        secureTextEntry
        onChangeText={setPassword}
      />
      {error ? <Text>{error}</Text> : null}
      <Button title="Sign Up" onPress={handleSignUp} />
      <Text>Already have an account?</Text>
      <Button
        title="Login"
        onPress={() => navigation.navigate('Login')}></Button>
    </View>
  );
};

export default SignupScreen;
