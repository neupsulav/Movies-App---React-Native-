import { View, Text, Dimensions } from "react-native";
import * as Progress from "react-native-progress";
import { theme } from "../theme";

const { width, height } = Dimensions.get("window");

const Loading = () => {
  return (
    <View
      style={{ width, height }}
      className="absolute flex-1 justify-center items-center"
    >
      <Progress.CircleSnail
        size={160}
        thickness={12}
        color={theme.background}
      />
    </View>
  );
};

export default Loading;
