import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  Alert,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { forgotPassword } from "../../services/requests/requestsUser";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const modalSchema = yup.object({
  email: yup
    .string()
    .email("O email deve ser válido")
    .required("O email é obrigatório"),
});

const ModalRecoveryPassword = ({ showRecoveryModal, setShowRecoveryModal }) => {
  const [forgotEmail, setForgotEmail] = useState("");
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(modalSchema),
  });

  const handleForgotPassword = async () => {
    try {
      await forgotPassword({ email: forgotEmail });
      setForgotEmail("");
      setShowRecoveryModal(false);
      Alert.alert(
        "Sucesso",
        "Email de recuperação enviado com sucesso!",
        [{ text: "OK", onPress: () => console.log("OK Pressed") }],
        { cancelable: false }
      );
    } catch (error) {
      Alert.alert("Erro", "Ocorreu um erro ao enviar o email de recuperação!", {
        cancelable: false,
      });
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={showRecoveryModal}
      onRequestClose={() => {
        setShowRecoveryModal(false);
      }}
    >
      <View
        className="flex-1 justify-center items-center"
        style={{
          flex: 1,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View className="bg-white rounded-lg p-6 w-80 dark:bg-gray-600">
          <Text className="text-lg font-bold mb-2 text-center dark:text-white">
            Esqueceu a senha?
          </Text>
          <Text className="text-sm font-normal mb-4 text-gray-600 text-center dark:text-white">
            Digite seu email para recuperar sua senha.
          </Text>
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                className="w-full h-10 border border-gray-300 rounded-md mb-4 px-2"
                placeholder="Digite seu email"
                onChangeText={(text) => {
                  setForgotEmail(text);
                  onChange(text);
                }}
                onBlur={onBlur}
                value={value}
                placeholderTextColor={"gray"}
              />
            )}
          />
          {errors.email && (
            <Text className="text-red-500">{errors.email?.message}</Text>
          )}
          <TouchableOpacity
            className="bg-blue-500 rounded-md p-2 mb-4"
            onPress={handleSubmit(handleForgotPassword)}
          >
            <Text className="text-white text-center">Enviar</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setShowRecoveryModal(false)}>
            <Text className="text-sm text-blue-600 text-center">Cancelar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ModalRecoveryPassword;
