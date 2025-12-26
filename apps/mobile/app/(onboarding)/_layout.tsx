import { Stack } from 'expo-router';

export default function OnboardingLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: '#f5f5f5',
        },
        headerTintColor: '#333',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <Stack.Screen
        name="getting-started"
        options={{
          title: 'Welcome to Blob',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="login"
        options={{
          title: 'Login',
        }}
      />
    </Stack>
  );
}
