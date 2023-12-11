import React from "react";
import { useFonts } from "expo-font";
import { Nav } from "../components/Nav";
import { List } from "../components/List";
import { SOSButton } from "../components/SOSButton";
import { View } from "react-native";

export function Home() {
  let [fontsLoaded] = useFonts({
    PrimaryFont: require("../assets/fonts/MontserratAlternates-SemiBold.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }
  return (
    <>
      <Nav title="MiVecindario" showBackButton={false} />
      <View style={{ marginTop: 30 }}>
        <List iconName={"calendar-today"} text={"ACTIVIDADES"} goTo={"Actividades"} />
        <List iconName={"warning"} text={"ALERTAR SOSPECHA"} goTo={"Alertar"} />
        <List iconName={"notification-important"} text={"NOTIFICACIONES"} goTo={"ListaSospechas"} />
      </View>
      <SOSButton />
    </>
  );
}
