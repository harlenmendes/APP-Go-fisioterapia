import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';
import { theme } from '@/constants/theme';

interface ProfileMenuProps {
  visible: boolean;
  onClose: () => void;
  anchorPosition?: { x: number; y: number };
}

export const ProfileMenu: React.FC<ProfileMenuProps> = ({
  visible,
  onClose,
  anchorPosition,
}) => {
  const router = useRouter();
  const { signOut } = useAuth();

  const handleDadosUsuario = () => {
    onClose();
    router.push('/(tabs)/dados-usuario');
  };

  const handleSair = async () => {
    onClose();
    await signOut();
    router.replace('/(auth)/login');
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <View style={[styles.menu, anchorPosition && { top: anchorPosition.y + 40, right: 20 }]}>
            <TouchableOpacity
              style={styles.menuItem}
              onPress={handleDadosUsuario}
            >
              <Ionicons name="person-outline" size={20} color={theme.colors.text} />
              <Text style={styles.menuItemText}>Dados do usuário</Text>
            </TouchableOpacity>

            <View style={styles.divider} />

            <TouchableOpacity
              style={styles.menuItem}
              onPress={handleSair}
            >
              <Ionicons name="log-out-outline" size={20} color={theme.colors.error} />
              <Text style={[styles.menuItemText, styles.menuItemTextDanger]}>Sair</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  menu: {
    position: 'absolute',
    top: 60,
    right: 20,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    minWidth: 200,
    ...theme.shadows.lg,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing.md,
    gap: theme.spacing.sm,
  },
  menuItemText: {
    ...theme.typography.bodySmall,
    color: theme.colors.text,
    fontWeight: '500',
  },
  menuItemTextDanger: {
    color: theme.colors.error,
  },
  divider: {
    height: 1,
    backgroundColor: theme.colors.border,
    marginHorizontal: theme.spacing.xs,
  },
});


