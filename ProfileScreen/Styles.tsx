import {StyleSheet, Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');

export const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridItem: {
    fontSize: 20,
    color: 'black',
    // borderBlockColor: '#fcedc7',
    // borderWidth: 2,
    flexGrow: 1,
    textAlign: 'center',
  },
  BigNums: {
    color: 'black',
    fontSize: 20,
    marginBottom: 10,
    marginTop: 10,
    // borderBlockColor: '#fcedc7',
    // borderWidth: 2,
    flexGrow: 1,
    textAlign: 'center',
  },
  favorites: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  Chewiest: {
    backgroundColor: '#696D7D',
  },
  YetToChew: {
    backgroundColor: '#68B0AB',
  },
  Chewed: {
    backgroundColor: '#8FC0A9',
  },
  SignOut: {
    backgroundColor: '#8FC0A9',
  },
  buttons: {
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    borderRadius: 10,
    height: height / 10,
    width: width - 50,
    textAlign: 'center',
    backgroundColor: '#000000',
    marginVertical: 20,
  },
  buttonText: {
    fontSize: 20,
    color: '#ffffff',
  },
  container: {
    flex: 1,
    margin: 10,
    backgroundColor: '#fffbf2',
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
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 20,
    marginBottom: 5,
  },
  screen: {
    backgroundColor: '#12ff00',
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
