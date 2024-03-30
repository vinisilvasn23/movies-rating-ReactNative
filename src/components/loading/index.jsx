import React from 'react';
import { View, Image } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import tw from 'tailwind-react-native-classnames';

const Loading = () => {
  return (
    <View style={tw`flex-1 justify-center items-center`}>
      <View style={tw`flex items-center mb-8`}>
        <View style={tw`flex items-center`}>
          <Image
            source={require("../../../assets/logo.png")}
            style={{ width: 120, height: 120 }}
          />
        </View>
      <Spinner
        visible={true}
        textContent={'Carregando...'}
        textStyle={tw`text-lg text-gray-700`}
        overlayColor={'rgba(0, 0, 0, 0.5)'}
      />
      </View>
    </View>
  );
};

export default Loading;
