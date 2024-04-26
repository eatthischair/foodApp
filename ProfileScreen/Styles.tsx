import {StyleSheet, Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');

export const styles = StyleSheet.create({
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

export const user = {
  firstName: 'Jane',
  lastName: 'Doe',
  bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus.',
  profileImage: 'https://via.placeholder.com/150',
  email: 'johndoe@example.com',
  location: 'New York, USA',
};
