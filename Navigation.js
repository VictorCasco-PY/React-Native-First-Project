import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { Home } from "./screens/Home";
import { EmergenciaScreen } from "./screens/EmergenciaScreen";
import { Actividades } from "./screens/Actividades/Actividades";
import { CrearActividad } from "./screens/Actividades/CrearActividad";
import { Login } from "./screens/Login";
import { TareaCompletada } from "./screens/TareaCompletada";
import { ListaDeportes } from "./screens/Actividades/ListaDeportes";
import { ListaReuniones } from "./screens/Actividades/ListaReuniones";
import { ListaVoluntariado } from "./screens/Actividades/ListaVoluntariado";
import { ListaOtros } from "./screens/Actividades/ListaOtros";
import { DetalleActividad } from "./components/DetalleActividad";
import { AlertarSospecha } from "./screens/Sospecha/AlertarSospecha";
import { ListaSospechas } from "./screens/Sospecha/ListaSospechas";
import { AlertaCompletada } from "./screens/Sospecha/AlertaCompletada";
import { EditarActividad } from "./screens/Actividades/EditarActividad";

const HomeStack = createNativeStackNavigator();

function MyStack() {
  return (
    <HomeStack.Navigator initialRouteName="Login">
      <HomeStack.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
        }}
      />
      <HomeStack.Screen
        name="Emergencia"
        component={EmergenciaScreen}
        options={{
          headerShown: false,
        }}
      />
      <HomeStack.Screen
        name="Actividades"
        component={Actividades}
        options={{
          headerShown: false,
        }}
      />
      <HomeStack.Screen
        name="CrearActividad"
        component={CrearActividad}
        options={{
          headerShown: false,
        }}
      />
      <HomeStack.Screen
        name="Login"
        component={Login}
        options={{
          headerShown: false,
        }}
      />
      <HomeStack.Screen
        name="TareaCompletada"
        component={TareaCompletada}
        options={{
          headerShown: false,
        }}
      />
      <HomeStack.Screen
        name="AlertaCompletada"
        component={AlertaCompletada}
        options={{
          headerShown: false,
        }}
      />
      <HomeStack.Screen
        name="Deportes"
        component={ListaDeportes}
        options={{
          headerShown: false,
        }}
      />
      <HomeStack.Screen
        name="Reuniones"
        component={ListaReuniones}
        options={{
          headerShown: false,
        }}
      />
      <HomeStack.Screen
        name="Voluntariado"
        component={ListaVoluntariado}
        options={{
          headerShown: false,
        }}
      />
      <HomeStack.Screen
        name="Otros"
        component={ListaOtros}
        options={{
          headerShown: false,
        }}
      />
      <HomeStack.Screen
        name="Detalle"
        component={DetalleActividad}
        options={{
          headerShown: false,
        }}
      />
      <HomeStack.Screen
        name="Alertar"
        component={AlertarSospecha}
        options={{
          headerShown: false,
        }}
      />
      <HomeStack.Screen
        name="ListaSospechas"
        component={ListaSospechas}
        options={{
          headerShown: false,
        }}
      />
      <HomeStack.Screen
        name="EditarActividad"
        component={EditarActividad}
        options={{
          headerShown: false,
        }}
      />
    </HomeStack.Navigator>
  );
}

export default function Navigation() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}
