import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, StyleSheet, Image, FlatList, Dimensions, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { radii } from '../../theme/radii';
import { typography } from '../../theme/typography';
import { HeroSlide } from '../../features/home/models/home.models';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface StickyHeroProps {
  location: { displayName: string };
  searchText: string;
  onSearchChange: (text: string) => void;
  slides: HeroSlide[];
  activeIndex?: number;
}

export function StickyHero({ location, searchText, onSearchChange, slides }: StickyHeroProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  // Auto-scroll every 2.5 seconds
  useEffect(() => {
    if (!slides || slides.length === 0) return;
    
    const timer = setInterval(() => {
      let nextIndex = currentIndex + 1;
      if (nextIndex >= slides.length) {
        nextIndex = 0;
      }
      flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
      setCurrentIndex(nextIndex);
    }, 2500);

    return () => clearInterval(timer);
  }, [currentIndex, slides.length]);

  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const x = event.nativeEvent.contentOffset.x;
    const index = Math.round(x / SCREEN_WIDTH);
    if (index !== currentIndex && index >= 0 && index < slides.length) {
      setCurrentIndex(index);
    }
  };

  const renderSlide = ({ item, index }: { item: HeroSlide; index: number }) => {
    return (
      <View style={[styles.carouselItem, { width: SCREEN_WIDTH }]}>
        <View style={styles.textContent}>
          <Text style={styles.heroTitle}>{item.title}</Text>
          <Text style={styles.heroSubtitle}>{item.subtitle}</Text>
        </View>
        <View style={styles.imageContainer}>
          <Image source={item.image} style={styles.heroImage} resizeMode="contain" />
        </View>
      </View>
    );
  };

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
          <FlatList
            ref={flatListRef}
            data={slides}
            renderItem={renderSlide}
            keyExtractor={(item) => item.id}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={onScroll}
            scrollEventThrottle={16}
          />
          
          <View style={styles.pagination}>
            {slides.map((_, i) => (
              <View
                key={i}
                style={[
                  styles.dot,
                  i === currentIndex && styles.dotActive
                ]}
              />
            ))}
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
    paddingTop: 16,
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
    height: 200,
  },
  carouselItem: {
    flexDirection: 'row',
    paddingHorizontal: spacing.pageHorizontal,
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
    position: 'absolute',
    bottom: 10,
    left: spacing.pageHorizontal,
  },
  dot: {
    width: 12,
    height: 4,
    borderRadius: 2,
    backgroundColor: 'rgba(255,255,255,0.4)',
    marginRight: 6,
  },
  dotActive: {
    width: 24,
    backgroundColor: colors.white,
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  heroImage: {
    width: '130%',
    height: '110%',
  },
});
