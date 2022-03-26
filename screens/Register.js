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
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LoginPhoto } from "../components/enlargeImage";
import { StackActions } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const phoneWidth = Dimensions.get("window").width;

export default function App({ navigation }) {
  const [userName, setUserName] = useState("");
  const [userPassword, setPassword] = useState("");

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <LoginPhoto size={"medium"} />
        <View style={styles.containerInner}>
          <Text
            style={{
              paddingTop: 25,
              fontSize: 28,
            }}
          >
            Register Screen
          </Text>
          <Text
            style={{
              paddingTop: 10,
              fontSize: 15,
              textAlign: "center",
            }}
          >
            It is a honor to serve you as our first beta users and we will be
            having a good time with our doggo and change the whole feeling into
            another level!
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

          <View style={styles.searchSection}>
            <MaterialCommunityIcons
              style={styles.searchIcon}
              name="lock-alert"
              size={25}
              color="#000"
            />
            <TextInput
              style={styles.input}
              placeholder="Enter sex..."
              underlineColorAndroid="transparent"
              secureTextEntry={true}
              onChangeText={(newText) => setPassword(newText)}
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
              placeholder="Enter dog's name..."
              underlineColorAndroid="transparent"
              secureTextEntry={true}
              onChangeText={(newText) => setPassword(newText)}
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
              placeholder="Enter dog age..."
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
            <Text style={{ color: "white", fontSize: 18 }}>Register</Text>
          </TouchableOpacity>
          <View style={{ height: 20 }} />
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
    backgroundColor: "#9aeaea",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    width: 300,
    height: 45,
    marginTop: 20,
    alignItems: "center",
  },
  registerBtn: {
    backgroundColor: "#9aeaea",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    width: 300,
    height: 45,
    marginTop: 20,
    alignItems: "center",
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
