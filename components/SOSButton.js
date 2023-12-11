import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

export function SOSButton() {
  const [isPressed, setIsPressed] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    let pressTimer;

    if (isPressed) {
      pressTimer = setTimeout(() => {
        // Después de 2 segundos, navegar a la nueva pantalla
        navigation.navigate("Emergencia"); // Ajusta con el nombre de tu pantalla
      }, 1000);
    }

    return () => {
      clearTimeout(pressTimer);
    };
  }, [isPressed]);

  const handlePressIn = () => {
    setIsPressed(true);
  };

  const handlePressOut = () => {
    setIsPressed(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPressIn={handlePressIn} onPressOut={handlePressOut}>
        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <Text style={styles.text}>S O S</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
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
});
