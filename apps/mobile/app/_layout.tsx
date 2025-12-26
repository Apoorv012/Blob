import '../global.css';

import { Slot } from 'expo-router';
import { TRPCProvider } from '@/utils/TRPCProvider';

export default function RootLayout() {
  return (
    <TRPCProvider>
      <Slot />
    </TRPCProvider>
  );
}
