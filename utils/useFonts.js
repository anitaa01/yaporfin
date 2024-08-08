// utils/useFonts.js
import React from 'react';
import { useFonts as usePoppinsFonts } from '@expo-google-fonts/poppins';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync(); // Prevents the splash screen from auto hiding

export default function useFonts() {
  const [fontsLoaded] = usePoppinsFonts({
    'poppins-regular': require('@expo-google-fonts/poppins/Poppins_400Regular.ttf'),
    'poppins-bold': require('@expo-google-fonts/poppins/Poppins_700Bold.ttf'),
  });

  React.useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync(); // Hides the splash screen when fonts are loaded
    }
  }, [fontsLoaded]);

  return fontsLoaded;
}
