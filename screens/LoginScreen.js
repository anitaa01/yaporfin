// screens/AuthScreen.js
import React, { useLayoutEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native';
import globalStyles from '../styles/global'; // Asegúrate de que la ruta sea correcta

const AuthScreen = ({ navigation, email, setEmail, password, setPassword, isLogin, setIsLogin, handleAuthentication }) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.title}>{isLogin ? 'Sign In' : 'Sign Up'}</Text>
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder='Email'
            placeholderTextColor="#888"
            autoCapitalize='none'
          />
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            placeholder='Password'
            secureTextEntry
            placeholderTextColor="#888"
          />
          <TouchableOpacity style={styles.button} onPress={handleAuthentication}>
            <Text style={styles.buttonText}>{isLogin ? 'Sign In' : 'Sign Up'}</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => setIsLogin(!isLogin)}>
          <Text style={styles.toggleText}>
            {isLogin ? 'Don\'t have an account? Sign Up' : 'Already have an account? Sign In'}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.imageContainer}>
        <Image 
          source={require('../assets/img/background.png')} // Asegúrate de que la ruta de la imagen sea correcta
          style={styles.image}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '30%', // Reducción del ancho de la imagen
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 20,
    borderRightWidth: 1,
    borderColor: '#ddd',
    width: '70%', // Aumento del ancho del formulario
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
    ...globalStyles.boldText,
  },
  form: {
    width: '100%',
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 16,
    padding: 8,
    borderRadius: 4,
    fontFamily: 'poppins-regular',
  },
  button: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 4,
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonText: {
    color: 'white',
    fontFamily: 'poppins-bold',
  },
  toggleText: {
    color: '#3498db',
    textAlign: 'center',
    fontFamily: 'poppins-light',
  },
});

export default AuthScreen;
