import { ThemeSwitcher } from '@/components/ThemeSwitcher';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-black" edges={['bottom']}>
      <View className="flex-1 items-center justify-center p-6">
        <ThemeSwitcher />
        <Text className="mb-3 text-center text-3xl font-bold text-blue-600 dark:text-blue-400">
          Home
        </Text>
        <Text className="mb-6 text-center text-lg text-gray-700 dark:text-gray-300">
          Welcome to your study dashboard
        </Text>
        <Text className="px-5 text-center text-sm leading-snug text-gray-600 dark:text-gray-400">
          This is a placeholder for the Home screen.{'\n'}
          Future features will include your recent flashcards, study progress, and quick actions.
        </Text>
      </View>
    </SafeAreaView>
  );
}
