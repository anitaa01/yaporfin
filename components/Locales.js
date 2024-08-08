import React, { useState } from "react";
import { View, Text, StyleSheet, Button, TextInput, TouchableOpacity, Modal, ScrollView } from "react-native";
import { Picker } from '@react-native-picker/picker';

const LocalScreen = () => {
  const [local, setLocal] = useState({
    nombre: '',
    calle: '',
    numCalle: '',
    cp: '',
    municipio: '',
    estado: '',
    almacen: 'Elije el almacén'
  });
  const [isModalVisible, setModalVisible] = useState(false);
  const [isPickerVisible, setPickerVisible] = useState(false);
  const [locals, setLocals] = useState([]);
  const [editingLocal, setEditingLocal] = useState(null);

  const handleInputChange = (field, value) => {
    setLocal({
      ...local,
      [field]: value,
    });
  };

  const handleSubmit = () => {
    if (editingLocal !== null) {
      // Editar local existente
      const updatedLocals = locals.map((loc, index) =>
        index === editingLocal ? local : loc
      );
      setLocals(updatedLocals);
    } else {
      // Agregar nuevo local
      setLocals([...locals, local]);
    }
    handleCloseModal();
  };

  const handleEdit = (index) => {
    setLocal(locals[index]);
    setEditingLocal(index);
    setModalVisible(true);
  };

  const handleDelete = (index) => {
    const updatedLocals = locals.filter((_, i) => i !== index);
    setLocals(updatedLocals);
  };

  const handleCloseModal = () => {
    setLocal({
      nombre: '',
      calle: '',
      numCalle: '',
      cp: '',
      municipio: '',
      estado: '',
      almacen: 'Elije el almacén'
    });
    setEditingLocal(null);
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.localButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.localButtonText}>Agregar local</Text>
      </TouchableOpacity>
      
      <ScrollView style={styles.localList}>
        {locals.map((loc, index) => (
          <View key={index} style={styles.card}>
            <Text style={styles.cardTitle}>Nombre: {loc.nombre}</Text>
            <Text>Calle: {loc.calle}</Text>
            <Text>Número de Calle: {loc.numCalle}</Text>
            <Text>CP: {loc.cp}</Text>
            <Text>Municipio: {loc.municipio}</Text>
            <Text>Estado: {loc.estado}</Text>
            <Text>Almacén: {loc.almacen}</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={() => handleEdit(index)} style={styles.editButton}>
                <Text style={styles.editButtonText}>Editar Local</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDelete(index)} style={styles.deleteButton}>
                <Text style={styles.deleteButtonText}>Eliminar Local</Text>
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
            <Text style={styles.modalTitle}>Formulario de Local</Text>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Nombre:</Text>
              <TextInput
                style={styles.input}
                placeholder="Nombre"
                value={local.nombre}
                onChangeText={(text) => handleInputChange('nombre', text)}
              />
            </View>
            
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Calle:</Text>
              <TextInput
                style={styles.input}
                placeholder="Calle"
                value={local.calle}
                onChangeText={(text) => handleInputChange('calle', text)}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Número de Calle:</Text>
              <TextInput
                style={styles.input}
                placeholder="Número de Calle"
                value={local.numCalle}
                onChangeText={(text) => handleInputChange('numCalle', text)}
              />
            </View>
            
            <View style={styles.inputGroup}>
              <Text style={styles.label}>CP:</Text>
              <TextInput
                style={styles.input}
                placeholder="Código Postal"
                value={local.cp}
                onChangeText={(text) => handleInputChange('cp', text)}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Municipio:</Text>
              <TextInput
                style={styles.input}
                placeholder="Municipio"
                value={local.municipio}
                onChangeText={(text) => handleInputChange('municipio', text)}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Estado:</Text>
              <TextInput
                style={styles.input}
                placeholder="Estado"
                value={local.estado}
                onChangeText={(text) => handleInputChange('estado', text)}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Almacén:</Text>
              <TouchableOpacity
                style={styles.input}
                onPress={() => setPickerVisible(true)}
              >
                <Text style={styles.inputText}>{local.almacen}</Text>
              </TouchableOpacity>
            </View>

            <Button title="Agregar Local" onPress={handleSubmit} color="#88cef6" />
            <Button title="Cerrar" onPress={handleCloseModal} color="#88cef6" />
            
            <Modal
              visible={isPickerVisible}
              transparent={true}
              animationType="slide"
            >
              <View style={styles.modalContainer}>
                <View style={styles.pickerContainer}>
                  <Picker
                    selectedValue={local.almacen}
                    onValueChange={(itemValue) => {
                      handleInputChange('almacen', itemValue);
                      setPickerVisible(false);
                    }}
                    style={styles.picker}
                    itemStyle={styles.pickerItem}
                  >
                    <Picker.Item label="Almacén 1" value="Almacén 1" />
                    <Picker.Item label="Almacén 2" value="Almacén 2" />
                    {/* Agrega más opciones de almacén aquí */}
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
  localButton: {
    backgroundColor: "#88cef6",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  localButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  localList: {
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

export default LocalScreen;
