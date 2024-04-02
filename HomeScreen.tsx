import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  Button,
  Modal,
  Pressable,
  TouchableOpacity
} from 'react-native';
const {width, height} = Dimensions.get('window');

const HomeScreen = ({navigation}) => {
  const handleNavigation = screenName => {
    navigation.navigate(screenName);
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
    <View style={styles.container}>
      <Text>Home Screen</Text>
      <CustomTouchable
        title="Find Friends"
        onPress={() => handleNavigation('MyReviews')}
      />
      <CustomTouchable
        title="Friends Reviews"
        onPress={() => handleNavigation('FriendsReviews')}
      />
      <CustomTouchable
        title="Find New Restaurant"
        onPress={() => handleNavigation('FindNewRestaurant')}
      />
      <CustomTouchable
        title="Profile"
        onPress={() => handleNavigation('Profile')}
      />
      <CustomTouchable title="Map" onPress={() => handleNavigation('Map')} />
    </View>
  );
};

const styles = StyleSheet.create({
  buttons: {
    justifyContent: 'center',
    alignItems: 'center',
    color: 'blue',
    borderRadius: 8,
    height: height / 15,
    width: width / 2,
    textAlign: 'center',
    backgroundColor: '#03a9fc',
    marginVertical: 3,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
  },
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50, // Adjust based on your UI
  },
});

export default HomeScreen;
