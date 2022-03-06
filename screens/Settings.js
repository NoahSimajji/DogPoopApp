import React, { useState } from "react";
import {
  StyleSheet,
  Dimensions,
  View,
  Text,
  TouchableOpacity,
  Modal,
} from "react-native";
import { StackActions } from "@react-navigation/native";
import { HomePhoto } from "../components/enlargeImage";
import {
  Octicons,
  MaterialCommunityIcons,
  FontAwesome5,
  AntDesign,
} from "@expo/vector-icons";
import * as Animatable from "react-native-animatable";
import { ModalSettingUpUser } from "../components/modalControl";
import { useFirebaseData } from "../components/FirebaseControl";
import { CleanAsyncStorage } from "../components/settingControl";

const phoneWidth = Dimensions.get("window").width;

export default function App({ navigation }) {
  const [modalVisible, setModalVisible] = useState(true);
  const data = useFirebaseData();

  return (
    <View style={styles.container}>
      <HomePhoto size={"big"} />
      <View style={{ height: 210 }} />
      <View style={styles.settingButton}>
        <TouchableOpacity
          style={{
            backgroundColor: "white",
            width: phoneWidth - 153,
            height: 100,
            marginLeft: 8,
            borderRadius: 10,
            justifyContent: "center",
            alignItems: "center",
            shadowColor: "rgba(0,0,0, .4)", // IOS
            shadowOffset: { height: 1, width: 3 }, // IOS
            shadowOpacity: 3, // IOS
            shadowRadius: 3, //IOS
            backgroundColor: "#fff",
          }}
          onPress={() => {
            setModalVisible(true);
          }}
        >
          <FontAwesome5 name="user-edit" size={42} color="gray" />

          <Text
            style={{
              paddingTop: 10,
              fontSize: 15,
            }}
          >
            User info edit
          </Text>
        </TouchableOpacity>

        {/* Button for Add photo for user and dog, still in development */}
        <TouchableOpacity
          style={{
            backgroundColor: "white",
            width: phoneWidth - 260,
            height: 100,
            borderRadius: 10,
            marginRight: 5,
            justifyContent: "center",
            alignItems: "center",
            shadowColor: "rgba(0,0,0, .4)",
            shadowOffset: { height: 1, width: 3 },
            shadowOpacity: 3,
            shadowRadius: 3,
            backgroundColor: "#fff",
          }}
          onPress={() => {
            alert("Still in development");
          }}
        >
          <AntDesign name="edit" size={42} color="gray" />

          <Text
            style={{
              paddingTop: 10,
              fontSize: 15,
            }}
          >
            Add photo
          </Text>
        </TouchableOpacity>

        {/* Button for Terms and condition require to do some modification on the nested navigator, still in development */}
        <TouchableOpacity
          style={{
            backgroundColor: "white",
            width: phoneWidth - 200,
            height: 100,
            marginLeft: 8,
            borderRadius: 10,
            justifyContent: "center",
            alignItems: "center",
            marginTop: 8,
            shadowColor: "rgba(0,0,0, .4)",
            shadowOffset: { height: 1, width: 3 },
            shadowOpacity: 3,
            shadowRadius: 3,
            backgroundColor: "#fff",
          }}
          onPress={() => {
            alert("Still in development");
          }}
        >
          <Octicons name="checklist" size={42} color="gray" />

          <Text
            style={{
              paddingTop: 10,
              fontSize: 15,
            }}
          >
            Terms and condition
          </Text>
        </TouchableOpacity>

        {/* Button for Clear all the information for dog and user, still in development */}
        <TouchableOpacity
          style={{
            backgroundColor: "white",
            width: phoneWidth - 215,
            height: 100,
            marginLeft: 8,
            borderRadius: 10,
            justifyContent: "center",
            alignItems: "center",
            marginTop: 8,
            marginRight: 5,
            shadowColor: "rgba(0,0,0, .4)",
            shadowOffset: { height: 1, width: 3 },
            shadowOpacity: 3,
            shadowRadius: 3,
            backgroundColor: "#fff",
          }}
          onPress={() => {
            CleanAsyncStorage();
            alert("Data being wiped off.");
          }}
        >
          <AntDesign name="delete" size={42} color="gray" />
          <Text
            style={{
              fontSize: 15,
            }}
          >
            Clear storage
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            backgroundColor: "white",
            width: phoneWidth - 15,
            height: 120,
            marginLeft: 8,
            borderRadius: 10,
            justifyContent: "center",
            alignItems: "center",
            marginTop: 8,
            shadowColor: "rgba(0,0,0, .4)",
            shadowOffset: { height: 1, width: 3 },
            shadowOpacity: 3,
            shadowRadius: 3,
            backgroundColor: "#fff",
          }}
          onPress={() => {
            CleanAsyncStorage();
            navigation.dispatch(StackActions.replace("Login"));
          }}
        >
          <MaterialCommunityIcons name="logout" size={42} color="gray" />

          <Text
            style={{
              paddingTop: 10,
              fontSize: 15,
            }}
          >
            Logout
          </Text>
        </TouchableOpacity>
      </View>

      {data.length === 0 && (
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
          ></TouchableOpacity>

          <View
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              height: 900,
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
                height: "75%",
                width: "100%",
                alignItems: "center",
                paddingTop: 25,
              }}
            >
              <>
                <ModalSettingUpUser closeUp={setModalVisible} />
              </>
            </Animatable.View>
          </View>
        </Modal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  settingButton: {
    justifyContent: "space-between",
    flexDirection: "row",
    flexWrap: "wrap",
  },
});
