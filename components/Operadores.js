import React, { useState } from "react";
import { View, Text, StyleSheet, Button, TextInput, TouchableOpacity, Modal, ScrollView } from "react-native";
import { Picker } from '@react-native-picker/picker';

const OperadorScreen = () => {
  const [Operador, setOperador] = useState({
    nombre: '',
    correo: '',
    contraseña: '',
    rol: 'Elije el tipo de rol'
  });
  const [isModalVisible, setModalVisible] = useState(false);
  const [isPickerVisible, setPickerVisible] = useState(false);
  const [Operadors, setOperadors] = useState([]);
  const [editingOperador, setEditingOperador] = useState(null);

  const handleInputChange = (field, value) => {
    setOperador({
      ...Operador,
      [field]: value,
    });
  };

  const handleSubmit = () => {
    if (editingOperador !== null) {
      // Editar Operadora existente
      const updatedOperadors = Operadors.map((al, index) =>
        index === editingOperador ? Operador : al
      );
      setOperadors(updatedOperadors);
    } else {
      // Agregar nueva Operadora
      setOperadors([...Operadors, Operador]);
    }
    handleCloseModal();
  };

  const handleEdit = (index) => {
    setOperador(Operadors[index]);
    setEditingOperador(index);
    setModalVisible(true);
  };

  const handleDelete = (index) => {
    const updatedOperadors = Operadors.filter((_, i) => i !== index);
    setOperadors(updatedOperadors);
  };

  const handleCloseModal = () => {
    setOperador({
      nombre: '',
      correo: '',
      contraseña: '',
      rol: 'Elije el tipo de rol'
    });
    setEditingOperador(null);
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.OperadorButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.OperadorButtonText}>Agregar operador</Text>
      </TouchableOpacity>
      
      <ScrollView style={styles.OperadorList}>
        {Operadors.map((al, index) => (
          <View key={index} style={styles.card}>
            <Text style={styles.cardTitle}>Nombre: {al.nombre}</Text>
            <Text>Correo: {al.correo}</Text>
            <Text>Contraseña: {al.contraseña}</Text>
            <Text>Rol: {al.rol}</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={() => handleEdit(index)} style={styles.editButton}>
                <Text style={styles.editButtonText}>Editar Operador</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDelete(index)} style={styles.deleteButton}>
                <Text style={styles.deleteButtonText}>Eliminar Operador</Text>
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
            <Text style={styles.modalTitle}>Formulario de Operador</Text>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Nombre:</Text>
              <TextInput
                style={styles.input}
                placeholder="Nombre"
                value={Operador.nombre}
                onChangeText={(text) => handleInputChange('nombre', text)}
              />
            </View>
            
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Correo:</Text>
              <TextInput
                style={styles.input}
                placeholder="Correo electronico"
                value={Operador.correo}
                onChangeText={(text) => handleInputChange('correo', text)}
              />
            </View>
            
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Contraseña:</Text>
              <TextInput
                style={styles.input}
                placeholder="Contraseña"
                value={Operador.contraseña}
                onChangeText={(text) => handleInputChange('contraseña', text)}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Rol:</Text>
              <TouchableOpacity
                style={styles.input}
                onPress={() => setPickerVisible(true)}
              >
                <Text style={styles.inputText}>{Operador.rol}</Text>
              </TouchableOpacity>
            </View>

            <Button title="Agregar Operador" onPress={handleSubmit} color="#88cef6" />
            <Button title="Cerrar" onPress={handleCloseModal} color="#88cef6" />
            
            <Modal
              visible={isPickerVisible}
              transparent={true}
              animationType="slide"
            >
              <View style={styles.modalContainer}>
                <View style={styles.pickerContainer}>
                  <Picker
                    selectedValue={Operador.rol}
                    onValueChange={(itemValue) => {
                      handleInputChange('rol', itemValue);
                      setPickerVisible(false);
                    }}
                    style={styles.picker}
                    itemStyle={styles.pickerItem}
                  >
                    <Picker.Item label="Administrador" value="Administrador" />
                    <Picker.Item label="Operador" value="Operador" />
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
  OperadorButton: {
    backgroundColor: "#88cef6",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  OperadorButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  OperadorList: {
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
  },
  pickerItem: {
    fontSize: 14,
    textAlign: "center",
  },
});

export default OperadorScreen;
