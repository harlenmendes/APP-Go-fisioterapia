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
import { Input } from '@/components/Input';
import { useRouter } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';
import { theme } from '@/constants/theme';

export default function DadosUsuarioScreen() {
  const router = useRouter();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    cpf: '',
    birthDate: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
  });

  const handleSave = async () => {
    if (!formData.name.trim() || !formData.email.trim()) {
      Alert.alert('Campos obrigatórios', 'Por favor, preencha nome e e-mail.');
      return;
    }

    setLoading(true);

    try {
      // TODO: Integrar com API para salvar dados
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulação
      
      Alert.alert('Sucesso', 'Dados atualizados com sucesso!');
      router.back();
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível salvar os dados. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const formatPhone = (value: string): string => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 10) {
      return numbers.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3').replace(/-$/, '');
    }
    return numbers.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3').replace(/-$/, '');
  };

  const formatCPF = (value: string): string => {
    const numbers = value.replace(/\D/g, '');
    return numbers.replace(/(\d{3})(\d{3})(\d{3})(\d{0,2})/, '$1.$2.$3-$4');
  };

  const formatZipCode = (value: string): string => {
    const numbers = value.replace(/\D/g, '');
    return numbers.replace(/(\d{5})(\d{0,3})/, '$1-$2');
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
          <Text style={styles.headerTitle}>Dados do Usuário</Text>
          <View style={styles.placeholder} />
        </View>
      </LinearGradient>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Card variant="elevated" style={styles.formCard}>
          <Text style={styles.sectionTitle}>Informações Pessoais</Text>

          <Input
            label="Nome Completo *"
            placeholder="Digite seu nome completo"
            value={formData.name}
            onChangeText={(text) => setFormData({ ...formData, name: text })}
            icon="person-outline"
          />

          <Input
            label="E-mail *"
            placeholder="seu@email.com"
            value={formData.email}
            onChangeText={(text) => setFormData({ ...formData, email: text })}
            keyboardType="email-address"
            autoCapitalize="none"
            icon="mail-outline"
          />

          <Input
            label="Telefone"
            placeholder="(00) 00000-0000"
            value={formData.phone}
            onChangeText={(text) => setFormData({ ...formData, phone: formatPhone(text) })}
            keyboardType="phone-pad"
            icon="call-outline"
            maxLength={15}
          />

          <Input
            label="CPF"
            placeholder="000.000.000-00"
            value={formData.cpf}
            onChangeText={(text) => setFormData({ ...formData, cpf: formatCPF(text) })}
            keyboardType="numeric"
            icon="card-outline"
            maxLength={14}
          />

          <Input
            label="Data de Nascimento"
            placeholder="DD/MM/AAAA"
            value={formData.birthDate}
            onChangeText={(text) => {
              const masked = text.replace(/\D/g, '');
              const formatted = masked.replace(/(\d{2})(\d{2})(\d{0,4})/, '$1/$2/$3').replace(/\/$/, '');
              setFormData({ ...formData, birthDate: formatted });
            }}
            keyboardType="numeric"
            icon="calendar-outline"
            maxLength={10}
          />
        </Card>

        <Card variant="elevated" style={styles.formCard}>
          <Text style={styles.sectionTitle}>Endereço</Text>

          <Input
            label="Endereço"
            placeholder="Rua, número, complemento"
            value={formData.address}
            onChangeText={(text) => setFormData({ ...formData, address: text })}
            icon="location-outline"
          />

          <View style={styles.row}>
            <View style={styles.halfWidth}>
              <Input
                label="Cidade"
                placeholder="Cidade"
                value={formData.city}
                onChangeText={(text) => setFormData({ ...formData, city: text })}
                icon="business-outline"
              />
            </View>
            <View style={styles.halfWidth}>
              <Input
                label="Estado"
                placeholder="UF"
                value={formData.state}
                onChangeText={(text) => setFormData({ ...formData, state: text.toUpperCase().slice(0, 2) })}
                autoCapitalize="characters"
                icon="map-outline"
                maxLength={2}
              />
            </View>
          </View>

          <Input
            label="CEP"
            placeholder="00000-000"
            value={formData.zipCode}
            onChangeText={(text) => setFormData({ ...formData, zipCode: formatZipCode(text) })}
            keyboardType="numeric"
            icon="navigate-outline"
            maxLength={9}
          />
        </Card>

        <Button
          title="Salvar"
          onPress={handleSave}
          loading={loading}
          icon={<Ionicons name="checkmark" size={20} color={theme.colors.textLight} />}
          style={styles.saveButton}
        />
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
  formCard: {
    marginBottom: theme.spacing.md,
  },
  sectionTitle: {
    ...theme.typography.h3,
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
    fontWeight: '700',
  },
  row: {
    flexDirection: 'row',
    gap: theme.spacing.md,
  },
  halfWidth: {
    flex: 1,
  },
  saveButton: {
    marginTop: theme.spacing.md,
  },
});


