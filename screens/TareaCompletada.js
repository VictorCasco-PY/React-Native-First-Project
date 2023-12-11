import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Nav } from "../components/Nav";
import { MaterialIcons } from "@expo/vector-icons";
import { TertiaryButton } from "../components/TertiaryButton";

export function TareaCompletada() {
  return (
    <>
      <Nav title={""} showBackButton={false}></Nav>
      <View style={styles.container}>
        <Text style={styles.text}>Actividad creada correctamente</Text>
        <MaterialIcons name="check-circle" size={290} color="#83C5BE" style={styles.icon} />
        <TertiaryButton title={"Aceptar"} goTo={"Actividades"} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#D9D9D9",
  },
  text: {
    color: "#006D77",
    fontSize: 36,
    textAlign: "center",
    fontWeight: "600",
    marginTop: 30,
  },
  icon: {
    marginVertical: 70,
  },
});
