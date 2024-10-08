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
import firestore from '@react-native-firebase/firestore';

// import UserCaller from '../DatabaseCalls/UserCaller';
import ReviewCaller from '../DatabaseCalls/ReviewCaller';
import {AddFollower} from '../DatabaseCalls';
// console.log('Imported AddFollower:', AddFollower);

import GetCurrentUser from '../MiscFuns/GetCurrentUser';
// console.log('Imported GetCurrentUser:', GetCurrentUser);
import RenderFollowList from './RenderFollowList';
import {styles} from './Styles';

const {width, height} = Dimensions.get('window');

const ViewFriendsProfile = ({route, navigation}) => {
  const [userInfo, setUserInfo] = useState({
    name: 'Jane Doe',
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus.',
    profileImage: 'https://via.placeholder.com/150',
    email: 'johndoe@example.com',
    location: 'New York, USA',
    followers: 1,
    following: 1,
    reviews: 1,
    username: 'placeholder',
  });
  const [revs, setRevs] = useState(null);
  const [yets, setYets] = useState(null);
  const [favs, setFavs] = useState(null);

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
        console.log('No document found with username:', username);
        return null; // Handle the case where the document does not exist
      }
    } catch (error) {
      console.error('Error fetching user by username:', error);
    }
  };

  // console.log('VIEWFRIENDSPROF', route.params);

  let user = {
    name: 'Jane Doe',
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus.',
    profileImage: 'https://via.placeholder.com/150',
    email: 'johndoe@example.com',
    location: 'New York, USA',
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await UserCaller(route.params.username);
        // console.log('User data:', userData);
        setUserInfo(userData);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUser();
  }, [route.params.username]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await ReviewCaller('test1', route.params.username);
        // console.log('review data:', userData);
        // setUserInfo(userData);
        setRevs(userData);
        let favs = userData?.filter(rev => rev.favorite);
        setFavs(favs);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUser();
  }, [route.params.username]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await ReviewCaller('test2', route.params.username);
        // console.log('review2 data:', userData);
        // setUserInfo(userData);
        setYets(userData);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUser();
  }, [route.params.username]);

  // Placeholder user data

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
        <Text
          style={
            styles.name
          }>{`${userInfo.firstName} ${userInfo.lastName}`}</Text>
      </View>
      <View style={styles.profileDetails}>
        <Text style={styles.detail}>@{userInfo ? userInfo.username : ''}</Text>
      </View>
      <View style={styles.grid}>
        <Text
          style={styles.gridItem}
          onPress={() => navigation.navigate('Reviews', {revs: revs})}>
          Reviews
        </Text>
        <Text
          style={styles.gridItem}
          onPress={() => {
            navigation.navigate('Followers/Following', {
              follow: userInfo.followers,
            });
          }}>
          Followers
        </Text>
        <Text
          style={styles.gridItem}
          onPress={() => {
            navigation.navigate('Followers/Following', {
              follow: userInfo.following,
            });
          }}>
          Following
        </Text>
      </View>
      <View style={styles.grid}>
        <Text style={styles.BigNums}>{revs ? revs.length : 0}</Text>
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
          title="Show Reviews on Map"
          onPress={() => navigation.navigate('Map', {revs: revs, yets: yets})}
        />
        <CustomTouchable
          title="Follow"
          // onPress={() => navigation.navigate('Map', {revs: revs, yets: yets})}
          onPress={() => AddFollower(GetCurrentUser(), userInfo.username)}
        />
      </View>
    </ScrollView>
  );
};

// const styles = StyleSheet.create({
//   grid: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     justifyContent: 'space-around',
//   },
//   gridItem: {
//     fontSize: 15,
//     color: 'black',
//   },
//   BigNums: {
//     color: 'black',
//     fontSize: 20,
//     marginBottom: 10,
//     marginTop: 10,
//   },
//   favorites: {
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   buttons: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     color: 'white',
//     borderRadius: 8,
//     height: height / 10,
//     width: width,
//     textAlign: 'center',
//     backgroundColor: '#000000',
//     marginVertical: 3,
//   },
//   buttonText: {
//     fontSize: 20,
//     color: '#ffffff',
//   },
//   container: {
//     flex: 1,
//     margin: 10,
//   },
//   profileHeader: {
//     alignItems: 'center',
//     justifyContent: 'center',
//     margin: 10,
//   },
//   profileImage: {
//     width: 150,
//     height: 150,
//     borderRadius: 75, // Makes image round
//   },
//   name: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginTop: 10,
//   },
//   profileDetails: {
//     marginTop: 20,
//   },
//   bio: {
//     fontSize: 16,
//     marginBottom: 10,
//   },
//   detail: {
//     fontSize: 16,
//     marginBottom: 5,
//   },
// });

export default ViewFriendsProfile;
