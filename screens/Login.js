import React, { useState, useCallback, useEffect } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  TextInput,
  KeyboardAvoidingView,
  Dimensions,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as Facebook from "expo-facebook";
import { LoginPhoto, FacebookLoginButton } from "../components/enlargeImage";
import { StackActions } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const phoneWidth = Dimensions.get("window").width;

export default function App({ navigation }) {
  const [userName, setUserName] = useState("");
  const [userPassword, setPassword] = useState("");
  const [appIsReady, setAppIsReady] = useState(false);
  const [userDetails, setUserDetails] = useState("");

  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();
        await Font.loadAsync(Entypo.font);

        const userId = await AsyncStorage.getItem("@MySuperStore:key1");
        const userName = await AsyncStorage.getItem("@MySuperStore:key2");

        await new Promise((resolve) => {
          setUserDetails({ userId: userId, userName: userName });
          setTimeout(resolve, 1500);
        });
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }

    if (userDetails.userId !== null) {
      navigation.dispatch(StackActions.replace("Home"));
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  facebookLogIn = async () => {
    try {
      await Facebook.initializeAsync({
        appId: "2893493817548941",
      });

      const { type, token } = await Facebook.logInWithReadPermissionsAsync({
        permissions: ["public_profile"],
      });
      if (type === "success") {
        const response = await fetch(
          `https://graph.facebook.com/me?access_token=${token}`
        );

        let userInfo = await response.json();

        try {
          await AsyncStorage.setItem(
            "@MySuperStore:key2",
            userInfo.name
          ).then();
          await AsyncStorage.setItem("@MySuperStore:key1", userInfo.id).then(
            navigation.dispatch(StackActions.replace("Home"))
          );
        } catch (error) {
          console.log(error);
        }
      } else {
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
  };

  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <LoginPhoto />
        <View style={styles.containerInner}>
          <Text
            style={{
              paddingTop: 25,
              fontSize: 28,
            }}
          >
            My Doggo App
          </Text>
          <Text
            style={{
              paddingTop: 10,
              fontSize: 15,
            }}
          >
            You may key in to Log on Account
          </Text>
          <View style={styles.searchSection}>
            <MaterialCommunityIcons
              style={styles.searchIcon}
              name="account-cowboy-hat"
              size={25}
              color="#000"
            />
            <TextInput
              style={styles.input}
              placeholder="Enter User Name..."
              underlineColorAndroid="transparent"
              onChangeText={(newText) => setUserName(newText)}
            />
          </View>
          <View style={styles.searchSection}>
            <MaterialCommunityIcons
              style={styles.searchIcon}
              name="lock-alert"
              size={25}
              color="#000"
            />
            <TextInput
              style={styles.input}
              placeholder="Enter User Password..."
              underlineColorAndroid="transparent"
              secureTextEntry={true}
              onChangeText={(newText) => setPassword(newText)}
            />
          </View>
          <TouchableOpacity
            style={styles.loginBtn}
            onPress={async () => {
              if (userName === "Aaa" && userPassword === "Bbb") {
                await AsyncStorage.setItem(
                  "@MySuperStore:key2",
                  "Admin"
                ).then();
                await AsyncStorage.setItem(
                  "@MySuperStore:key1",
                  "User112"
                ).then(navigation.dispatch(StackActions.replace("Home")));
              }
            }}
          >
            <Text style={{ color: "white", fontSize: 18 }}>Login</Text>
          </TouchableOpacity>
          <View style={{ height: 20 }} />
          <TouchableOpacity
            onPress={() => {
              facebookLogIn();
            }}
          >
            <FacebookLoginButton />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  containerInner: {
    alignItems: "center",
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    width: phoneWidth,
    height: 500,
    backgroundColor: "rgba(0, 0, 0, 0.08)",
  },
  loginBtn: {
    backgroundColor: "#66CCCC",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    width: 300,
    height: 45,
    marginTop: 20,
    alignItems: "center",
  },
  logoutBtn: {
    backgroundColor: "grey",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    position: "absolute",
    bottom: 0,
  },
  searchSection: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    width: phoneWidth - 50,
    borderRadius: 10,
  },
  searchIcon: {
    padding: 10,
  },
  input: {
    flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 0,
    backgroundColor: "#fff",
    color: "#424242",
    borderRadius: 10,
  },
});
