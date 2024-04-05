import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from "react-native";
import { useMovie } from "../../context/movieContext";
import { statusBarHeight } from "../../config";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const MoreMovies = ({ route }) => {
  const { name } = route.params;
  const {
    fetchPopularMovies,
    fetchBestAssessmentMovies,
    fetchMovieTheaterMovies,
    fetchPopularSeries,
    fetchTopSeries,
  } = useMovie();
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const navigation = useNavigation();
  const { genres } = useMovie();

  useEffect(() => {
    loadMovies();
  }, []);

  const fetchMoviesByType = async (page) => {
    switch (name) {
      case "popularMovies":
        return await fetchPopularMovies({ page: page });
      case "bestAssessmentMovies":
        return await fetchBestAssessmentMovies({ page: page });
      case "movieTheaterMovies":
        return await fetchMovieTheaterMovies({ page: page });
      case "popularSeries":
        return await fetchPopularSeries({ page: page });
      case "topSeries":
        return await fetchTopSeries({ page: page });
      default:
        throw new Error("Invalid movie type");
    }
  };

  const loadMovies = async () => {
    setIsLoading(true);
    try {
      const newMovies = await fetchMoviesByType(page);
      setMovies((prevMovies) => [...prevMovies, ...newMovies]);
      setPage((prevPage) => prevPage + 1);
    } catch (error) {
      console.error("Error fetching movies:", error);
    } finally {
      setIsLoading(false);
    }
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

  const goToMovieDetail = (movie) => {
    navigation.navigate("MovieDetail", { movie: movie, genres: genres });
  };

  return (
    <View className="dark:bg-slate-800">
      <ScrollView onScroll={handleScroll}>
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
            Resultados:
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
                    {movie.title}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
          {isLoading && <ActivityIndicator size="large" color="#0000ff" />}
        </View>
      </ScrollView>
    </View>
  );
};

export default MoreMovies;
