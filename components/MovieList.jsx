import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
  Dimensions,
} from "react-native";
import React from "react";
import { styles } from "../theme";
import { useNavigation } from "@react-navigation/native";
import { Image } from "react-native";
import { fallbackMovieImage, image185, image342 } from "../api/moviedb";

const { width, height } = Dimensions.get("window");

const MovieList = ({ title, data, hideSeeAll }) => {
  const navigation = useNavigation();

  return (
    <View className="mb-8">
      <View className="mx-4 flex-row justify-between">
        <Text className="text-white text-xl">{title}</Text>
        {!hideSeeAll && (
          <TouchableOpacity>
            <Text style={styles.text} className="text-lg">
              See All
            </Text>
          </TouchableOpacity>
        )}
      </View>

      {/* movies row */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}
      >
        {data.map((item, index) => {
          return (
            <TouchableWithoutFeedback
              key={index}
              onPress={() => {
                navigation.push("Movie", item);
              }}
            >
              <View className="mr-4 mt-4">
                <Image
                  className="rounded-2xl"
                  style={{ width: width * 0.33, height: height * 0.22 }}
                  source={{
                    uri: image185(item.poster_path) || fallbackMovieImage,
                  }}
                />
                <Text className="text-white mr-4">
                  {item?.title?.length > 14
                    ? item.title.slice(0, 14) + "..."
                    : item.title}
                </Text>
              </View>
            </TouchableWithoutFeedback>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default MovieList;
