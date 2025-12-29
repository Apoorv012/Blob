import { View, Text, Pressable, ScrollView, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';

import { useAuthStore } from '@/store/authStore';

export default function LoginScreen() {
  const login = useAuthStore((state) => state.login);
  const { height } = useWindowDimensions();

  const isSmallDevice = height < 700;
  const verticalPadding = isSmallDevice ? 'py-4' : 'py-8';

  const handleLogin = () => {
    login();
    router.replace('/(tabs)/home');
  };

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-black" edges={['top', 'left', 'right']}>
      <ScrollView
        className="flex-1"
        contentContainerClassName={`flex-grow justify-between px-6 ${verticalPadding}`}
        showsVerticalScrollIndicator={false}
        bounces={false}>
        <View className="min-h-[200px] flex-1 items-center justify-center">
          <Text className="mb-3 text-center text-3xl font-bold text-green-700 dark:text-green-400">
            Login
          </Text>

          <Text className="mb-6 px-6 text-center text-lg text-gray-700 dark:text-gray-300">
            Sign in to continue your learning journey
          </Text>

          <Text className="px-8 text-center text-sm italic text-gray-600 dark:text-gray-400">
            (This is a placeholder screen. Tap the button below to simulate login)
          </Text>
        </View>

        <Pressable
          className="h-14 items-center justify-center rounded-xl bg-green-700 active:bg-green-800"
          onPress={handleLogin}>
          <Text className="text-lg font-semibold text-white">Login</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}
