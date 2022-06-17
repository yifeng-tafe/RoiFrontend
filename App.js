import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from "react-native-safe-area-context";
// import { StyleSheet, Text, View } from 'react-native';

// Import helpers and navigation
import RootNavigator from './navigation/RootNavigator';
import LinkingConfiguration from './navigation/LinkingConfiguration';
import FlashMessage from 'react-native-flash-message';


export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer linking={LinkingConfiguration}>
        <RootNavigator />
      </NavigationContainer>
      <StatusBar style="auto" />
      {/* Global FlashMessage component to allow banners to appear */}
      <FlashMessage position="top" />
    </SafeAreaProvider>
  );
}

