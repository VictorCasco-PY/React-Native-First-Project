import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, Image, Button, Alert, Pressable } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Nav } from "../../components/Nav";
import { MaterialIcons } from "@expo/vector-icons";

export function ListaSospechas() {
  const [reportes, setReportes] = useState([]);
  const [expandedMap, setExpandedMap] = useState({});

  useEffect(() => {
    cargarReportes();
  }, []);

  const cargarReportes = async () => {
    try {
      const storedData = await AsyncStorage.getItem("@reportes");
      const data = storedData ? JSON.parse(storedData) : [];
      setReportes(data);
      setExpandedMap(Object.fromEntries(data.map((item) => [item.asunto, false])));
    } catch (error) {
      console.error("Error al cargar los reportes desde AsyncStorage:", error);
    }
  };

  const handleEliminarReporte = async (asunto) => {
    try {
      const storedData = await AsyncStorage.getItem("@reportes");
      const existingData = storedData ? JSON.parse(storedData) : [];
      const newData = existingData.filter((reporte) => reporte.asunto !== asunto);
      await AsyncStorage.setItem("@reportes", JSON.stringify(newData));
      setReportes(newData);
      setExpandedMap((prev) => {
        const { [asunto]: deletedKey, ...rest } = prev;
        return rest;
      });
    } catch (error) {
      console.error("Error al eliminar el reporte desde AsyncStorage:", error);
    }
  };

  const renderReporte = ({ item }) => {
    const expanded = expandedMap[item.asunto];

    const toggleExpansion = () => {
      setExpandedMap((prev) => ({
        ...prev,
        [item.asunto]: !prev[item.asunto],
      }));
    };

    return (
      <View style={styles.reporteContainer}>
        <View style={styles.rowContainer}>
          <Text style={styles.text}>{item.asunto}</Text>
          <Pressable
            onPress={() => {
              Alert.alert(
                "Eliminar notificación",
                "¿Estás seguro de que quieres eliminar esta notificación?",
                [
                  { text: "Cancelar", style: "cancel" },
                  { text: "Eliminar", onPress: () => handleEliminarReporte(item.asunto) },
                ]
              );
            }}>
            <MaterialIcons name="delete" size={24} color="#006D77" />
          </Pressable>
        </View>
        <Text style={styles.desc}>{`${item.desc.substring(
          0,
          expanded ? item.desc.length : 30
        )}...`}</Text>
        {expanded && item.selectedImage && (
          <Image source={{ uri: item.selectedImage }} style={styles.image} />
        )}
        <Pressable onPress={toggleExpansion} style={styles.iconButton}>
          <MaterialIcons
            name={expanded ? "expand-less" : "expand-more"}
            size={30}
            color="#006D77"
          />
        </Pressable>
      </View>
    );
  };

  return (
    <>
      <Nav title={"Notificaciones"} showBackButton={true} />
      <View style={styles.container}>
        {reportes.length === 0 ? (
          <Text>No hay notificaciones actualmente.</Text>
        ) : (
          <FlatList
            data={reportes}
            renderItem={renderReporte}
            keyExtractor={(item) => item.asunto}
          />
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: 30,
  },
  reporteContainer: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: "#83C5BE",
    borderRadius: 8,
    width: 300,
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 10,
    borderRadius: 8,
  },
  text: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "bold",
  },
  desc: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "500",
  },
  iconButton: {
    marginLeft: 252,
  },
});
