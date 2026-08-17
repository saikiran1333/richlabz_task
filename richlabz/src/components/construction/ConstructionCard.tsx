import { View, Text, StyleSheet, Image, Pressable, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { radii } from '../../theme/radii';
import { typography } from '../../theme/typography';
import { ConstructionItem } from '../../features/home/models/home.models';

const { width } = Dimensions.get('window');
const cardWidth = (width - 40 - 14) / 2;

export function ConstructionCard({ item }: { item: ConstructionItem }) {
  const isBlue = item.accent === 'blue';
  
  return (
    <View style={[styles.card, { backgroundColor: isBlue ? colors.lightBlueSurface : colors.lightOrangeSurface }]}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.subtitle}>{item.subtitle}</Text>
      
      <View style={styles.bottomRow}>
        <Pressable style={styles.exploreRow}>
          <Text style={[styles.exploreText, { color: isBlue ? colors.primaryBlue : colors.accentOrange }]}>
            Explore
          </Text>
          <Ionicons name="arrow-forward-circle" size={16} color={isBlue ? colors.primaryBlue : colors.accentOrange} style={{marginLeft: 4}} />
        </Pressable>
        <Image source={item.image} style={styles.image} resizeMode="contain" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: cardWidth,
    minHeight: 104,
    borderRadius: radii.card,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.borderLight,
    marginBottom: 14,
  },
  title: {
    ...typography.body,
    fontWeight: '500',
    color: colors.textPrimary,
  },
  subtitle: {
    ...typography.small,
    color: colors.textSecondary,
    marginBottom: 8,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    flex: 1,
  },
  exploreRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 4,
  },
  exploreText: {
    ...typography.small,
    fontWeight: '600',
  },
  image: {
    width: 40,
    height: 40,
  },
});
