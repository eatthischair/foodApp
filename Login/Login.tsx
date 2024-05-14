import React, {useState, useEffect} from 'react';
import {Button, TextInput, View, Alert, Text} from 'react-native';
import auth from '@react-native-firebase/auth';

import {useNavigation} from '@react-navigation/native';
import {FindUsernameByEmail} from '../DatabaseCalls';
import UpdateDisplayName from '../MiscFuns/UpdateDisplayName';
import {styles} from '../HomePage/AppStyles';
const Login = ({route}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const navigation = useNavigation();

  // Now you can use navigation.navigate or other navigation functions

  const findUsernameAsync = async () => {
    const findUsername = await FindUsernameByEmail(email).then(data => {
      // console.log('in findusernameasync, boss', data);
    });
    return findUsername;
  };
  useEffect(() => {
    if (route.params?.email) {
      setEmail(route.params.email);
      setUsername(route.params.username);
      // console.log('USERNAME IN LOGIN', route.params.username);
      // setPassword(route.params.password);
    }
  }, [route.params]);

  const handleLogin = async () => {
    try {
      // Attempt to sign in
      await auth().signInWithEmailAndPassword(email, password);
      // console.log('User signed in!');

      // Once signed in, fetch the username
      const username = await FindUsernameByEmail(email);
      // console.log('Username found:', username);
      UpdateDisplayName(username);

      // Success alert and navigation reset
      Alert.alert('Sign in Success', 'You are successfully signed in!', [
        {
          text: 'OK',
          onPress: () => {
            navigation.reset({
              index: 0,
              routes: [
                {name: 'Tabs', params: {email: email, username: username}},
              ],
            });
          },
        },
      ]);
    } catch (error) {
      console.error('Login failed:', error);
      Alert.alert('Login Failed', 'The email or password is incorrect', [
        {text: 'OK'},
      ]);
    }
  };

  // const handleLogin = () => {
  //   auth()
  //     .signInWithEmailAndPassword(email, password)
  //     .then(() => {
  //       // console.log('User signed in!');
  //       findUsernameAsync();

  //       Alert.alert('Sign in Success', 'You are successfully signed in!', [
  //         {
  //           text: 'OK',
  //           // onPress: () => navigation.navigate('Tabs', {email: email}),
  //           // onPress: () => console.log(navigation.getState()),
  //           onPress: () => {
  //             // Resetting the navigation stack to the 'Tabs' or home screen
  //             navigation.reset({
  //               index: 0,
  //               routes: [
  //                 {name: 'Tabs', params: {email: email, username: username}},
  //               ],
  //             });
  //           },
  //         },
  //       ]);
  //     })
  //     .catch(error => {
  //       Alert.alert('Signup Failed', 'The email or password is incorrect', [
  //         {
  //           text: 'OK',

  //           // onPress: () => console.log(navigation.getState()),
  //         },
  //       ]);

  //       console.error(error);
  //     });
  // };

  return (
    <View>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.TextInput}
        placeholderTextColor="#000000"
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.TextInput}
        placeholderTextColor="#000000"
      />
      <Button title="Login" onPress={handleLogin} />
      <Text allowFontScaling={true}>Don't have an account?</Text>
      <Button
        title="Sign Up"
        onPress={() => navigation.navigate('Sign Up')}></Button>
    </View>
  );
};

export default Login;
