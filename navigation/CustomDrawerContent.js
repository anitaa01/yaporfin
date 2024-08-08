// navigation/CustomDrawerContent.js
import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";
import Icon from 'react-native-vector-icons/MaterialIcons';

const CustomDrawerContent = (props) => {
  const { user, navigation } = props;

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigation.navigate("Login");
    } catch (error) {
      console.error("Sign out failed", error.message);
    }
  };

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={styles.drawerContent}>
      <View style={styles.userInfoSection}>
        {user && (
          <>
            <Icon
              name="account-circle"
              size={80}
              color="#015C92"
              style={styles.userIcon}
            />
            <Text style={styles.userName}>{user.email}</Text>
            <View style={styles.separator} />
          </>
        )}
      </View>
      <View style={styles.drawerItems}>
        {user.rol === 'usuario' ? (
          <>
            <DrawerItem
              label="Inicio"
              labelStyle={styles.drawerLabel}
              onPress={() => props.navigation.navigate("Inicio")}
              icon={({ color, size }) => (
                <Icon name="home" color={color} size={size} />
              )}
            />
            <DrawerItem
              label="Reportes"
              labelStyle={styles.drawerLabel}
              onPress={() => props.navigation.navigate("Reportes")}
              icon={({ color, size }) => (
                <Icon name="assessment" color={color} size={size} />
              )}
            />
            <DrawerItem
              label="Alertas"
              labelStyle={styles.drawerLabel}
              onPress={() => props.navigation.navigate("Alertas")}
              icon={({ color, size }) => (
                <Icon name="notifications" color={color} size={size} />
              )}
            />
          </>
        ) : (
          <>
            <DrawerItem
              label="Inicio"
              labelStyle={styles.drawerLabel}
              onPress={() => props.navigation.navigate("Inicio")}
              icon={({ color, size }) => (
                <Icon name="home" color={color} size={size} />
              )}
            />
            <DrawerItem
              label="Paquete Contratado"
              labelStyle={styles.drawerLabel}
              onPress={() => props.navigation.navigate("Paquete Contratado")}
              icon={({ color, size }) => (
                <Icon name="build" color={color} size={size} />
              )}
            />
            <DrawerItem
              label="Forma de Pago"
              labelStyle={styles.drawerLabel}
              onPress={() => props.navigation.navigate("Forma de Pago")}
              icon={({ color, size }) => (
                <Icon name="payment" color={color} size={size} />
              )}
            />
            <DrawerItem
              label="Información General"
              labelStyle={styles.drawerLabel}
              onPress={() => props.navigation.navigate("Información General")}
              icon={({ color, size }) => (
                <Icon name="info" color={color} size={size} />
              )}
            />
          </>
        )}
      </View>
      <View style={styles.signOutContainer}>
        <TouchableOpacity onPress={handleSignOut} style={styles.signOutButton}>
          <Icon name="logout" color="#fff" size={20} />
          <Text style={styles.signOutText}>Cerrar Sesión</Text>
        </TouchableOpacity>
      </View>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  drawerContent: {
    flexGrow: 1,
  },
  userInfoSection: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  userIcon: {
    marginBottom: 10,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  separator: {
    height: 1,
    backgroundColor: '#ccc',
    alignSelf: 'stretch',
    marginVertical: 10,
  },
  drawerItems: {
    flex: 1,
  },
  drawerLabel: {
    fontSize: 16,
  },
  signOutContainer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  signOutButton: {
    backgroundColor: '#BCE6FF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    flexDirection: 'row',
  },
  signOutText: {
    marginLeft: 10,
    color: '#fff',
    fontSize: 16,
  },
});

export default CustomDrawerContent;
