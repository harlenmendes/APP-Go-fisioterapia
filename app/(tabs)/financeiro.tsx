import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import { useRouter } from 'expo-router';
import { theme } from '@/constants/theme';

export default function FinanceiroScreen() {
  const router = useRouter();
  const [showPayment, setShowPayment] = useState(false);
  const [selectedSessions, setSelectedSessions] = useState(1);

  // Dados mockados - serão substituídos por dados reais da API
  const financialStatus = {
    ok: true,
    pendingPayments: 0,
  };

  const sessionsInfo = {
    remaining: 5,
    totalPaid: 10,
  };

  const sessionPrice = 350;
  const totalAmount = selectedSessions * sessionPrice;

  const handleAddSessions = () => {
    setShowPayment(true);
  };

  const handleConfirmPayment = () => {
    Alert.alert(
      'Pagamento',
      `Compra de ${selectedSessions} sessão(ões) confirmada!\nTotal: R$ ${totalAmount.toFixed(2)}`,
      [
        {
          text: 'OK',
          onPress: () => {
            setShowPayment(false);
            // TODO: Atualizar dados após pagamento
          },
        },
      ]
    );
  };

  const handleBack = () => {
    setShowPayment(false);
  };

  if (showPayment) {
    return (
      <SafeAreaView style={styles.container}>
        <LinearGradient
          colors={[theme.colors.primary, '#2a4a5a']}
          style={styles.header}
        >
          <View style={styles.headerContent}>
            <TouchableOpacity onPress={handleBack} style={styles.backButton}>
              <Ionicons name="arrow-back" size={24} color={theme.colors.textLight} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Adicionar Sessões</Text>
            <View style={styles.placeholder} />
          </View>
        </LinearGradient>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <Card variant="elevated" style={styles.paymentCard}>
            <Text style={styles.cardTitle}>Selecione a quantidade</Text>
            <Text style={styles.cardSubtitle}>Valor por sessão: R$ {sessionPrice.toFixed(2)}</Text>

            <View style={styles.selectorContainer}>
              <TouchableOpacity
                onPress={() => setSelectedSessions(Math.max(1, selectedSessions - 1))}
                style={styles.selectorButton}
                disabled={selectedSessions <= 1}
              >
                <Ionicons
                  name="remove-circle-outline"
                  size={32}
                  color={selectedSessions <= 1 ? theme.colors.border : theme.colors.primary}
                />
              </TouchableOpacity>

              <View style={styles.selectorValue}>
                <Text style={styles.selectorNumber}>{selectedSessions}</Text>
                <Text style={styles.selectorLabel}>
                  {selectedSessions === 1 ? 'sessão' : 'sessões'}
                </Text>
              </View>

              <TouchableOpacity
                onPress={() => setSelectedSessions(selectedSessions + 1)}
                style={styles.selectorButton}
              >
                <Ionicons name="add-circle-outline" size={32} color={theme.colors.primary} />
              </TouchableOpacity>
            </View>

            <View style={styles.totalContainer}>
              <Text style={styles.totalLabel}>Valor Total</Text>
              <Text style={styles.totalAmount}>R$ {totalAmount.toFixed(2)}</Text>
            </View>
          </Card>

          <Card variant="elevated" style={styles.qrCard}>
            <Text style={styles.qrTitle}>Pagamento via PIX</Text>
            <Text style={styles.qrSubtitle}>Escaneie o QR Code com seu app bancário</Text>

            <View style={styles.qrCodeContainer}>
              <View style={styles.qrCodePlaceholder}>
                <Ionicons name="qr-code-outline" size={120} color={theme.colors.textSecondary} />
                <Text style={styles.qrCodeText}>QR Code PIX</Text>
                <Text style={styles.qrCodeValue}>R$ {totalAmount.toFixed(2)}</Text>
              </View>
            </View>

            <View style={styles.pixInfo}>
              <View style={styles.pixInfoRow}>
                <Ionicons name="time-outline" size={16} color={theme.colors.textSecondary} />
                <Text style={styles.pixInfoText}>Válido por 30 minutos</Text>
              </View>
              <View style={styles.pixInfoRow}>
                <Ionicons name="checkmark-circle-outline" size={16} color={theme.colors.success} />
                <Text style={styles.pixInfoText}>Confirmação automática</Text>
              </View>
            </View>

            <Button
              title="Confirmar Pagamento"
              onPress={handleConfirmPayment}
              style={styles.confirmButton}
            />

            <TouchableOpacity style={styles.copyPixButton}>
              <Ionicons name="copy-outline" size={18} color={theme.colors.primary} />
              <Text style={styles.copyPixText}>Copiar código PIX</Text>
            </TouchableOpacity>
          </Card>
        </ScrollView>
      </SafeAreaView>
    );
  }

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
          <Text style={styles.headerTitle}>Financeiro</Text>
          <View style={styles.placeholder} />
        </View>
      </LinearGradient>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Status Financeiro */}
        <Card variant="elevated" style={styles.statusCard}>
          <View style={styles.statusHeader}>
            <View
              style={[
                styles.statusIcon,
                { backgroundColor: financialStatus.ok ? `${theme.colors.success}20` : `${theme.colors.warning}20` },
              ]}
            >
              <Ionicons
                name={financialStatus.ok ? 'checkmark-circle' : 'alert-circle'}
                size={32}
                color={financialStatus.ok ? theme.colors.success : theme.colors.warning}
              />
            </View>
            <View style={styles.statusInfo}>
              <Text style={styles.statusTitle}>
                {financialStatus.ok ? 'Tudo em dia' : 'Pendências financeiras'}
              </Text>
              <Text style={styles.statusSubtitle}>
                {financialStatus.ok
                  ? 'Seu financeiro está regular'
                  : `${financialStatus.pendingPayments} pagamento(s) pendente(s)`}
              </Text>
            </View>
          </View>
        </Card>

        {/* Sessões Restantes */}
        <Card variant="elevated" style={styles.sessionsCard}>
          <View style={styles.cardHeader}>
            <Ionicons name="calendar-outline" size={24} color={theme.colors.primary} />
            <Text style={styles.cardTitle}>Sessões Disponíveis</Text>
          </View>

          <View style={styles.sessionsContent}>
            <View style={styles.sessionsBadge}>
              <Text style={styles.sessionsCount}>{sessionsInfo.remaining}</Text>
            </View>
            <View style={styles.sessionsInfo}>
              <Text style={styles.sessionsTitle}>Sessões restantes</Text>
              <Text style={styles.sessionsSubtitle}>
                Total de {sessionsInfo.totalPaid} sessões pagas
              </Text>
            </View>
          </View>

          {sessionsInfo.remaining <= 3 && (
            <View style={styles.warningBox}>
              <Ionicons name="information-circle-outline" size={18} color={theme.colors.warning} />
              <Text style={styles.warningText}>
                Você tem poucas sessões restantes. Considere adicionar mais.
              </Text>
            </View>
          )}
        </Card>

        {/* Botão Adicionar Sessões */}
        <Button
          title="Adicionar Sessões"
          onPress={handleAddSessions}
          icon={<Ionicons name="add-circle-outline" size={20} color={theme.colors.textLight} />}
          style={styles.addButton}
        />

        {/* Histórico de Pagamentos */}
        <Card variant="elevated" style={styles.historyCard}>
          <View style={styles.cardHeader}>
            <Ionicons name="receipt-outline" size={24} color={theme.colors.primary} />
            <Text style={styles.cardTitle}>Histórico</Text>
          </View>

          <View style={styles.historyItem}>
            <View style={styles.historyInfo}>
              <Text style={styles.historyTitle}>10 sessões</Text>
              <Text style={styles.historyDate}>15 de Janeiro, 2024</Text>
            </View>
            <View style={styles.historyAmount}>
              <Text style={styles.historyValue}>R$ 3.500,00</Text>
              <View style={styles.historyStatus}>
                <Ionicons name="checkmark-circle" size={16} color={theme.colors.success} />
                <Text style={styles.historyStatusText}>Pago</Text>
              </View>
            </View>
          </View>

          <View style={styles.historyItem}>
            <View style={styles.historyInfo}>
              <Text style={styles.historyTitle}>5 sessões</Text>
              <Text style={styles.historyDate}>10 de Dezembro, 2023</Text>
            </View>
            <View style={styles.historyAmount}>
              <Text style={styles.historyValue}>R$ 1.750,00</Text>
              <View style={styles.historyStatus}>
                <Ionicons name="checkmark-circle" size={16} color={theme.colors.success} />
                <Text style={styles.historyStatusText}>Pago</Text>
              </View>
            </View>
          </View>
        </Card>
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
  statusCard: {
    marginBottom: theme.spacing.md,
  },
  statusHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.md,
  },
  statusInfo: {
    flex: 1,
  },
  statusTitle: {
    ...theme.typography.h3,
    color: theme.colors.text,
    marginBottom: 2,
  },
  statusSubtitle: {
    ...theme.typography.bodySmall,
    color: theme.colors.textSecondary,
  },
  sessionsCard: {
    marginBottom: theme.spacing.md,
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
  sessionsContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
  },
  sessionsBadge: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    ...theme.shadows.sm,
  },
  sessionsCount: {
    ...theme.typography.h1,
    color: theme.colors.textLight,
    fontWeight: '700',
  },
  sessionsInfo: {
    flex: 1,
  },
  sessionsTitle: {
    ...theme.typography.bodySmall,
    color: theme.colors.text,
    fontWeight: '600',
    marginBottom: 2,
  },
  sessionsSubtitle: {
    ...theme.typography.caption,
    color: theme.colors.textSecondary,
  },
  warningBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff8e1',
    padding: theme.spacing.sm,
    borderRadius: theme.borderRadius.sm,
    marginTop: theme.spacing.md,
    gap: theme.spacing.xs,
  },
  warningText: {
    ...theme.typography.caption,
    color: theme.colors.text,
    flex: 1,
  },
  addButton: {
    marginBottom: theme.spacing.lg,
  },
  historyCard: {},
  historyItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  historyInfo: {
    flex: 1,
  },
  historyTitle: {
    ...theme.typography.bodySmall,
    color: theme.colors.text,
    fontWeight: '600',
    marginBottom: 2,
  },
  historyDate: {
    ...theme.typography.caption,
    color: theme.colors.textSecondary,
  },
  historyAmount: {
    alignItems: 'flex-end',
  },
  historyValue: {
    ...theme.typography.bodySmall,
    color: theme.colors.text,
    fontWeight: '600',
    marginBottom: 4,
  },
  historyStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  historyStatusText: {
    ...theme.typography.caption,
    color: theme.colors.success,
  },
  // Estilos para tela de pagamento
  paymentCard: {
    marginBottom: theme.spacing.md,
  },
  cardSubtitle: {
    ...theme.typography.bodySmall,
    color: theme.colors.textSecondary,
    marginTop: 4,
    marginBottom: theme.spacing.lg,
  },
  selectorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: theme.spacing.lg,
  },
  selectorButton: {
    padding: theme.spacing.xs,
  },
  selectorValue: {
    alignItems: 'center',
    marginHorizontal: theme.spacing.xl,
    minWidth: 100,
  },
  selectorNumber: {
    ...theme.typography.h1,
    color: theme.colors.primary,
    fontWeight: '700',
  },
  selectorLabel: {
    ...theme.typography.bodySmall,
    color: theme.colors.textSecondary,
    marginTop: 4,
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: theme.spacing.lg,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
    marginTop: theme.spacing.md,
  },
  totalLabel: {
    ...theme.typography.body,
    color: theme.colors.text,
    fontWeight: '600',
  },
  totalAmount: {
    ...theme.typography.h2,
    color: theme.colors.primary,
    fontWeight: '700',
  },
  qrCard: {
    marginBottom: theme.spacing.lg,
  },
  qrTitle: {
    ...theme.typography.h3,
    color: theme.colors.text,
    marginBottom: 4,
  },
  qrSubtitle: {
    ...theme.typography.bodySmall,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.lg,
  },
  qrCodeContainer: {
    alignItems: 'center',
    marginVertical: theme.spacing.lg,
  },
  qrCodePlaceholder: {
    width: 240,
    height: 240,
    backgroundColor: theme.colors.surface,
    borderWidth: 2,
    borderColor: theme.colors.border,
    borderRadius: theme.borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    borderStyle: 'dashed',
  },
  qrCodeText: {
    ...theme.typography.bodySmall,
    color: theme.colors.textSecondary,
    marginTop: theme.spacing.sm,
  },
  qrCodeValue: {
    ...theme.typography.h3,
    color: theme.colors.primary,
    marginTop: theme.spacing.xs,
    fontWeight: '700',
  },
  pixInfo: {
    gap: theme.spacing.sm,
    marginBottom: theme.spacing.lg,
  },
  pixInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.xs,
  },
  pixInfoText: {
    ...theme.typography.bodySmall,
    color: theme.colors.textSecondary,
  },
  confirmButton: {
    marginBottom: theme.spacing.md,
  },
  copyPixButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing.xs,
    padding: theme.spacing.md,
  },
  copyPixText: {
    ...theme.typography.bodySmall,
    color: theme.colors.primary,
    fontWeight: '600',
  },
});


