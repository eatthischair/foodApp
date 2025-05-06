import { StyleSheet, View, Alert } from 'react-native';
import {
  MD3LightTheme as DefaultTheme,
  PaperProvider,
  Button,
  BottomNavigation,
  Text,
} from 'react-native-paper';
import { useState, useEffect } from 'react';
import { Link } from 'expo-router';
import React from 'react';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { supabase } from '@/utils/supabase';
import coordinates from '../data/coordinates.json';

export default function Index() {
  // const [firstLoad, setFirstLoad] = useState(true);
  // const [data, setData] = useState(null);

  // useEffect(() => {
  //   getProfile();
  // }, []);

  // async function getProfile() {
  //   console.log('in getprifile boss');
  //   try {
  //     const { data, error, status } = await supabase
  //       .from('Restaurants')
  //       .select(`Coordinates`);
  //     console.log('dddd', data, error, status);
  //     if (error && status !== 406) {
  //       throw error;
  //     }
  //     if (data) {
  //       console.log('DATA', data);
  //     }
  //     // setData(data);
  //   } catch (error) {
  //     if (error instanceof Error) {
  //       Alert.alert(error.message);
  //     }
  //   } finally {
  //     // setFirstLoad(false);
  //   }
  // }

  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: 'black',
      secondary: 'yellow',
    },
  };

  function formatCoordinates(coordArray) {
    coordArray = coordArray.split(',');
    return coordArray.map(Number);
  }

  let filteredCoords = coordinates.filter(
    (item) => item.Coordinates.split(',').length === 2
  );

  return (
    <PaperProvider theme={theme}>
      <View style={styles.container}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: 32.7767,
            longitude: -96.797,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          {filteredCoords.map((item, index) => {
            let coords = formatCoordinates(item.Coordinates);
            return (
              <Marker
                key={index}
                coordinate={{ latitude: coords[0], longitude: coords[1] }}
              />
            );
          })}
        </MapView>
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});
