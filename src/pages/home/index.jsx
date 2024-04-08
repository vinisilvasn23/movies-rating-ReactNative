import React, { useEffect, useState } from "react";
import Loading from "../../components/loading";
import { useUser } from "../../context/userContext";
import Dashboard from "../dashboard";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginForm from "../../components/login";
import MovieDetail from "../../components/movieDetail";
import RegisterForm from "../../components/register";

const Stack = createStackNavigator();

const Home = () => {
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
              name="Dashboard"
              component={Dashboard}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="MovieDetail"
              component={MovieDetail}
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

export default Home;
