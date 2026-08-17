import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { radii } from '../../theme/radii';
import { typography } from '../../theme/typography';
import { VendorBanner as VendorBannerModel } from '../../features/home/models/home.models';

export function VendorBanner({ item }: { item: VendorBannerModel }) {
  return (
    <View style={styles.card}>
      <Image source={item.image} style={styles.image} resizeMode="cover" />

      <View style={styles.textContent}>
        <Text style={styles.title}>{item.title}</Text>
        <View style={styles.divider} />
        <Text style={styles.subtitle}>{item.subtitle}</Text>

        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>Register now</Text>
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
    backgroundColor: '#F3F2F1', // based on reference
    flexDirection: 'row',
    overflow: 'hidden',
    height: 140,
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
  textContent: {
    flex: 1,
    padding: spacing.lg,
    justifyContent: 'center',
    zIndex: 2,
  },
  title: {
    ...typography.cardTitle,
    fontSize: 16,
    color: colors.textPrimary,
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(0,0,0,0.1)',
    width: 40,
    marginVertical: 8,
  },
  subtitle: {
    ...typography.small,
    color: colors.textSecondary,
    marginBottom: 12,
  },
  button: {
    alignSelf: 'flex-start',
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
