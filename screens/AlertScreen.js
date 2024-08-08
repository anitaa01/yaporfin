import React, { useState } from "react";
import { View, Text, StyleSheet, Button, TextInput, TouchableOpacity, Modal, ScrollView } from "react-native";
import { Picker } from '@react-native-picker/picker';

const AlertScreen = () => {
  const [alert, setAlert] = useState({
    tipo: 'Elije el tipo de alerta',
    fecha: new Date().toISOString().split('T')[0],
    mensaje: '',
    operador: '',
  });
  const [isModalVisible, setModalVisible] = useState(false);
  const [isPickerVisible, setPickerVisible] = useState(false);
  const [alerts, setAlerts] = useState([]);
  const [editingAlert, setEditingAlert] = useState(null);

  const handleInputChange = (field, value) => {
    setAlert({
      ...alert,
      [field]: value,
    });
  };

  const handleSubmit = () => {
    if (editingAlert !== null) {
      // Editar alerta existente
      const updatedAlerts = alerts.map((al, index) =>
        index === editingAlert ? alert : al
      );
      setAlerts(updatedAlerts);
    } else {
      // Agregar nueva alerta
      setAlerts([...alerts, alert]);
    }
    handleCloseModal();
  };

  const handleEdit = (index) => {
    setAlert(alerts[index]);
    setEditingAlert(index);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setAlert({
      tipo: 'Elije el tipo de alerta',
      fecha: new Date().toISOString().split('T')[0],
      mensaje: '',
      operador: '',
    });
    setEditingAlert(null);
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.alertButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.alertButtonText}>Realizar alerta</Text>
      </TouchableOpacity>
      
      <ScrollView style={styles.alertList}>
        {alerts.map((al, index) => (
          <View key={index} style={styles.card}>
            <Text style={styles.cardTitle}>Tipo: {al.tipo}</Text>
            <Text>Fecha: {al.fecha}</Text>
            <Text>Mensaje: {al.mensaje}</Text>
            <Text>Operador: {al.operador}</Text>
            <TouchableOpacity onPress={() => handleEdit(index)} style={styles.editButton}>
              <Text style={styles.editButtonText}>Editar Alerta</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
      
      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.modalContainer}>
          <View style={styles.formContainer}>
            <Text style={styles.modalTitle}>Formulario de Alerta</Text>
            
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Tipo:</Text>
              <TouchableOpacity
                style={styles.input}
                onPress={() => setPickerVisible(true)}
              >
                <Text style={styles.inputText}>{alert.tipo}</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Fecha:</Text>
              <TextInput
                style={styles.input}
                placeholder="Fecha"
                value={alert.fecha}
                editable={false}
              />
            </View>
            
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Mensaje:</Text>
              <TextInput
                style={styles.input}
                placeholder="Mensaje"
                value={alert.mensaje}
                onChangeText={(text) => handleInputChange('mensaje', text)}
              />
            </View>
            
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Operador:</Text>
              <TextInput
                style={styles.input}
                placeholder="Operador"
                value={alert.operador}
                onChangeText={(text) => handleInputChange('operador', text)}
              />
            </View>

            <Button title="Mandar Alerta" onPress={handleSubmit} color="#88cef6" />
            <Button title="Cerrar" onPress={handleCloseModal} color="#88cef6" />
            
            <Modal
              visible={isPickerVisible}
              transparent={true}
              animationType="slide"
            >
              <View style={styles.modalContainer}>
                <View style={styles.pickerContainer}>
                  <Picker
                    selectedValue={alert.tipo}
                    onValueChange={(itemValue) => {
                      handleInputChange('tipo', itemValue);
                      setPickerVisible(false);
                    }}
                    style={styles.picker}
                    itemStyle={styles.pickerItem}
                  >
                    <Picker.Item label="Alerta de Mantenimiento" value="Alerta de Mantenimiento" />
                    <Picker.Item label="Alerta de Incidente" value="Alerta de Incidente" />
                    <Picker.Item label="Alerta de Emergencia" value="Alerta de Emergencia" />
                    <Picker.Item label="Alerta de Sistema" value="Alerta de Sistema" />
                    <Picker.Item label="Alerta de Seguridad" value="Alerta de Seguridad" />
                    <Picker.Item label="Alerta de Rendimiento" value="Alerta de Rendimiento" />
                    <Picker.Item label="Alerta de Actualización" value="Alerta de Actualización" />
                    <Picker.Item label="Alerta de Configuración" value="Alerta de Configuración" />
                    <Picker.Item label="Alerta de Error Crítico" value="Alerta de Error Crítico" />
                    <Picker.Item label="Alerta de Usuario" value="Alerta de Usuario" />
                  </Picker>
                  <Button title="Cerrar" onPress={() => setPickerVisible(false)} color="#88cef6" />
                </View>
              </View>
            </Modal>
          </View>
        </View>
      </Modal>
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
  alertButton: {
    backgroundColor: "#88cef6",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  alertButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  alertList: {
    width: "100%",
    marginTop: 20,
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
  editButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "#88cef6",
    borderRadius: 5,
    alignItems: "center",
  },
  editButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  inputGroup: {
    marginBottom: 15,
    width: "100%",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: "#f9f9f9",
    fontSize: 16,
    justifyContent: "center",
  },
  inputText: {
    fontSize: 16,
    color: "black",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  formContainer: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    maxHeight: "80%",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  pickerContainer: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: "80%",
  },
  picker: {
    width: "100%",
  },
  pickerItem: {
    fontSize: 14,
    textAlign: "center",  // Centra el texto en los elementos del Picker
  },
});

export default AlertScreen;
