import { useColorScheme } from "nativewind";
import React from "react";
import { Alert, Switch, Text, TouchableOpacity, View } from "react-native";
import tw from "tailwind-react-native-classnames";
import { useUser } from "../../context/userContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const Profile = () => {
  const { user, logout, confirmDeleteAccount } = useUser();
  const { colorScheme, toggleColorScheme } = useColorScheme();
  const navigation = useNavigation();

  const renderProfileImage = (name) => {
    if (name) {
      const initials = name
        .split(" ")
        .map((word) => word.charAt(0))
        .join("");
      return (
        <View
          style={tw`w-12 h-12 rounded-full bg-gray-300 justify-center items-center`}
        >
          <Text style={tw`text-white text-lg font-bold`}>{initials}</Text>
        </View>
      );
    }
  };

  const toggleColor = async () => {
    const newColorScheme = colorScheme === "dark" ? "light" : "dark";
    toggleColorScheme();
    try {
      await AsyncStorage.setItem("colorTheme", newColorScheme);
    } catch (error) {
      console.error("Erro ao salvar o tema:", error);
    }
  };

  const onLogout = () => {
    Alert.alert(
      "Logout",
      "Deseja sair da sua conta?",
      [
        {
          text: "Cancelar",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "Sair", onPress: () => handleLogout() },
      ],
      { cancelable: false }
    );
  };

  const handleLogout = () => {
    logout();
  };

  const onDeleteAccount = () => {
    Alert.alert(
      "Excluir Conta",
      "Tem certeza de que deseja excluir sua conta? Essa ação é irreversível.",
      [
        {
          text: "Cancelar",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "Excluir", onPress: () => confirmDeleteAccount() },
      ],
      { cancelable: false }
    );
  };

  return (
    <View className="flex-1 justify-center items-center dark:bg-slate-800">
    <View className="mb-8">{renderProfileImage(user?.name)}</View>
    <View className="mb-8">
      <Text className="text-lg font-bold dark:text-white">{user?.name}</Text>
      <Text className="dark:text-white">{user?.email}</Text>
    </View>
    <View className="w-full px-4 flex items-center justify-center">
      <View className="flex-col items-center">
        <Text className="text-gray-700 mr-2 dark:text-white">
          Ativar modo escuro
        </Text>
        <Switch value={colorScheme === "dark"} onValueChange={toggleColor} />
      </View>
      <TouchableOpacity
        onPress={onDeleteAccount}
        className="bg-red-500 py-3 rounded-md mb-4 w-36"
      >
        <Text className="text-white text-center font-bold">
          Excluir Conta
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={onLogout}
        className="bg-red-500 py-3 rounded-md mb-4 w-36"
      >
        <Text className="text-white text-center font-bold">
          Sair da Conta
        </Text>
      </TouchableOpacity>
    </View>
  </View>
  );
};

export default Profile;
