import { Stack } from 'expo-router';

export default function OnboardingLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen
        name="getting-started"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="login"
        options={{ title: 'Login' }}
      />
    </Stack>
  );
}
