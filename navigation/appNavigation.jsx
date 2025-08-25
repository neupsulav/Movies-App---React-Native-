import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import MovieScreen from "../screens/MovieScreen";
import PersonScreen from "../screens/PersonScreen";
import SearchScreen from "../screens/SearchScreen";

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "#171717",
  },
};

const stack = createNativeStackNavigator();

const AppNavigation = ({ children }) => {
  return (
    <NavigationContainer theme={MyTheme}>
      <stack.Navigator>
        <stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <stack.Screen
          name="Movie"
          component={MovieScreen}
          options={{ headerShown: false }}
        />
        <stack.Screen
          name="Person"
          component={PersonScreen}
          options={{ headerShown: false }}
        />

        <stack.Screen
          name="Search"
          component={SearchScreen}
          options={{ headerShown: false }}
        />
      </stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
