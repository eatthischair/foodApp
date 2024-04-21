import React from 'react';
import {UserProvider} from './UserContext'; // Path to your UserContext
import {PaperProvider} from 'react-native-paper';

import App from './App';

const Main = () => {
  return (
    <UserProvider>
      <PaperProvider>
        <App />
      </PaperProvider>
    </UserProvider>
  );
};

export default Main;
