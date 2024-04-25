import React, {useState, useEffect, useCallback} from 'react';
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
import ReviewModal from './ReviewModal';
import {useUser} from '../UserContext'; // Path to your UserContext
import GetCurrentUser from '../MiscFuns/GetCurrentUser';
import ReviewCaller from '../DatabaseCalls/ReviewCaller';
import {useFocusEffect, useIsFocused} from '@react-navigation/native';
import {useNavigation} from '@react-navigation/native';
// import UpdateContext from '../MiscFuns/UpdateContext';
import StoreDataAsync from '../MiscFuns/StoreDataAsync';
import GetDataAsync from '../MiscFuns/GetDataAsync';

const {width, height} = Dimensions.get('window');

function Map({route}) {
  const {contextRevs, setContextRevs, contextYets, setContextYets} = useUser();

  const [documents, setDocuments] = useState([]);
  const [documents2, setDocuments2] = useState([]);
  const [documents3, setDocuments3] = useState([]);

  const [revs, setRevs] = useState(route.params?.revs);
  const [yets, setYets] = useState(route.params?.yets);

  const [yetToReviewDocsCopy, setYetToReviewDocsCopy] = useState([]);
  const [reviewedDocsCopy, setReviewedDocsCopy] = useState([]);
  const [yetToReviewHidden, setYetToReviewHidden] = useState(false);
  const [reviewedHidden, setReviewedHidden] = useState(false);

  const [favoritesHidden, setFavoritesHidden] = useState(false);
  const [favorites, setFavorites] = useState([]);

  const isFocused = useIsFocused();
  const navigation = useNavigation();

  const [selectedMarker, setSelectedMarker] = useState(null);

  // When a marker is pressed
  const handleMarkerPress = marker => {
    setSelectedMarker(marker); // Set the selected marker
    setReviewModalVisible(true); // Open the modal
  };

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        console.log('triggered, boss');
        // let revs = await ReviewCaller('test1', GetCurrentUser());
        // let yets = await ReviewCaller('test2', GetCurrentUser());

        let revs = await GetDataAsync('revs');
        let yets = await GetDataAsync('yets');
        // console.log('data from async', revs, yets);

        if (route.params?.revs) {
          console.log('REVS AND YETS FROM FRIENDS BOSS', route.params);
          revs = route.params.revs;
          yets = route.params.yets;
        }

        // if (contextRevs.length > revs.length) {
        //   revs = contextRevs;
        // }
        // if (contextYets.length > yets.length) {
        //   yets = contextYets;
        // }
        let revsNoFavs = revs?.filter(item => item.favorite === false);
        let favs = revs?.filter(item => item.favorite);
        // console.log('Setting state for documents:', revsNoFavs);
        // console.log('Setting state for documents2:', yets);
        setDocuments(revsNoFavs);
        setReviewedDocsCopy(revsNoFavs);
        setDocuments2(yets);
        setYetToReviewDocsCopy(yets);
        setFavorites(favs);
        setDocuments3(favs);
      };
      fetchData();
    }, [route.params]), // Depend on route.params
  );

  useEffect(() => {
    if (isFocused) {
      console.log('Screen just got focused');
    } else {
      // console.log('Screen just lost focus', revs, yets);
      setDocuments(null);
      setDocuments2(null);
      setDocuments3(null);
      route.params = null;
    }
  }, [isFocused]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      setRevs(null);
      setYets(null);
    });

    return unsubscribe;
  }, [navigation]);

  const [modalVisible, setModalVisible] = useState(false);
  const [reviewModalVisible, setReviewModalVisible] = useState(false);

  const updateYets = newYets => {
    setDocuments2(newYets);
  };
  useEffect(() => {
    const getYets = async () => {
      let yets = await GetDataAsync('yets');
      updateYets(yets);
    };
    if (!modalVisible) {
      console.log('meme!!!! lol');
      getYets();
    }
  }, [modalVisible]);

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
      setDocuments3([]);
    } else {
      setDocuments3(favorites);
    }
    setFavoritesHidden(!favoritesHidden);
  };

  // eslint-disable-next-line react/no-unstable-nested-components
  const image = require('../android/app/src/main/res/drawable/ProfilePics/green-dot.png');
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
              <Text style={styles.textStyle}>Go Back</Text>
            </Pressable>
          </View>
        </Modal>

        <Modal
          animationType="slide"
          transparent={true}
          visible={reviewModalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setReviewModalVisible(!reviewModalVisible);
          }}>
          <View style={styles.modalView}>
            <ReviewModal review={selectedMarker}></ReviewModal>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setReviewModalVisible(!reviewModalVisible)}>
              <Text style={styles.textStyle}>Go Bacc</Text>
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
          {documents
            ? documents.map((marker, index) => (
                <Marker
                  key={index}
                  coordinate={{
                    latitude: marker.coords.lat,
                    longitude: marker.coords.lng,
                  }}
                  title={marker.placeName}
                  // description={marker.ratings}
                  onPress={() => handleMarkerPress(marker)}
                />
              ))
            : ''}
          {documents2
            ? documents2.map((marker, index) => (
                <Marker
                  style={{width: width / 2, height: height / 2}}
                  key={index}
                  coordinate={{
                    latitude: marker.coords.lat,
                    longitude: marker.coords.lng,
                  }}
                  title={marker.placeName}
                  description={marker.Cuisine}
                  pinColor={'#154BE5'}
                />
              ))
            : ''}
          {documents3
            ? documents3.map((marker, index) => (
                <Marker
                  style={{width: width / 2, height: height / 2}}
                  key={index}
                  coordinate={{
                    latitude: marker.coords.lat,
                    longitude: marker.coords.lng,
                  }}
                  title={marker.placeName}
                  description={marker.Cuisine}
                  pinColor={'#f59042'}
                />
              ))
            : ''}
        </MapView>
        <View style={styles.buttonContainer}>
          <Button
            style={styles.button}
            onPress={() => toggleFavorites()}
            title="Favorites"
            color={!favoritesHidden ? '#cf610c' : '#000000'}
          />
          <Button
            style={styles.button}
            onPress={() => toggleYetToReview()}
            title="Want to go"
            color={!yetToReviewHidden ? '#121fde' : '#000000'}
          />
          <Button
            style={styles.button}
            onPress={() => toggleReviewed()}
            title="Reviewed"
            color={!reviewedHidden ? '#db1d3c' : '#000000'}
          />
          <Button
            style={styles.button}
            onPress={() => setModalVisible(!modalVisible)}
            title="Add Marker"
            color={'#34B75F'}
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
    gap: 10,
    height: height / 25,
    width: width / 3,
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
    borderRadius: 50,
    padding: 10,
    elevation: 2,
    fontSize: 30,
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
    fontSize: 30,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default Map;
