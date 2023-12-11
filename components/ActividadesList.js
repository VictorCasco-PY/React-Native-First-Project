import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Nav } from "./Nav";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

export function ActividadesList({ categoria }) {
  const [actividades, setActividades] = useState([]);
  const navigation = useNavigation();

  useFocusEffect(
    React.useCallback(() => {
      const cargarActividades = async () => {
        try {
          // Obtener el arreglo de actividades de AsyncStorage
          const actividadesAnteriores = await AsyncStorage.getItem("@actividades");
          const todasLasActividades = actividadesAnteriores
            ? JSON.parse(actividadesAnteriores)
            : [];

          // Filtrar las actividades por la categoría
          const actividadesFiltradas = todasLasActividades.filter(
            (actividad) => actividad.category === categoria
          );

          // Actualizar el estado con las actividades filtradas
          setActividades(actividadesFiltradas);
        } catch (error) {
          console.error("Error al cargar las actividades desde AsyncStorage:", error);
        }
      };

      cargarActividades();
    }, [categoria])
  );

  const handleVerMas = (actividad) => {
    navigation.navigate("Detalle", { actividad });
  };

  const renderActividad = (actividad) => {
    return (
      <View key={actividad.title} style={styles.actividadContainer}>
        <Text style={styles.actividadTitulo}>{actividad.title}</Text>
        <Text style={styles.actividadDescripcion} numberOfLines={1}>
          {actividad.desc}
        </Text>
        <View style={styles.containerButton}>
          <TouchableOpacity
            style={styles.verMasButton}
            onPress={() => {
              handleVerMas(actividad);
            }}>
            <Text style={styles.verMasButtonText}>Ver Más</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <>
      <Nav title={categoria.charAt(0).toUpperCase() + categoria.slice(1)} showBackButton={true} />
      <View style={styles.container}>
        {actividades.length === 0 ? (
          <Text>No hay actividades actualmente.</Text>
        ) : (
          actividades.map(renderActividad)
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
  },
  listaTitulo: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  actividadContainer: {
    marginBottom: 30,
    padding: 10,
    backgroundColor: "#83C5BE",
    borderRadius: 8,
    width: 310,
  },
  actividadTitulo: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#FFFFFF",
  },
  actividadDescripcion: {
    fontSize: 14,
    marginBottom: 10,
    color: "#FFFFFF",
  },
  verMasButton: {
    backgroundColor: "#EDF6F9",
    paddingVertical: 5,
    borderRadius: 10,
    alignItems: "center",
    width: 80,
    elevation: 5,
  },
  verMasButtonText: {
    color: "#006D77",
    fontWeight: "bold",
  },
  containerButton: {
    alignItems: "flex-end",
    alignContent: "flex-end",
  },
});
