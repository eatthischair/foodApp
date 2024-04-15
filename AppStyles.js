// AppStyles.js
import {Dimensions} from 'react-native';
import {StyleSheet} from 'react-native';

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
    marginVertical: 3,
  },
  HomebuttonText: {
    color: 'white',
    fontSize: 30,
  },
  Homecontainer: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50, // Adjust based on your UI
  },
});
