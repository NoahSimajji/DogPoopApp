import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Contents from './screens/Contents.js';
import Profile from './screens/Profile.js';
import Settings from './screens/Settings.js';
import Login from './screens/Login.js';
import React from 'react';
import Text from 'react-native';
import { MaterialCommunityIcons, Ionicons, AntDesign } from '@expo/vector-icons';
import { LoginPhoto } from "./components/enlargeImage";
import { MaterialIcons } from "@expo/vector-icons";


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function HomeScreen() {
  return (
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          component={Contents}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="home" color={color} size={30} />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            tabBarLabel: 'Profile',
            tabBarIcon: ({ color }) => (
              <AntDesign name="profile" color={color} size={30} />
            ),
          }}
        />
        <Tab.Screen
          name="Settings"
          component={Settings}
          options={{
            tabBarLabel: 'Settings',
            tabBarIcon: ({ color }) => (
              <Ionicons name="ios-settings" color={color} size={30} />
            ),
          }}
        />
      </Tab.Navigator>
  );
}
  function NameApplication() {
    return(
      <Text style={{paddingTop:18,fontFamily: 'AmericanTypewriter-Bold',fontSize:28 }}>My Doggo App</Text>
    )
  }

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen options={{headerShown: false}} name="Login" component={Login} />
        <Stack.Screen options={{
        headerLeft: ()=>(
          <LoginPhoto size={"small"}/>

        ), 
        headerRight: ()=>(
          <MaterialIcons name="history" size={35} color="black" style={{marginRight:15}} />
        ), 
        headerTitle:"My Doggo App",
        headerTitleStyle:{
          fontFamily:'AmericanTypewriter-Bold',
          fontSize:22
        }
        }}
        name="Home" component={HomeScreen} />
        {/* <Stack.Screen name="Details" component={Settings} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;


