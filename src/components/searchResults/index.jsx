import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { findMovies, findSeries } from "../../services/requests/requestMovies";
import { Ionicons } from "@expo/vector-icons";
import { statusBarHeight } from "../../config";
import { useMovie } from "../../context/movieContext";

const SearchResults = () => {
  const [movies, setMovies] = useState([]);
  const route = useRoute();
  const { query, token, type } = route.params;
  const navigation = useNavigation();
  const { genres } = useMovie();
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    loadMovies();
  }, [query, type]);

  const fetchResults = async () => {
    try {
      setIsLoading(true);
      let data = [];
      if (type === "movies") {
        data = await findMovies(token, { query: query, page: page });
      } else if (type === "series") {
        data = await findSeries(token, { query: query, page: page });
      }
      return data.results;
    } catch (error) {
      console.error("Erro ao buscar filmes:", error);
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  const loadMovies = async () => {
    const newMovies = await fetchResults();
    setMovies((prevMovies) => [...prevMovies, ...newMovies]);
    setPage((prevPage) => prevPage + 1);
  };

  const goToMovieDetail = (movie) => {
    navigation.navigate("MovieDetail", { movie: movie, genres: genres });
  };

  const handleScroll = (event) => {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
    const paddingToBottom = 20;
    if (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
    ) {
      loadMovies();
    }
  };

  return (
    <ScrollView className="dark:bg-slate-800" onScroll={handleScroll}>
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
          {movies.map((movie, index) => (
            <TouchableOpacity
              key={index}
              className="mb-4 mr-4"
              onPress={() => goToMovieDetail(movie)}
            >
              <View className="flex-col">
                <Image
                  source={{
                    uri: `https://image.tmdb.org/t/p/w500/${movie.poster_path}`,
                  }}
                  style={{ width: 120, height: 180, borderRadius: 8 }}
                />
                <Text
                  className="text-sm dark:text-white"
                  style={{ maxWidth: 80 }}
                  numberOfLines={2}
                >
                  {movie.title ? movie.title : movie.name}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
        {isLoading && <ActivityIndicator size="large" color="#0000ff" />}
      </View>
    </ScrollView>
  );
};

export default SearchResults;
