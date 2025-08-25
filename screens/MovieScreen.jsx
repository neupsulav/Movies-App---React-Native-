import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Platform,
  Dimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { HeartIcon } from "react-native-heroicons/solid";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles, theme } from "../theme";
import { Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Cast from "../components/Cast";
import MovieList from "../components/MovieList";
import Loading from "../components/Loading";
import {
  fallbackMovieImage,
  fetchMovieCreditDetails,
  fetchMovieDetails,
  fetchSimilarMoviesDetails,
  image500,
} from "../api/moviedb";

const { width, height } = Dimensions.get("window");

const ios = Platform.OS === "ios";
const marginTop = ios ? "" : " mt-3";

const MovieScreen = () => {
  const navigation = useNavigation();

  const { params: item } = useRoute();

  const [isFavourite, toggleIsFavourite] = useState(false);

  const [castData, setCastData] = useState([]);

  const [similarMovies, setSimilarMovies] = useState([]);

  const [loading, setLoading] = useState(false);

  const [movie, setMovie] = useState({});

  const getMovieDetails = async (id) => {
    const data = await fetchMovieDetails(id);
    if (data) setMovie(data);
    setLoading(false);
  };

  const getMovieCredits = async (id) => {
    const data = await fetchMovieCreditDetails(id);
    if (data) setCastData(data.cast);
    setLoading(false);
  };

  const getSimilarMovies = async (id) => {
    const data = await fetchSimilarMoviesDetails(id);
    if (data) setSimilarMovies(data.results);
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    getMovieDetails(item.id);
    getMovieCredits(item.id);
    getSimilarMovies(item.id);
  }, [item]);

  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: 20 }}
      className="flex-1 bg-neutral-900"
    >
      {/* back button and favourite button */}
      <View className="w-full">
        <SafeAreaView
          className={
            "absolute z-20 w-full flex-row justify-between items-center px-4" +
            marginTop
          }
        >
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
            style={styles.background}
            className="rounded-xl px-0.5 py-0.5"
          >
            <ChevronLeftIcon size={28} strokeWidth={2.5} color="white" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              toggleIsFavourite(!isFavourite);
            }}
          >
            <HeartIcon
              size={28}
              strokeWidth={2}
              color={isFavourite ? theme.background : "white"}
            />
          </TouchableOpacity>
        </SafeAreaView>

        {/* for image part */}
        {loading ? (
          <Loading />
        ) : (
          <SafeAreaView>
            <Image
              style={{ width: width, height: height * 0.5 }}
              source={{
                uri: image500(movie?.poster_path) || fallbackMovieImage,
              }}
            />
            <LinearGradient
              colors={["transparent", "rgba(23,23,23,0.8)", "rgba(23,23,23,1)"]}
              style={{ width: width, height: height * 0.4 }}
              start={{ x: 0.5, y: 0 }}
              end={{ x: 0.5, y: 1 }}
              className="absolute bottom-0"
            />
          </SafeAreaView>
        )}
      </View>

      {/* movie details */}
      <View style={{ marginTop: -(height * 0.17) }} className="gap-2">
        <Text className="text-white text-3xl text-center font-bold tracking-wider">
          {movie?.title}
        </Text>

        {/* status, release date and run time for movie */}
        {movie?.id ? (
          <Text className="text-neutral-400 text-lg mt-2 tracking-wider text-center">
            {movie?.status} · {movie?.release_date?.split("-")[0]} ·{" "}
            {movie?.runtime} min
          </Text>
        ) : null}

        {/* genre */}
        <View className="flex-row justify-center items-center">
          {movie?.genres?.map((genre, index) => {
            let showDot = index + 1 !== movie.genres.length;
            return (
              <Text
                key={index}
                className="text-lg text-neutral-400 tracker-wider mt-2 mr-2"
              >
                {genre?.name} {showDot && "·"}
              </Text>
            );
          })}
        </View>

        {/* description */}
        <Text className="text-neutral-400 text-base px-2 my-4 tracking-wider">
          {movie?.overview}
        </Text>
      </View>

      {/* cast members */}
      {castData.length > 0 && <Cast navigation={navigation} data={castData} />}

      {/* similar movies */}
      {similarMovies.length > 0 && (
        <MovieList
          hideSeeAll={true}
          title="Similar Movies"
          data={similarMovies}
        />
      )}
    </ScrollView>
  );
};

export default MovieScreen;
