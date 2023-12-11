import React from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import { useFonts } from "expo-font";
import { PrimaryButton } from "../components/PrimaryButton";
import { SecondaryButton } from "../components/SecondaryButton";

export function Login() {
  let [fontsLoaded] = useFonts({
    PrimaryFont: require("../assets/fonts/MontserratAlternates-SemiBold.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Inicio de sesion</Text>
      <TextInput style={styles.input} placeholder="Ingrese su usuario" />
      <TextInput style={styles.input} placeholder="Ingrese su contraseña" secureTextEntry={true} />
      <SecondaryButton title={"Iniciar sesion"} goTo={"Home"} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#006D77",
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    width: 320,
    height: 54,
    margin: 12,
    padding: 10,
    backgroundColor: "#83C5BE",
    borderRadius: 5,
    color: "#FFFFFF",
    fontSize: 20,
  },
  text: {
    fontSize: 32,
    color: "#FFFFFF",
    fontFamily: "PrimaryFont",
    marginTop: 230,
  },
});
