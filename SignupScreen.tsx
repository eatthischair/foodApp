import React, {useState} from 'react';
import {View, TextInput, Button, Text, Alert} from 'react-native';
import auth from '@react-native-firebase/auth';

import {useNavigation} from '@react-navigation/native';

const SignupScreen = () => {
  const navigation = useNavigation();

  // Now you can use navigation.navigate or other navigation functions
  // const handleSignUpSuccess = () => {
  //   navigation.navigate('Login'); // Adjust 'Login' to your login screen's route name
  // };

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignUp = async () => {
    try {
      await auth().createUserWithEmailAndPassword(email, password);
      Alert.alert('Signup Success', 'You are successfully registered!', [
        {
          text: 'OK',
          onPress: () => navigation.navigate('Login', {email: email}),
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
