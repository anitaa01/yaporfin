// navigation/DrawerNavigator.js
import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeScreen from "../screens/HomeScreen";
import MyServicesScreen from "../screens/MyServicesScreen";
import PaymentsScreen from "../screens/PaymentsScreen";
import MyInfoScreen from "../screens/MyInfoScreen";
import CustomDrawerContent from "./CustomDrawerContent";
import OperadoresScreen from "../screens/OperadoresScreen"; // Asegúrate de importar esta pantalla
import ReportScreen from "../screens/ReportScreen";
import Icon from 'react-native-vector-icons/MaterialIcons';
import AlertScreen from "../screens/AlertScreen";
import MainScreen from "../screens/MainScreen";

const Drawer = createDrawerNavigator();

const DrawerNavigator = ({ user }) => (
  <Drawer.Navigator
    drawerContent={(props) => <CustomDrawerContent {...props} user={user} />}
  >
    {user.rol === "usuario" ? (
      <>
        <Drawer.Screen
          name="Inicio"
          component={OperadoresScreen}
          options={{
            drawerIcon: ({ color, size }) => (
              <Icon name="home" color={color} size={size} />
            ),
          }}
        />
        <Drawer.Screen
          name="Reportes"
          component={ReportScreen} // Puedes cambiar a la pantalla correspondiente
          options={{
            drawerIcon: ({ color, size }) => (
              <Icon name="assessment" color={color} size={size} />
            ),
          }}
        />
        <Drawer.Screen
          name="Alertas"
          component={AlertScreen} // Puedes cambiar a la pantalla correspondiente
          options={{
            drawerIcon: ({ color, size }) => (
              <Icon name="notifications" color={color} size={size} />
            ),
          }}
        />
      </>
    ) : (
      <>
        <Drawer.Screen
          name="Inicio"
          component={HomeScreen}
          options={{
            drawerIcon: ({ color, size }) => (
              <Icon name="home" color={color} size={size} />
            ),
          }}
        />
        <Drawer.Screen
          name="Paquete Contratado"
          component={MyServicesScreen}
          options={{
            drawerIcon: ({ color, size }) => (
              <Icon name="build" color={color} size={size} />
            ),
          }}
        />
        <Drawer.Screen
          name="Forma de Pago"
          component={PaymentsScreen}
          options={{
            drawerIcon: ({ color, size }) => (
              <Icon name="payment" color={color} size={size} />
            ),
          }}
        />
        <Drawer.Screen
          name="Información General"
          component={MyInfoScreen}
          options={{
            drawerIcon: ({ color, size }) => (
              <Icon name="info" color={color} size={size} />
            ),
          }}
        />
      </>
    )}
  </Drawer.Navigator>
);

export default DrawerNavigator;
