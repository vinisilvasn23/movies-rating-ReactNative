import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useMovie } from "../../context/movieContext";

const MovieList = ({ data, title }) => {
  const navigation = useNavigation();
  const { genres } = useMovie();

  const goToMovieDetail = (movie) => {
    navigation.navigate("MovieDetail", { movie: movie, genres: genres });
  };

  return (
    <View className="mb-4">
      <Text className="font-bold text-lg mb-2 dark:text-white">{title}</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
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
              className="w-24 h-32 mb-2"
            />
            <Text
              className="text-sm dark:text-white"
              style={{ maxWidth: 80 }}
              numberOfLines={2}
            >
              {movie.title}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default MovieList;
