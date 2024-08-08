// screens/PayPalScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const PayPalScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Información sobre el pago con PayPal</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PayPalScreen;
