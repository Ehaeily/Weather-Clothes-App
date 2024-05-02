const Stack = createNativeStackNavigator();
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";
import IOSRainyNightMain from "./screens/IOSRainyNightMain";
import IOSNightLogin from "./screens/IOSNightLogin";
import IOSNightSurvey from "./screens/IOSNightSurvey";
import IOSNight10days from "./screens/IOSNight10days";
import IOSNightMenu from "./components/IOSNightMenu";
import IOSNightSignup from "./screens/IOSNightSignup";
import IOSNightSetting from "./screens/IOSNightSetting";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Text, Pressable, TouchableOpacity } from "react-native";

const App = () => {
  const [hideSplashScreen, setHideSplashScreen] = React.useState(true);

  const [fontsLoaded, error] = useFonts({
    "Inter-Regular": require("./assets/fonts/Inter-Regular.ttf"),
    "Inter-ExtraBold": require("./assets/fonts/Inter-ExtraBold.ttf"),
    "Inter-Black": require("./assets/fonts/Inter-Black.ttf"),
    "Actor-Regular": require("./assets/fonts/Actor-Regular.ttf"),
    "Jost-Regular": require("./assets/fonts/Jost-Regular.ttf"),
    "EncodeSansSemiCondensed-Regular": require("./assets/fonts/EncodeSansSemiCondensed-Regular.ttf"),
  });

  if (!fontsLoaded && !error) {
    return null;
  }

  return (
    <>
      <NavigationContainer>
        {hideSplashScreen ? (
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen
              name="IOSRainyNightMain"
              component={IOSRainyNightMain}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="IOSNightLogin"
              component={IOSNightLogin}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="IOSNightSurvey"
              component={IOSNightSurvey}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="IOSNight10days"
              component={IOSNight10days}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="IOSNightSignup"
              component={IOSNightSignup}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="IOSNightSetting"
              component={IOSNightSetting}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        ) : null}
      </NavigationContainer>
    </>
  );
};
export default App;
