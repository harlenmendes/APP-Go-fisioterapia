import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { useRouter } from 'expo-router';
import { theme } from '@/constants/theme';
import { applyDateMask, parseDateFromMask, formatDateToMask } from '@/utils/dateMask';

// DateTimePicker - carrega apenas se disponível
let DateTimePicker: any = null;
if (Platform.OS !== 'web') {
  try {
    DateTimePicker = require('@react-native-community/datetimepicker');
  } catch (e) {
    console.warn('DateTimePicker não disponível');
  }
}

interface Session {
  id: string;
  date: Date;
  therapist: string;
  duration: number; // minutos
  notes: string;
  exercises: string[];
}

export default function HistoricoScreen() {
  const router = useRouter();
  const [sessions, setSessions] = useState<Session[]>([]);
  const [filteredSessions, setFilteredSessions] = useState<Session[]>([]);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);
  const [isFiltered, setIsFiltered] = useState(false);
  const [startDateText, setStartDateText] = useState('');
  const [endDateText, setEndDateText] = useState('');

  // Dados mockados - serão substituídos por dados reais da API
  useEffect(() => {
    const mockSessions: Session[] = [
      {
        id: '1',
        date: new Date(2024, 0, 22),
        therapist: 'Dr. João Silva',
        duration: 60,
        notes: 'Boa evolução no movimento do joelho. Continuar com os exercícios prescritos.',
        exercises: ['Supino Reto', 'Agachamento', 'Alongamentos'],
      },
      {
        id: '2',
        date: new Date(2024, 0, 20),
        therapist: 'Dr. João Silva',
        duration: 60,
        notes: 'Paciente relatou melhora na dor. Manter carga atual.',
        exercises: ['Remada Curvada', 'Leg Press', 'Fortalecimento'],
      },
      {
        id: '3',
        date: new Date(2024, 0, 18),
        therapist: 'Dra. Maria Santos',
        duration: 45,
        notes: 'Primeira sessão após cirurgia. Exercícios leves prescritos.',
        exercises: ['Alongamentos', 'Movimentos passivos'],
      },
      {
        id: '4',
        date: new Date(2024, 0, 15),
        therapist: 'Dr. João Silva',
        duration: 60,
        notes: 'Progresso satisfatório. Aumentar intensidade gradualmente.',
        exercises: ['Supino Inclinado', 'Tríceps', 'Pernas'],
      },
      {
        id: '5',
        date: new Date(2024, 0, 12),
        therapist: 'Dr. João Silva',
        duration: 60,
        notes: 'Sessão de avaliação. Plano de tratamento definido.',
        exercises: ['Avaliação funcional', 'Testes de força'],
      },
      {
        id: '6',
        date: new Date(2024, 0, 10),
        therapist: 'Dra. Maria Santos',
        duration: 45,
        notes: 'Melhora significativa na amplitude de movimento.',
        exercises: ['Mobilização', 'Fortalecimento'],
      },
      {
        id: '7',
        date: new Date(2024, 0, 8),
        therapist: 'Dr. João Silva',
        duration: 60,
        notes: 'Paciente adaptando bem ao tratamento.',
        exercises: ['Exercícios de equilíbrio', 'Cadeia cinética'],
      },
      {
        id: '8',
        date: new Date(2024, 0, 5),
        therapist: 'Dr. João Silva',
        duration: 60,
        notes: 'Sessão de alongamento e relaxamento.',
        exercises: ['Alongamentos globais', 'Relaxamento'],
      },
      {
        id: '9',
        date: new Date(2024, 0, 3),
        therapist: 'Dra. Maria Santos',
        duration: 45,
        notes: 'Manutenção do tratamento. Exercícios domiciliares reforçados.',
        exercises: ['Fortalecimento', 'Estabilização'],
      },
      {
        id: '10',
        date: new Date(2024, 0, 1),
        therapist: 'Dr. João Silva',
        duration: 60,
        notes: 'Início do tratamento. Paciente motivado.',
        exercises: ['Avaliação inicial', 'Primeiros exercícios'],
      },
    ];
    setSessions(mockSessions);
    setFilteredSessions(mockSessions.slice(0, 10)); // Últimas 10 por padrão
  }, []);

  const getFirstDayOfYear = (): Date => {
    const now = new Date();
    return new Date(now.getFullYear(), 0, 1);
  };

  const handleStartDatePress = () => {
    setShowStartPicker(true);
  };

  const handleEndDatePress = () => {
    if (!startDate) {
      setEndDate(getFirstDayOfYear());
    }
    setShowEndPicker(true);
  };

  const handleStartDateChange = (event: any, selectedDate?: Date) => {
    setShowStartPicker(Platform.OS === 'ios');
    if (selectedDate) {
      setStartDate(selectedDate);
      if (endDate && selectedDate > endDate) {
        setEndDate(selectedDate);
      }
    }
  };

  const handleEndDateChange = (event: any, selectedDate?: Date) => {
    setShowEndPicker(Platform.OS === 'ios');
    if (selectedDate) {
      if (startDate && selectedDate < startDate) {
        Alert.alert('Data inválida', 'A data final deve ser igual ou posterior à data inicial.');
        return;
      }
      setEndDate(selectedDate);
    }
  };

  const formatDate = (date: Date | null): string => {
    if (!date) return 'Selecionar data';
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  const formatSessionDate = (date: Date): string => {
    return date.toLocaleDateString('pt-BR', {
      weekday: 'long',
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
  };

  const handleFilter = () => {
    if (!startDate || !endDate) {
      Alert.alert('Datas obrigatórias', 'Por favor, selecione a data inicial e final.');
      return;
    }

    if (startDate > endDate) {
      Alert.alert('Datas inválidas', 'A data inicial deve ser menor ou igual à data final.');
      return;
    }

    const filtered = sessions.filter((session) => {
      const sessionDate = new Date(session.date);
      sessionDate.setHours(0, 0, 0, 0);
      const start = new Date(startDate);
      start.setHours(0, 0, 0, 0);
      const end = new Date(endDate);
      end.setHours(23, 59, 59, 999);
      return sessionDate >= start && sessionDate <= end;
    });

    setFilteredSessions(filtered);
    setIsFiltered(true);
  };

  const handleClearFilter = () => {
    setStartDate(null);
    setEndDate(null);
    setStartDateText('');
    setEndDateText('');
    setFilteredSessions(sessions.slice(0, 10));
    setIsFiltered(false);
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
          <Text style={styles.headerTitle}>Histórico</Text>
          <View style={styles.placeholder} />
        </View>
      </LinearGradient>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Filtro de Datas */}
        <Card variant="elevated" style={styles.filterCard}>
          <Text style={styles.cardTitle}>Filtrar por Período</Text>

          <View style={styles.dateContainer}>
            {Platform.OS === 'web' ? (
              <>
                <Input
                  label="Data Inicial"
                  placeholder="DD/MM/AAAA"
                  value={startDateText}
                  onChangeText={(text) => {
                    const masked = applyDateMask(text);
                    setStartDateText(masked);
                    const parsed = parseDateFromMask(masked);
                    if (parsed) {
                      setStartDate(parsed);
                    }
                  }}
                  icon="calendar-outline"
                  keyboardType="numeric"
                  maxLength={10}
                />
                <Input
                  label="Data Final"
                  placeholder="DD/MM/AAAA"
                  value={endDateText}
                  onChangeText={(text) => {
                    const masked = applyDateMask(text);
                    setEndDateText(masked);
                    const parsed = parseDateFromMask(masked);
                    if (parsed) {
                      setEndDate(parsed);
                    }
                  }}
                  icon="calendar-outline"
                  keyboardType="numeric"
                  maxLength={10}
                />
              </>
            ) : (
              <>
                <TouchableOpacity style={styles.dateButton} onPress={handleStartDatePress}>
                  <Ionicons name="calendar-outline" size={20} color={theme.colors.primary} />
                  <View style={styles.dateButtonContent}>
                    <Text style={styles.dateLabel}>Data Inicial</Text>
                    <Text style={styles.dateValue}>{formatDate(startDate)}</Text>
                  </View>
                  <Ionicons name="chevron-forward" size={20} color={theme.colors.textSecondary} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.dateButton} onPress={handleEndDatePress}>
                  <Ionicons name="calendar-outline" size={20} color={theme.colors.primary} />
                  <View style={styles.dateButtonContent}>
                    <Text style={styles.dateLabel}>Data Final</Text>
                    <Text style={styles.dateValue}>{formatDate(endDate)}</Text>
                  </View>
                  <Ionicons name="chevron-forward" size={20} color={theme.colors.textSecondary} />
                </TouchableOpacity>
              </>
            )}
          </View>

          <View style={styles.filterActions}>
            <Button
              title="Filtrar"
              onPress={handleFilter}
              variant="primary"
              style={styles.filterButton}
            />
            {isFiltered && (
              <Button
                title="Limpar"
                onPress={handleClearFilter}
                variant="outline"
                style={styles.clearButton}
              />
            )}
          </View>
        </Card>

        {/* Lista de Sessões */}
        <View style={styles.sessionsHeader}>
          <Text style={styles.sessionsTitle}>
            {isFiltered ? 'Sessões Filtradas' : 'Últimas 10 Sessões'}
          </Text>
          <Text style={styles.sessionsCount}>{filteredSessions.length} sessão(ões)</Text>
        </View>

        {filteredSessions.length === 0 ? (
          <Card variant="elevated" style={styles.emptyCard}>
            <Ionicons name="calendar-outline" size={48} color={theme.colors.textSecondary} />
            <Text style={styles.emptyText}>Nenhuma sessão encontrada neste período</Text>
          </Card>
        ) : (
          filteredSessions.map((session, index) => (
            <Card key={session.id} variant="elevated" style={styles.sessionCard}>
              <View style={styles.sessionHeader}>
                <View style={styles.sessionHeaderLeft}>
                  <View style={styles.sessionIcon}>
                    <Ionicons name="medical" size={24} color={theme.colors.secondary} />
                  </View>
                  <View style={styles.sessionInfo}>
                    <Text style={styles.sessionDate}>{formatSessionDate(session.date)}</Text>
                    <Text style={styles.sessionTherapist}>{session.therapist}</Text>
                  </View>
                </View>
                <View style={styles.sessionDuration}>
                  <Ionicons name="time-outline" size={16} color={theme.colors.textSecondary} />
                  <Text style={styles.durationText}>{session.duration} min</Text>
                </View>
              </View>

              {session.notes && (
                <View style={styles.sessionNotes}>
                  <Text style={styles.notesLabel}>Observações:</Text>
                  <Text style={styles.notesText}>{session.notes}</Text>
                </View>
              )}

              {session.exercises && session.exercises.length > 0 && (
                <View style={styles.exercisesContainer}>
                  <Text style={styles.exercisesLabel}>Exercícios realizados:</Text>
                  <View style={styles.exercisesList}>
                    {session.exercises.map((exercise, idx) => (
                      <View key={idx} style={styles.exerciseTag}>
                        <Ionicons name="checkmark-circle" size={14} color={theme.colors.secondary} />
                        <Text style={styles.exerciseTagText}>{exercise}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              )}
            </Card>
          ))
        )}
      </ScrollView>

      {/* Date Pickers */}
      {showStartPicker && Platform.OS !== 'web' && DateTimePicker && (
        <DateTimePicker
          value={startDate || getFirstDayOfYear()}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={handleStartDateChange}
          maximumDate={endDate || undefined}
          locale="pt-BR"
        />
      )}

      {showEndPicker && Platform.OS !== 'web' && DateTimePicker && (
        <DateTimePicker
          value={endDate || getFirstDayOfYear()}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={handleEndDateChange}
          minimumDate={startDate || getFirstDayOfYear()}
          locale="pt-BR"
        />
      )}

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
  filterCard: {
    marginBottom: theme.spacing.lg,
  },
  cardTitle: {
    ...theme.typography.h3,
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
  },
  dateContainer: {
    gap: theme.spacing.md,
    marginBottom: theme.spacing.md,
  },
  dateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing.md,
    backgroundColor: theme.colors.background,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1.5,
    borderColor: theme.colors.border,
    gap: theme.spacing.sm,
  },
  dateButtonContent: {
    flex: 1,
  },
  dateLabel: {
    ...theme.typography.caption,
    color: theme.colors.textSecondary,
    marginBottom: 2,
  },
  dateValue: {
    ...theme.typography.body,
    color: theme.colors.text,
    fontWeight: '600',
  },
  filterActions: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
  filterButton: {
    flex: 1,
  },
  clearButton: {
    flex: 1,
  },
  sessionsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  sessionsTitle: {
    ...theme.typography.h3,
    color: theme.colors.text,
  },
  sessionsCount: {
    ...theme.typography.bodySmall,
    color: theme.colors.textSecondary,
  },
  sessionCard: {
    marginBottom: theme.spacing.md,
  },
  sessionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: theme.spacing.md,
  },
  sessionHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  sessionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: `${theme.colors.secondary}15`,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.md,
  },
  sessionInfo: {
    flex: 1,
  },
  sessionDate: {
    ...theme.typography.body,
    color: theme.colors.text,
    fontWeight: '600',
    marginBottom: 2,
    textTransform: 'capitalize',
  },
  sessionTherapist: {
    ...theme.typography.bodySmall,
    color: theme.colors.textSecondary,
  },
  sessionDuration: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  durationText: {
    ...theme.typography.bodySmall,
    color: theme.colors.textSecondary,
  },
  sessionNotes: {
    marginTop: theme.spacing.md,
    paddingTop: theme.spacing.md,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
  },
  notesLabel: {
    ...theme.typography.bodySmall,
    color: theme.colors.text,
    fontWeight: '600',
    marginBottom: theme.spacing.xs,
  },
  notesText: {
    ...theme.typography.bodySmall,
    color: theme.colors.textSecondary,
    lineHeight: 20,
  },
  exercisesContainer: {
    marginTop: theme.spacing.md,
    paddingTop: theme.spacing.md,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
  },
  exercisesLabel: {
    ...theme.typography.bodySmall,
    color: theme.colors.text,
    fontWeight: '600',
    marginBottom: theme.spacing.sm,
  },
  exercisesList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.sm,
  },
  exerciseTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: `${theme.colors.secondary}15`,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.sm,
    gap: 4,
  },
  exerciseTagText: {
    ...theme.typography.caption,
    color: theme.colors.text,
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.xl,
    width: '90%',
    maxWidth: 400,
    ...theme.shadows.lg,
  },
  modalTitle: {
    ...theme.typography.h3,
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
  },
  modalText: {
    ...theme.typography.body,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.lg,
    textAlign: 'center',
  },
});

