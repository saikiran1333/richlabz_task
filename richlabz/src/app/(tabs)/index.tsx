import { View, StyleSheet, FlatList, Animated } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { useHomeViewModel } from '../../features/home/viewmodels/useHomeViewModel';

import { StickyHero } from '../../components/header/StickyHero';
import { SectionHeader } from '../../components/common/SectionHeader';
import { ConstructionCard } from '../../components/construction/ConstructionCard';
import { PropertyCareCard } from '../../components/property/PropertyCareCard';
import { PieceWorkCard } from '../../components/services/PieceWorkCard';
import { AdditionalServiceCard } from '../../components/services/AdditionalServiceCard';
import { TestimonialCard } from '../../components/testimonials/TestimonialCard';
import { VendorBanner } from '../../components/vendor/VendorBanner';
import { MachineryCard } from '../../components/marketplace/MachineryCard';
import { MaterialCard } from '../../components/marketplace/MaterialCard';

export default function HomeScreen() {
  const {
    location,
    heroSlides,
    constructionItems,
    propertyCare,
    pieceWorks,
    additionalServices,
    testimonials,
    vendor,
    machinery,
    materials,
    activeHeroIndex,
    setActiveHeroIndex,
    searchText,
    setSearchText,
  } = useHomeViewModel();

  const renderHomeContent = () => (
    <View style={styles.content}>
      {/* Construction */}
      <SectionHeader title="Construction" />
      <View style={styles.gridContainer}>
        {constructionItems.map((item) => (
          <ConstructionCard key={item.id} item={item} />
        ))}
      </View>

      {/* Property Care */}
      <SectionHeader title="Property Care for NRIs" />
      <PropertyCareCard item={propertyCare} />

      {/* Piece Works */}
      <SectionHeader title="Piece Works" onViewAll={() => {}} />
      <FlatList
        data={pieceWorks}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <PieceWorkCard item={item} />}
        contentContainerStyle={styles.horizontalList}
        ItemSeparatorComponent={() => <View style={{ width: 14 }} />}
      />

      {/* Additional Services */}
      <SectionHeader title="Additional Services" onViewAll={() => {}} />
      <FlatList
        data={additionalServices}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <AdditionalServiceCard item={item} />}
        contentContainerStyle={styles.horizontalList}
        ItemSeparatorComponent={() => <View style={{ width: 14 }} />}
      />

      {/* Testimonials */}
      <SectionHeader title="Testimonials" />
      <FlatList
        data={testimonials}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <TestimonialCard item={item} />}
        contentContainerStyle={styles.horizontalList}
        ItemSeparatorComponent={() => <View style={{ width: 14 }} />}
      />

      {/* Vendor */}
      <SectionHeader title="Become a Vendor" />
      <VendorBanner item={vendor} />

      {/* Machinery */}
      <SectionHeader title="Hire Machineries" onViewAll={() => {}} />
      <FlatList
        data={machinery}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <MachineryCard item={item} />}
        contentContainerStyle={styles.horizontalList}
        ItemSeparatorComponent={() => <View style={{ width: 14 }} />}
      />

      {/* Materials */}
      <SectionHeader title="Material Suppliers" onViewAll={() => {}} />
      <FlatList
        data={materials}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <MaterialCard item={item} />}
        contentContainerStyle={[styles.horizontalList, { paddingBottom: spacing.xxxl }]}
        ItemSeparatorComponent={() => <View style={{ width: 14 }} />}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        stickyHeaderIndices={[0]}
      >
        <StickyHero
          location={location}
          searchText={searchText}
          onSearchChange={setSearchText}
          slides={heroSlides}
          activeIndex={activeHeroIndex}
        />
        {renderHomeContent()}
      </Animated.ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    paddingBottom: spacing.xxxl,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: spacing.pageHorizontal,
    justifyContent: 'space-between',
    marginBottom: spacing.xxl,
  },
  horizontalList: {
    paddingHorizontal: spacing.pageHorizontal,
    marginBottom: spacing.xxl,
  },
});
