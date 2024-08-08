// screens/OperadoresScreen.js
import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { LineChart } from "react-native-gifted-charts";

const OperadoresScreen = () => {
  // Datos para las gráficas
  const dataConductividad = [{ value: 15 }, { value: 30 }, { value: 26 }, { value: 40 }];
  const dataTemperatura = [{ value: 20 }, { value: 35 }, { value: 30 }, { value: 45 }];
  const dataUltrasonico = [{ value: 10 }, { value: 25 }, { value: 20 }, { value: 35 }];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Conductividad</Text>
        <LineChart areaChart data={dataConductividad} style={styles.chart} />
      </View>

      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Temperatura</Text>
        <LineChart areaChart data={dataTemperatura} style={styles.chart} />
      </View>

      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Ultrasonico</Text>
        <LineChart areaChart data={dataUltrasonico} style={styles.chart} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#f0f0f0",
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  chartContainer: {
    marginBottom: 20,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  chart: {
    height: 200, // Ajusta la altura según tus necesidades
  },
});

export default OperadoresScreen;
