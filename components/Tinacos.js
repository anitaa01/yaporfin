import React, { useState } from "react";
import { View, Text, StyleSheet, Button, TextInput, TouchableOpacity, Modal, ScrollView } from "react-native";
import { Picker } from '@react-native-picker/picker';

const TinacoScreen = () => {
  const [tinaco, setTinaco] = useState({
    nombre: '',
    capacidad: '',
    altura: '',
    local: 'Elije el local'
  });
  const [isModalVisible, setModalVisible] = useState(false);
  const [isPickerVisible, setPickerVisible] = useState(false);
  const [tinacos, setTinacos] = useState([]);
  const [editingTinaco, setEditingTinaco] = useState(null);

  const handleInputChange = (field, value) => {
    setTinaco({
      ...tinaco,
      [field]: value,
    });
  };

  const handleSubmit = () => {
    if (editingTinaco !== null) {
      // Editar tinaco existente
      const updatedTinacos = tinacos.map((al, index) =>
        index === editingTinaco ? tinaco : al
      );
      setTinacos(updatedTinacos);
    } else {
      // Agregar nuevo tinaco
      setTinacos([...tinacos, tinaco]);
    }
    handleCloseModal();
  };

  const handleEdit = (index) => {
    setTinaco(tinacos[index]);
    setEditingTinaco(index);
    setModalVisible(true);
  };

  const handleDelete = (index) => {
    const updatedTinacos = tinacos.filter((_, i) => i !== index);
    setTinacos(updatedTinacos);
  };

  const handleCloseModal = () => {
    setTinaco({
      nombre: '',
      capacidad: '',
      altura: '',
      local: 'Elije el local'
    });
    setEditingTinaco(null);
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.tinacoButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.tinacoButtonText}>Agregar tinaco</Text>
      </TouchableOpacity>
      
      <ScrollView style={styles.tinacoList}>
        {tinacos.map((al, index) => (
          <View key={index} style={styles.card}>
            <Text style={styles.cardTitle}>Nombre: {al.nombre}</Text>
            <Text>Capacidad: {al.capacidad}</Text>
            <Text>Altura: {al.altura}</Text>
            <Text>Local: {al.local}</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={() => handleEdit(index)} style={styles.editButton}>
                <Text style={styles.editButtonText}>Editar Tinaco</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDelete(index)} style={styles.deleteButton}>
                <Text style={styles.deleteButtonText}>Eliminar Tinaco</Text>
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
            <Text style={styles.modalTitle}>Formulario de Tinaco</Text>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Nombre:</Text>
              <TextInput
                style={styles.input}
                placeholder="Nombre"
                value={tinaco.nombre}
                onChangeText={(text) => handleInputChange('nombre', text)}
              />
            </View>
            
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Capacidad:</Text>
              <TextInput
                style={styles.input}
                placeholder="Capacidad"
                value={tinaco.capacidad}
                onChangeText={(text) => handleInputChange('capacidad', text)}
              />
            </View>
            
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Altura:</Text>
              <TextInput
                style={styles.input}
                placeholder="Altura"
                value={tinaco.altura}
                onChangeText={(text) => handleInputChange('altura', text)}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Local:</Text>
              <TouchableOpacity
                style={styles.input}
                onPress={() => setPickerVisible(true)}
              >
                <Text style={styles.inputText}>{tinaco.local}</Text>
              </TouchableOpacity>
            </View>

            <Button title="Agregar Tinaco" onPress={handleSubmit} color="#88cef6" />
            <Button title="Cerrar" onPress={handleCloseModal} color="#88cef6" />
            
            <Modal
              visible={isPickerVisible}
              transparent={true}
              animationType="slide"
            >
              <View style={styles.modalContainer}>
                <View style={styles.pickerContainer}>
                  <Picker
                    selectedValue={tinaco.local}
                    onValueChange={(itemValue) => {
                      handleInputChange('local', itemValue);
                      setPickerVisible(false);
                    }}
                    style={styles.picker}
                    itemStyle={styles.pickerItem}
                  >
                    <Picker.Item label="Local 1" value="Local 1" />
                    <Picker.Item label="Local 2" value="Local 2" />
                    {/* Agrega más opciones de local aquí */}
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
  tinacoButton: {
    backgroundColor: "#88cef6",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  tinacoButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  tinacoList: {
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
    height: 200,
  },
  pickerItem: {
    fontSize: 16,
  },
});

export default TinacoScreen;
