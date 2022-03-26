import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Provider } from "react-redux";

import Login from "./screens/Login.js";
import Register from "./screens/Register.js";
import HomeScreen from "./navigate/HomeStack";
import RemotePushNotification from "./services/RemotePushNotification";
import { LoginPhoto } from "./components/enlargeImage";
import Store from "./helpers/Store";

const Stack = createStackNavigator();

function App() {
  return (
    <>
      <Provider store={Store}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Login">
            <Stack.Screen
              options={{ headerShown: false }}
              name="Login"
              component={Login}
            />
            <Stack.Screen name="Register" component={Register} />
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
        <RemotePushNotification />
      </Provider>
    </>
  );
}

export default App;
