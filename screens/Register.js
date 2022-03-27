import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  TextInput,
  Dimensions,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LoginPhoto } from "../components/enlargeImage";
import { pushTheData, auth } from "../components/FirebaseControl";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const phoneWidth = Dimensions.get("window").width;
const phoneHeight = Dimensions.get("window").height;

export default function App({ navigation }) {
  const [userNameState, setUsername] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userSex, setUserSex] = useState("");
  const [userUid, setUserUid] = useState("");
  const [userGroupCode, setUserGroupCode] = useState("");
  const [dogNameState, setDogName] = useState("");
  const [dogAgeState, setDogAge] = useState(0);

  //This is the register way.
  testRegister = async () => {
    // const email = "ninjayek@gmail.com";
    // const password = "abcdefgg";

    // const email1 = "test@gmail.com";
    // const password1 = "123456";
    const tokenValue = await AsyncStorage.getItem("fcm_token");
    await auth
      .createUserWithEmailAndPassword(userNameState, userPassword)
      .then((userCredential) => {
        const user = userCredential.user;

        pushTheData({
          firstAttempt: true,
          uid: user.uid,
          username: userNameState,
          userPassword: userPassword,
          userSex: userSex,
          userGroupCode: userGroupCode,
          dogAge: dogAgeState,
          dogName: dogNameState,
          fcmToken: tokenValue,
        });

        alert("registered.");
      })
      .catch((error) => alert(error));
  };

  return (
    <KeyboardAwareScrollView>
      <View style={styles.container}>
        <LoginPhoto size={"medium"} />
        <View style={styles.containerInner}>
          <Text
            style={{
              paddingTop: 25,
              fontSize: 28,
            }}
          >
            Good day
          </Text>
          <Text
            style={{
              padding: 10,
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
              onChangeText={(username) => setUsername(username)}
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
              onChangeText={(password) => setUserPassword(password)}
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
              placeholder="Confirm Password..."
              underlineColorAndroid="transparent"
              secureTextEntry={true}
              onChangeText={(password) => setUserPassword(password)}
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
              onChangeText={(sex) => setUserSex(sex)}
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
              onChangeText={(dogname) => setDogName(dogname)}
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
              onChangeText={(dogAge) => setDogAge(dogAge)}
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
              placeholder="Enter group code..."
              underlineColorAndroid="transparent"
              onChangeText={(groupCode) => setUserGroupCode(groupCode)}
            />
          </View>

          <TouchableOpacity
            style={styles.loginBtn}
            onPress={() => {
              alert("Submitted");
              testRegister();
              // Suppose go to home screen instead
              // navigation.replace("Login");
            }}
          >
            <Text style={{ color: "white", fontSize: 18 }}>Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAwareScrollView>
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
    height: phoneHeight,
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
