import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import { Provider as PaperProvider } from 'react-native-paper';


import {
  useFonts,
  CormorantGaramond_300Light,
  CormorantGaramond_300Light_Italic,
  CormorantGaramond_400Regular,
  CormorantGaramond_400Regular_Italic,
  CormorantGaramond_500Medium,
  CormorantGaramond_500Medium_Italic,
  CormorantGaramond_600SemiBold,
  CormorantGaramond_600SemiBold_Italic,
  CormorantGaramond_700Bold,
  CormorantGaramond_700Bold_Italic
} from '@expo-google-fonts/cormorant-garamond'
import AppLoading from "expo-app-loading";

// Redux
// import { Provider } from 'react-redux'
// import configureStore from './redux/store';
// const store = configureStore();

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  let [fontsLoaded, error] = useFonts({
    CormorantGaramond_300Light,
    CormorantGaramond_300Light_Italic,
    CormorantGaramond_400Regular,
    CormorantGaramond_400Regular_Italic,
    CormorantGaramond_500Medium,
    CormorantGaramond_500Medium_Italic,
    CormorantGaramond_600SemiBold,
    CormorantGaramond_600SemiBold_Italic,
    CormorantGaramond_700Bold,
    CormorantGaramond_700Bold_Italic
  });

  if (!isLoadingComplete) {
    return null;
  } else if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <SafeAreaProvider>
        <PaperProvider>
          <Navigation colorScheme={colorScheme} />
          <StatusBar style="dark" />
        </PaperProvider>
      </SafeAreaProvider>
    );
  }
}
