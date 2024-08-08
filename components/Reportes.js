// screens/ReportesScreen.js
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Card } from 'react-native-paper';

const reportes = [
  // Ejemplo de datos, deberías reemplazarlos con tus datos reales
  { id: 1, tipo: 'Mantenimiento', fecha: '2024-07-26T12:00:00Z', contenido: 'Reporte de mantenimiento programado', empleado: 'Juan Pérez', purificadora: 'Purificadora A' },
  { id: 2, tipo: 'Falla', fecha: '2024-07-25T08:30:00Z', contenido: 'Falla en el sistema de purificación', empleado: 'Ana Martínez', purificadora: 'Purificadora B' },
  // Añade más reportes aquí
];

const ReportesScreen = () => {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {reportes.map(reporte => (
          <Card key={reporte.id} style={styles.card}>
            <Card.Content>
              <View style={styles.cardHeader}>
                <Text style={styles.cardTitle}>{reporte.tipo}</Text>
                <Text style={styles.cardDate}>{new Date(reporte.fecha).toLocaleDateString()}</Text>
              </View>
              {reporte.contenido && <Text style={styles.cardContent}>{reporte.contenido}</Text>}
              <Text style={styles.cardDetails}>Empleado: {reporte.empleado}</Text>
              <Text style={styles.cardDetails}>Purificadora: {reporte.purificadora}</Text>
            </Card.Content>
          </Card>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  scrollContainer: {
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  card: {
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  cardDate: {
    fontSize: 14,
    color: 'gray',
  },
  cardContent: {
    fontSize: 16,
    marginBottom: 10,
  },
  cardDetails: {
    fontSize: 14,
    color: '#333',
  },
});

export default ReportesScreen;
