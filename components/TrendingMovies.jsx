import { View, Text, TouchableWithoutFeedback } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import { useSharedValue } from "react-native-reanimated";
import { Dimensions } from "react-native";
import React from "react";
import { Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { fallbackMovieImage, image500 } from "../api/moviedb";

const { width, height } = Dimensions.get("window");

const TrendingMovies = ({ data }) => {
  const ref = React.useRef(null);
  const progress = useSharedValue(0);

  const navigation = useNavigation();

  const handleClick = (item) => {
    navigation.navigate("Movie", item);
  };

  return (
    <View className="mb-8">
      <Text className="text-xl text-white mx-5 mb-4 items-start">Trending</Text>

      {/* carousel view */}
      <View className="flex-1 justify-center items-center">
        <Carousel
          ref={ref}
          width={width}
          mode="parallax"
          modeConfig={{
            parallaxScrollingScale: 0.95, // side items smaller
            parallaxScrollingOffset: 150, // gap between items
            parallaxAdjacentItemScale: 0.8, // further shrink adjacent
          }}
          height={height * 0.4}
          data={data}
          onProgressChange={progress}
          renderItem={({ item, index }) => (
            <MovieCard key={index} item={item} handleClick={handleClick} />
          )}
        />
      </View>
    </View>
  );
};

const MovieCard = ({ item, handleClick }) => {
  return (
    <View className="items-center justify-center">
      <TouchableWithoutFeedback
        onPress={() => {
          handleClick(item);
        }}
      >
        <Image
          style={{ width: width * 0.6, height: height * 0.4, borderRadius: 12 }}
          source={{
            uri: image500(item.poster_path) || fallbackMovieImage,
          }}
        />
      </TouchableWithoutFeedback>
    </View>
  );
};

export default TrendingMovies;
