import React, { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  Button,
  TouchableOpacity,
  Pressable,
  Alert,
} from "react-native";
import { Nav } from "../../components/Nav";
import { useFonts } from "expo-font";
import DropDownPicker from "react-native-dropdown-picker";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function CrearActividad() {
  const navigation = useNavigation();
  const [title, onChangeTitle] = useState("");
  const [desc, onChangeDesc] = useState("");
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "Deportes", value: "deportes" },
    { label: "Reuniones", value: "reuniones" },
    { label: "Voluntariado", value: "voluntariado" },
    { label: "Otros", value: "otros" },
  ]);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState("Seleccionar fecha");
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [selectedTime, setSelectedTime] = useState("Seleccionar hora");

  const handleAgregarActividad = async () => {
    try {
      // Validar que los campos no estén vacíos
      if (!title.trim() || !desc.trim() || !value || !selectedDate || !selectedTime) {
        Alert.alert("Por favor, completa todos los campos antes de agregar la actividad.");
        return;
      }

      // Construir el objeto de tipo actividad
      const nuevaActividad = {
        title,
        desc,
        category: value,
        date: selectedDate,
        time: selectedTime,
      };

      // Obtener el arreglo actual de actividades de AsyncStorage
      const actividadesAnteriores = await AsyncStorage.getItem("@actividades");
      const actividades = actividadesAnteriores ? JSON.parse(actividadesAnteriores) : [];

      // Agregar la nueva actividad al arreglo
      actividades.push(nuevaActividad);

      // Guardar el arreglo actualizado en AsyncStorage
      await AsyncStorage.setItem("@actividades", JSON.stringify(actividades));

      // Navegar a la pantalla "TareaCompletada"
      navigation.navigate("TareaCompletada");

      console.log("Actividad creada y guardada en AsyncStorage:", nuevaActividad);
    } catch (error) {
      console.error("Error al guardar la actividad en AsyncStorage:", error);
    }
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleDateConfirm = (date) => {
    const dt = new Date(date);
    const x = dt.toISOString().split("T");
    const x1 = x[0].split("-");
    console.log(x1[2] + "/" + x1[1] + "/" + x1[0]);
    setSelectedDate(x1[2] + "/" + x1[1] + "/" + x1[0]);
    hideDatePicker();
  };

  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };

  const handleTimeConfirm = (date) => {
    const dt = new Date(date);
    const x = dt.toLocaleTimeString();
    setSelectedTime(x);
    console.log(x);
    hideTimePicker();
  };

  let [fontsLoaded] = useFonts({
    Roboto: require("../../assets/fonts/Roboto-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }
  return (
    <>
      <Nav title={"Nueva actividad"} showBackButton={true} />
      <View style={styles.container}>
        {/* Titulo */}
        <View style={styles.labelContainer}>
          <Text style={styles.labelText}>Titulo</Text>
        </View>

        {/* TextInput para el título */}
        <TextInput style={styles.input} onChangeText={onChangeTitle} value={title} />

        {/* Texto para la descripción */}
        <View style={styles.labelContainer}>
          <Text style={styles.labelText}>Descripción</Text>
        </View>

        {/* TextInput para la descripción */}
        <TextInput
          style={[styles.input, styles.multiline]}
          onChangeText={onChangeDesc}
          value={desc}
          multiline={true}
        />

        {/* Texto para la descripción */}
        <View style={styles.labelContainer}>
          <Text style={styles.labelText}>Categoria</Text>
        </View>
        {/* Dropdown para categorias */}
        <DropDownPicker
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          placeholder="Selecciona una categoria"
          placeholderStyle={{ color: "#FFFFFF", fontSize: 20 }}
          style={styles.input}
          containerStyle={{ marginLeft: 40, position: "relative", zIndex: 1000 }}
          labelStyle={{ color: "#FFFFFF", fontSize: 24 }}
          disableBorderRadius={true}
        />

        {/* Contenedor para los botones de fecha y hora */}
        <View style={styles.dateButtonsContainer}>
          <View>
            <Text style={styles.dateLabel}>Fecha</Text>
            <TouchableOpacity
              style={styles.dateInput}
              onPress={() => {
                showDatePicker();
              }}>
              <Text style={styles.text}>{selectedDate}</Text>
            </TouchableOpacity>
          </View>

          <View>
            <Text style={styles.dateLabel}>Hora</Text>
            <TouchableOpacity
              style={styles.dateInput}
              onPress={() => {
                showTimePicker();
              }}>
              <Text style={styles.text}>{selectedTime}</Text>
            </TouchableOpacity>
          </View>
        </View>

        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleDateConfirm}
          onCancel={hideDatePicker}
        />
        <DateTimePickerModal
          isVisible={isTimePickerVisible}
          mode="time"
          onConfirm={handleTimeConfirm}
          onCancel={hideDatePicker}
        />
        <View style={styles.containerBtn}>
          <Pressable style={styles.button} onPress={handleAgregarActividad}>
            <Text style={styles.textBtn}>Agregar Actividad</Text>
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
  dateInput: {
    backgroundColor: "#83C5BE",
    width: 130,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    padding: 5,
    marginHorizontal: 30,
  },
  text: {
    color: "#FFFFFF",
  },
  dateButtonsContainer: {
    flexDirection: "row",
  },
  dateLabel: {
    color: "#000000", // Cambia el color según tu diseño
    fontSize: 24, // Ajusta el tamaño de fuente según tu diseño
    marginLeft: 30,
    fontFamily: "Roboto",
    fontWeight: "900",
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#006D77",
    width: 180,
    height: 60,
    marginTop: 100,
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
});
