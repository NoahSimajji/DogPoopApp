import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  ScrollView,
  LogBox,
  ActivityIndicator,
} from "react-native";
//NOTE: Testing purpose
import * as firebase from "firebase";
import { Ionicons, Entypo, MaterialIcons, AntDesign } from "@expo/vector-icons";

import * as Animatable from "react-native-animatable";
import {
  useFirebaseData,
  useFirebaseDataUsername,
  useFirebaseDataDogName,
  useFirebaseDataDogAge,
  useFirebaseDataGroup,
  deleteTheData,
} from "../components/FirebaseControl";

import {
  HomePhoto,
  PhotoAnimation,
  MaleAvatar,
} from "../components/enlargeImage";
import { ModalFeatures } from "../components/modalControl";

LogBox.ignoreAllLogs();

export default function App({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [toggleLoading, setToggleLoading] = useState(true);
  const data = useFirebaseData();
  const dataGroup = useFirebaseDataGroup();
  const userName = useFirebaseDataUsername();
  const dogAge = useFirebaseDataDogAge();
  const dogName = useFirebaseDataDogName();
  const firstUpdate = useRef(true);

  const iconColour = (status) => {
    if (status == "GOOD")
      return (
        <View style={{ justifyContent: "center" }}>
          <Ionicons name="ios-checkmark-circle" size={55} color="green" />
        </View>
      );
    else {
      return (
        <View style={{ justifyContent: "center" }}>
          <Ionicons name="ios-close-circle" size={55} color="red" />
        </View>
      );
    }
  };

  useEffect(
    () =>
      navigation.addListener("beforeRemove", (e) => {
        alert("User logout success.");
      }),
    [navigation]
  );

  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    setToggleLoading(false);
  }, [data]);

  async function sendPushNotification(expoPushToken) {
    const message = {
      to: expoPushToken,
      sound: "default",
      title: "Good day",
      body: "Is time to walk your dog",
      data: { someData: "goes here" },
    };

    await fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Accept-encoding": "gzip, deflate",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    }).then(() => {
      console.log("Sent: ", message);
    });
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <HomePhoto />
        <ScrollView horizontal={true}>
          <View
            style={{ height: 105, paddingTop: 5 }}
            flexDirection="row"
            justifyContent="space-around"
          >
            <FlatList
              horizontal={true}
              data={dataGroup}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={{ width: 100, height: 100, alignItems: "center" }}
                  onPress={() => {
                    // NOTE: The user data on top of the circle button
                    // console.log(item.val1);
                    sendPushNotification(item.val1.fcmToken);
                  }}
                >
                  <MaleAvatar />
                  <Text>
                    {item.val1.userName.substring(
                      0,
                      item.val1.userName.lastIndexOf("@")
                    )}
                  </Text>
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item.key1}
            />

            <TouchableOpacity
              style={{
                width: 75,
                height: 75,
                borderRadius: 20,
                alignItems: "center",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <AntDesign name="plus" size={35} color="white" />
            </TouchableOpacity>
          </View>
        </ScrollView>

        <ActivityIndicator
          size="large"
          color="black"
          animating={toggleLoading}
          style={{ marginTop: 180, position: "absolute", alignSelf: "center" }}
        />
        <View style={{ height: 10 }} />
        <FlatList
          data={data.sort((a, b) => {
            return b.key1.localeCompare(a.key1);
          })}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={{
                marginTop: 15,
                marginLeft: 10,
                marginBottom: 2,
                marginRight: 10,
                paddingTop: 5,
                paddingBottom: 5,
                borderRadius: 10,
                shadowColor: "rgba(0,0,0, .4)", // IOS
                shadowOffset: { height: 1, width: 3 }, // IOS
                shadowOpacity: 3, // IOS
                shadowRadius: 3, //IOS
                backgroundColor: "#fff",
                height: 105,
              }}
              onPress={() => {
                // NOTE: Checking on output
                // console.log(item);
                var output =
                  "Dog name: " +
                  dogName +
                  "\nDate: " +
                  item.val1.Date +
                  "\nTime: " +
                  item.val1.Time +
                  "\nUser involved: " +
                  userName +
                  "\nDescription: " +
                  item.val1.Comments;
                alert(output);
              }}
              onLongPress={() => {
                deleteTheData({ item: item.key1 });
              }}
            >
              <View flexDirection="row">
                <View style={{ marginTop: 6 }}>
                  <PhotoAnimation />
                </View>

                <View style={{ marginLeft: 24, marginTop: 2 }}>
                  <View>
                    <Text
                      style={{
                        color: "black",
                        fontWeight: "bold",
                        fontSize: 16,
                      }}
                    >
                      Condition: {item.val1.Status}
                    </Text>
                  </View>
                  <View flexDirection="row" style={{ paddingTop: 5 }}>
                    <MaterialIcons name="date-range" size={22} color="gray" />
                    <Text
                      style={{
                        color: "gray",
                      }}
                    >
                      {" "}
                      {item.val1.Date}
                    </Text>
                  </View>
                  <View flexDirection="row" style={{ paddingTop: 5 }}>
                    <AntDesign name="clockcircleo" size={22} color="gray" />
                    <Text
                      style={{
                        color: "gray",
                      }}
                    >
                      {" "}
                      {item.val1.Time}
                    </Text>
                  </View>

                  <Text></Text>
                </View>
                <View
                  style={{ position: "absolute", right: 20, marginTop: 15 }}
                >
                  {iconColour(item.val1.Status)}
                </View>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.key1}
        />
      </ScrollView>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <TouchableOpacity
          activeOpacity={1.0}
          style={[
            styles.containerModal,
            { backgroundColor: "rgba(0, 0, 0, 0.5)" },
          ]}
          onPress={() => {
            setModalVisible(false);
          }}
        ></TouchableOpacity>

        <View
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            height: 450,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Animatable.View
            animation={"fadeInUp"}
            iterationCount={1}
            direction="alternate"
            style={{
              backgroundColor: "white",
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
              height: 450,
              width: "100%",
              alignItems: "center",
              paddingTop: 25,
            }}
          >
            <>
              <ModalFeatures modalVisible={setModalVisible} />
            </>
          </Animatable.View>
        </View>
      </Modal>

      <TouchableOpacity
        style={{
          borderWidth: 1,
          borderColor: "rgba(0,0,0,0.2)",
          alignItems: "center",
          justifyContent: "center",
          width: 60,
          position: "absolute",
          bottom: 5,
          right: 24,
          height: 60,
          backgroundColor: "#fff",
          borderRadius: 20,
        }}
        onPress={() => {
          setModalVisible(true);
        }}
      >
        <Entypo name="plus" size={32} color="black" />
      </TouchableOpacity>
    </View>
  );
}

// Styling
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerModal: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
