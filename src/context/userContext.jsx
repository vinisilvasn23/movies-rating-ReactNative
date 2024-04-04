import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createUserRequest, deleteUser, getUserById, loginUser } from "../services/requests/requestsUser";
import { useColorScheme } from "nativewind";
import { ToastAndroid } from "react-native";

const UserContext = createContext();

export const useUser = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [tokenUser, setToken] = useState(null);
  const colorScheme = useColorScheme();

  useEffect(() => {
    const checkLoggedInStatus = async () => {
      setIsLoading(true);
      try {
        const theme = await AsyncStorage.getItem("colorTheme");
        colorScheme.setColorScheme(theme);

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
        ToastAndroid.show("Token expirado. Redirecionando para a tela de login...", ToastAndroid.SHORT);
      } finally {
        setIsLoading(false);
      }
    };

    checkLoggedInStatus();
  }, [isUserLoggedIn, tokenUser]);

  const login = async (data) => {
    setIsLoading(true);
    try {
      const response = await loginUser(data);
      const token = response.access;
      const userId = response.user_id;
      await AsyncStorage.setItem("userToken", token);
      await AsyncStorage.setItem("userId", userId);
      setIsUserLoggedIn(true);
      setToken(token);
      const user = await getUserById(token, userId);
      setUser(user);
      return true;
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
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

  const createUser = async (userData) => {
    setIsLoading(true);
    try {
      await createUserRequest(userData);
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const confirmDeleteAccount = async () => {
    try {
      await deleteUser(tokenUser, user.id);
      await AsyncStorage.removeItem("userToken");
      await AsyncStorage.removeItem("userId");
      setIsUserLoggedIn(false)
    } catch (error) {
      console.error("Erro ao excluir a conta:", error);
    }
  };

  return (
    <UserContext.Provider
      value={{
        isLoading,
        isUserLoggedIn,
        user,
        tokenUser,
        login,
        logout,
        createUser,
        confirmDeleteAccount
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
