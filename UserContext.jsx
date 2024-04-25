import React, {createContext, useContext, useState} from 'react';
import {styles} from './AppStyles.js';
import {TouchableOpacity, Text} from 'react-native';
const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({children}) => {
  // const [contextRevs, setContextRevs] = useState(null);
  const contextRevs = createContext(null);
  const contextYets = createContext(null);

  // const [contextYets, setContextYets] = useState(null);
  const [userId, setUserId] = useState(null);
  const [username, setUsername] = useState(null);
  const [favs, setFavs] = useState(null);

  const CustomTouchable = ({title, onPress}) => {
    return (
      <TouchableOpacity
        style={styles.Homebuttons}
        onPress={onPress}
        activeOpacity={0.8}>
        <Text style={styles.HomebuttonText}>{title}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <UserContext.Provider
      value={{
        contextRevs,
        contextYets,
        userId,
        setUserId,
        username,
        setUsername,
        CustomTouchable,
        favs,
        setFavs,
      }}>
      {children}
    </UserContext.Provider>
  );
};
