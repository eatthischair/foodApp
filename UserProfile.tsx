import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';

import {useUser} from './UserContext'; // Path to your UserContext
import RenderList from './RenderList';

const {width, height} = Dimensions.get('window');

const UserProfile = ({route, navigation}) => {
  const {revs, setRevs} = useUser();
  const {yets, setYets} = useUser();

  // Placeholder user data
  const user = {
    name: 'Jane Doe',
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus.',
    profileImage: 'https://via.placeholder.com/150',
    email: 'johndoe@example.com',
    location: 'New York, USA',
    // Add more user fields as needed
  };

  // const navigation = useNavigation();

  const handleLogout = async () => {
    try {
      await auth().signOut();
      console.log('User signed out!');
      navigation.navigate('Login');
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  const CustomTouchable = ({title, onPress}) => {
    return (
      <TouchableOpacity
        style={styles.buttons}
        onPress={onPress}
        activeOpacity={0.8}>
        <Text style={styles.buttonText}>{title}</Text>
      </TouchableOpacity>
    );
  };
  return (
    <ScrollView style={styles.container}>
      <View style={styles.profileHeader}>
        <Image
          source={require('./android/app/src/main/res/drawable/ProfilePics/pic2.jpeg')}
          style={styles.profileImage}
        />
        <Text style={styles.name}>{user.name}</Text>
      </View>
      <View style={styles.profileDetails}>
        <Text style={styles.bio}>{user.bio}</Text>
        <Text style={styles.detail}>Email: {user.email}</Text>
        <Text style={styles.detail}>Location: {user.location}</Text>
        {/* Add more user details here */}
      </View>
      <View style={styles.grid}>
        <Text style={styles.gridItem}>Reviews</Text>
        <Text style={styles.gridItem}>Followers</Text>
        <Text style={styles.gridItem}>Following</Text>
      </View>
      <View style={styles.grid}>
        <Text style={styles.BigNums}>47</Text>
        <Text style={styles.BigNums}>444</Text>
        <Text style={styles.BigNums}>280</Text>
      </View>
      <View style={styles.favorites}>
        <CustomTouchable title="Favorites" onPress={() => console.log('aa')} />
        <CustomTouchable
          title="Yet To Review"
          onPress={() => navigation.navigate('Reviews', {revs: yets})}
        />
        <CustomTouchable
          title="Reviewed"
          onPress={() => navigation.navigate('Reviews', {revs: revs})}
        />
        <CustomTouchable title="Sign Out" onPress={() => handleLogout()} />
        <CustomTouchable
          title="Touch Me!!!"
          onPress={() => console.log('revs and yets', revs, yets)}
        />
        <CustomTouchable
          title="Edit Profile"
          onPress={() => navigation.navigate('Edit Profile')}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridItem: {
    fontSize: 15,
    color: 'black',
  },
  BigNums: {
    color: 'black',
    fontSize: 20,
    marginBottom: 10,
    marginTop: 10,
  },
  favorites: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttons: {
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    borderRadius: 8,
    height: height / 10,
    width: width,
    textAlign: 'center',
    backgroundColor: '#000000',
    marginVertical: 3,
  },
  buttonText: {
    fontSize: 20,
    color: '#ffffff',
  },
  container: {
    flex: 1,
    margin: 10,
  },
  profileHeader: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75, // Makes image round
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
  },
  profileDetails: {
    marginTop: 20,
  },
  bio: {
    fontSize: 16,
    marginBottom: 10,
  },
  detail: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default UserProfile;
