// screens/CreditCardScreen.js
import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { Card, TextInput, Button, Title, Text } from 'react-native-paper';

const CreditCardScreen = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardSaved, setCardSaved] = useState(false); // Estado para saber si la tarjeta ha sido guardada

  // Función para formatear el número de tarjeta
  const formatCardNumber = (number) => {
    const cleanNumber = number.replace(/\D/g, ''); // Elimina caracteres no numéricos
    const formattedNumber = cleanNumber.match(/.{1,4}/g)?.join(' ') || ''; // Agrupa cada 4 dígitos
    return formattedNumber;
  };

  // Función para formatear la fecha de expiración
  const formatExpirationDate = (date) => {
    const cleanDate = date.replace(/[^0-9]/g, ''); // Elimina caracteres no numéricos
    const formattedDate = cleanDate.match(/.{1,2}/g)?.join('/') || ''; // Agrupa en MM/AA
    return formattedDate;
  };

  // Función para validar el número de tarjeta
  const validateCardNumber = (number) => {
    return /^\d{16}$/.test(number.replace(/\s/g, ''));
  };

  // Función para validar la fecha de expiración
  const validateExpirationDate = (date) => {
    return /^(0[1-9]|1[0-2])\/\d{2}$/.test(date);
  };

  // Función para validar el CVV
  const validateCvv = (cvv) => {
    return /^\d{3}$/.test(cvv);
  };

  // Función para manejar el envío del formulario
  const handleSubmit = () => {
    if (!validateCardNumber(cardNumber)) {
      Alert.alert('Error', 'Número de tarjeta inválido. Debe tener 16 dígitos.');
      return;
    }
    if (!validateExpirationDate(expirationDate)) {
      Alert.alert('Error', 'Fecha de expiración inválida. Debe estar en formato MM/AA.');
      return;
    }
    if (!validateCvv(cvv)) {
      Alert.alert('Error', 'CVV inválido. Debe tener 3 dígitos.');
      return;
    }

    // Si todos los campos son válidos
    setCardSaved(true); // Marca la tarjeta como guardada
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          {!cardSaved ? (
            <>
              <Title style={styles.title}>Agregar Tarjeta de Crédito/Débito</Title>
              <TextInput
                label="Número de Tarjeta"
                style={styles.input}
                keyboardType="numeric"
                value={formatCardNumber(cardNumber)}
                onChangeText={text => setCardNumber(text)}
                maxLength={19} // Permite espacio y formato
                placeholder="1234 5678 9012 3456"
                theme={{ colors: { primary: '#88cef6' } }} // Color de borde
                mode="outlined"
              />
              <View style={styles.row}>
                <TextInput
                  label="Fecha de Expiración"
                  style={[styles.input, styles.halfInput]}
                  keyboardType="numeric"
                  value={formatExpirationDate(expirationDate)}
                  onChangeText={text => setExpirationDate(text)}
                  maxLength={5} // Formato MM/AA
                  placeholder="MM/AA"
                  theme={{ colors: { primary: '#88cef6' } }} // Color de borde
                  mode="outlined"
                />
                <TextInput
                  label="CVV"
                  style={[styles.input, styles.halfInput]}
                  keyboardType="numeric"
                  value={cvv}
                  onChangeText={text => setCvv(text.replace(/\D/g, ''))} // Solo números
                  maxLength={3} // CVV de 3 dígitos
                  secureTextEntry
                  placeholder="123"
                  theme={{ colors: { primary: '#88cef6' } }} // Color de borde
                  mode="outlined"
                />
              </View>
              <Button mode="contained" style={styles.button} onPress={handleSubmit}>
                Guardar Tarjeta
              </Button>
            </>
          ) : (
            <View style={styles.savedCardContainer}>
              <Title style={styles.savedCardTitle}>Tarjeta Guardada</Title>
              <Button mode="contained" style={styles.viewButton} onPress={() => Alert.alert('Información de la Tarjeta', `Número de Tarjeta: ${formatCardNumber(cardNumber)}\nFecha de Expiración: ${formatExpirationDate(expirationDate)}\nCVV: ${cvv}`)}>
                Ver Tarjeta Guardada
              </Button>
            </View>
          )}
        </Card.Content>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  card: {
    width: '90%',
    padding: 20,
    backgroundColor: '#ffffff',
    elevation: 3, // Sombra para la tarjeta
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#000',
    textAlign: 'center',
  },
  input: {
    marginVertical: 10,
    width: '100%',
    backgroundColor: '#88cef63f', // Color de fondo de los inputs
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfInput: {
    width: '48%', // Asegura que los inputs de fecha y CVV se ajusten al ancho disponible
  },
  button: {
    marginTop: 20,
    backgroundColor: '#88cef6',
  },
  savedCardContainer: {
    alignItems: 'center',
  },
  savedCardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#000',
  },
  viewButton: {
    backgroundColor: '#88cef6',
  },
});

export default CreditCardScreen;
