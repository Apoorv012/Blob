import { useEffect, useRef } from 'react';
import {
  View,
  Text,
  Pressable,
  Image,
  ScrollView,
  useWindowDimensions,
  Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { useAuthStore } from '@/store/authStore';

export default function LoginScreen() {
  const login = useAuthStore((state) => state.login);
  const { width } = useWindowDimensions();

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const logoScale = useRef(new Animated.Value(0.9)).current;
  const titleFade = useRef(new Animated.Value(0)).current;
  const descFade = useRef(new Animated.Value(0)).current;
  const buttonScale = useRef(new Animated.Value(0.95)).current;
  const buttonOpacity = useRef(new Animated.Value(0)).current;

  const imageSize = Math.min(width * 0.5, 180);

  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.spring(logoScale, {
          toValue: 1,
          tension: 50,
          friction: 7,
          useNativeDriver: true,
        }),
      ]),
      Animated.timing(titleFade, {
        toValue: 1,
        duration: 500,
        delay: 100,
        useNativeDriver: true,
      }),
      Animated.timing(descFade, {
        toValue: 1,
        duration: 500,
        delay: 100,
        useNativeDriver: true,
      }),
      Animated.parallel([
        Animated.spring(buttonScale, {
          toValue: 1,
          tension: 50,
          friction: 7,
          useNativeDriver: true,
        }),
        Animated.timing(buttonOpacity, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  }, []);

  const handleGoogleSignIn = () => {
    // UI only - no actual auth logic
    login();
    router.replace('/(tabs)/home');
  };

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-gray-950" edges={['top', 'left', 'right']}>
      <ScrollView
        className="flex-1"
        contentContainerClassName="flex-grow justify-between px-6 py-8"
        showsVerticalScrollIndicator={false}
        bounces={false}>
        <Animated.View
          className="min-h-[200px] flex-1 items-center justify-center"
          style={{
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          }}>
          <Animated.View
            className="mb-8 items-center"
            style={{ transform: [{ scale: logoScale }] }}>
            <Image
              source={require('../../assets/adaptive-icon.png')}
              style={{ width: imageSize, height: imageSize }}
              resizeMode="contain"
            />
          </Animated.View>

          <Animated.View style={{ opacity: titleFade }}>
            <Text className="mb-4 px-6 text-center text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
              Welcome Back to <Text className="text-orange-500">Blob</Text>
            </Text>
          </Animated.View>

          <Animated.View style={{ opacity: descFade }}>
            <Text className="px-6 text-center text-lg leading-6 text-gray-600 dark:text-gray-400">
              Sign in to continue your learning journey
            </Text>
          </Animated.View>
        </Animated.View>

        <Animated.View
          className="mt-6"
          style={{ transform: [{ scale: buttonScale }], opacity: buttonOpacity }}>
          <Pressable
            className="mb-4 h-14 flex-row items-center justify-center rounded-2xl bg-white border border-gray-300 shadow-sm active:bg-gray-50 dark:bg-gray-900 dark:border-gray-700 dark:active:bg-gray-800"
            onPress={handleGoogleSignIn}>
            <Ionicons name="logo-google" size={20} color="#EA4335" />
            <Text className="ml-3 text-lg font-semibold text-gray-700 dark:text-gray-200">
              Continue with Google
            </Text>
          </Pressable>

          <Text className="px-4 text-center text-xs leading-5 text-gray-400 dark:text-gray-500">
            By continuing, you agree to our Terms and Privacy Policy
          </Text>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}
