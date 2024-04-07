import React, {createContext, useContext, useState} from 'react';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({children}) => {
  const [revs, setRevs] = useState(null);
  const [yets, setYets] = useState(null);
  const [userId, setUserId] = useState(null);
  const [username, setUsername] = useState(null);
  return (
    <UserContext.Provider
      value={{
        revs,
        setRevs,
        yets,
        setYets,
        userId,
        setUserId,
        username,
        setUsername,
      }}>
      {children}
    </UserContext.Provider>
  );
};
