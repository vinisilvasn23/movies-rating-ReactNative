import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useMovie } from "../../context/movieContext";

const MovieList = ({ data, title, name }) => {
  const navigation = useNavigation();
  const { genres } = useMovie();

  const goToMovieDetail = (movie) => {
    navigation.navigate("MovieDetail", { movie: movie, genres: genres });
  };

  const handleSeeMore = (name) => {
    navigation.navigate("MoreMovies", { name: name });
  };

  return (
    <View className="mb-4">
      <Text className="font-bold text-lg mb-2 dark:text-white">{title}</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
      >
        {data.map((movie) => (
          <TouchableOpacity
            key={movie.id}
            className="flex-col mr-4"
            onPress={() => goToMovieDetail(movie)}
          >
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
          </TouchableOpacity>
        ))}
        <TouchableOpacity onPress={() => handleSeeMore(name)}>
          <Text className="text-blue-500 font-bold mt-4">Ver Mais...</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default MovieList;
