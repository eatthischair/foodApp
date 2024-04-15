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

import {useEffect, useState} from 'react';

import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';

import {useUser} from '../UserContext'; // Path to your UserContext
import RenderList from './RenderList';
// import UserCaller from '../DatabaseCalls/UserCaller';
import firestore from '@react-native-firebase/firestore';
import ReviewCaller from '../DatabaseCalls/ReviewCaller';
import RenderFollowList from './RenderFollowList';
const {width, height} = Dimensions.get('window');

const UserProfile = ({route, navigation}) => {
  // const {revs, setRevs} = useUser();
  // const {yets, setYets} = useUser();

  const [revs, setRevs] = useState(null);
  const [yets, setYets] = useState(null);
  const [favs, setFavs] = useState(null);

  const [userInfo, setUserInfo] = useState({
    firstName: 'Jane',
    lastName: 'Doe',
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus.',
    profileImage: 'https://via.placeholder.com/150',
    email: 'johndoe@example.com',
    location: 'New York, USA',
    followers: 1,
    following: 1,
    reviews: 1,
    // Add more user fields as needed
  });

  const UserCaller = async username => {
    try {
      const documentSnapshot = await firestore()
        .collection('users')
        .doc(username)
        .get();

      if (documentSnapshot.exists) {
        // console.log('User document:', documentSnapshot.data());
        return documentSnapshot.data(); // Returns the document data
      } else {
        // console.log('No document found with username:', username);
        return null; // Handle the case where the document does not exist
      }
    } catch (error) {
      console.error('Error fetching user by username:', error);
    }
  };

  const getCurrentUser = () => {
    const user = auth().currentUser;
    if (user) {
      // console.log('User is logged in', user);
      return user;
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        let user = getCurrentUser()?.displayName;
        const userData = await UserCaller(user);
        // console.log('User data:', userData);
        setUserInfo(userData);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    const fetchRevs = async () => {
      try {
        let revss = await ReviewCaller('test1', getCurrentUser()?.displayName);
        // console.log('User revs in userprofile:', revss);
        setRevs(revss);
        let favss = revss?.filter(rev => rev.favorite === true);
        setFavs(favss);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchRevs();
  }, []);

  useEffect(() => {
    const fetchYets = async () => {
      try {
        let yetss = await ReviewCaller('test2', getCurrentUser()?.displayName);
        // console.log('User yetss in userprofile:', yetss);
        setYets(yetss);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchYets();
  }, []);

  // Placeholder user data
  const user = {
    firstName: 'Jane',
    lastName: 'Doe',
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus.',
    profileImage: 'https://via.placeholder.com/150',
    email: 'johndoe@example.com',
    location: 'New York, USA',
    // Add more user fields as needed
  };

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
          source={require('../android/app/src/main/res/drawable/ProfilePics/pic2.jpeg')}
          style={styles.profileImage}
        />
        <Text style={styles.name}>
          {userInfo ? `${userInfo.firstName} ${userInfo.lastName}` : ''}
        </Text>
      </View>
      <View style={styles.profileDetails}>
        {/* <Text style={styles.bio}>{user.bio}</Text> */}
        <Text style={styles.detail}>
          Email: {userInfo ? userInfo.email : ''}
        </Text>
        {/* <Text style={styles.detail}>Location: {user.location}</Text> */}
        {/* Add more user details here */}
      </View>
      <View style={styles.grid}>
        <Text style={styles.gridItem}>Reviews</Text>
        <Text style={styles.gridItem}>Followers</Text>
        <Text style={styles.gridItem}>Following</Text>
      </View>
      <View style={styles.grid}>
        <Text
          style={styles.BigNums}
          onPress={() => navigation.navigate('Reviews', {revs: revs})}>
          {revs ? revs.length : 0}
        </Text>
        <Text
          style={styles.BigNums}
          onPress={() => {
            navigation.navigate('Followers/Following', {
              follow: userInfo.followers,
            });
          }}>
          {userInfo ? userInfo.followers.length : 0}
        </Text>
        <Text
          style={styles.BigNums}
          onPress={() => {
            navigation.navigate('Followers/Following', {
              follow: userInfo.following,
            });
          }}>
          {userInfo ? userInfo.following.length : 0}
        </Text>
      </View>
      <View style={styles.favorites}>
        <CustomTouchable
          title="Chewiest"
          onPress={() => navigation.navigate('Reviews', {revs: favs})}
        />
        <CustomTouchable
          title="Yet To Chew"
          onPress={() => navigation.navigate('Reviews', {revs: yets})}
        />
        <CustomTouchable
          title="Chewed"
          onPress={() => navigation.navigate('Reviews', {revs: revs})}
        />
        <CustomTouchable
          title="Edit Profile"
          onPress={() => navigation.navigate('Edit Profile')}
        />
        <CustomTouchable title="Sign Out" onPress={() => handleLogout()} />
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
