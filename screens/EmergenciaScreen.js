import React from "react";
import { StatusBar, StyleSheet, Text, View } from "react-native";
import { Nav } from "../components/Nav";

export function EmergenciaScreen() {
  return (
    <>
      <Nav title={" "} />
      <View style={styles.container}>
        <View style={styles.container}>
          <Text style={styles.emergencia}>EMERGENCIA</Text>
          <View style={styles.buttonContainer}>
            <View style={styles.button}>
              <Text style={styles.text}>S O S</Text>
            </View>
          </View>
          <Text style={styles.emergenciaInfo}>
            Tocaste el botón de emergencia. Se ha enviado una alerta a la policía. Por favor, mantén
            la calma y asegúrate de estar en un lugar seguro. La policía se comunicará contigo en
            breve.
          </Text>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 100,
    overflow: "hidden",
    borderWidth: 15,
    borderColor: "rgba(237, 76, 92, 0.12)",
  },
  button: {
    backgroundColor: "#ED4C5C",
    width: 170,
    height: 170,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#ED4C5C",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.12,
    shadowRadius: 10,
    elevation: 10,
  },
  text: {
    color: "#FFFFFF",
    fontSize: 60,
    fontWeight: "bold",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emergencia: {
    color: "#006D77",
    fontSize: 36,
    fontWeight: "bold",
    marginBottom: 100,
  },
  emergenciaInfo: {
    color: "#006D77",
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 100,
    textAlign: "center",
    marginHorizontal: 10,
  },
});
