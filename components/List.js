import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useFonts } from "expo-font";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export function List({ iconName, text, goTo }) {
  const navigation = useNavigation();

  let [fontsLoaded] = useFonts({
    Roboto: require("../assets/fonts/Roboto-Medium.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  const handlePress = () => {
    navigation.navigate(goTo);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.rectangle} onPress={handlePress}>
        <MaterialIcons name={iconName} size={40} color="#FFFFFF" />
        <Text style={styles.text}>{text}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-start",
  },
  rectangle: {
    flexDirection: "row", // Alinear elementos en fila (horizontal)
    alignItems: "center", // Alinear elementos verticalmente
    backgroundColor: "#83C5BE",
    padding: 25,
    fontSize: 28,
    fontFamily: "Roboto",
    marginBottom: 20,
    width: 355,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  },
  text: {
    marginLeft: 10, // Espacio entre el ícono y el texto
    color: "#FFFFFF",
    fontFamily: "Roboto",
    fontSize: 28,
  },
});
