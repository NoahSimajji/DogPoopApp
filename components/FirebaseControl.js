import { useState, useEffect } from "react";
import { Alert } from "react-native";
import * as firebase from "firebase";
import { Audio } from "expo-av";
import AsyncStorage from "@react-native-async-storage/async-storage";

const config = {
  apiKey: "AIzaSyA6iPmdMQFyBmH7aPiukZ71srz9vHw0uSs",
  authDomain: "angelapp-6b5e0.firebaseapp.com",
  databaseURL: "https://angelapp-6b5e0.firebaseio.com",
  projectId: "angelapp-6b5e0",
  storageBucket: "angelapp-6b5e0.appspot.com",
  messagingSenderId: "154350512943",
  appId: "1:154350512943:web:76db72c57a2132b726cfda",
  measurementId: "G-G8KDJNWBDG",
};

// Checking it is logged in or not
try {
  firebase.initializeApp(config);
  console.log("Logged into app");
} catch (e) {
  console.log(e);
}

const auth = firebase.auth();

export { auth };

//Read for the flatlist
export function useFirebaseData() {
  const [data, setData] = useState([]);
  function test2() {
    firebase
      .database()
      .ref("Ttt1/DogStatusHistory/")
      .on("value", function (snapshot) {
        const items = [];
        snapshot.forEach((child1) => {
          items.push({ val1: child1.val(), key1: child1.key });
        });
        setData(items);
      });
  }
  useEffect(() => {
    test2();
  }, []);
  return data;
}

//Read the group members
export function useFirebaseDataGroup() {
  const [data, setData] = useState([]);
  function test2() {
    firebase
      .database()
      .ref("Ttt1/Users")
      .on("value", function (snapshot) {
        const items = [];
        snapshot.forEach((child1) => {
          items.push({ val1: child1.val(), key1: child1.key });
        });
        setData(items);
      });
  }
  useEffect(() => {
    test2();
  }, []);
  return data;
}

//Read user name
export function useFirebaseDataUsername() {
  const [data, setData] = useState([]);
  function test2() {
    firebase
      .database()
      .ref("dogs/dogA/userName")
      .on("value", function (snapshot) {
        setData(snapshot.val());
      });
  }
  useEffect(() => {
    test2();
  }, []);
  return data;
}

//Read dog age
export function useFirebaseDataDogAge() {
  const [data, setData] = useState([]);
  function test2() {
    firebase
      .database()
      .ref("dogs/dogA/dogAge")
      .on("value", function (snapshot) {
        setData(snapshot.val());
      });
  }
  useEffect(() => {
    test2();
  }, []);
  return data;
}

//Read dog name
export function useFirebaseDataDogName() {
  const [data, setData] = useState([]);
  function test2() {
    firebase
      .database()
      .ref("dogs/dogA/dogName")
      .on("value", function (snapshot) {
        setData(snapshot.val());
      });
  }
  useEffect(() => {
    test2();
  }, []);
  return data;
}

export function deleteTheData(props) {
  let userRef = firebase.database().ref("Ttt1/DogStatusHistory/" + props.item);
  Alert.alert("Alert Title", "Are you sure you want to delete this?", [
    {
      text: "Cancel",
      onPress: () => {
        return;
      },
      style: "cancel",
    },
    {
      text: "OK",
      onPress: () => {
        userRef.remove();
        Alert.alert("Record have been deleted.");
      },
    },
  ]);
}

//Push the data to the cloud
export async function pushTheData(props) {
  let userIDForSave = "";
  let userNameGiven = "";

  if (props.firstAttempt == true) {
    const newReference = firebase
      .database()
      .ref(props.userGroupCode + "/Users/" + props.uid + "/");
    newReference.set({
      uid: props.uid,
      userName: props.username,
      userPassword: props.userPassword,
      userSex: props.userSex,
      dogAge: props.dogAge,
      dogName: props.dogName,
      groupCode: props.userGroupCode,
      fcmToken: props.fcmToken,
    });
    try {
      const userId = await AsyncStorage.getItem("@MySuperStore:key1");
      const userName = await AsyncStorage.getItem("@MySuperStore:key2");

      userIDForSave = userId;
      userNameGiven = userName;
    } catch (error) {
      console.log(error);
    }
  } else {
    // ------------------This one is if it is not first attempt----------------------------
    var unix = Math.round(+new Date() / 1000);
    const newReference = firebase
      .database()
      .ref("Ttt1/DogStatusHistory/" + unix);
    var today = new Date();
    var date =
      today.getDate() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getFullYear();
    var Hour = today.getHours();
    var AmOrPM = Hour >= 12 ? "PM" : "AM";
    var time =
      (Hour > 12 ? Hour - 12 : Hour) + ":" + today.getMinutes() + AmOrPM;

    newReference
      .set({
        Date: date,
        Status: props.status == "Poop" ? "GOOD" : "BAD",
        Time: time,
        Comments: props.text,
      })
      .then(async () => {
        // Sounds
        const soundObject = new Audio.Sound();
        try {
          // Dog sounds
          await soundObject.loadAsync(require("../assets/dogWoff.mp3"));
          await soundObject.playAsync();
          alert("Saved new record");
        } catch (error) {}
      });
  }
}
