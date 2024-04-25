import {StyleSheet, Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  buttonText: {
    color: 'black',
    fontSize: 30,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
    padding: 10,
  },
  buttons: {
    alignItems: 'center', // Center children horizontally
    justifyContent: 'center', // Center children vertically
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    color: 'blue',
    height: height / 15,
    width: width / 1.5,
    // textAlign: 'center',
    backgroundColor: '#03a9fc',
    marginVertical: 3,
  },
  textBox: {
    // display: 'flex',
    height: height / 8,
    width: width / 1.5,
    borderColor: 'black',
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 20,
  },
  searchBar: {
    width: width / 2,
  },
  listBox: {},
  myStarStyle: {
    // color: 'yellow',
    backgroundColor: 'transparent',
    textShadowColor: 'black',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 2,
    height: 300,
  },
  myEmptyStarStyle: {
    color: 'white',
  },
  textInput: {
    fontSize: 20,
  },
  TouchableOpacity: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  ScrollView: {
    alignItems: 'center',
    marginTop: 20,
    padding: 20,
  },
});

export default styles;
