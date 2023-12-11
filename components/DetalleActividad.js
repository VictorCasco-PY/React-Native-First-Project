import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { Nav } from "./Nav";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialIcons } from "@expo/vector-icons";

export function DetalleActividad({ route, navigation }) {
  const { actividad } = route.params;
  const [count, setCount] = useState(0);
  const [asistire, setAsistire] = useState(true);

  const handleToggleAsistencia = () => {
    if (asistire) {
      // Si estaba asistiendo, decrementar el contador
      setCount((prevCount) => prevCount + 1);
    } else {
      // Si no estaba asistiendo, incrementar el contador
      setCount((prevCount) => prevCount - 1);
    }

    // Cambiar el estado de asistencia
    setAsistire(!asistire);
  };

  const handleEliminarActividad = () => {
    Alert.alert(
      "Confirmación",
      "¿Estás seguro de que deseas eliminar esta actividad?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Eliminar",
          onPress: async () => {
            try {
              // Obtener el arreglo de actividades de AsyncStorage
              const actividadesAnteriores = await AsyncStorage.getItem("@actividades");
              const todasLasActividades = actividadesAnteriores
                ? JSON.parse(actividadesAnteriores)
                : [];

              // Filtrar las actividades, excluyendo la actividad actual
              const nuevasActividades = todasLasActividades.filter(
                (act) => act.title !== actividad.title
              );

              // Guardar el nuevo arreglo en AsyncStorage
              await AsyncStorage.setItem("@actividades", JSON.stringify(nuevasActividades));

              // Mostrar un mensaje de éxito y navegar a la pantalla anterior
              Alert.alert("Éxito", "La actividad ha sido eliminada", [
                {
                  text: "OK",
                  onPress: () => {
                    navigation.goBack();
                  },
                },
              ]);
            } catch (error) {
              console.error("Error al eliminar la actividad:", error);
            }
          },
        },
      ],
      { cancelable: false }
    );
  };
  return (
    <>
      <Nav title={actividad.title} showBackButton={true} />
      <View style={styles.deleteContainer}>
        <TouchableOpacity style={styles.eliminarButton} onPress={handleEliminarActividad}>
          <MaterialIcons name="delete" size={24} color="#006D77" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.eliminarButton}
          onPress={() => navigation.navigate("EditarActividad", { actividad })}>
          <MaterialIcons name="edit" size={24} color="#006D77" />
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <Text style={styles.descripcion}>{actividad.desc}</Text>
        <Text style={styles.fechaHora}>
          {actividad.date} {"    "} {actividad.time}
        </Text>
        <View style={styles.asistenciaContainer}>
          <View>
            <Text style={styles.asistente}>{count}</Text>
            <Text style={styles.asistente}>Asistente(s)</Text>
          </View>
          <TouchableOpacity style={styles.button} onPress={handleToggleAsistencia}>
            <Text style={styles.buttonText}>{asistire ? "Asistiré" : "No Asistiré"}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex=start",
    backgroundColor: "#83C5BE",
    marginHorizontal: 40,
    marginBottom: 100,
    marginTop: 10,
    borderRadius: 8,
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  descripcion: {
    fontSize: 22,
    marginBottom: 10,
    color: "#FFFFFF",
    textAlign: "justify",
    fontWeight: "500",
  },
  fechaHora: {
    fontSize: 20,
    color: "#FFFFFF",
    textAlign: "justify",
    marginTop: 280,
    fontWeight: "500",
  },
  asistente: {
    fontSize: 20,
    color: "#FFFFFF",
    textAlign: "center",
    fontWeight: "500",
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#006D77",
    width: 120,
    height: 35,
    borderRadius: 10,
    elevation: 5,
    marginLeft: 40,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "600",
  },
  asistenciaContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  eliminarButton: {
    backgroundColor: "#EDF6F9",
    borderRadius: 10,
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
    marginRight: 10,
    borderWidth: 1,
    borderColor: "#006D77",
    elevation: 5,
  },
  eliminarButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "600",
  },
  deleteContainer: {
    alignContent: "flex-end",
    alignItems: "flex-end",
    marginTop: 40,
    flexDirection: "row-reverse",
    paddingHorizontal: 30,
  },
});
