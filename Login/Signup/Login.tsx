import React, {useState, useEffect} from 'react';
import {Button, TextInput, View, Alert, Text} from 'react-native';
import auth from '@react-native-firebase/auth';

import {useNavigation} from '@react-navigation/native';

const Login = ({route}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const navigation = useNavigation();

  // Now you can use navigation.navigate or other navigation functions

  useEffect(() => {
    if (route.params?.email) {
      setEmail(route.params.email);
      setUsername(route.params.username);
      // console.log('USERNAME IN LOGIN', route.params.username);
      // setPassword(route.params.password);
    }
  }, [route.params]);

  const handleLogin = () => {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        // console.log('User signed in!');
        Alert.alert('Sign in Success', 'You are successfully signed in!', [
          {
            text: 'OK',
            onPress: () => navigation.navigate('Tabs', {email: email}),
            // onPress: () => console.log(navigation.getState()),
          },
        ]);
      })
      .catch(error => {
        Alert.alert('Signup Failed', 'The email or password is incorrect', [
          {
            text: 'OK',

            // onPress: () => console.log(navigation.getState()),
          },
        ]);

        console.error(error);
      });
  };

  return (
    <View>
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Login" onPress={handleLogin} />
      <Text>Don't have an account?</Text>
      <Button
        title="Sign Up"
        onPress={() => navigation.navigate('Sign Up')}></Button>
    </View>
  );
};

export default Login;
