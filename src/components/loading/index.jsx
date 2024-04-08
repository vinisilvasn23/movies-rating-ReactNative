import { Asset } from "expo-asset";
import { Image } from "expo-image";
import React from "react";
import { View } from "react-native";
import { useColorScheme } from "nativewind";
import Spinner from "react-native-loading-spinner-overlay";

const Loading = () => {
  const logoAsset = Asset.fromModule(require("../../../assets/logo.png"));
  const uri = logoAsset.uri;
  const colorScheme = useColorScheme();

  return (
    <View className="flex-1 justify-center items-center dark:bg-slate-900">
      <View className="flex items-center mb-8">
        <View className="flex items-center">
          <Image
            source={{ uri }}
            style={{
              width: 115,
              height: 115,
              tintColor:
                colorScheme.colorScheme === "dark"
                  ? "rgb(255, 255, 255)"
                  : undefined,
            }}
          />
          <Spinner
            visible={true}
            textContent={"Carregando..."}
            textClassName={
              colorScheme.colorScheme === "dark"
                ? "text-lg text-white"
                : "text-lg text-gray-700"
            }
            overlayColor={"rgba(0, 0, 0, 0.5)"}
          />
        </View>
      </View>
      <Spinner
        visible={true}
        textContent={"Carregando..."}
        textClassName={"text-lg text-gray-700 dark:text-white"}
        overlayColor={"rgba(0, 0, 0, 0.5)"}
      />
    </View>
  );
};

export default Loading;
