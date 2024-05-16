import {StyleSheet, Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');
import {RFValue} from 'react-native-responsive-fontsize';

export const initialRatings = [
  {label: 'Overall', value: 0},
  {label: 'Server Helpfulness', value: 0},
  {label: 'Timeliness of Service', value: 0},
  {label: 'Eagerness to Revisit', value: 0},
  {label: 'Cleanliness', value: 0},
  {label: 'Bang for Buck', value: 0},
  {label: 'Music', value: 0},
  {label: 'Noise Level', value: 0},
  {label: 'Crowd Management', value: 0},
  {label: 'Vibe', value: 0},
];
export const addDishStyles = StyleSheet.create({
  buttonText: {
    color: 'black',
    fontSize: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textBox: {
    height: height / 8,
    width: width / 2,
    borderColor: 'black',
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    color: 'black',
  },
});

export const styles = StyleSheet.create({
  buttonText: {
    color: 'black',
    fontSize: 30,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
    padding: 10,
  },
  Homebuttons: {
    justifyContent: 'center',
    alignItems: 'center',
    color: 'blue',
    borderRadius: 8,
    height: height / 10,
    width: width / 1.5,
    textAlign: 'center',
    backgroundColor: '#03a9fc',
    marginVertical: 10,
  },
  Chewiest: {
    backgroundColor: '#696D7D',
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
    color: 'black',
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
    color: 'black',
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
    backgroundColor: '#fff8e7',
  },
});
