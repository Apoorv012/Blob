import { Redirect } from 'expo-router';
import { useEffect } from 'react';

import { useAuthStore } from '@/store/authStore';

export default function Index() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  useEffect(() => {
    console.log('[Index] isAuthenticated:', isAuthenticated);

    if (isAuthenticated) {
      console.log('[Index] Redirecting → /(tabs)/home\n');
    } else {
      console.log('[Index] Redirecting → /(onboarding)/getting-started\n');
    }
  }, [isAuthenticated]);

  if (isAuthenticated) {
    return <Redirect href="/(tabs)/home" />;
  }

  return <Redirect href="/(onboarding)/getting-started" />;
}
