import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  Modal,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
// DateTimePicker - carrega apenas se disponível (não funciona no Expo Go sem configuração)
let DateTimePicker: any = null;
if (Platform.OS !== 'web') {
  try {
    DateTimePicker = require('@react-native-community/datetimepicker');
  } catch (e) {
    console.warn('DateTimePicker não disponível - use build customizado');
  }
}
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { useRouter } from 'expo-router';
import { theme } from '@/constants/theme';
import { applyDateMask, parseDateFromMask, formatDateToMask } from '@/utils/dateMask';

type ReportType = 'notas-fiscais' | 'atendimentos' | null;

interface ReportItem {
  id: string;
  date: string;
  number: string;
  value?: number;
  description: string;
}

export default function RelatoriosScreen() {
  const router = useRouter();
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);
  const [reportType, setReportType] = useState<ReportType>(null);
  const [reports, setReports] = useState<ReportItem[]>([]);
  const [startDateText, setStartDateText] = useState('');
  const [endDateText, setEndDateText] = useState('');

  // Primeiro dia do ano atual
  const getFirstDayOfYear = (): Date => {
    const now = new Date();
    return new Date(now.getFullYear(), 0, 1);
  };

  const handleStartDatePress = () => {
    setShowStartPicker(true);
  };

  const handleEndDatePress = () => {
    if (!startDate) {
      // Se não tem data inicial, abre no primeiro dia do ano
      setEndDate(getFirstDayOfYear());
    }
    setShowEndPicker(true);
  };

  const handleStartDateChange = (event: any, selectedDate?: Date) => {
    setShowStartPicker(Platform.OS === 'ios');
    if (selectedDate) {
      setStartDate(selectedDate);
      // Se data final é anterior à nova data inicial, ajusta
      if (endDate && selectedDate > endDate) {
        setEndDate(selectedDate);
      }
    }
  };

  const handleEndDateChange = (event: any, selectedDate?: Date) => {
    setShowEndPicker(Platform.OS === 'ios');
    if (selectedDate) {
      // Validação: data final não pode ser menor que inicial
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

  const validateDates = (): boolean => {
    if (!startDate || !endDate) {
      Alert.alert('Datas obrigatórias', 'Por favor, selecione a data inicial e final.');
      return false;
    }

    if (startDate > endDate) {
      Alert.alert('Datas inválidas', 'A data inicial deve ser menor ou igual à data final.');
      return false;
    }

    return true;
  };

  const handleReportTypeSelect = (type: ReportType) => {
    if (!validateDates()) return;

    setReportType(type);
    generateReports(type);
  };

  const generateReports = (type: ReportType) => {
    if (!startDate || !endDate || !type) return;

    // Dados mockados - serão substituídos por dados reais da API
    const mockReports: ReportItem[] = [];

    if (type === 'notas-fiscais') {
      mockReports.push(
        {
          id: '1',
          date: '15/01/2024',
          number: 'NF-001234',
          value: 350.0,
          description: 'Pagamento de 1 sessão',
        },
        {
          id: '2',
          date: '20/01/2024',
          number: 'NF-001235',
          value: 1750.0,
          description: 'Pagamento de 5 sessões',
        },
        {
          id: '3',
          date: '25/01/2024',
          number: 'NF-001236',
          value: 3500.0,
          description: 'Pagamento de 10 sessões',
        }
      );
    } else {
      mockReports.push(
        {
          id: '1',
          date: '10/01/2024',
          number: 'AT-001',
          description: 'Sessão de fisioterapia - Joelho',
        },
        {
          id: '2',
          date: '12/01/2024',
          number: 'AT-002',
          description: 'Sessão de fisioterapia - Joelho',
        },
        {
          id: '3',
          date: '15/01/2024',
          number: 'AT-003',
          description: 'Sessão de fisioterapia - Coluna',
        },
        {
          id: '4',
          date: '18/01/2024',
          number: 'AT-004',
          description: 'Sessão de fisioterapia - Joelho',
        },
        {
          id: '5',
          date: '22/01/2024',
          number: 'AT-005',
          description: 'Sessão de fisioterapia - Coluna',
        }
      );
    }

    setReports(mockReports);
  };

  const handleExportPDF = () => {
    if (reports.length === 0) {
      Alert.alert('Sem dados', 'Não há relatórios para exportar.');
      return;
    }

    Alert.alert(
      'Exportar PDF',
      `Exportando ${reports.length} item(ns) do relatório...`,
      [{ text: 'OK' }]
    );
    // TODO: Implementar exportação real para PDF
  };

  const getInitialDateForEndPicker = (): Date => {
    return startDate || getFirstDayOfYear();
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
          <Text style={styles.headerTitle}>Relatórios</Text>
          <View style={styles.placeholder} />
        </View>
      </LinearGradient>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Seleção de Período */}
        <Card variant="elevated" style={styles.periodCard}>
          <Text style={styles.cardTitle}>Período</Text>

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
                <TouchableOpacity
                  style={styles.dateButton}
                  onPress={handleStartDatePress}
                >
                  <Ionicons name="calendar-outline" size={20} color={theme.colors.primary} />
                  <View style={styles.dateButtonContent}>
                    <Text style={styles.dateLabel}>Data Inicial</Text>
                    <Text style={styles.dateValue}>{formatDate(startDate)}</Text>
                  </View>
                  <Ionicons name="chevron-forward" size={20} color={theme.colors.textSecondary} />
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.dateButton}
                  onPress={handleEndDatePress}
                >
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

          {startDate && endDate && startDate > endDate && (
            <View style={styles.errorBox}>
              <Ionicons name="alert-circle" size={18} color={theme.colors.error} />
              <Text style={styles.errorText}>
                A data inicial deve ser menor ou igual à data final.
              </Text>
            </View>
          )}
        </Card>

        {/* Seleção de Tipo de Relatório */}
        {startDate && endDate && startDate <= endDate && (
          <Card variant="elevated" style={styles.typeCard}>
            <Text style={styles.cardTitle}>Tipo de Relatório</Text>

            <TouchableOpacity
              style={[
                styles.reportTypeButton,
                reportType === 'notas-fiscais' && styles.reportTypeButtonSelected,
              ]}
              onPress={() => handleReportTypeSelect('notas-fiscais')}
            >
              <View style={styles.reportTypeIcon}>
                <Ionicons
                  name="document-text"
                  size={24}
                  color={reportType === 'notas-fiscais' ? theme.colors.textLight : theme.colors.primary}
                />
              </View>
              <View style={styles.reportTypeContent}>
                <Text
                  style={[
                    styles.reportTypeTitle,
                    reportType === 'notas-fiscais' && styles.reportTypeTitleSelected,
                  ]}
                >
                  Notas Fiscais
                </Text>
                <Text
                  style={[
                    styles.reportTypeSubtitle,
                    reportType === 'notas-fiscais' && styles.reportTypeSubtitleSelected,
                  ]}
                >
                  Relatório de notas fiscais do período
                </Text>
              </View>
              {reportType === 'notas-fiscais' && (
                <Ionicons name="checkmark-circle" size={24} color={theme.colors.textLight} />
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.reportTypeButton,
                reportType === 'atendimentos' && styles.reportTypeButtonSelected,
              ]}
              onPress={() => handleReportTypeSelect('atendimentos')}
            >
              <View style={styles.reportTypeIcon}>
                <Ionicons
                  name="medical"
                  size={24}
                  color={reportType === 'atendimentos' ? theme.colors.textLight : theme.colors.secondary}
                />
              </View>
              <View style={styles.reportTypeContent}>
                <Text
                  style={[
                    styles.reportTypeTitle,
                    reportType === 'atendimentos' && styles.reportTypeTitleSelected,
                  ]}
                >
                  Atendimentos Realizados
                </Text>
                <Text
                  style={[
                    styles.reportTypeSubtitle,
                    reportType === 'atendimentos' && styles.reportTypeSubtitleSelected,
                  ]}
                >
                  Relatório de sessões realizadas no período
                </Text>
              </View>
              {reportType === 'atendimentos' && (
                <Ionicons name="checkmark-circle" size={24} color={theme.colors.textLight} />
              )}
            </TouchableOpacity>
          </Card>
        )}

        {/* Lista de Relatórios */}
        {reports.length > 0 && (
          <Card variant="elevated" style={styles.reportsCard}>
            <View style={styles.reportsHeader}>
              <Text style={styles.cardTitle}>
                {reportType === 'notas-fiscais' ? 'Notas Fiscais' : 'Atendimentos'}
              </Text>
              <Text style={styles.reportsCount}>{reports.length} item(ns)</Text>
            </View>

            {reports.map((report, index) => (
              <View
                key={report.id}
                style={[
                  styles.reportItem,
                  index < reports.length - 1 && styles.reportItemBorder,
                ]}
              >
                <View style={styles.reportItemContent}>
                  <Text style={styles.reportItemNumber}>{report.number}</Text>
                  <Text style={styles.reportItemDate}>{report.date}</Text>
                  <Text style={styles.reportItemDescription}>{report.description}</Text>
                  {report.value !== undefined && (
                    <Text style={styles.reportItemValue}>
                      R$ {report.value.toFixed(2).replace('.', ',')}
                    </Text>
                  )}
                </View>
              </View>
            ))}
          </Card>
        )}

        {/* Botão Exportar PDF */}
        {reports.length > 0 && (
          <Button
            title="Exportar para PDF"
            onPress={handleExportPDF}
            icon={<Ionicons name="download-outline" size={20} color={theme.colors.textLight} />}
            style={styles.exportButton}
          />
        )}

        {!reportType && startDate && endDate && startDate <= endDate && (
          <Text style={styles.hintText}>
            Selecione um tipo de relatório acima para visualizar os dados.
          </Text>
        )}
      </ScrollView>

      {/* Date Pickers */}
      {showStartPicker && Platform.OS !== 'web' && DateTimePicker && (
        <DateTimePicker
          value={startDate || getFirstDayOfYear()}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={handleStartDateChange}
          minimumDate={undefined}
          maximumDate={endDate || undefined}
          locale="pt-BR"
        />
      )}

      {showEndPicker && Platform.OS !== 'web' && DateTimePicker && (
        <DateTimePicker
          value={getInitialDateForEndPicker()}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={handleEndDateChange}
          minimumDate={startDate || getFirstDayOfYear()}
          maximumDate={undefined}
          locale="pt-BR"
        />
      )}

      {/* Para Web - Modal com instruções */}
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
  periodCard: {
    marginBottom: theme.spacing.md,
  },
  cardTitle: {
    ...theme.typography.h3,
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
  },
  dateContainer: {
    gap: theme.spacing.md,
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
  errorBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fee',
    padding: theme.spacing.sm,
    borderRadius: theme.borderRadius.sm,
    marginTop: theme.spacing.md,
    gap: theme.spacing.xs,
  },
  errorText: {
    ...theme.typography.bodySmall,
    color: theme.colors.error,
    flex: 1,
  },
  typeCard: {
    marginBottom: theme.spacing.md,
  },
  reportTypeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    borderWidth: 2,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.surface,
    marginBottom: theme.spacing.sm,
    gap: theme.spacing.md,
  },
  reportTypeButtonSelected: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  reportTypeIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: `${theme.colors.primary}15`,
    justifyContent: 'center',
    alignItems: 'center',
  },
  reportTypeContent: {
    flex: 1,
  },
  reportTypeTitle: {
    ...theme.typography.bodySmall,
    color: theme.colors.text,
    fontWeight: '600',
    marginBottom: 2,
  },
  reportTypeTitleSelected: {
    color: theme.colors.textLight,
  },
  reportTypeSubtitle: {
    ...theme.typography.caption,
    color: theme.colors.textSecondary,
  },
  reportTypeSubtitleSelected: {
    color: 'rgba(255, 255, 255, 0.8)',
  },
  reportsCard: {
    marginBottom: theme.spacing.md,
  },
  reportsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  reportsCount: {
    ...theme.typography.bodySmall,
    color: theme.colors.textSecondary,
  },
  reportItem: {
    paddingVertical: theme.spacing.md,
  },
  reportItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  reportItemContent: {
    gap: 4,
  },
  reportItemNumber: {
    ...theme.typography.bodySmall,
    color: theme.colors.primary,
    fontWeight: '600',
  },
  reportItemDate: {
    ...theme.typography.caption,
    color: theme.colors.textSecondary,
  },
  reportItemDescription: {
    ...theme.typography.bodySmall,
    color: theme.colors.text,
    marginTop: 4,
  },
  reportItemValue: {
    ...theme.typography.body,
    color: theme.colors.text,
    fontWeight: '600',
    marginTop: 4,
  },
  exportButton: {
    marginTop: theme.spacing.md,
    marginBottom: theme.spacing.lg,
  },
  hintText: {
    ...theme.typography.bodySmall,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    fontStyle: 'italic',
    marginTop: theme.spacing.lg,
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

