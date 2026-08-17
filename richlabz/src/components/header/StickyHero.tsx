import { View, Text, TextInput, StyleSheet, Pressable, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { radii } from '../../theme/radii';
import { typography } from '../../theme/typography';
import { HeroSlide } from '../../features/home/models/home.models';

interface StickyHeroProps {
  location: { displayName: string };
  searchText: string;
  onSearchChange: (text: string) => void;
  slides: HeroSlide[];
  activeIndex: number;
}

export function StickyHero({ location, searchText, onSearchChange, slides, activeIndex }: StickyHeroProps) {
  const currentSlide = slides[activeIndex] || slides[0];

  return (
    <View style={styles.heroClip}>
      <LinearGradient
        colors={[colors.heroBlueLeft, colors.heroBlueRight]}
        start={{ x: 0, y: 0.05 }}
        end={{ x: 1, y: 0.35 }}
        style={styles.heroGradient}
      >
        <View style={styles.locationRow}>
          <Ionicons name="location" size={20} color={colors.white} />
          <Text style={styles.locationText}>{location.displayName}</Text>
          <Ionicons name="chevron-down" size={15} color={colors.white} />
          <View style={{ flex: 1 }} />
          <Ionicons name="notifications-outline" size={24} color={colors.white} />
        </View>

        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color={colors.textMuted} style={styles.searchIcon} />
          <TextInput
            value={searchText}
            onChangeText={onSearchChange}
            placeholder="Search properties, services, machineries"
            placeholderTextColor={colors.textMuted}
            style={styles.searchInput}
          />
        </View>

        <View style={styles.carouselContainer}>
          <View style={styles.textContent}>
            <Text style={styles.heroTitle}>{currentSlide.title}</Text>
            <Text style={styles.heroSubtitle}>{currentSlide.subtitle}</Text>
            
            <View style={styles.pagination}>
              {slides.map((_, i) => (
                <View
                  key={i}
                  style={[
                    styles.dot,
                    i === activeIndex && styles.dotActive
                  ]}
                />
              ))}
            </View>
          </View>
          <View style={styles.imageContainer}>
            <Image source={currentSlide.image} style={styles.heroImage} resizeMode="contain" />
          </View>
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  heroClip: {
    overflow: 'hidden',
    borderBottomLeftRadius: radii.hero,
    borderBottomRightRadius: radii.hero,
    marginBottom: spacing.xxl,
  },
  heroGradient: {
    paddingTop: 48, // approx status bar height
    paddingBottom: 24,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.pageHorizontal,
    marginBottom: spacing.lg,
  },
  locationText: {
    ...typography.body,
    color: colors.white,
    marginLeft: spacing.sm,
    marginRight: spacing.xs,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    height: 40,
    borderRadius: 20,
    marginHorizontal: spacing.pageHorizontal,
    paddingHorizontal: 14,
    marginBottom: spacing.lg,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
    color: colors.textPrimary,
  },
  carouselContainer: {
    flexDirection: 'row',
    paddingHorizontal: spacing.pageHorizontal,
    height: 140,
  },
  textContent: {
    flex: 1,
    justifyContent: 'center',
  },
  heroTitle: {
    ...typography.heroTitle,
    color: colors.white,
    marginBottom: spacing.xs,
  },
  heroSubtitle: {
    ...typography.small,
    color: colors.white,
    opacity: 0.9,
  },
  pagination: {
    flexDirection: 'row',
    marginTop: spacing.xl,
  },
  dot: {
    width: 16,
    height: 4,
    borderRadius: 2,
    backgroundColor: 'rgba(255,255,255,0.4)',
    marginRight: 6,
  },
  dotActive: {
    backgroundColor: colors.white,
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  heroImage: {
    width: '120%',
    height: '100%',
  },
});
