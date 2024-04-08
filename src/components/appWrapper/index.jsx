import React from "react";
import { StatusBar } from "react-native";
import { useColorScheme } from "nativewind";

const AppWrapper = ({ children }) => {
  const colorScheme = useColorScheme();
  const statusBarStyle =
    colorScheme.colorScheme === "dark" ? "light-content" : "dark-content";

  return (
    <>
      <StatusBar
        barStyle={statusBarStyle}
        backgroundColor="transparent"
        translucent={true}
      />
      {children}
    </>
  );
};

export default AppWrapper;