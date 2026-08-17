import { View, Text, StyleSheet, Pressable } from 'react-native';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { spacing } from '../../theme/spacing';

interface SectionHeaderProps {
  title: string;
  onViewAll?: () => void;
}

export function SectionHeader({ title, onViewAll }: SectionHeaderProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {onViewAll && (
        <Pressable onPress={onViewAll}>
          <Text style={styles.viewAll}>View all</Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    paddingHorizontal: spacing.pageHorizontal,
    marginBottom: spacing.md,
  },
  title: {
    ...typography.sectionTitle,
    color: colors.textPrimary,
  },
  viewAll: {
    ...typography.action,
    color: colors.accentOrange,
  },
});
