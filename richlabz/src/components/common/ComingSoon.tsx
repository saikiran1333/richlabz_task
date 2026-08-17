import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';

export default function ComingSoonScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.center}>
        <Ionicons name="construct-outline" size={52} color={colors.primaryBlue} />
        <Text style={styles.title}>Coming Soon</Text>
        <Text style={styles.subtitle}>
          This section is under development.
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    ...typography.sectionTitle,
    color: colors.textPrimary,
    marginTop: 16,
  },
  subtitle: {
    ...typography.body,
    color: colors.textSecondary,
    marginTop: 8,
  },
});
