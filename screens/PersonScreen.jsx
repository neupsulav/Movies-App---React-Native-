import {
  View,
  Text,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useEffect, useState } from "react";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { HeartIcon } from "react-native-heroicons/solid";
import { styles, theme } from "../theme/index";
import { useNavigation, useRoute } from "@react-navigation/native";
import MovieList from "../components/MovieList";
import Loading from "../components/Loading";
import {
  fallbackPersonImage,
  fetchPersonDetails,
  fetchPersonMovies,
  image342,
} from "../api/moviedb";

const { width, height } = Dimensions.get("window");

const PersonScreen = () => {
  const { params: item } = useRoute();

  const [isFavourite, toggleIsFavourite] = useState(false);

  const [personMovies, setPersonMovies] = useState([]);

  const [loading, setLoading] = useState(false);

  const [person, setPerson] = useState({});

  const navigation = useNavigation();

  const getPersonDetails = async (id) => {
    const data = await fetchPersonDetails(id);
    if (data) setPerson(data);
    setLoading(false);
  };

  const getPersonMovies = async (id) => {
    const data = await fetchPersonMovies(id);
    if (data) setPersonMovies(data.cast);
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    getPersonDetails(item.id);
    getPersonMovies(item.id);
  }, [item]);

  return (
    <ScrollView
      className="flex-1 bg-neutral-900"
      contentContainerStyle={{ paddingBottom: 20 }}
    >
      <SafeAreaView className="mt-4 z-20 w-full flex-row justify-between items-center px-4">
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

      {/* person details */}
      {loading ? (
        <Loading />
      ) : (
        <View>
          <View className="flex-row justify-center">
            <View
              className="rounded-full overflow-hidden"
              style={{
                shadowColor: "white",
                shadowOpacity: 1,
                shadowOffset: { width: 0, height: 4 },
                shadowRadius: 8,
                elevation: 70, // Android
              }}
            >
              <Image
                className="rounded-full border-4 border-neutral-300"
                style={{ width: width * 0.6, height: height * 0.3 }}
                source={{
                  uri: image342(person?.profile_path) || fallbackPersonImage,
                }}
              />
            </View>
          </View>

          {/* name */}
          <View className="mt-6">
            <Text className="text-white text-2xl text-center tracking-wider">
              {person?.name}
            </Text>
            <Text className="mt-2 text-neutral-400 text-base text-center tracking-wider">
              {person?.place_of_birth}
            </Text>
          </View>

          {/* box with further details */}
          <View className="p-4 mt-4 mx-3 flex-row justify-center items-center rounded-full bg-neutral-700">
            <View className=" items-center p-2 border-r-2 border-r-neutral-400">
              <Text className="font-semibold text-s text-white">Gender</Text>
              <Text className="text-m text-neutral-400">
                {person?.gender === 1 ? "Female" : "Male"}
              </Text>
            </View>
            <View className="  items-center p-2 border-r-2 border-r-neutral-400">
              <Text className="font-semibold text-s text-white">Birthday</Text>
              <Text className="text-m text-neutral-400">
                {person?.birthday}
              </Text>
            </View>
            <View className="  items-center p-2 border-r-2 border-r-neutral-400">
              <Text className="font-semibold text-s text-white">Known for</Text>
              <Text className="text-m text-neutral-400">
                {person?.known_for_department}
              </Text>
            </View>
            <View className="  items-center p-2 ">
              <Text className="font-semibold text-s text-white">
                Popularity
              </Text>
              <Text className="text-m text-neutral-400">
                {person?.popularity?.toFixed(2)} %
              </Text>
            </View>
          </View>

          {/* biography */}
          <View className="mt-6 mx-4 mb-6">
            <Text className="text-white text-lg">Biography</Text>
            <Text className="text-neutral-300 text-sm mt-3">
              {person?.biography || "N/A"}
            </Text>
          </View>

          {/* person's movies */}
          <MovieList hideSeeAll={true} title="Movies" data={personMovies} />
        </View>
      )}
    </ScrollView>
  );
};

export default PersonScreen;
