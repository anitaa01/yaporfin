import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal } from "react-native";
import { Picker } from '@react-native-picker/picker';

const AlertScreen = () => {
  const [alerts, setAlerts] = useState([
    // Ejemplo de alertas
    {
      tipo: 'Alerta de Mantenimiento',
      fecha: '2024-07-30',
      mensaje: 'Se requiere mantenimiento en el sistema.',
      operador: 'Juan Pérez',
    },
    {
      tipo: 'Alerta de Incidente',
      fecha: '2024-07-29',
      mensaje: 'Incidente reportado en la planta.',
      operador: 'Ana López',
    },
    // Agrega más alertas según sea necesario
  ]);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.alertList}>
        {alerts.map((al, index) => (
          <View key={index} style={styles.card}>
            <Text style={styles.cardTitle}>Tipo: {al.tipo}</Text>
            <Text>Fecha: {al.fecha}</Text>
            <Text>Mensaje: {al.mensaje}</Text>
            <Text>Operador: {al.operador}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f0f0f0",
    padding: 20,
  },
  alertList: {
    width: "100%",
  },
  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
});

export default AlertScreen;