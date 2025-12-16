import React, { useState } from 'react';
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
import { Card } from '@/components/Card';
import { ProfileMenu } from '@/components/ProfileMenu';
import { useAuth } from '@/contexts/AuthContext';
import { theme } from '@/constants/theme';

export default function HomeScreen() {
  const { user } = useAuth();
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  // Dados mockados - serão substituídos por dados reais da API
  const hasAlerts = true;
  const nextSession = {
    date: '15 de Janeiro, 2024',
    time: '14:00',
    therapist: 'Dr. João Silva',
  };
  const pendingExercises = 3;
  const planStatus = {
    active: true,
    current: 5,
    total: 10,
    percentage: 50,
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={[theme.colors.primary, '#2a4a5a']}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <View>
            <Text style={styles.greeting}>Olá, {user?.name?.split(' ')[0] || 'Paciente'}!</Text>
            <Text style={styles.subtitle}>Bem-vindo de volta</Text>
          </View>
          <TouchableOpacity
            style={styles.profileButton}
            onPress={() => setShowProfileMenu(true)}
          >
            <Ionicons name="person-circle-outline" size={32} color={theme.colors.textLight} />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Avisos */}
        {hasAlerts && (
          <Card variant="elevated" style={styles.alertCard}>
            <View style={styles.alertHeader}>
              <Ionicons name="notifications" size={24} color={theme.colors.warning} />
              <Text style={styles.alertTitle}>Avisos</Text>
            </View>
            <Text style={styles.alertText}>
              Você tem uma nova mensagem da clínica. Verifique suas orientações.
            </Text>
            <TouchableOpacity style={styles.alertButton}>
              <Text style={styles.alertButtonText}>Ver mais</Text>
              <Ionicons name="chevron-forward" size={16} color={theme.colors.primary} />
            </TouchableOpacity>
          </Card>
        )}

        {/* Próxima Sessão */}
        <Card variant="elevated" style={styles.sessionCard}>
          <View style={styles.cardHeader}>
            <Ionicons name="calendar" size={24} color={theme.colors.primary} />
            <Text style={styles.cardTitle}>Próxima Sessão</Text>
          </View>
          {nextSession ? (
            <View style={styles.sessionContent}>
              <View style={styles.sessionInfo}>
                <Text style={styles.sessionDate}>{nextSession.date}</Text>
                <Text style={styles.sessionTime}>{nextSession.time}</Text>
                <Text style={styles.sessionTherapist}>{nextSession.therapist}</Text>
              </View>
              <View style={styles.sessionIcon}>
                <Ionicons name="time-outline" size={32} color={theme.colors.secondary} />
              </View>
            </View>
          ) : (
            <Text style={styles.noDataText}>Nenhuma sessão agendada</Text>
          )}
        </Card>

        {/* Exercícios Pendentes */}
        <Card variant="elevated" style={styles.exercisesCard}>
          <View style={styles.cardHeader}>
            <Ionicons name="fitness" size={24} color={theme.colors.secondary} />
            <Text style={styles.cardTitle}>Exercícios</Text>
          </View>
          {pendingExercises > 0 ? (
            <View style={styles.exercisesContent}>
              <View style={styles.exercisesBadge}>
                <Text style={styles.exercisesCount}>{pendingExercises}</Text>
              </View>
              <View style={styles.exercisesInfo}>
                <Text style={styles.exercisesTitle}>Exercícios pendentes</Text>
                <Text style={styles.exercisesSubtitle}>
                  Complete seus exercícios diários
                </Text>
              </View>
              <TouchableOpacity style={styles.exercisesButton}>
                <Ionicons name="chevron-forward" size={20} color={theme.colors.secondary} />
              </TouchableOpacity>
            </View>
          ) : (
            <Text style={styles.noDataText}>Todos os exercícios concluídos! 🎉</Text>
          )}
        </Card>

        {/* Status do Plano */}
        <Card variant="elevated" style={styles.planCard}>
          <View style={styles.cardHeader}>
            <Ionicons
              name={planStatus.active ? 'checkmark-circle' : 'close-circle'}
              size={24}
              color={planStatus.active ? theme.colors.success : theme.colors.error}
            />
            <Text style={styles.cardTitle}>Status do Plano</Text>
          </View>
          <View style={styles.planContent}>
            <View style={styles.planStatus}>
              <Text style={styles.planStatusText}>
                {planStatus.active ? 'Plano Ativo' : 'Plano Inativo'}
              </Text>
              <Text style={styles.planSessions}>
                {planStatus.current}/{planStatus.total} sessões
              </Text>
            </View>
            <View style={styles.progressBar}>
              <View
                style={[
                  styles.progressFill,
                  {
                    width: `${planStatus.percentage}%`,
                    backgroundColor: planStatus.active
                      ? theme.colors.secondary
                      : theme.colors.error,
                  },
                ]}
              />
            </View>
            <Text style={styles.progressText}>
              {planStatus.total - planStatus.current} sessões restantes
            </Text>
          </View>
        </Card>
      </ScrollView>

      <ProfileMenu
        visible={showProfileMenu}
        onClose={() => setShowProfileMenu(false)}
      />
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
  greeting: {
    ...theme.typography.h2,
    color: theme.colors.textLight,
  },
  subtitle: {
    ...theme.typography.bodySmall,
    color: 'rgba(255, 255, 255, 0.75)',
    marginTop: 2,
    fontWeight: '400',
  },
  profileButton: {
    padding: theme.spacing.xs,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: theme.spacing.lg,
    paddingBottom: theme.spacing.xl,
  },
  alertCard: {
    backgroundColor: '#fff8e1',
    borderLeftWidth: 3,
    borderLeftColor: theme.colors.warning,
    marginBottom: theme.spacing.md,
  },
  alertHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.xs,
    gap: theme.spacing.sm,
  },
  alertTitle: {
    ...theme.typography.h3,
    color: theme.colors.text,
  },
  alertText: {
    ...theme.typography.bodySmall,
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
    lineHeight: 20,
  },
  alertButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: theme.spacing.xs,
  },
  alertButtonText: {
    ...theme.typography.bodySmall,
    color: theme.colors.primary,
    fontWeight: '600',
  },
  sessionCard: {
    backgroundColor: theme.colors.surface,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
    gap: theme.spacing.sm,
  },
  cardTitle: {
    ...theme.typography.h3,
    color: theme.colors.text,
  },
  sessionContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sessionInfo: {
    flex: 1,
  },
  sessionDate: {
    ...theme.typography.bodySmall,
    color: theme.colors.text,
    fontWeight: '600',
    marginBottom: 3,
  },
  sessionTime: {
    ...theme.typography.h3,
    color: theme.colors.primary,
    marginBottom: 3,
    fontWeight: '700',
  },
  sessionTherapist: {
    ...theme.typography.caption,
    color: theme.colors.textSecondary,
  },
  sessionIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: `${theme.colors.secondary}15`,
    justifyContent: 'center',
    alignItems: 'center',
  },
  exercisesCard: {
    backgroundColor: theme.colors.surface,
  },
  exercisesContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
  },
  exercisesBadge: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: theme.colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    ...theme.shadows.sm,
  },
  exercisesCount: {
    ...theme.typography.h3,
    color: theme.colors.textLight,
    fontWeight: '700',
  },
  exercisesInfo: {
    flex: 1,
  },
  exercisesTitle: {
    ...theme.typography.bodySmall,
    color: theme.colors.text,
    fontWeight: '600',
    marginBottom: 2,
  },
  exercisesSubtitle: {
    ...theme.typography.caption,
    color: theme.colors.textSecondary,
  },
  exercisesButton: {
    padding: theme.spacing.sm,
  },
  planCard: {
    backgroundColor: theme.colors.surface,
  },
  planContent: {
    marginTop: theme.spacing.sm,
  },
  planStatus: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  planStatusText: {
    ...theme.typography.bodySmall,
    color: theme.colors.text,
    fontWeight: '600',
  },
  planSessions: {
    ...theme.typography.h3,
    color: theme.colors.primary,
    fontWeight: '700',
  },
  progressBar: {
    height: 6,
    backgroundColor: theme.colors.border,
    borderRadius: theme.borderRadius.round,
    overflow: 'hidden',
    marginBottom: theme.spacing.xs,
  },
  progressFill: {
    height: '100%',
    borderRadius: theme.borderRadius.round,
  },
  progressText: {
    ...theme.typography.caption,
    color: theme.colors.textSecondary,
    textAlign: 'center',
  },
  noDataText: {
    ...theme.typography.bodySmall,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    fontStyle: 'italic',
  },
});

