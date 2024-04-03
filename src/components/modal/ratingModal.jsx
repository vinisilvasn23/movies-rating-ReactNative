import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput, Modal } from "react-native";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object().shape({
  rating: yup
    .number()
    .required("Avaliação é obrigatória")
    .min(1, "Avaliação deve ser no mínimo 1")
    .max(5, "Avaliação deve ser no máximo 5"),
  description: yup.string().required("Descrição é obrigatória"),
});

const RatingModal = ({ visible, onClose, onSubmit, movieId }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [ratingValue, setRatingValue] = useState("");
  const [descriptionValue, setDescriptionValue] = useState("");

  const handleFormSubmit = () => {
    onSubmit({ movieId, rating: ratingValue, description: descriptionValue });
    onClose();
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View
        className="flex-1 justify-center items-center bg-black bg-opacity-50"
        style={{
          flex: 1,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View className="bg-white p-4 rounded-md w-80">
          <Text className="text-lg font-bold mb-2">Comentar e Avaliar</Text>
          <Controller
            control={control}
            name="rating"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                className="w-full h-10 border border-gray-300 rounded-md mb-4 px-2 dark:text-white"
                placeholder="Avaliação (1-5)"
                keyboardType="numeric"
                onChangeText={onChange}
                onBlur={onBlur}
                placeholderTextColor={"gray"}
                value={value}
              />
            )}
          />
          {errors.rating && (
            <Text className="text-red-500 mb-2">{errors.rating.message}</Text>
          )}

          <Controller
            control={control}
            name="description"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                className="w-full h-10 border border-gray-300 rounded-md mb-4 px-2 dark:text-white"
                placeholder="Descrição"
                multiline={true}
                numberOfLines={4}
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                placeholderTextColor={"gray"}
              />
            )}
          />
          {errors.description && (
            <Text className="text-red-500 mb-2">
              {errors.description.message}
            </Text>
          )}
          <View className="flex flex-row justify-between">
            <TouchableOpacity
              onPress={handleSubmit(handleFormSubmit)}
              className="bg-blue-500 py-2 px-4 rounded-md flex-1 mr-2"
            >
              <Text className="text-white font-bold text-center">Enviar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={onClose}
              className="bg-gray-300 py-2 px-4 rounded-md flex-1 ml-2"
            >
              <Text className="text-black font-bold text-center">Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default RatingModal;
