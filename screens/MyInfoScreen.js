import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card, Paragraph } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';

const MyInfoScreen = ({ user, employee }) => {
  // Información del empleado
  const employeeInfo = employee ? {
    id: employee.id || 'No disponible',
    name: employee.name || 'No disponible',
    apellidoMaterno: employee.apellido_Materno || 'No disponible',
    apellidoPaterno: employee.apellido_Paterno || 'No disponible',
  } : {};

  // Información del usuario
  const userName = user && user.displayName ? user.displayName : 'No disponible';
  const localesCount = user && user.localesCount ? user.localesCount : 'No disponible';
  const almacenesCount = user && user.almacenesCount ? user.almacenesCount : 'No disponible';
  const operadoresCount = user && user.operadoresCount ? user.operadoresCount : 'No disponible';
  const tinacosCount = user && user.tinacosCount ? user.tinacosCount : 'No disponible';

  return (
    <View style={styles.container}>
      <Card style={styles.infoCard}>
        {/* Información del usuario */}
        <Card.Content style={styles.userCardContent}>
          <Icon
            name="account-circle"
            size={80}
            color="#015C92"
            style={styles.userIcon}
          />
          <Text style={styles.userName}>{userName}</Text>
        </Card.Content>

        {/* Información del empleado */}
        <Card.Content style={styles.employeeCardContent}>
          <Text style={styles.employeeTitle}>Información del Empleado</Text>
          <View style={styles.infoItem}>
            <Icon name="badge" size={30} color="#015C92" />
            <Paragraph style={styles.infoText}>ID: {employeeInfo.id}</Paragraph>
          </View>
          <View style={styles.infoItem}>
            <Icon name="person" size={30} color="#015C92" />
            <Paragraph style={styles.infoText}>Nombre: {employeeInfo.name}</Paragraph>
          </View>
          <View style={styles.infoItem}>
            <Icon name="person-outline" size={30} color="#015C92" />
            <Paragraph style={styles.infoText}>Apellido Paterno: {employeeInfo.apellidoPaterno}</Paragraph>
          </View>
          <View style={styles.infoItem}>
            <Icon name="person-outline" size={30} color="#015C92" />
            <Paragraph style={styles.infoText}>Apellido Materno: {employeeInfo.apellidoMaterno}</Paragraph>
          </View>
        </Card.Content>

        {/* Información adicional */}
        <Card.Content style={styles.additionalInfoContent}>
          <View style={styles.infoItem}>
            <Icon name="store" size={30} color="#015C92" />
            <Paragraph style={styles.infoText}>Locales: {localesCount}</Paragraph>
          </View>
          <View style={styles.infoItem}>
            <Icon name="inventory" size={30} color="#015C92" />
            <Paragraph style={styles.infoText}>Almacenes: {almacenesCount}</Paragraph>
          </View>
          <View style={styles.infoItem}>
            <Icon name="group" size={30} color="#015C92" />
            <Paragraph style={styles.infoText}>Operadores: {operadoresCount}</Paragraph>
          </View>
          <View style={styles.infoItem}>
            <Icon name="opacity" size={30} color="#015C92" />
            <Paragraph style={styles.infoText}>Tinacos: {tinacosCount}</Paragraph>
          </View>
        </Card.Content>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: 20,
  },
  infoCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 2,
  },
  userCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  userIcon: {
    marginRight: 15,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  employeeCardContent: {
    padding: 15,
  },
  employeeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  infoText: {
    fontSize: 16,
    marginLeft: 10,
  },
  additionalInfoContent: {
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
});

export default MyInfoScreen;
