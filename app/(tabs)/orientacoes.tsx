import React, { useState, useEffect } from 'react';
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
import { useRouter } from 'expo-router';
import { theme } from '@/constants/theme';

interface Orientation {
  id: string;
  title: string;
  content: string;
  date: Date;
  therapist: string;
  category: string;
}

export default function OrientacoesScreen() {
  const router = useRouter();
  const [orientations, setOrientations] = useState<Orientation[]>([]);

  // Dados mockados - serão substituídos por dados reais da API
  useEffect(() => {
    const mockOrientations: Orientation[] = [
      {
        id: '1',
        title: 'Cuidados pós-sessão',
        content:
          'Após cada sessão, é importante manter a região tratada em repouso por pelo menos 2 horas. Aplique gelo por 15 minutos a cada 3 horas nas primeiras 24 horas, caso sinta algum desconforto. Evite movimentos bruscos e atividades físicas intensas no dia da sessão.',
        date: new Date(2024, 0, 20),
        therapist: 'Dr. João Silva',
        category: 'Cuidados Gerais',
      },
      {
        id: '2',
        title: 'Exercícios domiciliares - Joelho',
        content:
          'Realize os exercícios prescritos diariamente, sempre respeitando os limites do seu corpo. Se sentir dor intensa durante algum exercício, pare imediatamente e entre em contato conosco. Mantenha uma rotina regular, preferencialmente no mesmo horário todos os dias, para obter melhores resultados.',
        date: new Date(2024, 0, 18),
        therapist: 'Dra. Maria Santos',
        category: 'Exercícios',
      },
      {
        id: '3',
        title: 'Importância da hidratação',
        content:
          'A hidratação adequada é fundamental para o processo de recuperação. Beba pelo menos 2 litros de água por dia. Mantenha uma garrafa de água sempre por perto e estabeleça lembretes para não esquecer de beber água regularmente ao longo do dia.',
        date: new Date(2024, 0, 15),
        therapist: 'Dr. João Silva',
        category: 'Saúde e Bem-estar',
      },
      {
        id: '4',
        title: 'Postura durante o trabalho',
        content:
          'Se você trabalha sentado, certifique-se de manter os pés apoiados no chão, costas retas e ombros relaxados. Faça pausas a cada 50 minutos para alongar e caminhar um pouco. Ajuste a altura da cadeira para que seus joelhos fiquem em um ângulo de 90 graus. Esses cuidados ajudarão a prevenir dores e tensões.',
        date: new Date(2024, 0, 12),
        therapist: 'Dra. Maria Santos',
        category: 'Postura',
      },
      {
        id: '5',
        title: 'Alimentação e recuperação',
        content:
          'Uma alimentação equilibrada contribui significativamente para a recuperação. Priorize alimentos ricos em proteínas (carnes magras, ovos, leguminosas), vitaminas (frutas e verduras) e minerais. Evite alimentos processados e ricos em açúcar, especialmente nos dias de tratamento.',
        date: new Date(2024, 0, 10),
        therapist: 'Dr. João Silva',
        category: 'Nutrição',
      },
      {
        id: '6',
        title: 'Sinais de alerta',
        content:
          'Fique atento aos seguintes sinais e entre em contato conosco imediatamente se apresentar: dor intensa e persistente que não melhora com o repouso, inchaço excessivo, vermelhidão ou calor na região tratada, febre acima de 38°C, ou qualquer outro sintoma que considere anormal. Não hesite em nos procurar em caso de dúvidas.',
        date: new Date(2024, 0, 8),
        therapist: 'Dra. Maria Santos',
        category: 'Atenção',
      },
    ];
    setOrientations(mockOrientations);
  }, []);

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
  };

  const getCategoryColor = (category: string): string => {
    const colors: { [key: string]: string } = {
      'Cuidados Gerais': theme.colors.primary,
      Exercícios: theme.colors.secondary,
      'Saúde e Bem-estar': '#3498db',
      Postura: '#9b59b6',
      Nutrição: '#e67e22',
      Atenção: theme.colors.warning,
    };
    return colors[category] || theme.colors.primary;
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={[theme.colors.primary, '#2a4a5a']}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color={theme.colors.textLight} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Orientações</Text>
          <View style={styles.placeholder} />
        </View>
      </LinearGradient>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.introCard}>
          <Ionicons name="bulb-outline" size={32} color={theme.colors.secondary} />
          <Text style={styles.introText}>
            Dicas e recomendações personalizadas dos nossos fisioterapeutas para auxiliar na sua recuperação.
          </Text>
        </View>

        {orientations.map((orientation) => (
          <Card key={orientation.id} variant="elevated" style={styles.orientationCard}>
            <View style={styles.orientationHeader}>
              <View style={styles.orientationHeaderLeft}>
                <View
                  style={[
                    styles.categoryBadge,
                    { backgroundColor: `${getCategoryColor(orientation.category)}15` },
                  ]}
                >
                  <Text
                    style={[styles.categoryText, { color: getCategoryColor(orientation.category) }]}
                  >
                    {orientation.category}
                  </Text>
                </View>
                <Text style={styles.orientationTitle}>{orientation.title}</Text>
              </View>
            </View>

            <View style={styles.orientationContent}>
              <Text style={styles.orientationText}>{orientation.content}</Text>
            </View>

            <View style={styles.orientationFooter}>
              <View style={styles.footerInfo}>
                <Ionicons name="person-outline" size={14} color={theme.colors.textSecondary} />
                <Text style={styles.footerText}>{orientation.therapist}</Text>
              </View>
              <View style={styles.footerInfo}>
                <Ionicons name="calendar-outline" size={14} color={theme.colors.textSecondary} />
                <Text style={styles.footerText}>{formatDate(orientation.date)}</Text>
              </View>
            </View>
          </Card>
        ))}

        {orientations.length === 0 && (
          <Card variant="elevated" style={styles.emptyCard}>
            <Ionicons name="document-text-outline" size={48} color={theme.colors.textSecondary} />
            <Text style={styles.emptyText}>Nenhuma orientação disponível no momento</Text>
          </Card>
        )}
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
  backButton: {
    padding: theme.spacing.xs,
    marginLeft: -theme.spacing.xs,
  },
  headerTitle: {
    ...theme.typography.h2,
    color: theme.colors.textLight,
    flex: 1,
    textAlign: 'center',
  },
  placeholder: {
    width: 32,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: theme.spacing.lg,
    paddingBottom: theme.spacing.xl,
  },
  introCard: {
    backgroundColor: `${theme.colors.secondary}10`,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
    alignItems: 'center',
    borderLeftWidth: 4,
    borderLeftColor: theme.colors.secondary,
  },
  introText: {
    ...theme.typography.body,
    color: theme.colors.text,
    textAlign: 'center',
    marginTop: theme.spacing.sm,
    lineHeight: 22,
  },
  orientationCard: {
    marginBottom: theme.spacing.md,
  },
  orientationHeader: {
    marginBottom: theme.spacing.md,
  },
  orientationHeaderLeft: {
    gap: theme.spacing.xs,
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: 4,
    borderRadius: theme.borderRadius.sm,
    marginBottom: theme.spacing.xs,
  },
  categoryText: {
    ...theme.typography.caption,
    fontWeight: '600',
    textTransform: 'uppercase',
    fontSize: 10,
    letterSpacing: 0.5,
  },
  orientationTitle: {
    ...theme.typography.h3,
    color: theme.colors.text,
    fontWeight: '700',
  },
  orientationContent: {
    backgroundColor: theme.colors.background,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
    borderLeftWidth: 3,
    borderLeftColor: theme.colors.secondary,
  },
  orientationText: {
    ...theme.typography.body,
    color: theme.colors.text,
    lineHeight: 22,
  },
  orientationFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: theme.spacing.md,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
  },
  footerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  footerText: {
    ...theme.typography.caption,
    color: theme.colors.textSecondary,
  },
  emptyCard: {
    alignItems: 'center',
    paddingVertical: theme.spacing.xxl,
  },
  emptyText: {
    ...theme.typography.body,
    color: theme.colors.textSecondary,
    marginTop: theme.spacing.md,
    textAlign: 'center',
  },
});


