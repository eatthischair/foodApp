import React, {useState, useEffect} from 'react';
import {Button, TextInput, View, Alert} from 'react-native';
import auth from '@react-native-firebase/auth';

import {useNavigation} from '@react-navigation/native';

const Login = ({route, navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // const navigation = useNavigation();

  // Now you can use navigation.navigate or other navigation functions

  useEffect(() => {
    if (route.params?.email) {
      setEmail(route.params.email);
      // setPassword(route.params.password);
    }
  }, [route.params]);

  const handleLogin = () => {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        console.log('User signed in!');
        Alert.alert('Signup Success', 'You are successfully signed in!', [
          {
            text: 'OK',
            onPress: () => navigation.navigate('Home'),
          },
        ]);
      })
      .catch(error => {
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
    </View>
  );
};

export default Login;
