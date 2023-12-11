import React from "react";
import { StyleSheet, View, Pressable, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";

export function PrimaryButton({ title, goTo }) {
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
    backgroundColor: "#006D77",
    width: 150,
    height: 60,
    marginTop: 100,
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
    alignContent: "flex-end",
    marginLeft: 200,
  },
});
