// App.js
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import DrawerNavigator from './navigation/DrawerNavigator';
import LoginScreen from './screens/LoginScreen';
import PayPalScreen from './components/Paypal';
import CreditCardScreen from './components/CreditCard';
import ReferenceScreen from './components/Reference';
import OperadoresScreen from './components/Operadores';
import TinacosScreen from './components/Tinacos';
import LocalesScreen from './components/Locales';
import AlmacenesScreen from './components/Almacenes';
import ReportesScreen from './components/Reportes';
import { auth, db } from './config/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import useFonts from './utils/useFonts';
import * as SplashScreen from 'expo-splash-screen';
import AlertasScreen from './components/Alertas';

const Stack = createStackNavigator();

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [isLogin, setIsLogin] = useState(true);

  // Carga de fuentes
  const fontStatus = useFonts();

  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();
      } catch (e) {
        console.warn(e);
      }
    }
    prepare();
  }, []);

  useEffect(() => {
    if (fontStatus) {
      setFontsLoaded(true);
      SplashScreen.hideAsync();
    }
  }, [fontStatus]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
      if (authUser) {
        const docRef = doc(db, "users", authUser.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setUser(docSnap.data());
        } else {
          await setDoc(docRef, {
            email: authUser.email,
            id: authUser.uid,
            rol: "usuario"
          });
          setUser({
            email: authUser.email,
            id: authUser.uid,
            rol: "usuario"
          });
        }
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleAuthentication = async () => {
    try {
      if (user) {
        await signOut(auth);
      } else {
        if (isLogin) {
          await signInWithEmailAndPassword(auth, email, password);
        } else {
          const userCredential = await createUserWithEmailAndPassword(auth, email, password);
          const newUser = userCredential.user;

          await setDoc(doc(db, "users", newUser.uid), {
            email: newUser.email,
            id: newUser.uid,
            rol: "usuario"
          });

          setUser({
            email: newUser.email,
            id: newUser.uid,
            rol: "usuario"
          });
        }
      }
    } catch (error) {
      console.error('Authentication failed', error.message);
    }
  };

  if (!fontsLoaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user ? (
          <>
            <Stack.Screen
              name="Regresar"
              options={{ headerShown: false }} // Oculta el encabezado de la pila de navegación
            >
              {(props) => <DrawerNavigator {...props} user={user} />}
            </Stack.Screen>
            <Stack.Screen name="PayPal" component={PayPalScreen} />
            <Stack.Screen name="Tarjeta de credito/debito" component={CreditCardScreen} />
            <Stack.Screen name="Referencia" component={ReferenceScreen} />
            <Stack.Screen name="Operadores" component={OperadoresScreen} />
            <Stack.Screen name="Tinacos" component={TinacosScreen} />
            <Stack.Screen name="Locales" component={LocalesScreen} />
            <Stack.Screen name="Almacenes" component={AlmacenesScreen} />
            <Stack.Screen name="Reportes" component={ReportesScreen} />
            <Stack.Screen name="Alertas" component={AlertasScreen} />
          </>
        ) : (
          <Stack.Screen
            name="Login"
            options={{ headerShown: false }}
          >
            {(props) => (
              <LoginScreen
                {...props}
                email={email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
                isLogin={isLogin}
                setIsLogin={setIsLogin}
                handleAuthentication={handleAuthentication}
              />
            )}
          </Stack.Screen>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
