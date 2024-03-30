import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import Login from "../../components/login";
import Loading from "../../components/loading";
import { useUser } from "../../context/userContext";

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
    <View>
      {isUserLoggedIn ? <Text>O usuário está logado!</Text> : <Login />}
    </View>
  );
};

export default Home;
