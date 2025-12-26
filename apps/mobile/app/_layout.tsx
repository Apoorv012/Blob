import '../global.css';

import { StatusBar } from 'react-native';
import { Slot } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { TRPCProvider } from '@/utils/TRPCProvider';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <TRPCProvider>
        <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
        <Slot />
      </TRPCProvider>
    </SafeAreaProvider>
  );
}
