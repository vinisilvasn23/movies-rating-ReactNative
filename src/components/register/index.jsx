import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { AntDesign } from "@expo/vector-icons";
import {
  Alert,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import * as yup from "yup";
import { useUser } from "../../context/userContext";

const registerSchema = yup.object({
  name: yup.string().required("O nome é obrigatório."),
  email: yup
    .string()
    .email("O email deve ser válido.")
    .required("O email é obrigatório."),
  password: yup
    .string()
    .min(6, "A senha deve ter pelo menos 6 caracteres.")
    .required("A senha é obrigatória."),
});

const RegisterForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema),
  });
  const navigation = useNavigation();
  const { createUser } = useUser();
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data) => {
    try {
      await createUser(data);
      Alert.alert("Sucesso", "Usuário criado com sucesso!", [
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ]);
      navigation.navigate("Login");
    } catch (error) {
      Alert.alert("Erro", "Usuário já existe!");
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
          Faça seu registro!
        </Text>
        <Text className="text-sm font-normal mb-4 text-gray-600 text-center">
          Aqui você encontra uma variedade de filmes.
        </Text>
        <Controller
          control={control}
          name="name"
          render={({ field: { onChange, onBlur, value } }) => (
            <>
              <Text className="dark:text-white mb-2">Nome</Text>
              <TextInput
                className="w-full h-10 border border-gray-300 rounded-md mb-4 px-2 dark:text-white"
                placeholder="Digite seu nome"
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                placeholderTextColor={"gray"}
              />
              {errors.name && (
                <Text className="text-red-500">{errors.name?.message}</Text>
              )}
            </>
          )}
        />
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, onBlur, value } }) => (
            <>
              <Text className="dark:text-white mb-2">Email</Text>
              <TextInput
                className="w-full h-10 border border-gray-300 rounded-md mb-4 px-2 dark:text-white"
                placeholder="Digite seu email"
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                placeholderTextColor={"gray"}
              />
              {errors.email && (
                <Text className="text-red-500">{errors.email?.message}</Text>
              )}
            </>
          )}
        />
        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, onBlur, value } }) => (
            <>
              <Text className="dark:text-white mb-2">Senha</Text>
              <View style={{ flexDirection: "row" }}>
                <TextInput
                  className="w-full h-10 border border-gray-300 rounded-md mb-4 px-2 dark:text-white"
                  placeholder="Digite sua senha"
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                  secureTextEntry={!showPassword}
                  placeholderTextColor={"gray"}
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                  style={{
                    position: "absolute",
                    right: 1,
                    top: "20%",
                    transform: [{ translateY: -10 }],
                    padding: 8,
                  }}
                >
                  <AntDesign
                    name={showPassword ? "eye" : "eyeo"}
                    size={20}
                    color="#a8a8a8"
                  />
                </TouchableOpacity>
              </View>
              {errors.password && (
                <Text className="text-red-500">{errors.password?.message}</Text>
              )}
            </>
          )}
        />
        <View className="flex-row justify-between">
          <TouchableOpacity
            className="bg-blue-500 rounded-md p-2"
            onPress={handleSubmit(onSubmit)}
          >
            <Text className="text-white">Registrar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="bg-gray-500 rounded-md p-2"
            onPress={() => navigation.navigate("Login")}
          >
            <Text className="text-white">Voltar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default RegisterForm;
