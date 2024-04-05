import { AntDesign } from "@expo/vector-icons";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";
import * as yup from "yup";
import { useUser } from "../../context/userContext";
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
  const navigation = useNavigation();
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useUser();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    const success = await login(data);
    if (!success) {
      Alert.alert("Erro", "Email ou senha inválido!");
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
              <>
                <Text className="dark:text-white mb-2">Nome</Text>
                <TextInput
                  className="w-full h-10 border border-gray-300 rounded-md px-2 dark:text-white"
                  placeholder="Digite seu email"
                  onChangeText={onChange}
                  onBlur={onBlur}
                  placeholderTextColor={"gray"}
                  value={value}
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
                <Text className="dark:text-white mb-2 mt-4">Senha</Text>
                <View style={{ flexDirection: "row" }}>
                  <TextInput
                    className="w-full h-10 border border-gray-300 rounded-md px-2 dark:text-white"
                    placeholder="Digite sua senha"
                    onChangeText={onChange}
                    onBlur={onBlur}
                    value={value}
                    placeholderTextColor={"gray"}
                    secureTextEntry={!showPassword}
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
                  <Text className="text-red-500">
                    {errors.password?.message}
                  </Text>
                )}
              </>
            )}
          />
          <TouchableOpacity
            className="bg-blue-500 rounded-md p-2 mb-4 mt-4"
            onPress={handleSubmit(onSubmit)}
          >
            <Text className="text-white text-center">Login</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setShowRecoveryModal(true)}>
            <Text className="text-sm text-blue-400 text-center">
              Esqueceu a senha?
            </Text>
          </TouchableOpacity>
        </View>
        <View className="flex-row mt-2 justify-center items-center dark:text-white">
          <Text className="text-sm dark:text-white">
            Ainda não tem uma conta?{" "}
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Register")}>
            <Text className="text-sm text-blue-400">Criar nova conta</Text>
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
