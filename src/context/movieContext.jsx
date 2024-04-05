import React, { createContext, useContext, useEffect, useState } from "react";
import {
  listPopularMovies,
  listBestAssessmentMovies,
  listMovieTheaterMovies,
  findMovies,
  listGenres,
  translationMovieData,
  listPopularSeries,
  listTopSeries,
  findSeries,
} from "../services/requests/requestMovies";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useUser } from "./userContext";

const MovieContext = createContext();

export const useMovie = () => {
  return useContext(MovieContext);
};

export const MovieProvider = ({ children }) => {
  const [popularMovies, setPopularMovies] = useState([]);
  const [popularSeries, setPopularSeries] = useState([]);
  const [topSeries, setTopSeries] = useState([]);
  const [bestAssessmentMovies, setBestAssessmentMovies] = useState([]);
  const [movieTheaterMovies, setMovieTheaterMovies] = useState([]);
  const [foundMovies, setFoundMovies] = useState([]);
  const [foundSeries, setFoundSeries] = useState([]);
  const [genres, setGenres] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { userToken } = useUser();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const token = await AsyncStorage.getItem("userToken");
        const popularMoviesResponse = await listPopularMovies(token, undefined);
        const bestAssessmentMoviesResponse = await listBestAssessmentMovies(
          token
        );
        const popularSeriesResponse = await listPopularSeries(token);
        const topSeriesResponse = await listTopSeries(token);
        const movieTheaterMoviesResponse = await listMovieTheaterMovies(token);
        const genresResponse = await listGenres(token);
        setPopularMovies(popularMoviesResponse.results);
        setPopularSeries(popularSeriesResponse.results);
        setTopSeries(topSeriesResponse.results);
        setBestAssessmentMovies(bestAssessmentMoviesResponse.results);
        setMovieTheaterMovies(movieTheaterMoviesResponse.results);
        setGenres(genresResponse.genres);
      } catch (error) {
        console.error("Erro ao buscar filmes:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const fetchPopularMovies = async (params) => {
    try {
      const response = await listPopularMovies(userToken, params);
      return response.results;
    } catch (error) {
      console.error("Erro ao buscar filmes populares:", error);
    }
  };

  const fetchBestAssessmentMovies = async (params) => {
    try {
      const response = await listBestAssessmentMovies(userToken, params);
      return response.results;
    } catch (error) {
      console.error("Erro ao buscar melhores filmes avaliados:", error);
    }
  };

  const fetchMovieTheaterMovies = async (params) => {
    try {
      const response = await listMovieTheaterMovies(userToken, params);
      return response.results;
    } catch (error) {
      console.error("Erro ao buscar filmes em cartaz:", error);
    }
  };

  const searchMovies = async (params) => {
    try {
      const response = await findMovies(userToken, params);
      setFoundMovies(response.results);
    } catch (error) {
      console.error("Erro ao buscar filmes:", error);
    }
  };

  const searchSeries = async (params) => {
    try {
      const response = await findSeries(userToken, params);
      setFoundSeries(response.results);
    } catch (error) {
      console.error("Erro ao buscar filmes:", error);
    }
  };

  const translationMovie = async (id) => {
    try {
      const response = await translationMovieData(userToken, id);
      return response.translations;
    } catch (error) {
      console.error("Erro ao buscar melhores filmes avaliados:", error);
    }
  };

  const fetchPopularSeries = async (params) => {
    try {
      const response = await listPopularMovies(userToken, params);
      return response.results;
    } catch (error) {
      console.error("Erro ao buscar filmes populares:", error);
    }
  };

  const fetchTopSeries = async (params) => {
    try {
      const response = await listBestAssessmentMovies(userToken, params);
      return response.results;
    } catch (error) {
      console.error("Erro ao buscar melhores filmes avaliados:", error);
    }
  };

  return (
    <MovieContext.Provider
      value={{
        popularMovies,
        popularSeries,
        topSeries,
        bestAssessmentMovies,
        movieTheaterMovies,
        foundMovies,
        genres,
        isLoading,
        foundSeries,
        fetchPopularMovies,
        fetchBestAssessmentMovies,
        fetchMovieTheaterMovies,
        searchMovies,
        translationMovie,
        fetchPopularSeries,
        fetchTopSeries,
        searchSeries,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};
