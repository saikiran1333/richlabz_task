import { View, Text, StyleSheet, Image } from 'react-native';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { radii } from '../../theme/radii';
import { typography } from '../../theme/typography';
import { MachineryItem } from '../../features/home/models/home.models';

export function MachineryCard({ item }: { item: MachineryItem }) {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Image source={item.image} style={styles.image} resizeMode="contain" />
      </View>
      <Text style={styles.title}>{item.title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 126,
    alignItems: 'center',
  },
  card: {
    width: '100%',
    height: 108,
    borderRadius: radii.card,
    backgroundColor: colors.placeholder,
    borderWidth: 1,
    borderColor: colors.borderLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  image: {
    width: 80,
    height: 60,
  },
  title: {
    ...typography.body,
    fontSize: 14,
    color: colors.textPrimary,
    textAlign: 'center',
  },
});
