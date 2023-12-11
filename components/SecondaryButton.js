import React from "react";
import { StyleSheet, View, Pressable, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";

export function SecondaryButton({ title, goTo }) {
  const navigation = useNavigation();
  const handleOnPress = () => {
    navigation.navigate(goTo);
  };
  return (
    <View style={styles.container}>
      <Pressable style={styles.button} onPress={handleOnPress}>
        <Text style={styles.text}>{title}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#83C5BE",
    width: 150,
    height: 60,
    marginTop: 20,
    borderRadius: 10,
    padding: 5,
    elevation: 5,
  },
  text: {
    fontSize: 20,
    color: "#FFFFFF",
    fontWeight: "500",
  },
  container: {
    flex: 1,
    alignContent: "center",
  },
});
