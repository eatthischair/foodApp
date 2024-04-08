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
    };
    const addNewUser = async userData => {
      try {
        const documentReference = await firestore()
          .collection('users')
          .add(userData);
        console.log('Document added with ID: ', documentReference.id);
        setUserId(documentReference.id);
        return documentReference.id; // This is the auto-generated document ID
      } catch (error) {
        console.error('Error adding document: ', error);
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
    </View>
  );
};

export default SignupScreen;
