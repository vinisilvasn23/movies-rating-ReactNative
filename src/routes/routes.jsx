import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import Loading from "../components/loading";
import LoginForm from "../components/login";
import MovieDetail from "../components/movieDetail";
import Profile from "../components/profile";
import RegisterForm from "../components/register";
import SearchResults from "../components/searchResults";
import { useUser } from "../context/userContext";
import Dashboard from "../pages/dashboard";
import { useColorScheme } from "nativewind";
import MoreMovies from "../components/moreMovies";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const Routes = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { isUserLoggedIn } = useUser();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) return <Loading />;

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isUserLoggedIn ? (
          <>
            <Stack.Screen
              name="Main"
              component={MainScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="MovieDetail"
              component={MovieDetail}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="SearchResults"
              component={SearchResults}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="MoreMovies"
              component={MoreMovies}
              options={{ headerShown: false }}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="Login"
              component={LoginForm}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Register"
              component={RegisterForm}
              options={{ headerShown: false }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const MainScreen = () => {
  const { isUserLoggedIn, user } = useUser();
  const colorScheme = useColorScheme();

  return (
    <>
      {isUserLoggedIn && user ? (
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarStyle: {
              backgroundColor:
                colorScheme.colorScheme === "dark" ? "#333" : "#fff",
            },
          })}
        >
          <Tab.Screen
            name="Dashboard"
            component={Dashboard}
            options={{
              tabBarShowLabel: false,
              headerShown: false,
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="home" size={size} color={color} />
              ),
            }}
          />
          <Tab.Screen
            name="Profile"
            component={Profile}
            options={{
              tabBarShowLabel: false,
              headerShown: false,
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="person" size={size} color={color} />
              ),
            }}
          />
        </Tab.Navigator>
      ) : (
        <Stack.Screen
          name="Login"
          component={LoginForm}
          options={{ headerShown: false }}
        />
      )}
    </>
  );
};

export default Routes;
