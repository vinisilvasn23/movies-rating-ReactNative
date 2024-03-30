import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserContext = createContext();

export const useUser = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

useEffect(() => {
    const checkLoggedInStatus = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        if (token) {
          setIsUserLoggedIn(true);
        } else {
          setIsUserLoggedIn(false);
        }
      } catch (error) {
        console.error('Erro ao verificar o status de login:', error);
      } finally {
        setIsLoading(false);
      }
    };
  
    checkLoggedInStatus();
  }, [isUserLoggedIn]);

  return (
    <UserContext.Provider value={{ isLoading, isUserLoggedIn }}>
      {children}
    </UserContext.Provider>
  );
};
