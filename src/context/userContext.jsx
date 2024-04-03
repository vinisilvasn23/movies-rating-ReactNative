import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getUserById } from "../services/requests/requestsUser";

const UserContext = createContext();

export const useUser = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [tokenUser, setToken] = useState(null);

  useEffect(() => {
    const checkLoggedInStatus = async () => {
      setIsLoading(true);
      try {
        const token = await AsyncStorage.getItem("userToken");
        const userId = await AsyncStorage.getItem("userId");

        if (token && userId) {
          setToken(token);
          const user = await getUserById(token, userId);
          if (!user) {
            setIsUserLoggedIn(false);
            setUser(null);
          } else {
            setUser(user);
            setIsUserLoggedIn(true);
          }
        }
      } catch (error) {
        console.error("Erro ao verificar o status de login:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkLoggedInStatus();
  }, [isUserLoggedIn, tokenUser]);

  const logout = async () => {
    try {
      setIsLoading(true);
      await AsyncStorage.removeItem("userToken");
      await AsyncStorage.removeItem("userId");
      setIsUserLoggedIn(false);
      setUser(null);
      setToken(null);
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <UserContext.Provider
      value={{
        isLoading,
        isUserLoggedIn,
        setIsUserLoggedIn,
        user,
        tokenUser,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
