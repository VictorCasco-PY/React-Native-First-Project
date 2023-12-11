import React from "react";
import { View, StyleSheet, StatusBar } from "react-native";
import { Home } from "./screens/Home";
import Navigation from "./Navigation";

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar></StatusBar>
      <Navigation />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#D9D9D9",
  },
});
