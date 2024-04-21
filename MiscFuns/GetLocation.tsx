import Geolocation from 'react-native-geolocation-service';
import RequestLocationPermission from './RequestLocationPermission';

async function GetLocation() {
  if (await RequestLocationPermission()) {
    Geolocation.getCurrentPosition(
      position => {
        console.log(position);
      },
      error => {
        console.log(error.code, error.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  }
}

export default GetLocation;
