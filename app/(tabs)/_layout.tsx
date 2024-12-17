import { HapticTab } from '@/components/HapticTab';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { drizzle } from "drizzle-orm/expo-sqlite";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import { Tabs } from 'expo-router';
import { openDatabaseSync, SQLiteProvider } from "expo-sqlite";
import React from 'react';
import { ActivityIndicator, Platform, Text, View } from 'react-native';
import migrations from "../../drizzle/migrations";

const DATABASE_NAME = "database.db"
const expoDB = openDatabaseSync(DATABASE_NAME)
const db = drizzle(expoDB)

export default function TabLayout() {
  const { success, error } = useMigrations(db, migrations)
  const colorScheme = useColorScheme();

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>{error.message}</Text>
      </View>
    )
  }

  if (!success) {
    return (
      <ActivityIndicator style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} />
    )
  }

  return (
    <SQLiteProvider databaseName={DATABASE_NAME}>

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
        <Tabs.Screen name="index" options={{ title: 'Home', tabBarStyle: { display: 'none' }, href: null }} />

        <Tabs.Screen
          name="auth/login"
          options={{ title: 'Login', tabBarStyle: { display: 'none' }, href: null }} />

        <Tabs.Screen
          name="auth/signUp"
          options={{ title: 'signUp', tabBarStyle: { display: 'none' }, href: null }} />

        <Tabs.Screen
          name="auth/resetPassword"
          options={{ title: 'reset', tabBarStyle: { display: 'none' }, href: null }} />

      </Tabs>
    </SQLiteProvider>
  );
}
