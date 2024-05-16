// AppStyles.js
import {Dimensions} from 'react-native';
import {StyleSheet} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';

const {width, height} = Dimensions.get('window');
export const styles = StyleSheet.create({
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
  HomebuttonText: {
    color: 'white',
    fontSize: RFValue(30),
  },
  MyChew: {
    backgroundColor: '#696D7D',
  },
  Map: {
    backgroundColor: '#68B0AB',
  },
  FindFriends: {
    backgroundColor: '#8FC0A9',
  },
  Homecontainer: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50, // Adjust based on your UI
    backgroundColor: '#fff8e7',
  },
  App: {
    flex: 1,
    backgroundColor: '#9dd3fa', // Set your desired background color here
  },
  TextInput: {
    color: 'black',
  },
});
