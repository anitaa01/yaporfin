import React, { useState } from "react";
import { View, Text, StyleSheet, Button, TextInput, TouchableOpacity, Modal, ScrollView } from "react-native";
import { Picker } from '@react-native-picker/picker';

const AlmacenScreen = () => {
  const [almacen, setAlmacen] = useState({
    nombre: '',
    sensores: 'Elije los sensores',
    stock: ''
  });
  const [isModalVisible, setModalVisible] = useState(false);
  const [isPickerVisible, setPickerVisible] = useState(false);
  const [almacenes, setAlmacenes] = useState([]);
  const [editingAlmacen, setEditingAlmacen] = useState(null);

  const handleInputChange = (field, value) => {
    setAlmacen({
      ...almacen,
      [field]: value,
    });
  };

  const handleSubmit = () => {
    if (editingAlmacen !== null) {
      // Editar almacén existente
      const updatedAlmacenes = almacenes.map((alm, index) =>
        index === editingAlmacen ? almacen : alm
      );
      setAlmacenes(updatedAlmacenes);
    } else {
      // Agregar nuevo almacén
      setAlmacenes([...almacenes, almacen]);
    }
    handleCloseModal();
  };

  const handleEdit = (index) => {
    setAlmacen(almacenes[index]);
    setEditingAlmacen(index);
    setModalVisible(true);
  };

  const handleDelete = (index) => {
    const updatedAlmacenes = almacenes.filter((_, i) => i !== index);
    setAlmacenes(updatedAlmacenes);
  };

  const handleCloseModal = () => {
    setAlmacen({
      nombre: '',
      sensores: 'Elije los sensores',
      stock: ''
    });
    setEditingAlmacen(null);
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.almacenButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.almacenButtonText}>Agregar almacén</Text>
      </TouchableOpacity>
      
      <ScrollView style={styles.almacenList}>
        {almacenes.map((alm, index) => (
          <View key={index} style={styles.card}>
            <Text style={styles.cardTitle}>Nombre: {alm.nombre}</Text>
            <Text>Sensores: {alm.sensores}</Text>
            <Text>Stock: {alm.stock}</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={() => handleEdit(index)} style={styles.editButton}>
                <Text style={styles.editButtonText}>Editar Almacén</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDelete(index)} style={styles.deleteButton}>
                <Text style={styles.deleteButtonText}>Eliminar Almacén</Text>
              </TouchableOpacity>
            </View>
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
            <Text style={styles.modalTitle}>Formulario de Almacén</Text>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Nombre:</Text>
              <TextInput
                style={styles.input}
                placeholder="Nombre"
                value={almacen.nombre}
                onChangeText={(text) => handleInputChange('nombre', text)}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Sensores:</Text>
              <TouchableOpacity
                style={styles.input}
                onPress={() => setPickerVisible(true)}
              >
                <Text style={styles.inputText}>{almacen.sensores}</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Stock:</Text>
              <TextInput
                style={styles.input}
                placeholder="Stock"
                value={almacen.stock}
                onChangeText={(text) => handleInputChange('stock', text)}
              />
            </View>

            <Button title="Agregar Almacén" onPress={handleSubmit} color="#88cef6" />
            <Button title="Cerrar" onPress={handleCloseModal} color="#88cef6" />
            
            <Modal
              visible={isPickerVisible}
              transparent={true}
              animationType="slide"
            >
              <View style={styles.modalContainer}>
                <View style={styles.pickerContainer}>
                  <Picker
                    selectedValue={almacen.sensores}
                    onValueChange={(itemValue) => {
                      handleInputChange('sensores', itemValue);
                      setPickerVisible(false);
                    }}
                    style={styles.picker}
                    itemStyle={styles.pickerItem}
                  >
                    <Picker.Item label="Sensor 1" value="Sensor 1" />
                    <Picker.Item label="Sensor 2" value="Sensor 2" />
                    <Picker.Item label="Sensor 3" value="Sensor 3" />
                    {/* Agrega más opciones de sensores aquí */}
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
  almacenButton: {
    backgroundColor: "#88cef6",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  almacenButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  almacenList: {
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
    fontSize: 14,
    fontWeight: "bold",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  editButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "#88cef6",
    borderRadius: 5,
    alignItems: "center",
    marginRight: 10,
  },
  deleteButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "#f44336",
    borderRadius: 5,
    alignItems: "center",
  },
  editButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  deleteButtonText: {
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
    fontSize: 16,
  },
  inputText: {
    fontSize: 16,
    color: "#000",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  formContainer: {
    width: "90%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  pickerContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    width: "80%",
    elevation: 5,
  },
  picker: {
    width: "100%",
    height: 200,
  },
  pickerItem: {
    fontSize: 16,
  },
});

export default AlmacenScreen;
