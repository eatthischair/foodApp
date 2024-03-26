import React, {createContext, useContext, useState} from 'react';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({children}) => {
  // const {docs1, setDocs1} = useState(null);
  // const {docs2, setDocs2} = useState(null);
  const [user1, setUser1] = useState(null);

  return (
    <UserContext.Provider value={{user1, setUser1}}>
      {children}
    </UserContext.Provider>
  );
};
