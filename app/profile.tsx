import { View, ScrollView, StyleSheet } from 'react-native';
import {
  MD3LightTheme as DefaultTheme,
  PaperProvider,
  Button,
  BottomNavigation,
  Text,
  Divider,
} from 'react-native-paper';
import { useState } from 'react';
import { Link } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Index() {
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

  return (
    <ScrollView style={styles.scrollContainer}>
      <View>
        <Text variant="displayMedium">
          {userInfo ? `${userInfo.firstName} ${userInfo.lastName}` : ''}
        </Text>
      </View>
      <View>
        <Text variant="displaySmall">@{userInfo ? userInfo.username : ''}</Text>
      </View>

      <View style={styles.grid}>
        <View style={styles.cell}>
          <Text>Reviews</Text>
        </View>
        <View style={styles.cell}>
          <Text>Followers</Text>
        </View>
        <View style={styles.cell}>
          <Text>Following</Text>
        </View>
        <View style={styles.cell}>
          <Text>2</Text>
        </View>
        <View style={styles.cell}>
          <Text>2</Text>
        </View>
        <View style={styles.cell}>
          <Text>2</Text>
        </View>
      </View>
      <View>
        <View style={styles.list}>
          <Text style={styles.text}>Chewiest</Text>
          <Divider />
          <Text style={styles.text}>Yet to Chew</Text>
          <Divider />
          <Text style={styles.text}>Chew'd</Text>
          <Divider />
        </View>
        <Button>Edit Profile</Button>
        <Button>Sign Out</Button>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    padding: 16,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 8,
  },
  cell: {
    width: '33.33%',
    alignItems: 'center',
    padding: 10,
  },
  list: {
    paddingVertical: 8,
  },
  text: {
    fontSize: 18,
    textAlign: 'center',
    paddingVertical: 8,
  },
});
