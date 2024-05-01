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
    //check if already sorted
    let doNotSort = false;
    for (let i = 0; i < revs.length; i++) {
      if (Array.isArray(revs[i])) {
        doNotSort = true;
      }
    }

    if (!doNotSort) {
      let sortedRevs = revs.sort((a, b) => {
        const nameA = a.placeName.toLowerCase();
        const nameB = b.placeName.toLowerCase();
        return nameA.localeCompare(nameB);
      });
      console.log('SORTED REVS IN SORT REVS', sortedRevs);
      return sortedRevs;
    }
  };
  // const consolidateDups = sortedRevs => {
  //   for (let i = 0; i < sortedRevs.length - 1; i++) {
  //     let k = 1;
  //     let arr = [];

  //     if (sortedRevs[i]?.placeName === sortedRevs[i + k]?.placeName) {
  //       while (sortedRevs[i].placeName === sortedRevs[i + k]?.placeName) {
  //         arr.push(sortedRevs[i + k]);
  //         k++;
  //       }
  //       arr.unshift(sortedRevs[i]);
  //       i += k;
  //       sortedRevs.splice(i, k + 1, 'penis', arr, 'penis');
  //       console.log('ARR', arr.length, k + 1);
  //     }
  //   }
  //   console.log('sorted revs in consolidateDups', sortedRevs);
  //   setRevsSorted(true);
  //   return sortedRevs;
  // };

  // function consolidateDups(places) {
  //   const result = []; // This will store the final array of places
  //   let currentGroup = []; // This will temporarily hold groups of places with the same name

  //   places.forEach((place, index) => {
  //     // If current group is empty or current place matches the last one in the group, add to group
  //     if (
  //       currentGroup.length === 0 ||
  //       place.placeName === currentGroup[currentGroup.length - 1].placeName
  //     ) {
  //       currentGroup.push(place);
  //     } else {
  //       // If the current place doesn't match, it means the streak has ended
  //       // Add the current group to the result and reset it
  //       result.push(currentGroup);
  //       currentGroup = [place]; // Start a new group with the current place
  //     }

  //     // If it's the last element, push the remaining group to the result
  //     if (index === places.length - 1) {
  //       result.push(currentGroup);
  //     }
  //   });

  //   return result;
  // }

  function consolidateDups(places) {
    const result = []; // This will store the final array of consolidated places

    let currentGroup = []; // Temporarily holds groups of places with the same name

    places.forEach((place, index) => {
      // If current group is empty or current place matches the last one in the group, add to group
      if (
        currentGroup.length === 0 ||
        place.placeName === currentGroup[currentGroup.length - 1].placeName
      ) {
        currentGroup.push(place);
      } else {
        // Process the completed group to calculate averages
        result.push(processGroup(currentGroup));
        currentGroup = [place]; // Start a new group with the current place
      }

      // If it's the last element, process the remaining group
      if (index === places.length - 1) {
        result.push(processGroup(currentGroup));
      }
    });

    return result;
  }
  function processGroup(group) {
    console.log('PROCESS GROUP', group);
    const averagedRatings = {};
    const summary = {
      placeName: group[0].placeName,
      averagedRatings: {},
    };

    // Initialize summed ratings
    group[0].ratings.forEach(rating => {
      averagedRatings[rating.label] = {sum: 0, count: 0, average: 0};
    });

    // Sum up all ratings in this group
    group.forEach(place => {
      place.ratings.forEach(rating => {
        averagedRatings[rating.label].sum += rating.value;
        averagedRatings[rating.label].count += 1;
      });
    });

    // Calculate averages
    for (let label in averagedRatings) {
      const {sum, count} = averagedRatings[label];
      averagedRatings[label].average = sum / count;
    }

    // Update summary to include these averaged ratings
    summary.averagedRatings = averagedRatings;

    let objToCopy = group[0].ratings;

    let newArr = [];
    objToCopy.forEach((obj, index) => {
      let avg = summary.averagedRatings[obj.label].average;
      let truncatedAvg = Number(avg.toFixed(2));
      let rating = {
        label: obj.label,
        value: truncatedAvg,
      };
      newArr.push(rating);
    });

    let avgGroup = JSON.parse(JSON.stringify(group[0]));
    avgGroup.ratings = newArr;

    if (group.length > 1) {
      group.push(avgGroup);
      return group;
    } else {
      return group[0];
    }
  }

  const [consolidatedRevs, setConsolidatedRevs] = useState(null);

  useEffect(() => {
    let consolidatedPlaces;
    if (!revsSorted) {
      let sorted = sortRevs(revs);
      // let consolidated = consolidateDups(sorted);
      consolidatedPlaces = consolidateDups(sorted);
      // let processed = processGroup(consolidatedPlaces);
      // console.log('consolidatedPlaces', consolidatedPlaces);
    }
    setConsolidatedRevs(consolidatedPlaces);
  }, [revsSorted]);

  return (
    <View>
      <FlatList
        data={consolidatedRevs}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item, index}) => {
          if (Array.isArray(item)) {
            return (
              <View>
                <TouchableOpacity
                  onPress={() => expandRev(index)}
                  style={styles.button}>
                  <Text style={styles.buttonText}>{item[0].placeName}</Text>
                  {index === expandedIndex ? (
                    <View style={styles.container}>
                      {item.map((rev, index) => {
                        return (
                          <View style={styles.ratingsObj}>
                            <TouchableOpacity
                              onPress={() => expandNestedRev(index)}
                              style={styles.button}>
                              {item.length - 1 === index ? (
                                <Text style={styles.buttonText}>Average</Text>
                              ) : (
                                <Text style={styles.buttonText}>Review {index + 1}</Text>
                              )}
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
                <Text style={styles.buttonText}>{item.placeName}</Text>
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
    </View>
  );
};

const styles = StyleSheet.create({
  ratingsObj: {
    fontSize: 40,
    color: 'blue',
  },
  button: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: '#eaeaea',
    fontSize: 60, // Conditional background color
  },
  buttonText: {
    fontSize: 20,
  },
  container: {},
});

export default RenderList;
