import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from 'react-native';
import {Rating} from 'react-native-stock-star-rating';

const RenderRatingsObj = ({ratings}) => {
  console.log('RENDERATINGSOBJS REVS', ratings);

  return (
    <FlatList
      data={ratings}
      keyExtractor={item => item.place_id}
      renderItem={({item}) => (
        <View style={styles.row}>
          <Text>{item.label}</Text>
          <Rating stars={item.value}></Rating>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10, // Adjust the spacing between rows as needed
  },
});

export default RenderRatingsObj;
