import React, {useState, useEffect, useCallback} from 'react';
// import firestore from '@react-native-firebase/firestore';
import MapView, {Marker} from 'react-native-maps';
import {
  View,
  Dimensions,
  Text,
  Button,
  Modal,
  Pressable,
  Alert,
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

import {styles} from './MapStyles';

const {width, height} = Dimensions.get('window');

function Map({route}) {
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

  const handleMarkerPress = marker => {
    setSelectedMarker(marker); // Set the selected marker
    setReviewModalVisible(true); // Open the modal
  };

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        let revs = await GetDataAsync('revs');
        let yets = await GetDataAsync('yets');

        if (route.params?.revs) {
          // console.log('REVS AND YETS FROM FRIENDS BOSS', route.params);
          revs = route.params.revs;
          yets = route.params.yets;
        }
        let revsNoFavs = revs?.filter(item => !item.favorite);
        let favs = revs?.filter(item => item.favorite);
        setDocuments(revsNoFavs);
        setReviewedDocsCopy(revsNoFavs);
        setDocuments2(yets);
        setYetToReviewDocsCopy(yets);
        setFavorites(favs);
        setDocuments3(favs);
      };
      fetchData();
    }, [route.params]),
  );

  useEffect(() => {
    if (isFocused) {
      // console.log('Screen just got focused');
    } else {
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
    setYetToReviewHidden(false);
    setYetToReviewDocsCopy(newYets);
  };
  useEffect(() => {
    const getYets = async () => {
      let yets = await GetDataAsync('yets');
      updateYets(yets);
    };
    if (!modalVisible) {
      // console.log('meme!!!! lol');
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
              <Text allowFontScaling={true} style={styles.textStyle}>
                Go Back
              </Text>
            </Pressable>
          </View>
        </Modal>
        {/*
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
        </Modal> */}
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
          <View style={styles.buttonRow}>
            <Button
              // style={styles.button}
              onPress={() => toggleFavorites()}
              title="Chewiest"
              color={!favoritesHidden ? '#cf610c' : '#000000'}
            />
            <Button
              // style={styles.button}
              onPress={() => toggleYetToReview()}
              title="Yet2Chew"
              color={!yetToReviewHidden ? '#121fde' : '#000000'}
            />
            <Button
              // style={styles.button}
              onPress={() => toggleReviewed()}
              title="Chew'd"
              color={!reviewedHidden ? '#db1d3c' : '#000000'}
            />
            <Button
              // style={styles.button}
              onPress={() => setModalVisible(!modalVisible)}
              title="+Yet2Chew"
              color={'#34B75F'}
            />
          </View>
        </View>
      </View>
    </GestureHandlerRootView>
  );
}

export default Map;
