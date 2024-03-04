import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'; // Import Ionicons

const Tweet = ({tweet}) => {
  const img =
    'https://www.smithsfoodanddrug.com/content/v2/binary/image/bl/health/what-is-healthy-food/what-is-healthy-food--3616981_2022_dx_content_kh_whatishealthyfood_hro_mbl_640x364.jpg';

  let size = 12;

  return (
    <View style={styles.tweetContainer}>
      <View style={styles.user}>
        <Image
          source={require('./android/app/src/main/res/drawable/ProfilePics/pic1.jpeg')}
          style={styles.profileImage}
        />
        <Text style={styles.author}>{tweet.author}</Text>
      </View>
      <Text style={styles.content}>{tweet.content}</Text>
      <Image
        source={require('./android/app/src/main/res/drawable/FoodPics/pic1.webp')}
        style={styles.image}
        resizeMode="contain"
      />
      <View style={styles.icons}>
        {/* <Ionicons name={'heart-outline'} size={20} color="black" /> */}
      </View>
      {/* <Text style={styles.timestamp}>{tweet.timestamp}</Text> */}
    </View>
  );
};

const styles = StyleSheet.create({
  icons: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  image: {
    width: '90%',
    height: '90%',
  },
  user: {
    display: 'flex',
    flexDirection: 'row',
    // justifyContent: 'center',
    alignItems: 'center',
    // borderColor: 'black',
    // borderWidth: 2,
  },
  content: {
    fontSize: 20,
  },
  tweetContainer: {
    display: 'flex',
    padding: 10,
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    width: 400,
    height: 400,
    // borderColor: 'black',
    // borderWidth: 2,
  },
  author: {
    fontWeight: 'bold',
    fontSize: 15,
  },
  timestamp: {
    color: '#999',
    marginTop: 5,
    borderColor: 'black',
    borderWidth: 2,
  },
  profileImage: {
    width: 30,
    height: 30,
    borderRadius: 75, // Makes image round
    // borderColor: 'black',
    // borderWidth: 2,
  },
});

export default Tweet;
