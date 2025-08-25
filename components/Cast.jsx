import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import { fallbackPersonImage, image185 } from "../api/moviedb";

const { width, height } = Dimensions.get("window");

const Cast = ({ data, navigation }) => {
  return (
    <View className="mx-3 mt-5 mb-6">
      <Text className="text-white text-lg">Top Cast</Text>

      {/* scroll view for all casts */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 0 }}
        className="mt-4"
      >
        {data &&
          data.map((person, index) => {
            return (
              <TouchableOpacity
                key={index}
                className="mr-4 justify-center items-center"
                onPress={() => {
                  navigation.navigate("Person", person);
                }}
              >
                <View className="overflow-hidden rounded-full h-20 w-20 items-center justify-center">
                  <Image
                    className="rounded-full h-20 w-20 border-2 border-neutral-400"
                    source={{
                      uri: image185(person.profile_path) || fallbackPersonImage,
                    }}
                  />
                </View>

                <Text className="text-white text-sm mt-2">
                  {person?.character?.length > 10
                    ? person.character.slice(0, 10) + "..."
                    : person.character}
                </Text>
                <Text className="text-neutral-400 text-sm">
                  {person?.original_name?.length > 10
                    ? person?.original_name?.slice(0, 10) + "..."
                    : person?.original_name}
                </Text>
              </TouchableOpacity>
            );
          })}
      </ScrollView>
    </View>
  );
};

export default Cast;
