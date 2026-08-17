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
      <View style={styles.textContent}>
        <Text style={styles.title}>{item.title}</Text>
        <View style={styles.divider} />
        <Text style={styles.subtitle}>{item.subtitle}</Text>
        
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>Register now</Text>
          <Ionicons name="arrow-forward-circle" size={16} color={colors.white} style={{marginLeft: 4}} />
        </Pressable>
      </View>
      
      <View style={styles.imageContainer}>
        <Image source={item.image} style={styles.image} resizeMode="contain" />
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
  imageContainer: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    height: '100%',
    width: '60%',
    zIndex: 1,
  },
  image: {
    width: '100%',
    height: '110%',
    position: 'absolute',
    bottom: 0,
    right: -20,
  },
});
