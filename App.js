import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./screens/Login.js";
import React from "react";
import HomeScreen from "./navigate/HomeStack";
import { LoginPhoto } from "./components/enlargeImage";

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          options={{ headerShown: false }}
          name="Login"
          component={Login}
        />
        <Stack.Screen
          options={{
            headerLeft: () => <LoginPhoto size={"small"} />,
            headerTitle: " My Doggo",
            headerTitleStyle: {
              fontSize: 22,
            },
          }}
          name="Home"
          component={HomeScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
