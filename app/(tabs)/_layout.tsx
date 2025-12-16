import { Tabs, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { theme } from '@/constants/theme';

export default function TabsLayout() {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.replace('/(auth)/login');
    }
  }, [isAuthenticated, loading]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.textSecondary,
        tabBarStyle: {
          backgroundColor: theme.colors.surface,
          borderTopColor: theme.colors.border,
          borderTopWidth: 1,
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Início',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="menu"
        options={{
          title: 'Menu',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="menu" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="financeiro"
        options={{
          href: null, // Oculta da tab bar, acessível apenas por navegação
        }}
      />
      <Tabs.Screen
        name="relatorios"
        options={{
          href: null, // Oculta da tab bar, acessível apenas por navegação
        }}
      />
      <Tabs.Screen
        name="exercicios"
        options={{
          href: null, // Oculta da tab bar, acessível apenas por navegação
        }}
      />
      <Tabs.Screen
        name="historico"
        options={{
          href: null, // Oculta da tab bar, acessível apenas por navegação
        }}
      />
      <Tabs.Screen
        name="orientacoes"
        options={{
          href: null, // Oculta da tab bar, acessível apenas por navegação
        }}
      />
      <Tabs.Screen
        name="dados-usuario"
        options={{
          href: null, // Oculta da tab bar, acessível apenas por navegação
        }}
      />
    </Tabs>
  );
}



