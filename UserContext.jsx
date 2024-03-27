import React, {createContext, useContext, useState} from 'react';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({children}) => {
  // const {docs1, setDocs1} = useState(null);
  // const {docs2, setDocs2} = useState(null);
  const [revs, setRevs] = useState(null);
  const [yets, setYets] = useState(null);

  return (
    <UserContext.Provider value={{revs, setRevs, yets, setYets}}>
      {children}
    </UserContext.Provider>
  );
};
