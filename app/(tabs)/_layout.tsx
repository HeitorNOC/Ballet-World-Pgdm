import { HapticTab } from '@/components/HapticTab';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Tabs } from 'expo-router';
import React from 'react';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        // Esconde a barra de abas globalmente
        tabBarStyle: { display: 'none' },

        // Se ainda quiser manter comportamentos personalizados,
        // deixe-os aqui. Mas a barra ficará invisível.
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        // Ajuste para iOS se precisar
        // tabBarStyle: Platform.select({
        //   ios: { position: 'absolute', display: 'none' },
        //   default: { display: 'none' },
        // }),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          href: null,
        }}
      />
      <Tabs.Screen
        name="auth/login"
        options={{
          title: 'Login',
          href: null,
        }}
      />
      <Tabs.Screen
        name="auth/signUp"
        options={{
          title: 'signUp',
          href: null,
        }}
      />
      <Tabs.Screen
        name="auth/resetPassword"
        options={{
          title: 'reset',
          href: null,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'profile',
          href: null,
        }}
      />
    </Tabs>
  );
}
