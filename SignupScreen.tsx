import React, {useState} from 'react';
import {View, TextInput, Button, Text, Alert} from 'react-native';
import auth from '@react-native-firebase/auth';

import { useNavigation } from '@react-navigation/native';


const SignupScreen = () => {
  const navigation = useNavigation();

  // Now you can use navigation.navigate or other navigation functions
  const handleSignUpSuccess = () => {
    navigation.navigate('Login'); // Adjust 'Login' to your login screen's route name
  };

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // const handleSignUp = () => {
  //   auth()
  //     .createUserWithEmailAndPassword(email, password)
  //     .then(() => {
  //       console.log('User account created & signed in!');
  //     })
  //     .catch(error => {
  //       if (error.code === 'auth/email-already-in-use') {
  //         setError('That email address is already in use!');
  //       } else if (error.code === 'auth/invalid-email') {
  //         setError('That email address is invalid!');
  //       } else {
  //         setError(error.message);
  //       }
  //     });
  // };

  const handleSignUp = async () => {
    try {
      await auth().createUserWithEmailAndPassword(email, password);
      Alert.alert('Signup Success', 'You are successfully registered!', [
        {text: 'OK', onPress: () => navigation.navigate('Login', { email: email })},
      ]);
    } catch (error) {
      console.error(error);
      Alert.alert('Signup Failed', error.message);
    }
  };

  return (
    <View>
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
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
