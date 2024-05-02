import React from 'react';
import {View, Text, Image, ScrollView, TouchableOpacity} from 'react-native';
import {useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import ReviewCaller from '../DatabaseCalls/ReviewCaller';
import {styles} from './Styles';

const UserProfile = ({route, navigation}) => {
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
    username: 'foodLover',
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
        setYets(yetss);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchYets();
  }, []);

  const handleLogout = async () => {
    try {
      await auth().signOut();
      console.log('User signed out!');
      navigation.navigate('Login');
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  const CustomTouchable = ({title, onPress, style = styles.buttons}) => {
    return (
      <TouchableOpacity style={style} onPress={onPress} activeOpacity={0.8}>
        <Text style={styles.buttonText}>{title}</Text>
      </TouchableOpacity>
    );
  };
  return (
    <ScrollView style={styles.container}>
      <View style={styles.profileHeader}>
        <Image
          source={require('../android/app/src/main/res/drawable/ProfilePics/pic2.jpg')}
          style={styles.profileImage}
        />
        <Text style={styles.name}>
          {userInfo ? `${userInfo.firstName} ${userInfo.lastName}` : ''}
        </Text>
      </View>
      <View style={styles.profileDetails}>
        <Text style={styles.detail}>@{userInfo ? userInfo.username : ''}</Text>
        {/* <Text style={styles.detail}>
          Email: {userInfo ? userInfo.email : ''}
        </Text> */}
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
          style={[styles.buttons, styles.Chewiest]}
        />
        <CustomTouchable
          title="Yet To Chew"
          onPress={() =>
            navigation.navigate('Reviews', {revs: yets, dontSortAndGroup: true})
          }
          style={[styles.buttons, styles.YetToChew]}
        />
        <CustomTouchable
          title="Chewed"
          onPress={() => navigation.navigate('Reviews', {revs: revs})}
          style={[styles.buttons, styles.Chewed]}
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

export default UserProfile;
