import React, {createContext, useContext} from 'react';

// Create a Context
const FunctionContext = createContext();

// Context Provider Component
export const FunctionProvider = ({children}) => {
  const yourFunction = () => {
    console.log('This is a passed function!');
  };

  return (
    <FunctionContext.Provider value={{yourFunction}}>
      {children}
    </FunctionContext.Provider>
  );
};

// Custom hook to use the context
export const useFunction = () => useContext(FunctionContext);
