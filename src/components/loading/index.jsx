import React from "react";
import { View } from "react-native";
import { Image } from "expo-image";
import Spinner from "react-native-loading-spinner-overlay";
import { Asset } from "expo-asset";

const Loading = () => {
  const logoAsset = Asset.fromModule(require("../../../assets/logo.png"));
  const uri = logoAsset.uri;

  return (
    <View className="flex-1 justify-center items-center dark:bg-slate-800">
      <View className="flex items-center mb-8">
        <View className="flex items-center">
          <Image
            source={{ uri }}
            style={{ width: 115, height: 115 }}
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
