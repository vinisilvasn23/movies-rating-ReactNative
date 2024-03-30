import React from "react";
import { View, Text, TextInput, ToastAndroid, TouchableOpacity } from "react-native";
import tw from "tailwind-react-native-classnames";
import { useForm, Controller } from "react-hook-form";
import { createUser } from "../../services/requests/requestsUser";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigation } from '@react-navigation/native';
import { Link } from "react-router-native";

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

  const onSubmit = async (data) => {
    try {
      await createUser(data);
      ToastAndroid.show("criado usuário!", ToastAndroid.SHORT);
      useNavigation.navigate('Login');
    } catch (error) {
      Alert.alert('Erro', 'Usuário já existe!', [{ text: 'OK', onPress: () => console.log('OK Pressed') }], { cancelable: false });
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
          Faça seu registro!
        </Text>
        <Text style={tw`text-sm font-normal mb-4 text-gray-600 text-center`}>
          Aqui você encontra uma variedade de filmes.
        </Text>
        <Controller
          control={control}
          name="name"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={tw`w-full h-10 border border-gray-300 rounded-md mb-4 px-2`}
              placeholder="Digite seu nome"
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
            />
          )}
        />
        {errors.name && (
          <Text style={tw`text-red-500`}>{errors.name?.message}</Text>
        )}
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
         <View style={tw`flex-row justify-between`}>
          <TouchableOpacity
            style={[tw`bg-blue-500 rounded-md p-2`]}
            onPress={handleSubmit(onSubmit)}
          >
            <Text style={tw`text-white`}>Registrar</Text>
          </TouchableOpacity>

          <Link to="/login" component={TouchableOpacity} style={[tw`bg-gray-500 rounded-md p-2`]}>
            <Text style={tw`text-white`}>Voltar</Text>
          </Link>
        </View>
      </View>
    </View>
  );
};

export default RegisterForm;
