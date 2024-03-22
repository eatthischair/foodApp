import React, {useState, useEffect} from 'react';
import firestore from '@react-native-firebase/firestore';
import MapView, {Marker} from 'react-native-maps';
import {View, StyleSheet} from 'react-native';

function Map() {
  const [documents, setDocuments] = useState([]);
  const [documents2, setDocuments2] = useState([]);

  const fetchData = async (collectionName, setDocumentsFunction) => {
    try {
      const querySnapshot = await firestore().collection(collectionName).get();
      let docs = querySnapshot.docs.map(doc => doc.data());
      docs = docs.filter(place => place.Coordinates !== '');
      docs.map(place => {
        let [latitude, longitude] = place.Coordinates.split(',')
          .map(coord => coord.trim()) // Ensure coordinates are trimmed before conversion
          .map(Number);
        place.Coordinates = {
          latitude,
          longitude,
        };
      });
      docs = docs.filter(
        place =>
          !Number.isNaN(place.Coordinates.latitude) &&
          !Number.isNaN(place.Coordinates.longitude),
      );
      setDocumentsFunction(docs); // Update state with fetched data
    } catch (error) {
      console.error(`Error fetching documents from ${collectionName}: `, error);
    }
  };

  useEffect(() => {
    fetchData('Restaurants2', setDocuments);
  }, []);

  useEffect(() => {
    fetchData('YetToVisit', setDocuments2);
  }, []);

  // eslint-disable-next-line react/no-unstable-nested-components
  const image = require('./android/app/src/main/res/drawable/ProfilePics/green-dot.png');
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 32.7767,
          longitude: -96.797,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}>
        {documents.map((marker, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: marker.Coordinates.latitude,
              longitude: marker.Coordinates.longitude,
            }}
            title={marker.Name}
            description={marker.Cuisine}
          />
        ))}
        {documents2.map((marker, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: marker.Coordinates.latitude,
              longitude: marker.Coordinates.longitude,
            }}
            title={marker['Name of Restaurant']}
            description={marker.Cuisine}
            icon={image}
          />
        ))}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
  },
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50, // Adjust based on your UI
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
  },
});

export default Map;
