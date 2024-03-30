import React from "react";
import { View } from "react-native";
import tw from "tailwind-react-native-classnames";
import RoutesMain from "./src/routes/routesMain";
import { UserProvider } from "./src/context/userContext";

const App = () => {
  return (
    <UserProvider>
      <View style={[tw`flex-1 justify-center items-center`, { transitionDuration: 500 }]}>
        <RoutesMain />
      </View>
    </UserProvider>
  );
};

export default App;
