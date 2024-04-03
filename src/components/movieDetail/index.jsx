import React, { useEffect, useState } from "react";
import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { statusBarHeight } from "../../config";
import { useMovie } from "../../context/movieContext";
import RatingModal from "../modal/ratingModal";
import { listRatings } from "../../services/requests/requestRating";
import { useUser } from "../../context/userContext";

const MovieDetail = ({ route }) => {
  const { movie, genres } = route.params;
  const navigation = useNavigation();
  const { translationMovie } = useMovie();
  const [translationData, setTranslationData] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const { userToken } = useUser();

  useEffect(() => {
    const fetchTranslation = async () => {
      try {
        const data = await translationMovie(movie.id);

        const portugueseTranslation = data.find(
          (translation) => translation.iso_639_1 === "pt"
        );
        if (portugueseTranslation) {
          const { overview } = portugueseTranslation.data;
          setTranslationData(overview);
        }
      } catch (error) {
        console.error("Erro ao buscar tradução:", error);
      }
    };

    fetchTranslation();
  }, [movie, translationMovie]);

  const mapGenreIdsToNames = (genreIds, genres) => {
    return genreIds.map((genreId) => {
      const genre = genres.find((genre) => genre.id === genreId);
      return genre ? genre.name : "";
    });
  };

  const movieGenres = mapGenreIdsToNames(movie.genre_ids, genres);

  const handleRatingModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const submitRating = async (ratingData) => {
    await listRatings(userToken, ratingData);
    closeModal();
  };

  return (
    <View
      className="flex-1 dark:bg-slate-800 p-5"
      style={{ paddingTop: statusBarHeight }}
    >
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        className="absolute top-12 left-4 z-10"
      >
        <View className="bg-black p-2 rounded-full">
          <Ionicons name="arrow-back" size={24} color="white" />
        </View>
      </TouchableOpacity>
      <ScrollView contentContainerStyle="p-4 mt-12">
        <Image
          source={{
            uri: `https://image.tmdb.org/t/p/w500/${movie.poster_path}`,
          }}
          className="w-full h-96 mb-4"
        />
        <Text className="font-bold text-xl mb-2 dark:text-white">
          {movie.title}
        </Text>
        <Text className="text-sm mb-2 dark:text-white">
          {movie.release_date}
        </Text>
        <Text className="mb-4 dark:text-white">
          {translationData ? translationData : movie.overview}
        </Text>
        <View className="border-t border-gray-300 pt-4">
          <Text className="text-lg font-bold mb-2 dark:text-white">
            Detalhes adicionais:
          </Text>
          <Text className="mb-2 dark:text-white">
            Média de votos: {movie.vote_average}
          </Text>
          <Text className="mb-2 dark:text-white">
            Quantidade de votos: {movie.vote_count}
          </Text>
          <Text className="mb-2 dark:text-white">
            Gêneros: {movieGenres.join(", ")}
          </Text>
        </View>
        <TouchableOpacity
          onPress={handleRatingModal}
          className="bg-blue-500 py-2 px-4 mt-4 rounded-md"
        >
          <Text className="text-white font-bold dark:text-white">
            Comentar e Avaliar
          </Text>
        </TouchableOpacity>
      </ScrollView>
      <RatingModal
        visible={modalVisible}
        onClose={closeModal}
        onSubmit={submitRating}
        movieId={movie.id}
      />
    </View>
  );
};

export default MovieDetail;
