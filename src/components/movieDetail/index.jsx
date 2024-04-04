import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { statusBarHeight } from "../../config";
import { useMovie } from "../../context/movieContext";
import { useUser } from "../../context/userContext";
import { listRatings, postRatings } from "../../services/requests/requestRating";
import RatingModal from "../modal/ratingModal";

const MovieDetail = ({ route }) => {
  const { movie, genres } = route.params;
  const navigation = useNavigation();
  const { translationMovie } = useMovie();
  const [translationData, setTranslationData] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const { tokenUser } = useUser();
  const [ratings, setRatings] = useState([]);

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
    fetchRatings();
  }, [movie, translationMovie, submitRating]);

  const fetchRatings = async () => {
    try {
      const ratingsResponse = await listRatings(tokenUser, { movie_id: movie.id });
      setRatings(ratingsResponse);
    } catch (error) {
      console.error("Erro ao buscar ratings:", error);
    }
  };

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
    await postRatings(tokenUser, ratingData);
    fetchRatings();
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
            Média de votos: {movie.vote_average.toFixed(1)}
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
          className="bg-blue-500 rounded-md py-2 px-4 mt-4 items-center justify-center"
        >
          <Text className="text-white font-bold dark:text-white">
            Comentar e Avaliar
          </Text>
        </TouchableOpacity>
        <View>
        <Text className="mt-6 text-lg font-bold mb-2 dark:text-white">Avaliações:</Text>
        {ratings.map((rating, index) => (
          <View key={index} className="bg-gray-300 p-4 rounded-lg mb-4">
            <Text className="font-bold mb-1">{rating.user.name}</Text>
            <Text className="mb-1">Comentário: {rating.description}</Text>
            <Text>Nota: {rating.rating}</Text>
          </View>
        ))}
      </View>
      </ScrollView>

      <RatingModal
        visible={modalVisible}
        onClose={closeModal}
        onSubmit={submitRating}
        movie_id={movie.id}
      />
    </View>
  );
};

export default MovieDetail;
