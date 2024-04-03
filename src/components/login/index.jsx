import React, { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { Controller, useForm } from "react-hook-form";
import {
  Alert,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import * as yup from "yup";
import { useUser } from "../../context/userContext";
import { loginUser } from "../../services/requests/requestsUser";
import ModalRecoveryPassword from "../modal/modalRecoveryPassword";

const loginSchema = yup.object({
  email: yup
    .string()
    .email("O email deve ser válido")
    .required("O email é obrigatório"),
  password: yup.string().required("A senha é obrigatória"),
});

const LoginForm = () => {
  const [showRecoveryModal, setShowRecoveryModal] = useState(false);
  const { setIsUserLoggedIn } = useUser();
  const navigation = useNavigation();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await loginUser(data);
      const token = response.access;
      const userId = response.user_id;
      await AsyncStorage.setItem("userToken", token);
      await AsyncStorage.setItem("userId", userId);
      ToastAndroid.show("Login realizado com sucesso!", ToastAndroid.SHORT);
      setIsUserLoggedIn(true);
    } catch (error) {
      Alert.alert(
        "Erro",
        "Email ou senha inválido!",
        [{ text: "OK", onPress: () => console.log("OK Pressed") }],
        { cancelable: false }
      );
    }
  };

  return (
    <View className="flex-1 justify-center items-center dark:bg-slate-800">
      <View
        className="bg-white rounded-lg p-6 w-96 dark:bg-gray-600"
        style={{
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.3,
          shadowRadius: 4,
          elevation: 8,
        }}
      >
        <Text className="text-2xl font-bold mb-2 text-blue-600 text-center dark:text-white">
          Seja bem-vindo!
        </Text>
        <Text className="text-sm font-normal mb-4 text-gray-600 text-center dark:text-white">
          Aqui você encontra uma variedade de filmes.
        </Text>
        <View className="bg-white rounded-lg p-6 max-w-md relative dark:bg-gray-600">
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                className="w-full h-10 border border-gray-300 rounded-md mb-4 px-2 dark:text-white"
                placeholder="Digite seu email"
                onChangeText={onChange}
                onBlur={onBlur}
                placeholderTextColor={"gray"}
                value={value}
              />
            )}
          />
          {errors.email && (
            <Text className="text-red-500">{errors.email?.message}</Text>
          )}
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                className="w-full h-10 border border-gray-300 rounded-md mb-4 px-2 dark:text-white"
                placeholder="Digite sua senha"
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                placeholderTextColor={"gray"}
                secureTextEntry={true}
              />
            )}
          />
          {errors.password && (
            <Text className="text-red-500">{errors.password?.message}</Text>
          )}
          <TouchableOpacity
            className="bg-blue-500 rounded-md p-2 mb-4"
            onPress={handleSubmit(onSubmit)}
          >
            <Text className="text-white text-center">Login</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setShowRecoveryModal(true)}>
            <Text className="text-sm text-blue-600 text-center">
              Esqueceu a senha?
            </Text>
          </TouchableOpacity>
        </View>
        <View className="flex-row mt-2 justify-center items-center dark:text-white">
          <Text className="text-sm dark:text-white">
            Ainda não tem uma conta?{" "}
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Register")}>
            <Text className="text-sm text-blue-600">Criar nova conta</Text>
          </TouchableOpacity>
        </View>
      </View>
      {showRecoveryModal && (
        <ModalRecoveryPassword
          showRecoveryModal={showRecoveryModal}
          setShowRecoveryModal={setShowRecoveryModal}
        />
      )}
    </View>
  );
};

export default LoginForm;
