// screens/HomeScreen.js
import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import globalStyles from '../styles/global';
import Card from '../components/Card';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {/* Agrega contenido a tu header si es necesario */}
      </View>
      
      <ScrollView style={styles.cardsContainer}>
        <Card iconName="group" title="Operadores" />
        <Card iconName="opacity" title="Tinacos" />
        <Card iconName="store" title="Locales" />
        <Card iconName="inventory" title="Almacenes" />
        <Card iconName="description" title="Reportes" />
        <Card iconName="notifications" title="Alertas" />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f0f0f0',
    flex: 1,
  },
  cardsContainer: {
    paddingHorizontal: 10,
    flex: 1,
  },
});

export default HomeScreen;
