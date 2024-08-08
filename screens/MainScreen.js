// screens/OperadoresScreen.js
import React from "react";
import { View, Text, StyleSheet } from "react-native";

const MainScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Mantenimiento</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default MainScreen;
