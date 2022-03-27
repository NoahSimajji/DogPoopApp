import React from "react";
import { StyleSheet, View, Text } from "react-native";

import { MaleAvatar, HomePhoto } from "../components/enlargeImage";
import {
  useFirebaseDataUsername,
  useFirebaseDataDogAge,
  useFirebaseDataDogName,
} from "../components/FirebaseControl";

export default function App(props) {
  // The firebase data taken from another file
  // const dogAge = useFirebaseDataDogAge();
  // const dogName = useFirebaseDataDogName();

  const userName = "Noah";
  const dogAge = "4";
  const dogName = "Angel";

  return (
    <View style={styles.container}>
      <HomePhoto size={"big"} />
      <MaleAvatar size={"big"} />
      <View
        style={{
          marginTop: 15,
          marginLeft: 10,
          marginBottom: 2,
          marginRight: 10,
          paddingTop: 5,
          paddingBottom: 5,
          borderRadius: 10,
          shadowColor: "rgba(0,0,0, .4)",
          shadowOffset: { height: 1, width: 3 },
          shadowOpacity: 3,
          shadowRadius: 3,
          backgroundColor: "#fff",
          height: 120,
        }}
      >
        <Text
          style={{
            paddingTop: 10,
            fontSize: 24,
            paddingLeft: 8,
          }}
        >
          Mister {userName}
        </Text>
        <Text
          style={{
            paddingTop: 10,
            fontSize: 18,
            paddingLeft: 8,
          }}
        >
          Dog name: {dogName}
        </Text>
        <Text
          style={{
            paddingTop: 10,
            fontSize: 18,
            paddingLeft: 8,
          }}
        >
          Dog age: {dogAge}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
