import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
} from "react-native";


export default function App(props) {
  const [tickAnimation, setTickAnimation] = useState("");

  const tickOrNo = () => {
    
  };

  return (
    <View style={styles.container}>
      <Text>Settings screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent:'center'
  },
  
});
