import React from 'react';
import { View, StyleSheet, ScrollView, TextInput } from 'react-native';
import { Title, Button, TextInput as PaperTextInput } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

const PaymentsScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        {/* Formulario para agregar tarjeta */}
        <View style={styles.formContainer}>
          <Title style={[styles.title, styles.blackText]}>Agregar tarjeta</Title>
          <Button 
            mode="contained" 
            icon={() => <Icon name="credit-card" size={20} color="#fff" />} 
            style={[styles.paymentButton, styles.blackButton]} 
            onPress={() => navigation.navigate('Tarjeta de credito/debito')}
          >
            Añadir Tarjeta
          </Button>
        </View>

        {/* Opciones de Pago */}
        <View style={styles.formContainer}>
          <Title style={[styles.title, styles.blackText]}>Selecciona tu método de pago</Title>
          <View style={styles.buttonContainer}>
            <Button 
              mode="contained" 
              icon={() => <Icon name="paypal" size={20} color="#fff" />} 
              style={[styles.paymentButton, styles.blackButton]} 
              onPress={() => navigation.navigate('PayPal')}
            >
              Pagar con PayPal
            </Button>
            <Button 
              mode="contained" 
              icon={() => <Icon name="barcode" size={20} color="#fff" />} 
              style={[styles.paymentButton, styles.blackButton]} 
              onPress={() => navigation.navigate('Referencia')}
            >
              Pagar con Referencia
            </Button>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  contentContainer: {
    paddingHorizontal: 10,
    paddingBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  formContainer: {
    width: '80%',
    marginVertical: 10,
    padding: 15,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    elevation: 1, // Shadow effect for the container
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  blackText: {
    color: '#000', // Color negro para los textos
  },
  input: {
    marginBottom: 10,
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  buttonContainer: {
    marginTop: 10,
    width: '70%',
  },
  paymentButton: {
    marginVertical: 5,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  blackButton: {
    color: '#000', // Color negro para el texto de los botones
    backgroundColor: '#88cef6', // Color de fondo de los botones
  },
});

export default PaymentsScreen;
