import { StatusBar } from "expo-status-bar";
import { View, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Bars3BottomLeftIcon,
  MagnifyingGlassIcon,
} from "react-native-heroicons/outline";
import { TouchableOpacity } from "react-native";
import { styles } from "../theme";
import TrendingMovies from "../components/TrendingMovies";
import { useEffect, useState } from "react";
import MovieList from "../components/MovieList";
import { useNavigation } from "@react-navigation/native";
import Loading from "../components/Loading";
import {
  fetchTopRatedMovies,
  fetchTrendingMovies,
  fetchUpcomingMovies,
} from "../api/moviedb";

const HomeScreen = () => {
  const [trendingMovies, setTrendingMovies] = useState([1, 2, 3]);
  const [upcomingMovies, setUpcomingMovies] = useState([1, 2, 3]);
  const [topRatedMovies, setTopRatedMovies] = useState([1, 2, 3]);
  const [loading, setLoading] = useState(true);

  const navigation = useNavigation();

  const getTrendingMovies = async () => {
    const data = await fetchTrendingMovies();
    if (data && data.results) setTrendingMovies(data.results);
    setLoading(false);
  };

  const getUpcomingMovies = async () => {
    const data = await fetchUpcomingMovies();
    if (data && data.results) setUpcomingMovies(data.results);
  };

  const getTopRatedMovies = async () => {
    const data = await fetchTopRatedMovies();
    if (data && data.results) setTopRatedMovies(data.results);
  };

  useEffect(() => {
    getTrendingMovies();
    getUpcomingMovies();
    getTopRatedMovies();
  }, []);

  return (
    <View className="flex-1 bg-neutral-900">
      <SafeAreaView className="mb-3">
        {/* for status bar */}
        <StatusBar style="light" />

        {/* for the heading icons and texts */}
        <View className="flex-row justify-between items-center mx-4 my-4">
          <Bars3BottomLeftIcon size={30} color="white" strokeWidth={2} />
          <Text className="text-white text-3xl font-bold">
            <Text style={styles.text}>M</Text>ovies
          </Text>
          <TouchableOpacity>
            <MagnifyingGlassIcon
              size={30}
              color="white"
              strokeWidth={2}
              onPress={() => {
                navigation.navigate("Search");
              }}
            />
          </TouchableOpacity>
        </View>

        {/* for the body scroll view */}
        {loading ? (
          <Loading />
        ) : (
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingBottom: 10,
            }}
          >
            {/* Trending movies carousel */}
            {trendingMovies.length > 0 && (
              <TrendingMovies data={trendingMovies} />
            )}

            {/* upcoming movies row */}
            <MovieList title="Upcoming" data={upcomingMovies} />

            {/* top rated movies row */}
            <MovieList title="Top Rated" data={topRatedMovies} />
          </ScrollView>
        )}
      </SafeAreaView>
    </View>
  );
};

export default HomeScreen;
