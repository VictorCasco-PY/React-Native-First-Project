import React, { useEffect, useState } from "react";
import { Nav } from "../../components/Nav";
import { MaterialIcons } from "@expo/vector-icons";
import { View, TextInput, StyleSheet, Text, Pressable, Image, Alert } from "react-native";
import { useFonts } from "expo-font";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

export function AlertarSospecha() {
  const [asunto, setAsunto] = useState("");
  const [desc, setDesc] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [formData, setFormData] = useState({
    asunto: "",
    desc: "",
    selectedImage: null,
  });
  const navigator = useNavigation();

  useEffect(() => {
    // Solicitar permisos para acceder a la biblioteca de fotos del dispositivo
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        console.error("Permiso denegado para acceder a la biblioteca de fotos del dispositivo");
      }
    })();
  }, []);
  const pickImage = async () => {
    try {
      // Abrir el selector de imágenes
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        setSelectedImage(result.assets && result.assets.length > 0 ? result.assets[0].uri : null);
      }
    } catch (error) {
      console.error("Error al seleccionar la imagen:", error);
    }
  };

  const handleEnviarReporte = async () => {
    try {
      // Validar que los campos no estén vacíos
      if (!asunto.trim() || !desc.trim()) {
        Alert.alert("Por favor, completa todos los campos antes de enviar el reporte.");
        return;
      }

      // Crear el objeto de datos del formulario
      const formData = {
        asunto,
        desc,
        selectedImage,
      };

      // Obtener los datos almacenados actualmente
      const storedData = await AsyncStorage.getItem("@reportes");
      const existingData = storedData ? JSON.parse(storedData) : [];

      // Agregar el nuevo formulario a los datos existentes
      const newData = [...existingData, formData];

      // Guardar los datos actualizados en AsyncStorage
      await AsyncStorage.setItem("@reportes", JSON.stringify(newData));

      // Limpiar los campos después de enviar el reporte
      setAsunto("");
      setDesc("");
      setSelectedImage(null);

      navigator.navigate("AlertaCompletada");

      // Mostrar un mensaje de éxito o navegar a la lista de reportes
      // (puedes implementar esto según tus necesidades)
      // ...
    } catch (error) {
      console.error("Error al enviar el reporte:", error);
    }
  };

  let [fontsLoaded] = useFonts({
    Roboto: require("../../assets/fonts/Roboto-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <>
      <Nav title={"Alertar soscpecha"} showBackButton={true} />
      <View style={styles.container}>
        {/* Titulo */}
        <View style={styles.labelContainer}>
          <Text style={styles.labelText}>Asunto</Text>
        </View>

        {/* TextInput para el título */}
        <TextInput style={styles.input} onChangeText={setAsunto} value={asunto} />

        {/* Texto para la descripción */}
        <View style={styles.labelContainer}>
          <Text style={styles.labelText}>Descripción</Text>
        </View>

        {/* TextInput para la descripción */}
        <TextInput
          style={[styles.input, styles.multiline]}
          onChangeText={setDesc}
          value={desc}
          multiline={true}
        />

        <View style={styles.labelContainer}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={styles.labelText}>Adjuntar evidencia</Text>
            <Pressable onPress={pickImage}>
              <MaterialIcons name="add-a-photo" size={40} color="#83C5BE" />
            </Pressable>
          </View>
        </View>

        <View style={styles.imageContainer}>
          {selectedImage ? (
            <Image source={{ uri: selectedImage }} style={styles.selectedImage} />
          ) : (
            <View style={styles.placeholderImage} />
          )}
        </View>

        <View style={styles.containerBtn}>
          <Pressable style={styles.button} onPress={handleEnviarReporte}>
            <Text style={styles.textBtn}>Enviar reporte</Text>
          </Pressable>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  input: {
    width: 320,
    height: 54,
    margin: 12,
    padding: 10,
    backgroundColor: "#83C5BE",
    borderRadius: 5,
    color: "#FFFFFF",
    fontSize: 20,
    borderColor: "#FFFFFF",
  },
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: 30,
  },
  multiline: {
    height: 130,
    textAlignVertical: "top",
  },
  labelContainer: {
    alignSelf: "flex-start",
    marginLeft: 12,
  },
  labelText: {
    color: "#000000", // Cambia el color según tu diseño
    fontSize: 24, // Ajusta el tamaño de fuente según tu diseño
    marginLeft: 20,
    fontFamily: "Roboto",
    fontWeight: "900",
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#006D77",
    width: 150,
    height: 60,
    marginTop: 70,
    marginRight: 60,
    borderRadius: 10,
    padding: 5,
    elevation: 5,
  },
  textBtn: {
    fontSize: 20,
    color: "#FFFFFF",
    fontWeight: "500",
  },
  containerBtn: {
    flex: 1,
    alignContent: "flex-end",
    marginLeft: 200,
  },
  imageContainer: {
    width: 320,
    height: 150,
    marginTop: 10,
    backgroundColor: "#83C5BE",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  selectedImage: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  placeholderImage: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
    backgroundColor: "#83C5BE",
  },
});
