import React, {useState, useEffect} from 'react';
import firestore from '@react-native-firebase/firestore';
import MapView, {Marker} from 'react-native-maps';
import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  Button,
  Modal,
  Pressable,
} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

import MapModal from './MapModal';
// import {useUser} from './UserContext'; // Path to your UserContext
import {useUser} from './UserContext'; // Path to your UserContext

const {width, height} = Dimensions.get('window');

function Map() {
  const [documents, setDocuments] = useState([]);
  const [documents2, setDocuments2] = useState([]);

  const {revs, setRevs} = useUser();
  const {yets, setYets} = useUser();

  const [yetToReviewDocsCopy, setYetToReviewDocsCopy] = useState([]);
  const [reviewedDocsCopy, setReviewedDocsCopy] = useState([]);
  const [yetToReviewHidden, setYetToReviewHidden] = useState(false);
  const [reviewedHidden, setReviewedHidden] = useState(false);

  const [favoritesHidden, setFavoritesHidden] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [favoritesCopy, setFavoritesCopy] = useState([]);
  // let yetToReviewDocsCopyPlaceholder = yetToReviewDocsCopy;

  const fetchData = async (collectionName, setDocumentsFunction) => {
    try {
      const querySnapshot = await firestore().collection(collectionName).get();
      let docs = querySnapshot.docs.map(doc => doc.data());
      docs = docs.filter(place => place.Coordinates !== '');
      docs.map(place => {
        // let [latitude, longitude] = place.Coordinates.split(',')
        // let [latitude, longitude] = place.coords
        let {lat, lng} = place.coords;
        // .map(coord => coord.trim()) // Ensure coordinates are trimmed before conversion
        // .map(Number);
        place.Coordinates = {
          lat,
          lng,
        };
      });
      docs = docs.filter(
        place =>
          !Number.isNaN(place.Coordinates.latitude) &&
          !Number.isNaN(place.Coordinates.longitude),
      );
      setDocumentsFunction(docs);
      if (collectionName === 'test1') {
        setReviewedDocsCopy(docs);
        // setDocs1(docs);
        setRevs(docs);
        let favs = docs.filter(item => item.favorite === true);
        setFavorites(favs);
        setFavoritesCopy(favs);
      } else {
        setYetToReviewDocsCopy(docs);
        setYets(docs);
      }
      // Update state with fetched data
    } catch (error) {
      console.error(`Error fetching documents from ${collectionName}: `, error);
    }
  };

  useEffect(() => {
    fetchData('test1', setDocuments);
  }, []);

  useEffect(() => {
    fetchData('test2', setDocuments2);
  }, []);

  const [modalVisible, setModalVisible] = useState(false);

  const toggleYetToReview = () => {
    if (!yetToReviewHidden) {
      setDocuments2([]);
    } else {
      setDocuments2(yetToReviewDocsCopy);
    }
    setYetToReviewHidden(!yetToReviewHidden);
  };

  const toggleReviewed = () => {
    if (!reviewedHidden) {
      setDocuments([]);
    } else {
      setDocuments(reviewedDocsCopy);
    }
    setReviewedHidden(!reviewedHidden);
  };

  const toggleFavorites = () => {
    if (!favoritesHidden) {
      setFavorites([]);
    } else {
      setFavorites(favoritesCopy);
    }
    setFavoritesHidden(!favoritesHidden);
  };

  // eslint-disable-next-line react/no-unstable-nested-components
  const image = require('./android/app/src/main/res/drawable/ProfilePics/green-dot.png');
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <View style={styles.container}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.modalView}>
            <MapModal></MapModal>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>Hide Modal</Text>
            </Pressable>
          </View>
        </Modal>
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
                latitude: marker.coords.lat,
                longitude: marker.coords.lng,
              }}
              title={marker.placeName}
              description={marker.Cuisine}
            />
          ))}
          {documents2.map((marker, index) => (
            <Marker
              key={index}
              coordinate={{
                latitude: marker.coords.lat,
                longitude: marker.coords.lng,
              }}
              title={marker.placeName}
              description={marker.Cuisine}
              icon={image}
            />
          ))}
        </MapView>
        <View style={styles.buttonContainer}>
          {/* <Button
            style={styles.button}
            onPress={() => console.log('Button pressed')}
            title="Favorites"
          /> */}
          <Button
            style={styles.button}
            onPress={() => toggleFavorites()}
            title="Favorites"
          />
          <Button
            style={styles.button}
            onPress={() => toggleYetToReview()}
            title="Yet To Review"
          />
          <Button
            style={styles.button}
            onPress={() => toggleReviewed()}
            title="Reviewed"
          />
          <Button
            style={styles.button}
            onPress={() => setModalVisible(!modalVisible)}
            title="Add Marker"
          />
        </View>
      </View>
    </GestureHandlerRootView>
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
  buttonContainer: {
    position: 'absolute',
    top: 0, // Adjust based on your needs
    left: 0, // Adjust based on your needs
    flexDirection: 'row', // Align children horizontally
    justifyContent: 'flex-start',
    gap: 5,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    height: height / 1.2,
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default Map;
