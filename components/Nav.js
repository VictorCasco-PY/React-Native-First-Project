import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { useFonts } from "expo-font";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export function Nav(props) {
  const { title = "Titulo", showBackButton = true } = props;
  const navigation = useNavigation();

  let [fontsLoaded, error] = useFonts({
    PrimaryFont: require("../assets/fonts/MontserratAlternates-SemiBold.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }
  if (error) {
    console.error("Error loading fonts:", error);
    return null;
  }

  const handleBackButtonPress = () => {
    // Navegar hacia atrás solo si showBackButton es true
    if (showBackButton) {
      navigation.goBack();
    }
  };

  return (
    <View style={styles.container}>
      {showBackButton && (
        <MaterialCommunityIcons
          name="arrow-left"
          size={40}
          color="#FFFFFF"
          onPress={handleBackButtonPress}
          style={styles.icon}
        />
      )}
      <View style={styles.textContainer}>
        <Text style={styles.titulo}>{title}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#006D77",
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    flex: 1,
    alignItems: "center",
  },
  titulo: {
    color: "#FFFFFF",
    fontFamily: "PrimaryFont",
    fontSize: 32,
    paddingVertical: 15,
  },
  icon: {
    marginLeft: 10, // Ajusta el margen a la izquierda según tus preferencias
  },
});
