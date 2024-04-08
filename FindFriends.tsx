import React, {useState, useEffect} from 'react';
import {View, TextInput, FlatList, Text, StyleSheet} from 'react-native';
import firestore from '@react-native-firebase/firestore';

const FindFriends = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (searchQuery && searchQuery.length >= 3) {
      const timerId = setTimeout(() => {
        fetchData();
      }, 500); // Debounce the API call

      return () => clearTimeout(timerId);
    }
  }, [searchQuery]);
  const fetchData = async () => {
    if (searchQuery.length < 3) return; // Don't search for too short strings

    try {
      const querySnapshot = await firestore()
        .collection('users')
        .where('username', '>=', searchQuery)
        .where('username', '<=', searchQuery + '\uf8ff')
        .get();
      let docs = querySnapshot.docs.map(doc => doc.data());
      let newDocs = docs.map(item => {
        return item.username;
      });
      console.log('DOCS IN FIDN FRIENDS', newDocs);
      setResults(newDocs);
    } catch (error) {
      console.error(`Error fetching documents from users: `, error);
    }
  };
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        value={searchQuery}
        onChangeText={text => setSearchQuery(text)}
        placeholder="Search..."
      />
      <FlatList
        data={results}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <Text style={styles.itemText}>{item}</Text>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
  searchInput: {
    fontSize: 18,
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    margin: 10,
    borderRadius: 5,
  },
  itemText: {
    fontSize: 16,
    padding: 10,
  },
});

export default FindFriends;
