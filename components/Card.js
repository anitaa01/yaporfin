// components/Card.js
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

const Card = ({ iconName, title, count }) => {
  const navigation = useNavigation();

  const handlePress = () => {
    switch (title) {
      case 'Operadores':
        navigation.navigate('Operadores');
        break;
      case 'Tinacos':
        navigation.navigate('Tinacos');
        break;
      case 'Locales':
        navigation.navigate('Locales');
        break;
      case 'Almacenes':
        navigation.navigate('Almacenes');
        break;
      case 'Reportes':
        navigation.navigate('Reportes');
        break;
      case 'Alertas':
        navigation.navigate('Alertas');
        break;
      default:
        break;
    }
  };

  return (
    <TouchableOpacity onPress={handlePress} style={styles.card}>
      <Icon name={iconName} size={50} color="#015C92" style={styles.cardIcon} />
      <Text style={styles.cardTitle}>{title}</Text>
      <View style={styles.cardRight}>
        <Text style={styles.cardCount}>{count}</Text>
        <Icon name="chevron-right" size={30} color="gray" />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
    marginVertical: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 5,
    elevation: 2,
  },
  cardIcon: {
    width: 50,
    height: 60,
  },
  cardTitle: {
    flex: 1,
    marginLeft: 15,
    fontSize: 20,
    fontWeight: '700',
  },
  cardRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardCount: {
    marginRight: 10,
    fontSize: 18,
    color: 'gray',
  },
});

export default Card;
