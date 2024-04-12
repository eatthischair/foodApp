import React, {useState} from 'react';
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

import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';
// import {FlatList} from 'react-native-gesture-handler';
import RenderRatingsObj from './RenderRatingsObj';

// const {width, height} = Dimensions.get('window');
const RenderList = ({route}) => {
  const {revs} = route.params;
  let toggleExpanded = revs.map(rev => {
    {
      expanded: false;
    }
  });
  const [expandedIndex, setExpandedIndex] = useState(toggleExpanded);

  const expandRev = index => {
    setExpandedIndex(prevIndex => (prevIndex === index ? null : index));
  };

  // console.log('RENDERLIST REVS', revs);
  return (
    <FlatList
      data={revs}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({item, index}) => (
        <TouchableOpacity
          onPress={() => expandRev(index)}
          style={{
            padding: 20,
            borderBottomWidth: 1,
            borderBottomColor: '#ccc',
            backgroundColor: '#eaeaea', // Conditional background color
          }}>
          <Text>{item.placeName}</Text>
          {/* <Text>
            {item.dishes ? item.dishes.map(dish => <Text>{dish}</Text>) : ''}
          </Text> */}

          {index === expandedIndex ? (
            <View style={styles.ratingsObj}>
              <RenderRatingsObj ratings={item.ratings}></RenderRatingsObj>
              {item.Comments !== '' ? <Text>{item.Comments}</Text> : ''}
            </View>
          ) : (
            ''
          )}
        </TouchableOpacity>
      )}
    />
  );
};

const styles = StyleSheet.create({
  ratingsObj: {},
});

export default RenderList;
