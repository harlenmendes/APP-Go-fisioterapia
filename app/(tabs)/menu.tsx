import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import { theme } from '@/constants/theme';

interface MenuItem {
  id: string;
  title: string;
  subtitle: string;
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
  route?: string;
}

const menuItems: MenuItem[] = [
  {
    id: 'financeiro',
    title: 'Financeiro',
    subtitle: 'Faturas e pagamentos',
    icon: 'card-outline',
    color: theme.colors.primary,
    route: '/financeiro',
  },
  {
    id: 'relatorios',
    title: 'Relatórios',
    subtitle: 'Notas fiscais e relatórios',
    icon: 'document-text-outline',
    color: theme.colors.secondary,
    route: '/relatorios',
  },
  {
    id: 'exercicios',
    title: 'Exercícios',
    subtitle: 'Seus exercícios e treinos',
    icon: 'fitness-outline',
    color: '#e67e22',
    route: '/exercicios',
  },
  {
    id: 'historico',
    title: 'Histórico',
    subtitle: 'Sessões realizadas',
    icon: 'time-outline',
    color: '#9b59b6',
    route: '/historico',
  },
  {
    id: 'orientacoes',
    title: 'Orientações',
    subtitle: 'Dicas e cuidados',
    icon: 'book-outline',
    color: '#3498db',
    route: '/orientacoes',
  },
  {
    id: 'fale-conosco',
    title: 'Fale Conosco',
    subtitle: 'Entre em contato',
    icon: 'chatbubble-ellipses-outline',
    color: '#1abc9c',
    route: '/fale-conosco',
  },
];

export default function MenuScreen() {
  const router = useRouter();
  const { user, signOut } = useAuth();

  const handleMenuItemPress = (item: MenuItem) => {
    if (item.id === 'financeiro') {
      router.push('/(tabs)/financeiro');
    } else if (item.id === 'relatorios') {
      router.push('/(tabs)/relatorios');
    } else if (item.id === 'exercicios') {
      router.push('/(tabs)/exercicios');
    } else if (item.id === 'historico') {
      router.push('/(tabs)/historico');
    } else if (item.id === 'orientacoes') {
      router.push('/(tabs)/orientacoes');
    } else {
      // TODO: Navegar para outras telas quando implementadas
      alert(`Navegar para: ${item.title}`);
    }
  };

  const handleLogout = async () => {
    await signOut();
    router.replace('/(auth)/login');
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={[theme.colors.primary, '#2a4a5a']}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <View>
            <Text style={styles.title}>Menu</Text>
            <Text style={styles.subtitle}>{user?.email}</Text>
          </View>
        </View>
      </LinearGradient>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
      <View style={styles.menuGrid}>
        {menuItems.map((item) => (
          <TouchableOpacity
            key={item.id}
            onPress={() => handleMenuItemPress(item)}
            activeOpacity={0.7}
          >
            <Card variant="elevated" style={styles.menuItem}>
              <View style={[styles.menuIconContainer, { backgroundColor: `${item.color}15` }]}>
                <Ionicons name={item.icon} size={32} color={item.color} />
              </View>
              <View style={styles.menuItemText}>
                <Text style={styles.menuItemTitle}>{item.title}</Text>
                <Text style={styles.menuItemSubtitle}>{item.subtitle}</Text>
              </View>
              <View style={styles.menuItemArrow}>
                <Ionicons
                  name="chevron-forward"
                  size={20}
                  color={theme.colors.textSecondary}
                />
              </View>
            </Card>
          </TouchableOpacity>
        ))}
      </View>

        <View style={styles.footer}>
          <Button
            title="Sair"
            onPress={handleLogout}
            variant="outline"
            icon={<Ionicons name="log-out-outline" size={18} color={theme.colors.error} />}
            style={styles.logoutButton}
            textStyle={styles.logoutButtonText}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    paddingTop: 16,
    paddingBottom: 20,
    paddingHorizontal: theme.spacing.lg,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    ...theme.typography.h1,
    color: theme.colors.textLight,
  },
  subtitle: {
    ...theme.typography.bodySmall,
    color: 'rgba(255, 255, 255, 0.75)',
    marginTop: 2,
    fontWeight: '400',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: theme.spacing.lg,
    paddingBottom: theme.spacing.xl,
  },
  menuGrid: {
    gap: theme.spacing.md,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing.md,
    position: 'relative',
  },
  menuIconContainer: {
    width: 52,
    height: 52,
    borderRadius: theme.borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.md,
  },
  menuItemText: {
    flex: 1,
  },
  menuItemTitle: {
    ...theme.typography.bodySmall,
    color: theme.colors.text,
    fontWeight: '600',
  },
  menuItemSubtitle: {
    ...theme.typography.caption,
    color: theme.colors.textSecondary,
    marginTop: 1,
  },
  menuItemArrow: {
    marginLeft: theme.spacing.sm,
  },
  footer: {
    marginTop: theme.spacing.xl,
    paddingTop: theme.spacing.lg,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
  },
  logoutButton: {
    borderColor: theme.colors.error,
  },
  logoutButtonText: {
    color: theme.colors.error,
  },
});

