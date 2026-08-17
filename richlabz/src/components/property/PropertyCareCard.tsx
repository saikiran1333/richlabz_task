import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { radii } from '../../theme/radii';
import { typography } from '../../theme/typography';
import { PropertyCare } from '../../features/home/models/home.models';

export function PropertyCareCard({ item }: { item: PropertyCare }) {
  return (
    <View style={styles.card}>
      <Image source={item.image} style={styles.image} resizeMode="cover" />

      <View style={styles.content}>
        <Text style={styles.title}>{item.title}</Text>
        
        <View style={styles.bullets}>
          {item.bullets.map((b, i) => (
            <Text key={i} style={styles.bulletText}>• {b}</Text>
          ))}
        </View>

        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>Know More</Text>
          <Ionicons name="arrow-forward-circle" size={16} color={colors.white} style={{marginLeft: 4}} />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: spacing.pageHorizontal,
    borderRadius: radii.card,
    backgroundColor: colors.lightBlueSurface,
    flexDirection: 'row',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.borderLight,
    marginBottom: spacing.xxl,
  },
  image: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
    zIndex: 1,
  },
  content: {
    flex: 1,
    // Proportional so the copy keeps clearing the artwork's subject at any width.
    marginLeft: '34%',
    padding: spacing.md,
    zIndex: 2,
  },
  title: {
    ...typography.cardTitle,
    fontSize: 16,
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  bullets: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: spacing.md,
  },
  bulletText: {
    ...typography.small,
    color: colors.textSecondary,
    marginRight: spacing.md,
    marginBottom: 4,
  },
  button: {
    alignSelf: 'flex-end',
    backgroundColor: colors.primaryBlue,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: radii.pill,
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: {
    ...typography.small,
    color: colors.white,
    fontWeight: '500',
  },
});
