import React, {useState, useEffect} from 'react';
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
  const [expandedNestedIndex, setExpandedNestedIndex] =
    useState(toggleExpanded);

  const expandRev = index => {
    setExpandedIndex(prevIndex => (prevIndex === index ? null : index));
  };

  const expandNestedRev = index => {
    setExpandedNestedIndex(prevIndex => (prevIndex === index ? null : index));
  };

  // console.log('RENDERLIST REVS', revs);
  const [revsSorted, setRevsSorted] = useState(false);

  const sortRevs = revs => {
    let sortedRevs = revs.sort((a, b) => {
      const nameA = a.placeName.toLowerCase();
      const nameB = b.placeName.toLowerCase();

      if (nameA < nameB) {
        return -1; // a should come before b
      }
      if (nameA > nameB) {
        return 1; // b should come before a
      }
      return 0; // names are equal
    });

    for (let i = 0; i < sortedRevs.length - 1; ) {
      if (
        sortedRevs[i].placeName.toLowerCase() ===
        sortedRevs[i + 1].placeName.toLowerCase()
      ) {
        const duplicates = [sortedRevs[i], sortedRevs[i + 1]]; // Create an array of duplicates
        sortedRevs.splice(i, 2, duplicates); // Remove the two items and insert the array
        i += 1;
      } else {
        i += 1;
      }
    }
    setRevsSorted(true);
    return sortedRevs;
  };

  useEffect(() => {
    if (!revsSorted) {
      sortRevs(revs);
    }
  }, []);

  return (
    // <FlatList
    //   data={revs}
    //   keyExtractor={(item, index) => index.toString()}
    //   renderItem={({item, index}) => (
    //     <TouchableOpacity
    //       onPress={() => expandRev(index)}
    //       style={{
    //         padding: 20,
    //         borderBottomWidth: 1,
    //         borderBottomColor: '#ccc',
    //         backgroundColor: '#eaeaea', // Conditional background color
    //       }}>
    //       <Text>{item.placeName}</Text>
    //       {index === expandedIndex ? (
    //         <View style={styles.ratingsObj}>
    //           <RenderRatingsObj ratings={item.ratings}></RenderRatingsObj>
    //           {item.Comments !== '' ? <Text>{item.Comments}</Text> : ''}
    //         </View>
    //       ) : (
    //         ''
    //       )}
    //     </TouchableOpacity>
    //   )}
    // />

    <FlatList
      data={revs}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({item, index}) => {
        if (Array.isArray(item)) {
          return (
            <View>
              <TouchableOpacity
                onPress={() => expandRev(index)}
                style={styles.button}>
                <Text>{item[0].placeName}</Text>
                {index === expandedIndex ? (
                  <View>
                    {item.map((rev, index) => {
                      return (
                        <View style={styles.ratingsObj}>
                          <TouchableOpacity
                            onPress={() => expandNestedRev(index)}
                            style={styles.button}>
                            <Text>review {index + 1}</Text>
                          </TouchableOpacity>
                          {index === expandedNestedIndex ? (
                            <RenderRatingsObj
                              ratings={rev.ratings}></RenderRatingsObj>
                          ) : (
                            ''
                          )}
                          {/* {item.Comments !== '' ? (
                            <Text>{item.Comments}</Text>
                          ) : (
                            ''
                          )} */}
                        </View>
                      );
                    })}
                  </View>
                ) : (
                  ''
                )}
              </TouchableOpacity>
            </View>
          );
        } else {
          // Render the usual way for objects
          return (
            <TouchableOpacity
              onPress={() => expandRev(index)}
              style={styles.button}>
              <Text>{item.placeName}</Text>
              {index === expandedIndex ? (
                <View style={styles.ratingsObj}>
                  <RenderRatingsObj ratings={item.ratings}></RenderRatingsObj>
                  {item.Comments !== '' ? <Text>{item.Comments}</Text> : ''}
                </View>
              ) : (
                ''
              )}
            </TouchableOpacity>
          );
        }
      }}
    />
  );
};

const styles = StyleSheet.create({
  ratingsObj: {},
  button: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: '#eaeaea', // Conditional background color
  },
});

export default RenderList;
