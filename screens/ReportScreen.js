import React, { useState } from "react";
import { View, Text, StyleSheet, Button, TextInput, TouchableOpacity, Modal, ScrollView } from "react-native";
import { Picker } from '@react-native-picker/picker';

const ReportScreen = () => {
  const [report, setReport] = useState({
    tipo: 'Elije el tipo de reporte',
    fecha: new Date().toISOString().split('T')[0],
    contenido: '',
    empleado: '',
    purificadora: '',
  });
  const [isModalVisible, setModalVisible] = useState(false);
  const [isPickerVisible, setPickerVisible] = useState(false);
  const [reports, setReports] = useState([]);
  const [editingReport, setEditingReport] = useState(null);

  const handleInputChange = (field, value) => {
    setReport({
      ...report,
      [field]: value,
    });
  };

  const handleSubmit = () => {
    if (editingReport !== null) {
      // Editar reporte existente
      const updatedReports = reports.map((rep, index) =>
        index === editingReport ? report : rep
      );
      setReports(updatedReports);
    } else {
      // Agregar nuevo reporte
      setReports([...reports, report]);
    }
    handleCloseModal();
  };

  const handleEdit = (index) => {
    setReport(reports[index]);
    setEditingReport(index);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setReport({
      tipo: 'Elije el tipo de reporte',
      fecha: new Date().toISOString().split('T')[0],
      contenido: '',
      empleado: '',
      purificadora: '',
    });
    setEditingReport(null);
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.reportButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.reportButtonText}>Realizar reporte</Text>
      </TouchableOpacity>
      
      <ScrollView style={styles.reportList}>
        {reports.map((rep, index) => (
          <View key={index} style={styles.card}>
            <Text style={styles.cardTitle}>Tipo: {rep.tipo}</Text>
            <Text>Fecha: {rep.fecha}</Text>
            <Text>Contenido: {rep.contenido}</Text>
            <Text>Empleado: {rep.empleado}</Text>
            <Text>Purificadora: {rep.purificadora}</Text>
            <TouchableOpacity onPress={() => handleEdit(index)} style={styles.editButton}>
              <Text style={styles.editButtonText}>Editar Reporte</Text>
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
            <Text style={styles.modalTitle}>Formulario de Reporte</Text>
            
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Tipo:</Text>
              <TouchableOpacity
                style={styles.input}
                onPress={() => setPickerVisible(true)}
              >
                <Text style={styles.inputText}>{report.tipo}</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Fecha:</Text>
              <TextInput
                style={styles.input}
                placeholder="Fecha"
                value={report.fecha}
                editable={false}
              />
            </View>
            
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Contenido:</Text>
              <TextInput
                style={styles.input}
                placeholder="Contenido"
                value={report.contenido}
                onChangeText={(text) => handleInputChange('contenido', text)}
              />
            </View>
            
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Empleado:</Text>
              <TextInput
                style={styles.input}
                placeholder="Empleado"
                value={report.empleado}
                onChangeText={(text) => handleInputChange('empleado', text)}
              />
            </View>
            
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Purificadora:</Text>
              <TextInput
                style={styles.input}
                placeholder="Purificadora"
                value={report.purificadora}
                onChangeText={(text) => handleInputChange('purificadora', text)}
              />
            </View>

            <Button title="Mandar Reporte" onPress={handleSubmit} color="#88cef6" />
            <Button title="Cerrar" onPress={handleCloseModal} color="#88cef6" />
            
            <Modal
              visible={isPickerVisible}
              transparent={true}
              animationType="slide"
            >
              <View style={styles.modalContainer}>
                <View style={styles.pickerContainer}>
                  <Picker
                    selectedValue={report.tipo}
                    onValueChange={(itemValue) => {
                      handleInputChange('tipo', itemValue);
                      setPickerVisible(false);
                    }}
                    style={styles.picker}
                    itemStyle={styles.pickerItem}
                  >
                    <Picker.Item label="Calidad del Agua" value="Calidad del Agua" />
                    <Picker.Item label="Mantenimiento de Equipos" value="Mantenimiento de Equipos" />
                    <Picker.Item label="Incidencias Operativas" value="Incidencias Operativas" />
                    <Picker.Item label="Inspección de Instalaciones" value="Inspección de Instalaciones" />
                    <Picker.Item label="Capacitación de Personal" value="Capacitación de Personal" />
                    <Picker.Item label="Auditoría Interna" value="Auditoría Interna" />
                    <Picker.Item label="Monitoreo de Sensores" value="Monitoreo de Sensores" />
                    <Picker.Item label="Revisión de Procedimientos" value="Revisión de Procedimientos" />
                    <Picker.Item label="Reporte de Accidentes" value="Reporte de Accidentes" />
                    <Picker.Item label="Evaluación de Servicios" value="Evaluación de Servicios" />
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
  reportButton: {
    backgroundColor: "#88cef6",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  reportButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  reportList: {
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

export default ReportScreen;
