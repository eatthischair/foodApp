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
// import {Rating} from 'react-native-stock-star-rating';

import Stars from 'react-native-stars';

const RenderRatingsObj = ({ratings}) => {
  console.log('RENDERATINGSOBJS REVS', ratings);

  return (
    <FlatList
      data={ratings}
      keyExtractor={item => item.place_id}
      renderItem={({item}) => (
        <View style={styles.row}>
          <Text>{item.label}</Text>
          <Stars
            display={item.value}
            spacing={8}
            count={5}
            starSize={40}
            fullStar={require('../android/app/src/main/res/drawable/Stars/starFilled.png')}
            halfStar={require('../android/app/src/main/res/drawable/Stars/starHalf.png')}
            emptyStar={require('../android/app/src/main/res/drawable/Stars/starEmpty.png')}

          />
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
