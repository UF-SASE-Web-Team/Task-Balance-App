import { Tabs } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      initialRouteName="index"
      screenOptions={{
        tabBarInactiveBackgroundColor: Colors[colorScheme ?? 'light'].tabIconDefault,
        tabBarInactiveTintColor: Colors[colorScheme ?? 'light'].tabIconSelected,
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tabIconDefault,
        tabBarActiveBackgroundColor: Colors[colorScheme ?? 'light'].tabIconSelected,
        headerShown: false,
        tabBarButton: HapticTab,
      }}>

      <Tabs.Screen
        name="friends"
        options={{
          title: 'Friends',
          tabBarIcon: ({ color }) => <FontAwesome6 size={24} name="smile" color={color} />,
        }}
      />

      <Tabs.Screen
        name="leaderboard"
        options={{
          title: 'Leaderboard',
          tabBarIcon: ({ color }) => <FontAwesome6 name="medal" size={24} color={color} />,
        }}
        />

        <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
        />

        <Tabs.Screen
        name="quests"
        options={{
          title: 'Quests',
          tabBarIcon: ({ color }) => <FontAwesome6 size={24} name="feather" color={color} />,
        }}
        />

        <Tabs.Screen
        name="studyTools"
        options={{
          title: 'Study Tools',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
        />
        
    </Tabs>
  );
}
