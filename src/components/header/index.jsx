import React from "react";
import { View, Text, Image } from "react-native";
import { useUser } from "../../context/userContext";

const Header = () => {
  const { user } = useUser();

  const initials = user
    ? user.name
        .split(" ")
        .map((namePart) => namePart[0])
        .join("")
        .toUpperCase()
    : "";

  return (
    <View
      className={"dark:bg-slate-800 py-4 px-6 items-center"}
      style={{
        zIndex: 1,
        borderBottomColor: "rgba(0, 0, 0, 0.3)",
        borderBottomWidth: 4,
      }}
    >
      <View className="flex-row justify-between w-full items-center">
        <Image
          source={require("../../../assets/icon.png")}
          className="w-12 h-12"
        />
        <View className="rounded-full bg-blue-500 w-10 h-10 justify-center items-center">
          <Text className="text-white text-lg font-bold">{initials}</Text>
        </View>
      </View>
    </View>
  );
};
export default Header;
