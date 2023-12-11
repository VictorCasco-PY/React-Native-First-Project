import React from "react";

import { View } from "react-native";
import { List } from "../../components/List";
import { Nav } from "../../components/Nav";
import { PrimaryButton } from "../../components/PrimaryButton";

export function Actividades() {
  return (
    <>
      <Nav title="Actividades" showBackButton={true} />
      <View style={{ marginTop: 30 }}>
        <List iconName={"sports-soccer"} text={"DEPORTES"} goTo={"Deportes"} />
        <List iconName={"people"} text={"REUNIONES"} goTo={"Reuniones"} />
        <List iconName={"emoji-people"} text={"VOLUNTARIADO"} goTo={"Voluntariado"} />
        <List iconName={"more-horiz"} text={"OTROS"} goTo={"Otros"} />
        <PrimaryButton title={"Crear actividad"} goTo={"CrearActividad"} />
      </View>
    </>
  );
}
