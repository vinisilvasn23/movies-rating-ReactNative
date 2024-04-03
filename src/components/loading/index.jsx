import React from "react";
import { View, Image } from "react-native";
import Spinner from "react-native-loading-spinner-overlay";

const Loading = () => {
  return (
    <View className="flex-1 justify-center items-center">
      <View className="flex items-center mb-8">
        <View className="flex items-center">
          <Image
            source={require("../../../assets/logo.png")}
            style={{ width: 120, height: 120 }}
          />
        </View>
      </View>
      <Spinner
        visible={true}
        textContent={"Carregando..."}
        textClassName={"text-lg text-gray-700"}
        overlayColor={"rgba(0, 0, 0, 0.5)"}
      />
    </View>
  );
};

export default Loading;
