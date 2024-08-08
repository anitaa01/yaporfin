// screens/ReferenceScreen.js
import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { Card } from 'react-native-paper';

const ReferenceScreen = () => {
  // La referencia bancaria ficticia
  const reference = '0001 2580 0970 3619';

  // El convenio ficticio
  const agreement = '023489519';

  // Descripción del convenio
  const agreementDescription = 'Asegúrate de proporcionar este número cuando realices tu pago en el establecimiento.'

  // Los lugares donde se puede pagar
  const paymentLocations = [
    { name: 'OXXO', image: require('../assets/img/oxxo.png') },
    { name: 'Banorte', image: require('../assets/img/banorte.png') },
    { name: 'BBVA', image: require('../assets/img/bbva.png') },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Card style={styles.card}>
        <Card.Content style={styles.innerContainer}>
          <Text style={styles.header}>Referencia Bancaria</Text>
          <Text style={styles.description}>
            Utiliza la siguiente referencia bancaria para realizar tu pago en los siguientes lugares:
          </Text>
          <Text style={styles.reference}>{reference}</Text>
          
          <Text style={styles.subHeader}>Convenio</Text>
          <Text style={styles.agreementDescription}>{agreementDescription}</Text>
          <Text style={styles.agreement}>{agreement}</Text>
          
          <Text style={styles.subHeader}>Lugares para Pagar</Text>
          {paymentLocations.map((location, index) => (
            <View key={index} style={styles.locationContainer}>
              <Image source={location.image} style={styles.image} resizeMode="contain" />
              <Text style={styles.locationName}>{location.name}</Text>
            </View>
          ))}
        </Card.Content>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', // Centra el contenido verticalmente
    alignItems: 'center', // Centra el contenido horizontalmente
    backgroundColor: '#f0f0f0',
  },
  card: {
    width: '90%', // Ancho ajustado a 90% del contenedor
    padding: 15,
    backgroundColor: '#ffffff',
    elevation: 3, // Sombra para la tarjeta
  },
  innerContainer: {
    alignItems: 'center', // Centra los elementos hijos dentro de la tarjeta
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#000',
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
    color: '#666',
    textAlign: 'center',
  },
  reference: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#000',
    textAlign: 'center',
  },
  subHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#000',
    textAlign: 'center',
  },
  agreementDescription: {
    fontSize: 16,
    marginBottom: 10,
    color: '#666',
    textAlign: 'center',
  },
  agreement: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#000',
    textAlign: 'center',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    justifyContent: 'center',
  },
  image: {
    width: 80,
    height: 40,
    marginRight: 15,
  },
  locationName: {
    fontSize: 16,
    color: '#333',
  },
});

export default ReferenceScreen;
