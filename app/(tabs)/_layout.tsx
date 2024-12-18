import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';
import { HapticTab } from '@/components/HapticTab';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors'
import { useColorScheme } from '@/hooks/useColorScheme'

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            position: 'absolute',
          },
          default: {},
        }),
      }}>
      <Tabs.Screen name="index" options={{title: 'Home', tabBarStyle: { display: 'none' },  href: null}}/>
        
      <Tabs.Screen
        name="auth/login"
        options={{title: 'Login', tabBarStyle: { display: 'none' }, href: null}} />

      <Tabs.Screen
        name="auth/signUp"
        options={{title: 'signUp', tabBarStyle: { display: 'none' }, href: null}} /> 

      <Tabs.Screen
        name="auth/resetPassword"
        options={{title: 'reset', tabBarStyle: { display: 'none' }, href: null}} /> 

      <Tabs.Screen
        name="profile"
        options={{title: 'profile', tabBarStyle: { display: 'none' }, href: null}} /> 

    </Tabs>
  );
}
