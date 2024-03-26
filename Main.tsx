import React from 'react';
import {UserProvider} from './UserContext'; // Path to your UserContext
import App from './App';

const Main = () => {
  return (
    <UserProvider>
      <App />
    </UserProvider>
  );
};

export default Main;
