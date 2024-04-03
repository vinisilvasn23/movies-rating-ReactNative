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

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { popularMovies, bestAssessmentMovies, movieTheaterMovies, isLoading } =
    useMovie();
  const { userToken } = useUser();

  const navigation = useNavigation();
  const handleSearch = () => {
    if (searchQuery.trim() !== "") {
      navigation.navigate("SearchResults", {
        query: searchQuery,
        token: userToken,
      });
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <View
      className="dark:bg-slate-800 flex-1"
      style={{ zIndex: 1, paddingTop: statusBarHeight }}
    >
      <Header />
      <View className="relative flex-row items-center m-4">
        <TextInput
          className="border border-gray-500 rounded-md p-2 pl-10 flex-1 dark:text-white"
          placeholder="Buscar filmes..."
          placeholderTextColor={'gray'}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <TouchableOpacity onPress={handleSearch} className={`p-2`}>
          <Ionicons name="search" size={24} color="gray" />
        </TouchableOpacity>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="mb-4 p-4">
          <MovieList title="Filmes Populares" data={popularMovies} />
          <MovieList title="Melhores Avaliações" data={bestAssessmentMovies} />
          <MovieList title="Filmes em Cartaz" data={movieTheaterMovies} />
        </View>
      </ScrollView>
    </View>
  );
};

export default Dashboard;
