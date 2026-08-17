import { View, Text, StyleSheet, Image } from 'react-native';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { radii } from '../../theme/radii';
import { typography } from '../../theme/typography';
import { PieceWorkItem } from '../../features/home/models/home.models';

export function PieceWorkCard({ item }: { item: PieceWorkItem }) {
  return (
    <View style={styles.container}>
      <View style={styles.circle}>
        <Image source={item.image} style={styles.image} resizeMode="contain" />
      </View>
      <Text style={styles.title}>{item.title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 104,
    alignItems: 'center',
  },
  circle: {
    width: 80,
    height: 80,
    borderRadius: radii.circle,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.borderLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.sm,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  image: {
    width: 44,
    height: 44,
  },
  title: {
    ...typography.body,
    fontSize: 14,
    color: colors.textPrimary,
    textAlign: 'center',
  },
});
