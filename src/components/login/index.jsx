import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  Alert,
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import tw from "tailwind-react-native-classnames";
import { useForm, Controller } from "react-hook-form";
import { loginUser } from "../../services/requests/requestsUser";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import ModalRecoveryPassword from "../modal/modalRecoveryPassword";
import { Link } from 'react-router-native';
import { useUser } from "../../context/userContext";

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
      await AsyncStorage.setItem("userToken", token);
      ToastAndroid.show("Login realizado com sucesso!", ToastAndroid.SHORT);
      setIsUserLoggedIn(true)
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
    <View style={tw`flex-1 justify-center items-center`}>
      <View
        style={[
          tw`bg-white rounded-lg p-6 w-96`,
          {
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 4,
            elevation: 8,
          },
        ]}
      >
        <Text style={tw`text-2xl font-bold mb-2 text-blue-600 text-center`}>
          Seja bem-vindo!
        </Text>
        <Text style={tw`text-sm font-normal mb-4 text-gray-600 text-center`}>
          Aqui você encontra uma variedade de filmes.
        </Text>
        <View style={tw`bg-white rounded-lg p-6 max-w-md relative`}>
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={tw`w-full h-10 border border-gray-300 rounded-md mb-4 px-2`}
                placeholder="Digite seu email"
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
              />
            )}
          />
          {errors.email && (
            <Text style={tw`text-red-500`}>{errors.email?.message}</Text>
          )}
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={tw`w-full h-10 border border-gray-300 rounded-md mb-4 px-2`}
                placeholder="Digite sua senha"
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                secureTextEntry={true}
              />
            )}
          />
          {errors.password && (
            <Text style={tw`text-red-500`}>{errors.password?.message}</Text>
          )}
          <TouchableOpacity
            style={tw`bg-blue-500 rounded-md p-2 mb-4`}
            onPress={handleSubmit(onSubmit)}
          >
            <Text style={tw`text-white text-center`}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setShowRecoveryModal(true)}>
            <Text style={tw`text-sm text-blue-600 text-center`}>
              Esqueceu a senha?
            </Text>
          </TouchableOpacity>
        </View>
        <View style={tw`flex-row mt-2 justify-center items-center`}>
          <Text style={tw`text-sm`}>Ainda não tem uma conta? </Text>
          <TouchableOpacity>
          <Link to="/register">
            <Text style={tw`text-sm text-blue-600`}>Criar nova conta</Text>
            </Link>
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
