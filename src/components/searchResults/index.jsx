import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { findMovies } from "../../services/requests/requestMovies";
import { Ionicons } from "@expo/vector-icons";
import { statusBarHeight } from "../../config";
import { useMovie } from "../../context/movieContext";

const SearchResults = () => {
  const [movies, setMovies] = useState([]);
  const route = useRoute();
  const { query, token } = route.params;
  const navigation = useNavigation();
  const { genres } = useMovie();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const data = await findMovies(token, { query: query });
        setMovies(data.results);
      } catch (error) {
        console.error("Erro ao buscar filmes:", error);
      }
    };
    fetchMovies();
  }, [query]);

  const goToMovieDetail = (movie) => {
    navigation.navigate("MovieDetail", { movie: movie, genres: genres });
  };

  return (
    <ScrollView className="dark:bg-slate-800">
      <View style={{ paddingTop: statusBarHeight }}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="absolute top-12 left-4 z-10"
          style={{ zIndex: 1 }}
        >
          <View className="bg-black p-2 rounded-full">
            <Ionicons name="arrow-back" size={24} color="white" />
          </View>
        </TouchableOpacity>
      </View>
      <View className="p-4 pt-20">
        <Text className="text-xl font-bold mb-4 text-center dark:text-white">
          Resultados da pesquisa para "{query}"
        </Text>
        <View className="flex-row flex-wrap justify-center">
          {movies.map((movie) => (
            <TouchableOpacity
              key={movie.id}
              className="mb-4 mr-4"
              onPress={() => goToMovieDetail(movie)}
            >
              <View className="flex-col">
                <Image
                  source={{
                    uri: `https://image.tmdb.org/t/p/w500/${movie.poster_path}`,
                  }}
                  className="w-24 h-32 mb-2"
                />
                <Text
                  className="text-sm dark:text-white"
                  style={{ maxWidth: 80 }}
                  numberOfLines={2}
                >
                  {movie.title}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default SearchResults;
