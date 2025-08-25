import { StyleSheet, View } from "react-native";
import "./global.css";
import AppNavigation from "./navigation/appNavigation";

export default function App() {
  return (
    <View style={styles.container}>
      <AppNavigation />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#171717",
  },
});
