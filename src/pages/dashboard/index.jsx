import React, { useState } from "react";
import { View, TextInput, ScrollView, TouchableOpacity } from "react-native";
import MovieList from "../../components/movieList";
import Header from "../../components/header";
import { useMovie } from "../../context/movieContext";
import Loading from "../../components/loading";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useUser } from "../../context/userContext";
import { statusBarHeight } from "../../config";
import { Picker } from "@react-native-picker/picker";

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchType, setSearchType] = useState("movies");
  const {
    popularMovies,
    bestAssessmentMovies,
    movieTheaterMovies,
    popularSeries,
    topSeries,
    isLoading,
  } = useMovie();
  const { userToken } = useUser();
  const navigation = useNavigation();
  const handleSearch = () => {
    if (searchQuery.trim() !== "") {
      navigation.navigate("SearchResults", {
        query: searchQuery,
        token: userToken,
        type: searchType,
      });
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <View
      style={{ paddingTop: statusBarHeight }}
      className="dark:bg-slate-900 flex-1 pt-4"
    >
      <Header />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="relative flex-row items-center m-4">
          <TextInput
            className="border border-gray-500 rounded-md p-2 pl-4 flex-1 dark:text-white"
            placeholder="Buscar filmes e séries..."
            placeholderTextColor={"gray"}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <Picker
            selectedValue={searchType}
            style={{
              width: 150,
              borderColor: "gray",
              height: 50,
              color: "gray",
            }}
            onValueChange={(itemValue, itemIndex) => setSearchType(itemValue)}
          >
            <Picker.Item label="Filmes" value="movies" />
            <Picker.Item label="Séries" value="series" />
          </Picker>
          <TouchableOpacity
            onPress={handleSearch}
            className="p-2 bg-gray-800 rounded-lg dark:bg-gray-400"
          >
            <Ionicons name="search" size={24} color="white" />
          </TouchableOpacity>
        </View>
        <View className="mb-4 p-4">
          <MovieList
            title="Filmes Populares"
            data={popularMovies}
            name="popularMovies"
          />
          <MovieList
            title="Melhores Avaliações"
            data={bestAssessmentMovies}
            name="bestAssessmentMovies"
          />
          <MovieList
            title="Filmes em Cartaz"
            data={movieTheaterMovies}
            name="movieTheaterMovies"
          />
          <MovieList
            title="Series Populares"
            data={popularSeries}
            name="popularSeries"
          />
          <MovieList title="Top Series" data={topSeries} name="topSeries" />
        </View>
      </ScrollView>
    </View>
  );
};

export default Dashboard;
