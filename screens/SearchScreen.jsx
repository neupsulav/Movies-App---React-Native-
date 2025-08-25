import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
  Image,
  Dimensions,
} from "react-native";
import React, { useCallback, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { XMarkIcon } from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";
import Loading from "../components/Loading";
import { debounce } from "lodash";
import { fallbackMovieImage, image500, searchMovies } from "../api/moviedb";
const { width, height } = Dimensions.get("window");

const SearchScreen = () => {
  const navigation = useNavigation();

  const [results, setResults] = useState([]);

  const [loading, setLoading] = useState(false);

  const [noResults, setNoResults] = useState(false);

  const handleSearch = async (value) => {
    if (value && value.length > 2) {
      setLoading(true);
      searchMovies({
        query: value,
        include_adult: "false",
        language: "en-US",
      }).then((data) => {
        setLoading(false);
        setResults(data.results);
        setNoResults(!data.results || data.results.length === 0);
      });
    } else {
      setNoResults(false);
      setLoading(false);
      setResults([]);
    }
  };

  const handleSearchDebounce = useCallback(debounce(handleSearch, 500), []);

  return (
    <SafeAreaView className="flex-1 bg-neutral-900">
      <View className="mt-4 mx-2 mb-3 flex-row justify-between items-center border-2 border-neutral-500 rounded-full">
        <TextInput
          onChangeText={handleSearchDebounce}
          placeholder="Search Movie"
          placeholderTextColor={"lightgray"}
          className="px-8 py-3 text-base font-semibold text-white tracking-wider w-[80%]"
        />

        <TouchableOpacity
          className="rounded-full p-3 bg-neutral-500 m-1"
          onPress={() => {
            navigation.navigate("Home");
          }}
        >
          <XMarkIcon size="25" color={"white"} strokeWidth={2} />
        </TouchableOpacity>
      </View>

      {/* Search results */}
      {loading ? (
        <Loading />
      ) : results.length > 0 ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 15 }}
        >
          <Text className="mt-2 text-white  font-semibold text-lg">
            Results ({results.length})
          </Text>

          <View className="flex-row flex-wrap justify-between">
            {results &&
              results.map((item, index) => {
                return (
                  <TouchableWithoutFeedback
                    key={index}
                    onPress={() => {
                      navigation.navigate("Movie", item);
                    }}
                  >
                    <View className="my-3">
                      <Image
                        className="rounded-3xl"
                        style={{ width: width * 0.4, height: height * 0.33 }}
                        source={{
                          uri: image500(item.poster_path) || fallbackMovieImage,
                        }}
                      />
                      <Text className="text-white text-center mt-2">
                        {item?.title?.length > 20
                          ? item?.title?.slice(0, 20) + "..."
                          : item?.title}
                      </Text>
                    </View>
                  </TouchableWithoutFeedback>
                );
              })}
          </View>
        </ScrollView>
      ) : (
        <View className="flex-col justify-center items-center mt-6">
          <Image
            className="mt-4 w-56 h-56"
            // style={{ width: width, height: height * 0.5 }}
            source={require("../assets/images/watch-movies.png")}
          />
          {noResults && (
            <Text className="text-white text-2xl mt-6">
              Oops! No movies found
            </Text>
          )}
        </View>
      )}
    </SafeAreaView>
  );
};

export default SearchScreen;
