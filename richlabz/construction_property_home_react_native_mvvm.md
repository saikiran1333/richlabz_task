# Construction & Property Marketplace Home Page --- React Native MVVM UI Specification {#construction--property-marketplace-home-page--react-native-mvvm-ui-specification}

## 1. Goal {#1-goal}

Build the React Native home page to visually match the supplied
reference screenshots as closely as possible.

The reference viewport is approximately **466 × 831 px**. Treat the
supplied screenshots as the visual source of truth for spacing,
proportions, colors, gradients, card radii, typography hierarchy, image
cropping, and section order.

This document is implementation-ready for a **React Native +
TypeScript** project using **MVVM**. Images are intentionally
placeholders and must be replaceable later without changing layout code.

### Non-negotiable visual requirements

-   Entire page background: `#FFFFFF`.
-   Top hero/header is sticky.
-   Location is detected automatically.
-   Search field sits directly below the location row.
-   Hero carousel sits below search.
-   Hero carousel image/text/progress changes together.
-   Hero bottom edge has the same large curved treatment as the
    reference.
-   All content below the hero is vertically scrollable.
-   Horizontal sections must not create a horizontal page scroll.
-   Construction uses a 2 × 2 grid.
-   Piece Works, Hire Machineries, Material Suppliers, Additional
    Services and Testimonials use horizontal carousels.
-   All image areas have dedicated folders.
-   Placeholder images must preserve the final image aspect ratio and
    visual treatment.
-   Video testimonials open in a modal/dialog and play the supplied
    video URL.
-   Bottom navigation has four items: Home + three placeholder/Coming
    Soon screens.
-   UI components must remain reusable and data-driven.
-   Do not hard-code repeated cards directly inside the screen
    component.
-   Use MVVM: View → ViewModel → Repository/Service.
-   Keep comments short and single-line only.

------------------------------------------------------------------------

# 2. Reference Measurements {#2-reference-measurements}

Use the screenshot dimensions as a proportional design reference rather
than assuming every device is exactly 466 px wide.

### Base design width

``` text
BASE_WIDTH = 466
```

Use a responsive scale helper:

``` ts
const scale = (size: number, width: number) => (size * width) / 466;
```

For vertical spacing, prefer fixed logical dp values derived from the
reference and let React Native density handle physical pixels.

### Important approximate reference measurements

  Element                        Reference
  -------------------------- -------------
  Screen width                      466 px
  Screen height                     831 px
  Horizontal page padding          \~20 px
  Hero/header bottom              \~309 px
  Search height                    \~40 px
  Search left/right margin         \~28 px
  Hero corner radius               \~24 px
  Main section title               \~22 px
  Card corner radius           \~12--16 px
  Horizontal carousel gap      \~12--16 px
  Primary blue                   `#2678A9`
  Link blue                      `#2678A9`
  Link orange                    `#FF8A24`
  Main background                `#FFFFFF`
  Search background              `#FFFFFF`
  Search placeholder             `#A0A0A0`
  Main text                      `#111111`
  Secondary text                 `#777777`
  Light border                   `#E8E8E8`

The screenshot contains anti-aliased pixels and
image-compression/rendering differences. The gradient values below are
the closest practical extraction from the supplied reference rather than
pretending individual screenshot pixels are source design tokens.

------------------------------------------------------------------------

# 3. Color System {#3-color-system}

Create one centralized color file. Never scatter color literals across
components.

## `src/theme/colors.ts` {#srcthemecolorsts}

``` ts
export const colors = {
  background: '#FFFFFF',
  surface: '#FFFFFF',
  textPrimary: '#111111',
  textSecondary: '#777777',
  textMuted: '#A0A0A0',

  primaryBlue: '#2678A9',
  primaryBlueDark: '#1677B2',
  primaryBlueLight: '#DDF2FF',

  accentOrange: '#FF8A24',
  accentOrangeLight: '#FFF1E5',

  border: '#E8E8E8',
  borderLight: '#EFEFEF',

  placeholder: '#F7F7F7',
  placeholderDark: '#EDEDED',

  overlay: 'rgba(0,0,0,0.42)',
  white: '#FFFFFF',
  black: '#000000',
};
```

------------------------------------------------------------------------

# 4. Hero Gradient {#4-hero-gradient}

The supplied screenshots show a left-to-right blue gradient.

Approximate extracted endpoints:

``` text
Left:  #0082C8
Right: #8BC8E6
```

Use a horizontal gradient:

``` tsx
<LinearGradient
  colors={['#0082C8', '#8BC8E6']}
  start={{ x: 0, y: 0.05 }}
  end={{ x: 1, y: 0.35 }}
  style={styles.hero}
/>
```

Do not use a generic Material blue. The hero should visually remain
close to the supplied cyan/sky-blue gradient.

------------------------------------------------------------------------

# 5. Typography {#5-typography}

The screenshot resembles an iOS system UI.

Use:

``` ts
const typography = {
  sectionTitle: {
    fontSize: 22,
    fontWeight: '500' as const,
    lineHeight: 27,
  },
  heroTitle: {
    fontSize: 20,
    fontWeight: '700' as const,
    lineHeight: 24,
  },
  body: {
    fontSize: 15,
    fontWeight: '400' as const,
    lineHeight: 20,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '500' as const,
    lineHeight: 22,
  },
  small: {
    fontSize: 13,
    fontWeight: '400' as const,
    lineHeight: 18,
  },
  action: {
    fontSize: 15,
    fontWeight: '600' as const,
  },
};
```

Do not load a custom font unless the final brand design requires it.
Using the platform system font keeps the reference closer to the
supplied iOS screenshot.

------------------------------------------------------------------------

# 6. Recommended Project Structure {#6-recommended-project-structure}

``` text
src/
├── app/
│   ├── App.tsx
│   └── navigation/
│       ├── RootNavigator.tsx
│       └── BottomTabNavigator.tsx
│
├── assets/
│   ├── images/
│   │   ├── hero/
│   │   ├── construction/
│   │   ├── property-care/
│   │   ├── piece-works/
│   │   ├── additional-services/
│   │   ├── testimonials/
│   │   ├── vendor/
│   │   ├── machinery/
│   │   └── materials/
│   ├── icons/
│   └── placeholders/
│
├── components/
│   ├── common/
│   │   ├── AppText.tsx
│   │   ├── SectionHeader.tsx
│   │   ├── HorizontalCarousel.tsx
│   │   ├── PlaceholderImage.tsx
│   │   ├── PrimaryButton.tsx
│   │   └── ComingSoon.tsx
│   │
│   ├── header/
│   │   ├── StickyHero.tsx
│   │   ├── LocationRow.tsx
│   │   ├── SearchBar.tsx
│   │   └── HeroCarousel.tsx
│   │
│   ├── construction/
│   │   └── ConstructionCard.tsx
│   │
│   ├── property/
│   │   └── PropertyCareCard.tsx
│   │
│   ├── services/
│   │   ├── PieceWorkCard.tsx
│   │   └── AdditionalServiceCard.tsx
│   │
│   ├── testimonials/
│   │   ├── TestimonialCard.tsx
│   │   └── VideoPlayerModal.tsx
│   │
│   ├── vendor/
│   │   └── VendorBanner.tsx
│   │
│   └── marketplace/
│       ├── MachineryCard.tsx
│       └── MaterialCard.tsx
│
├── features/
│   └── home/
│       ├── models/
│       │   └── home.models.ts
│       ├── repository/
│       │   └── home.repository.ts
│       ├── services/
│       │   └── location.service.ts
│       ├── viewmodels/
│       │   └── useHomeViewModel.ts
│       └── views/
│           └── HomeScreen.tsx
│
├── navigation/
│   └── types.ts
│
├── theme/
│   ├── colors.ts
│   ├── spacing.ts
│   ├── typography.ts
│   ├── radii.ts
│   └── shadows.ts
│
└── utils/
    ├── responsive.ts
    ├── permissions.ts
    └── video.ts
```

------------------------------------------------------------------------

# 7. Dependencies {#7-dependencies}

Recommended packages:

``` bash
npm install @react-navigation/native @react-navigation/bottom-tabs
npm install react-native-screens react-native-safe-area-context
npm install react-native-linear-gradient
npm install react-native-vector-icons
npm install react-native-permissions
npm install react-native-geolocation-service
npm install react-native-video
```

For iOS:

``` bash
cd ios
pod install
cd ..
```

If the project is Expo-based, use the Expo equivalents instead of
installing native packages directly.

------------------------------------------------------------------------

# 8. MVVM Architecture {#8-mvvm-architecture}

## View

Responsible only for rendering.

``` text
HomeScreen
   ↓
HomeViewModel
   ↓
HomeRepository
   ↓
API / local data / location service
```

The View should not:

-   request GPS permissions directly
-   call APIs directly
-   contain business logic
-   construct repeated card data
-   manage location parsing
-   contain carousel data
-   contain video URL logic

## ViewModel

The ViewModel owns:

-   location state
-   loading state
-   hero slide index
-   search text
-   home section data
-   video modal state
-   error state
-   refresh operation

Example:

``` ts
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
  isLoading,
  refresh,
  activeHeroIndex,
  setActiveHeroIndex,
  searchText,
  setSearchText,
  selectedVideo,
  openVideo,
  closeVideo,
} = useHomeViewModel();
```

------------------------------------------------------------------------

# 9. Models {#9-models}

## `src/features/home/models/home.models.ts` {#srcfeatureshomemodelshomemodelsts}

``` ts
export interface HeroSlide {
  id: string;
  title: string;
  subtitle: string;
  image: number;
}

export interface ConstructionItem {
  id: string;
  title: string;
  subtitle: string;
  accent: 'blue' | 'orange';
  image: number;
}

export interface PieceWorkItem {
  id: string;
  title: string;
  image: number;
}

export interface AdditionalServiceItem {
  id: string;
  title: string;
  image: number;
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  duration: string;
  thumbnail: number;
  videoUrl: string;
}

export interface MachineryItem {
  id: string;
  title: string;
  image: number;
}

export interface MaterialItem {
  id: string;
  title: string;
  image: number;
}

export interface PropertyCare {
  title: string;
  subtitle: string;
  bullets: string[];
  image: number;
}

export interface VendorBanner {
  title: string;
  subtitle: string;
  image: number;
}
```

------------------------------------------------------------------------

# 10. Image Organization {#10-image-organization}

Every section gets its own folder.

``` text
assets/images/
├── hero/
│   ├── hero-01.png
│   ├── hero-02.png
│   └── hero-03.png
│
├── construction/
│   ├── residential.png
│   ├── commercial.png
│   ├── land-development.png
│   └── industries.png
│
├── property-care/
│   └── property-care.png
│
├── piece-works/
│   ├── interiors.png
│   ├── plumbing.png
│   ├── electrical.png
│   └── painting.png
│
├── additional-services/
│   ├── pmc.png
│   ├── legal.png
│   └── taxation.png
│
├── testimonials/
│   ├── testimonial-01.png
│   ├── testimonial-02.png
│   └── testimonial-03.png
│
├── vendor/
│   └── vendor.png
│
├── machinery/
│   ├── excavator.png
│   ├── tractor.png
│   └── crane.png
│
└── materials/
    ├── steel.png
    ├── cement.png
    └── plywood.png
```

Create one placeholder per expected image ratio. When replacing the
file, do not change the component dimensions.

------------------------------------------------------------------------

# 11. Asset Registry {#11-asset-registry}

Keep assets centralized so later replacement requires changing only one
file.

## `src/assets/index.ts` {#srcassetsindexts}

``` ts
export const images = {
  hero: {
    placeholder: require('./images/hero/hero-placeholder.png'),
  },
  construction: {
    residential: require('./images/construction/residential.png'),
    commercial: require('./images/construction/commercial.png'),
    landDevelopment: require('./images/construction/land-development.png'),
    industries: require('./images/construction/industries.png'),
  },
  propertyCare: {
    main: require('./images/property-care/property-care.png'),
  },
  pieceWorks: {
    placeholder: require('./images/piece-works/placeholder.png'),
  },
  additionalServices: {
    placeholder: require('./images/additional-services/placeholder.png'),
  },
  testimonials: {
    placeholder: require('./images/testimonials/placeholder.png'),
  },
  vendor: {
    main: require('./images/vendor/vendor.png'),
  },
  machinery: {
    placeholder: require('./images/machinery/placeholder.png'),
  },
  materials: {
    placeholder: require('./images/materials/placeholder.png'),
  },
};
```

------------------------------------------------------------------------

# 12. Sticky Header / Hero {#12-sticky-header--hero}

The top area consists of:

1.  Transparent status-bar area.
2.  Location row.
3.  Search bar.
4.  Hero carousel.
5.  Carousel progress indicator.
6.  Curved bottom edge.

The entire area must remain sticky while the content underneath scrolls.

Recommended structure:

``` tsx
<View style={styles.root}>
  <StickyHero
    location={location}
    searchText={searchText}
    onSearchChange={setSearchText}
    slides={heroSlides}
    activeIndex={activeHeroIndex}
    onIndexChange={setActiveHeroIndex}
  />

  <ScrollView
    contentContainerStyle={styles.content}
    showsVerticalScrollIndicator={false}
  >
    {/* sections */}
  </ScrollView>

  <BottomTabNavigator />
</View>
```

For true sticky behavior inside a single `ScrollView`, use a sticky
header strategy rather than nesting independent vertical `ScrollView`s.

Recommended implementation:

``` tsx
<Animated.ScrollView
  stickyHeaderIndices={[0]}
  showsVerticalScrollIndicator={false}
>
  <StickyHero />
  <HomeContent />
</Animated.ScrollView>
```

The hero itself should be rendered as one sticky block.

------------------------------------------------------------------------

# 13. Status Bar {#13-status-bar}

The screenshot shows a white iOS status bar over the blue hero.

Use:

``` tsx
<StatusBar
  barStyle="light-content"
  backgroundColor="transparent"
  translucent
/>
```

Do not place a second artificial status bar inside the layout.

Use `SafeAreaView` to prevent content from colliding with the device
notch.

------------------------------------------------------------------------

# 14. Location Row {#14-location-row}

Reference appearance:

-   white location pin
-   white text
-   small down-chevron
-   approximately 16 px text
-   left aligned
-   horizontal padding \~28 px
-   vertically centered

Example:

``` tsx
<View style={styles.locationRow}>
  <Icon name="location-pin" size={20} color="#FFFFFF" />
  <Text style={styles.locationText}>{location.displayName}</Text>
  <Icon name="chevron-down" size={15} color="#FFFFFF" />
</View>
```

Location flow:

``` text
Screen mounted
   ↓
Check permission
   ↓
Request permission if required
   ↓
Read GPS coordinates
   ↓
Reverse geocode
   ↓
Extract locality + city
   ↓
Display "Madhapur, Hyderabad"
```

Fallback:

``` text
Location unavailable
→ "Select location"
```

Never block the home screen while GPS is loading.

------------------------------------------------------------------------

# 15. Search Bar {#15-search-bar}

Reference:

-   white rounded rectangle
-   approximately 40 px high
-   left/right margin \~28 px
-   search icon on left
-   light-gray placeholder
-   subtle gray border
-   fully rounded
-   placeholder: `Search properties, services, machineries`

Use:

``` tsx
<TextInput
  value={searchText}
  onChangeText={setSearchText}
  placeholder="Search properties, services, machineries"
  placeholderTextColor="#A0A0A0"
  style={styles.searchInput}
/>
```

Recommended search shape:

``` ts
searchBar: {
  height: 40,
  borderRadius: 20,
  backgroundColor: '#FFFFFF',
  borderWidth: 1,
  borderColor: '#E8E8E8',
  paddingHorizontal: 14,
}
```

------------------------------------------------------------------------

# 16. Hero Carousel {#16-hero-carousel}

Reference slide:

``` text
Guest House layout
Completed Project
[large property image]
[three progress indicators]
```

Only the following values change per slide:

-   title
-   subtitle
-   image
-   active progress indicator

Example data:

``` ts
const heroSlides: HeroSlide[] = [
  {
    id: 'hero-1',
    title: 'Guest House layout',
    subtitle: 'Completed Project',
    image: images.hero.placeholder,
  },
  {
    id: 'hero-2',
    title: 'Modern Villa',
    subtitle: 'Completed Project',
    image: images.hero.placeholder,
  },
  {
    id: 'hero-3',
    title: 'Commercial Project',
    subtitle: 'Completed Project',
    image: images.hero.placeholder,
  },
];
```

Carousel requirements:

-   horizontal paging
-   one slide visible
-   no visible card gap
-   image on right
-   text on left
-   image must use `contain` or a controlled crop depending on the
    supplied replacement asset
-   automatic slide every 4--5 seconds
-   pause automatic movement when the screen loses focus
-   progress indicator updates with slide
-   swipe remains enabled

------------------------------------------------------------------------

# 17. Hero Curved Bottom {#17-hero-curved-bottom}

The hero ends with a strong rounded bottom-left and bottom-right curve.

Preferred implementation:

``` tsx
<View style={styles.heroClip}>
  <LinearGradient ...>
    ...
  </LinearGradient>
</View>
```

Use:

``` ts
heroClip: {
  overflow: 'hidden',
  borderBottomLeftRadius: 24,
  borderBottomRightRadius: 24,
}
```

Do not use an SVG mask unless the native rounded clipping cannot
reproduce the reference.

------------------------------------------------------------------------

# 18. Home Content {#18-home-content}

The exact section order is:

``` text
Construction
Property Care for NRIs
Piece Works
Additional Services
Testimonials
Become a Vendor
Hire Machineries
Material Suppliers
```

Keep this order fixed.

------------------------------------------------------------------------

# 19. Construction {#19-construction}

Reference:

``` text
Construction

┌──────────────┐  ┌──────────────┐
│ Residential  │  │ Commercial   │
│ Build...     │  │ Build...     │
│ Explore →    │  │ Explore →    │
│       image  │  │       image  │
└──────────────┘  └──────────────┘

┌──────────────┐  ┌──────────────┐
│ Land...      │  │ Industries   │
│ Build...     │  │ Build...     │
│ Explore →    │  │ Explore →    │
│       image  │  │       image  │
└──────────────┘  └──────────────┘
```

Use two equal columns.

Card properties:

``` ts
{
  flex: 1,
  minHeight: 104,
  borderRadius: 12,
  borderWidth: 1,
}
```

Residential and Industries use blue action text.

Commercial and Land Development use orange action text.

Backgrounds are extremely light blue/orange tints.

Suggested values:

``` text
Blue card background:   #F8FCFF
Orange card background: #FFF9F3
Blue action:            #2678A9
Orange action:          #FF8A24
```

Use placeholder images now.

------------------------------------------------------------------------

# 20. Property Care for NRIs {#20-property-care-for-nris}

Section title:

``` text
Property Care for NRIs
```

Card must resemble the reference:

-   wide rounded rectangle
-   image occupies the left side
-   text block on right
-   very light blue/white background
-   title wraps into two lines
-   bullet row underneath
-   blue \"Know More →\" button at bottom right
-   image should softly blend into the card instead of looking like a
    separate rectangle

Structure:

``` tsx
<View style={styles.propertyCareCard}>
  <Image
    source={propertyCare.image}
    style={styles.propertyCareImage}
    resizeMode="cover"
  />

  <View style={styles.propertyCareContent}>
    <Text style={styles.propertyCareTitle}>
      Residential & Commercial Property Care
    </Text>

    <View style={styles.bullets}>
      <Text>• Construction</Text>
      <Text>• Maintenance</Text>
    </View>

    <PrimaryButton title="Know More" />
  </View>
</View>
```

------------------------------------------------------------------------

# 21. Piece Works {#21-piece-works}

Section header:

``` text
Piece Works                         View all
```

\"View all\" is orange.

Below it is a horizontal carousel of circular image placeholders.

Reference behavior:

-   circular border
-   image centered
-   white/light background
-   title below circle
-   four or more items
-   horizontal scroll
-   partial next item may remain visible at the right edge

Example:

``` text
Interiors
Plumbing
Electrical
Painting
```

The title is centered below each circle.

------------------------------------------------------------------------

# 22. Additional Services {#22-additional-services}

Header:

``` text
Additional Services                View all
```

Cards are horizontal.

Reference:

-   approximately 196 px wide
-   approximately 160 px tall
-   rounded corners
-   photo background
-   white translucent pill near bottom
-   service name inside pill
-   slight border
-   next card partially visible

Example:

``` text
PMC Services
Legal Services
Taxation
```

Use:

``` tsx
<ImageBackground
  source={item.image}
  imageStyle={styles.additionalImage}
  style={styles.additionalCard}
>
  <View style={styles.servicePill}>
    <Text>{item.title}</Text>
  </View>
</ImageBackground>
```

------------------------------------------------------------------------

# 23. Testimonials {#23-testimonials}

Header:

``` text
Testimonials
```

Cards are horizontal.

Each card:

-   approximately 195 px wide
-   approximately 235 px high
-   rounded corners
-   video thumbnail
-   dark bottom gradient overlay
-   circular play button centered
-   name bottom-left
-   role below name
-   duration bottom-right

Example:

``` text
┌────────────────────┐
│                    │
│       ◯ PLAY       │
│                    │
│ Santosh P           │
│ Manager             │
│               02:35 │
└────────────────────┘
```

Use a `LinearGradient` overlay:

``` tsx
<LinearGradient
  colors={['transparent', 'rgba(0,0,0,0.75)']}
  start={{ x: 0.5, y: 0.25 }}
  end={{ x: 0.5, y: 1 }}
  style={styles.videoOverlay}
/>
```

------------------------------------------------------------------------

# 24. Testimonial Video Dialog {#24-testimonial-video-dialog}

When the user taps a testimonial:

``` text
Tap card
   ↓
Open modal
   ↓
Fade + scale animation
   ↓
Dark backdrop
   ↓
Video player
   ↓
Play automatically
```

Recommended:

``` tsx
<Modal
  visible={Boolean(selectedVideo)}
  transparent
  animationType="fade"
  onRequestClose={closeVideo}
>
  <View style={styles.modalBackdrop}>
    <Animated.View style={styles.videoContainer}>
      <Video
        source={{ uri: selectedVideo.videoUrl }}
        controls
        resizeMode="contain"
        paused={false}
      />

      <Pressable onPress={closeVideo} style={styles.closeButton}>
        <Icon name="close" size={24} color="#FFFFFF" />
      </Pressable>
    </Animated.View>
  </View>
</Modal>
```

Video behavior:

-   autoplay after opening
-   native controls enabled
-   close button
-   Android back closes dialog
-   stop/unload video when modal closes
-   reset playback when another testimonial opens
-   avoid keeping multiple video players mounted

------------------------------------------------------------------------

# 25. Become a Vendor {#25-become-a-vendor}

Section title:

``` text
Become a Vendor
```

Banner should closely match the reference:

-   white/light background
-   wide horizontal card
-   rounded corners
-   text on left
-   machinery/person image on right
-   blue \"Register now →\" button
-   subtle image fade toward text side

Text:

``` text
Grow Your Business With Us

Become a Trusted Vendor

Register now →
```

Use a masked/faded image treatment where practical.

------------------------------------------------------------------------

# 26. Hire Machineries {#26-hire-machineries}

Header:

``` text
Hire Machineries                    View all
```

Horizontal cards.

Reference card:

-   light-gray background
-   rounded rectangle
-   image centered
-   title centered underneath
-   visible gap between cards
-   horizontal scrolling

Dummy data:

``` ts
[
  'Excavators',
  'Tractors',
  'Cranes',
  'Loaders',
  'Rollers',
]
```

Use placeholders now.

------------------------------------------------------------------------

# 27. Material Suppliers {#27-material-suppliers}

Header:

``` text
Material Suppliers                  View all
```

Horizontal cards.

Dummy data:

``` ts
[
  'Iron & Steel Rods',
  'Cement',
  'Plywood',
  'Bricks',
  'Tiles',
]
```

Reference characteristics:

-   light card background
-   rounded border
-   image region on top
-   title below
-   multi-line title where required
-   horizontal scroll
-   partial next card visible

------------------------------------------------------------------------

# 28. Horizontal Carousel Optimization {#28-horizontal-carousel-optimization}

Do not use nested `ScrollView` components for every card list.

Use a reusable `FlatList`:

``` tsx
<FlatList
  data={items}
  horizontal
  showsHorizontalScrollIndicator={false}
  keyExtractor={(item) => item.id}
  renderItem={renderItem}
  contentContainerStyle={styles.carouselContent}
  ItemSeparatorComponent={CarouselSeparator}
/>
```

Recommended optimizations:

``` ts
initialNumToRender={4}
maxToRenderPerBatch={4}
windowSize={5}
removeClippedSubviews
```

Do not over-optimize tiny lists at the expense of layout correctness.

------------------------------------------------------------------------

# 29. Main Vertical Scroll Optimization {#29-main-vertical-scroll-optimization}

Use one main vertical scroll container.

Preferred:

``` tsx
<Animated.ScrollView
  showsVerticalScrollIndicator={false}
  stickyHeaderIndices={[0]}
  contentContainerStyle={styles.pageContent}
>
  <StickyHero />
  <HomeContent />
</Animated.ScrollView>
```

Avoid:

``` text
ScrollView
  ScrollView
    FlatList
      ScrollView
        FlatList
```

The rule is:

``` text
1 vertical scroll
+
independent horizontal FlatLists
```

This prevents gesture conflicts and unnecessary layout work.

------------------------------------------------------------------------

# 30. Bottom Navigation {#30-bottom-navigation}

Create four tabs:

``` text
Home
Properties
Services
Profile
```

Only Home is functional initially.

The remaining three screens show:

``` text
Coming Soon

This section is under development.
```

Each tab must have its own navigation route.

Suggested icons:

``` text
Home       home
Properties building
Services   grid
Profile    user
```

Use the primary blue for the selected tab and a neutral gray for
unselected tabs.

Keep the navigation bar white with a subtle top border.

------------------------------------------------------------------------

# 31. Coming Soon Screen {#31-coming-soon-screen}

Reusable component:

``` tsx
export function ComingSoonScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.center}>
        <Icon name="construction" size={52} color={colors.primaryBlue} />
        <Text style={styles.title}>Coming Soon</Text>
        <Text style={styles.subtitle}>
          This section is under development.
        </Text>
      </View>
    </SafeAreaView>
  );
}
```

Do not duplicate this screen three times.

------------------------------------------------------------------------

# 32. Home Repository {#32-home-repository}

## `home.repository.ts` {#homerepositoryts}

For the first version, keep the repository local.

``` ts
export class HomeRepository {
  async getHomeData() {
    return {
      heroSlides,
      constructionItems,
      propertyCare,
      pieceWorks,
      additionalServices,
      testimonials,
      vendor,
      machinery,
      materials,
    };
  }
}
```

Later the repository can be changed to API calls without modifying
`HomeScreen`.

------------------------------------------------------------------------

# 33. Location Service {#33-location-service}

## `location.service.ts` {#locationservicets}

Responsibilities:

``` text
permission
GPS coordinates
reverse geocoding
formatted location
fallback
```

Example interface:

``` ts
export interface LocationResult {
  latitude: number;
  longitude: number;
  locality?: string;
  city?: string;
  displayName: string;
}

export interface LocationService {
  getCurrentLocation(): Promise<LocationResult>;
}
```

The ViewModel should consume the interface, not the native geolocation
library directly.

------------------------------------------------------------------------

# 34. ViewModel Lifecycle {#34-viewmodel-lifecycle}

Recommended flow:

``` text
HomeScreen mounts
       ↓
useHomeViewModel()
       ↓
loadHomeData()
       ↓
loadLocation()
       ↓
render immediately with placeholders
       ↓
replace location/data when available
```

Important:

**Do not wait for location before rendering the page.**

The home page should appear immediately.

------------------------------------------------------------------------

# 35. Pull-to-Refresh {#35-pull-to-refresh}

Add refresh support:

``` tsx
<RefreshControl
  refreshing={isRefreshing}
  onRefresh={refresh}
/>
```

Refresh should:

``` text
reload home repository
+
refresh location only if needed
```

Do not force GPS permission every refresh.

------------------------------------------------------------------------

# 36. Search Behavior {#36-search-behavior}

Initial version:

``` text
Search input
→ local filtering
→ show matching section/category
```

Later:

``` text
Search input
→ debounce 300 ms
→ API
→ unified search result screen
```

Do not make the current home screen responsible for future search
architecture.

------------------------------------------------------------------------

# 37. Data-Driven Home Screen {#37-data-driven-home-screen}

The HomeScreen should read approximately like this:

``` tsx
return (
  <Screen>
    <StickyHero {...heroProps} />

    <HomeSection>
      <ConstructionSection data={constructionItems} />
      <PropertyCareSection data={propertyCare} />
      <PieceWorksSection data={pieceWorks} />
      <AdditionalServicesSection data={additionalServices} />
      <TestimonialsSection data={testimonials} />
      <VendorSection data={vendor} />
      <MachinerySection data={machinery} />
      <MaterialsSection data={materials} />
    </HomeSection>

    <VideoPlayerModal
      video={selectedVideo}
      onClose={closeVideo}
    />
  </Screen>
);
```

Do not place large arrays or repeated JSX in this file.

------------------------------------------------------------------------

# 38. Spacing System {#38-spacing-system}

Create:

``` ts
export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
};
```

Reference page padding:

``` ts
pageHorizontal: 20
```

Use consistent section spacing:

``` text
Section title → content: 12–16
Section → next section: 24–30
Card → card: 12–16
```

Do not randomly add margins to individual children.

------------------------------------------------------------------------

# 39. Radius System {#39-radius-system}

``` ts
export const radii = {
  small: 8,
  card: 12,
  large: 16,
  hero: 24,
  pill: 999,
  circle: 999,
};
```

------------------------------------------------------------------------

# 40. Shadows {#40-shadows}

The reference uses extremely subtle shadows.

Prefer borders and very light elevation rather than strong shadows.

``` ts
export const shadows = {
  card: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 1,
  },
};
```

Do not make cards look floating unless the reference shows it.

------------------------------------------------------------------------

# 41. Placeholder Images {#41-placeholder-images}

Until real images are added, create neutral placeholders.

Use:

``` tsx
<View style={styles.placeholder}>
  <Icon name="image-outline" size={30} color="#BDBDBD" />
</View>
```

Placeholder must preserve:

-   same width
-   same height
-   same radius
-   same crop behavior
-   same alignment

Therefore replacing the placeholder with the final image must not change
the layout.

------------------------------------------------------------------------

# 42. Exact Section Layout Rules {#42-exact-section-layout-rules}

## Construction {#construction}

``` text
paddingHorizontal: 20
gridGap: 14
cardWidth: (screenWidth - 40 - 14) / 2
```

## Circular Piece Works

``` text
circleDiameter: ~104
itemWidth: ~104
gap: ~18
```

## Additional Services {#additional-services}

``` text
cardWidth: ~196
cardHeight: ~160
gap: ~14
```

## Testimonials {#testimonials}

``` text
cardWidth: ~195
cardHeight: ~235
gap: ~14
```

## Machinery

``` text
cardWidth: ~126
cardHeight: ~108
gap: ~14
```

## Materials

``` text
cardWidth: ~138
cardHeight: ~180
gap: ~14
```

Scale these values proportionally when the device width differs
substantially from 466 px.

------------------------------------------------------------------------

# 43. Accessibility {#43-accessibility}

Every interactive element must have:

``` tsx
accessibilityRole
accessibilityLabel
accessibilityHint
```

Examples:

``` tsx
<Pressable
  accessibilityRole="button"
  accessibilityLabel="Know more about property care"
>
```

Images that are purely decorative:

``` tsx
accessible={false}
```

Do not put important information only inside an image.

------------------------------------------------------------------------

# 44. Performance Rules {#44-performance-rules}

1.  Use `FlatList` for horizontal lists.
2.  Use stable `keyExtractor`.
3.  Keep render functions outside JSX when useful.
4.  Use `React.memo` for repeated cards.
5.  Use `useCallback` for event handlers passed to lists.
6.  Use `useMemo` for derived data only when it actually prevents work.
7.  Do not prematurely memoize every component.
8.  Keep video players mounted only when needed.
9.  Pause hero auto-scroll when screen is unfocused.
10. Use compressed WebP/AVIF assets where platform support and asset
    pipeline permit.
11. Avoid huge PNG photographs.
12. Do not use base64 images.
13. Do not load all video files locally.
14. Use remote URLs for production videos.
15. Keep one vertical scroll owner.

------------------------------------------------------------------------

# 45. Hero Timer Safety {#45-hero-timer-safety}

The hero carousel timer must not continue indefinitely after leaving the
screen.

Use navigation focus:

``` ts
useFocusEffect(
  useCallback(() => {
    startAutoPlay();

    return () => stopAutoPlay();
  }, [])
);
```

This prevents unnecessary timers and battery use.

------------------------------------------------------------------------

# 46. Video Resource Safety {#46-video-resource-safety}

When closing the testimonial modal:

``` text
pause
→ release/unmount player
→ clear selectedVideo
```

When opening another video:

``` text
old video released
→ new video mounted
→ new video starts
```

Never keep several active video instances in a horizontal list.

------------------------------------------------------------------------

# 47. Navigation Architecture {#47-navigation-architecture}

``` text
RootNavigator
│
├── MainTabs
│   ├── Home
│   ├── Properties → Coming Soon
│   ├── Services   → Coming Soon
│   └── Profile    → Coming Soon
│
└── Modal screens
    └── Video Player
```

The video player can remain a modal component rather than a navigation
route if deep linking is not required.

------------------------------------------------------------------------

# 48. Future API Compatibility {#48-future-api-compatibility}

The current local data should use the same models that the future
backend returns.

Future flow:

``` text
HomeScreen
   ↓
HomeViewModel
   ↓
HomeRepository
   ↓
HomeApiService
   ↓
REST API
```

Do not change the View components when API integration begins.

------------------------------------------------------------------------

# 49. Future Backend Categories {#49-future-backend-categories}

Design IDs now because later they will become API identifiers.

Example:

``` ts
{
  id: 'residential',
  title: 'Residential',
}
```

Never rely on array indexes as IDs.

------------------------------------------------------------------------

# 50. Error Handling {#50-error-handling}

Home data failure must not produce a blank screen.

Use:

``` text
API failure
→ keep cached/default data
→ show section-level fallback
→ allow retry
```

Location failure:

``` text
GPS unavailable
→ "Select location"
```

Video failure:

``` text
Video failed
→ show retry button
→ allow close
```

Image failure:

``` text
show placeholder
```

------------------------------------------------------------------------

# 51. UI State Model {#51-ui-state-model}

Keep state explicit:

``` ts
interface HomeUiState {
  isLoading: boolean;
  isRefreshing: boolean;
  location: string;
  searchText: string;
  activeHeroIndex: number;
  selectedVideoId: string | null;
  error: string | null;
}
```

Avoid multiple unrelated boolean states such as:

``` text
isLoading
isLoadingLocation
isLoadingHero
isLoadingServices
isLoadingVideo
```

unless those states genuinely need independent UI behavior.

------------------------------------------------------------------------

# 52. Screen Composition {#52-screen-composition}

The final Home screen should visually follow this sequence:

``` text
┌─────────────────────────────────┐
│ STATUS BAR                      │
│ 📍 Madhapur, Hyderabad      🔔  │
│                                 │
│ [ 🔍 Search...               ]  │
│                                 │
│ Guest House layout              │
│ Completed Project               │
│                    HERO IMAGE   │
│ ━━━ ━ ━                         │
╰─────────────────────────────────╯

Construction
┌──────────┐ ┌──────────┐
│Residential│ │Commercial│
└──────────┘ └──────────┘
┌──────────┐ ┌──────────┐
│Land Dev. │ │Industries│
└──────────┘ └──────────┘

Property Care for NRIs
┌─────────────────────────────────┐
│ IMAGE │ Residential & Commercial│
│       │ Property Care           │
│       │ • Construction          │
│       │ • Maintenance     [→]   │
└─────────────────────────────────┘

Piece Works                 View all
○       ○       ○       ○
Interiors Plumbing Electrical Painting

Additional Services         View all
┌──────────┐ ┌──────────┐ ┌──────
│   PMC    │ │  Legal   │
└──────────┘ └──────────┘

Testimonials
┌──────────┐ ┌──────────┐ ┌──────
│   ▶      │ │   ▶      │
│ Santosh  │ │ Santosh  │
└──────────┘ └──────────┘

Become a Vendor
┌─────────────────────────────────┐
│ Grow Your Business With Us  IMG │
│ Become a Trusted Vendor         │
│ [Register now →]                │
└─────────────────────────────────┘

Hire Machineries             View all
┌───────┐ ┌───────┐ ┌───────┐
│ image │ │ image │ │ image │
└───────┘ └───────┘ └───────┘

Material Suppliers            View all
┌───────┐ ┌───────┐ ┌───────┐
│ image │ │ image │ │ image │
│Steel  │ │Cement │ │Plywood│
└───────┘ └───────┘ └───────┘

─────────────────────────────────
 Home     Properties   Services   Profile
```

------------------------------------------------------------------------

# 53. Implementation Order {#53-implementation-order}

Implement in this exact order.

### Phase 1 --- Foundation {#phase-1--foundation}

-   [ ] Create TypeScript React Native project.
-   [ ] Add navigation.
-   [ ] Add Safe Area support.
-   [ ] Create theme.
-   [ ] Create asset folders.
-   [ ] Add placeholder assets.
-   [ ] Create responsive utilities.

### Phase 2 --- Sticky Hero {#phase-2--sticky-hero}

-   [ ] Status bar.
-   [ ] Location row.
-   [ ] Location permission.
-   [ ] Automatic GPS detection.
-   [ ] Search bar.
-   [ ] Hero carousel.
-   [ ] Hero progress indicators.
-   [ ] Curved bottom edge.
-   [ ] Sticky behavior.

### Phase 3 --- Home Sections {#phase-3--home-sections}

-   [ ] Construction.
-   [ ] Property Care for NRIs.
-   [ ] Piece Works.
-   [ ] Additional Services.
-   [ ] Testimonials.
-   [ ] Vendor.
-   [ ] Machinery.
-   [ ] Materials.

### Phase 4 --- Video {#phase-4--video}

-   [ ] Testimonial modal.
-   [ ] Fade animation.
-   [ ] Scale animation.
-   [ ] Video playback.
-   [ ] Close handling.
-   [ ] Android back handling.

### Phase 5 --- Navigation {#phase-5--navigation}

-   [ ] Home.
-   [ ] Properties Coming Soon.
-   [ ] Services Coming Soon.
-   [ ] Profile Coming Soon.

### Phase 6 --- Polish {#phase-6--polish}

-   [ ] Pixel comparison against reference.
-   [ ] Typography adjustment.
-   [ ] Spacing adjustment.
-   [ ] Card radius adjustment.
-   [ ] Gradient adjustment.
-   [ ] Image crop adjustment.
-   [ ] Scroll behavior.
-   [ ] Performance profiling.

------------------------------------------------------------------------

# 54. Pixel-Perfect Validation Process {#54-pixel-perfect-validation-process}

Do not attempt to make everything perfect by eye only.

Use this process:

``` text
Reference screenshot
       ↓
Build screen at same viewport
       ↓
Take screenshot
       ↓
Overlay reference and implementation at 50% opacity
       ↓
Compare
       ↓
Fix one category at a time
```

Compare in this order:

1.  Hero height.
2.  Header horizontal padding.
3.  Search dimensions.
4.  Hero image placement.
5.  Hero gradient.
6.  Hero curved bottom.
7.  Section vertical spacing.
8.  Card widths/heights.
9.  Typography.
10. Icon sizes.
11. Image crop.
12. Bottom navigation.

Do not simultaneously change ten values. That makes pixel matching
slower.

------------------------------------------------------------------------

# 55. Screenshot-Based Design Tokens {#55-screenshot-based-design-tokens}

The supplied reference visually establishes these primary tokens:

``` text
PAGE_BACKGROUND        #FFFFFF
HERO_BLUE_LEFT         #0082C8
HERO_BLUE_RIGHT        #8BC8E6
PRIMARY_BLUE           #2678A9
ACTION_ORANGE          #FF8A24
TEXT_PRIMARY           #111111
TEXT_SECONDARY         #777777
TEXT_MUTED             #A0A0A0
BORDER                 #E8E8E8
LIGHT_BLUE_SURFACE     #F8FCFF
LIGHT_ORANGE_SURFACE   #FFF9F3
```

Keep these values centralized so one adjustment updates the entire
design.

------------------------------------------------------------------------

# 56. Important React Native Rules {#56-important-react-native-rules}

### Do

``` text
Use TypeScript.
Use functional components.
Use hooks.
Use memoized reusable cards.
Use FlatList horizontally.
Use one vertical scroll owner.
Use native-safe-area handling.
Use centralized theme tokens.
Use local placeholder assets.
Use repository abstraction.
Use ViewModel for screen state.
```

### Do not

``` text
Do not put API calls in JSX.
Do not put GPS logic in JSX.
Do not duplicate card components.
Do not hard-code every card.
Do not nest vertical ScrollViews.
Do not use array indexes as keys.
Do not put video URLs directly in UI components.
Do not use random colors per section.
Do not use heavy shadows.
Do not use arbitrary margins everywhere.
Do not keep inactive videos mounted.
```

------------------------------------------------------------------------

# 57. Final Definition of Done {#57-final-definition-of-done}

The implementation is complete only when:

-   The hero remains sticky while content scrolls.
-   Location automatically resolves when permission is available.
-   Search is positioned exactly below location.
-   Hero carousel changes image, title, subtitle and progress together.
-   Hero has the same blue horizontal gradient family.
-   Hero has the same rounded lower corners.
-   Page background is white.
-   Construction cards match the 2 × 2 reference arrangement.
-   Property Care card matches the image/text/button composition.
-   Piece Works is a horizontal circular carousel.
-   Additional Services is a horizontal image-card carousel.
-   Testimonials are horizontal video cards.
-   Testimonial tap opens an animated video dialog.
-   Vendor banner matches the reference composition.
-   Machinery is a horizontal carousel.
-   Materials is a horizontal carousel.
-   Three non-home bottom tabs show reusable Coming Soon UI.
-   Every image category has a separate folder.
-   Replacing placeholders does not require changing layout code.
-   UI data is separated from UI rendering.
-   Home follows MVVM.
-   Repeated components are reusable and optimized.
-   No unnecessary nested vertical scrolling exists.
-   No hard-coded production business data is mixed into visual
    components.
-   The final screen is validated against the supplied screenshots at
    the same viewport size.

------------------------------------------------------------------------

# 58. Recommended First Implementation Target {#58-recommended-first-implementation-target}

Build the first version with:

``` text
React Native
TypeScript
MVVM
React Navigation
Safe Area
Linear Gradient
Native Geolocation
React Native Video
FlatList
Centralized theme
Local placeholder images
```

Do not introduce Redux, Zustand, MobX, Reanimated, a networking layer,
or a large dependency set until there is a real requirement for them.

For this home page, local ViewModel state + repository abstraction is
sufficient and keeps the architecture clean.

------------------------------------------------------------------------

# 59. Replacement Strategy {#59-replacement-strategy}

When real images arrive later:

``` text
OLD:
assets/images/construction/residential-placeholder.png

NEW:
assets/images/construction/residential.png
```

Only update the asset registry.

Do not modify:

``` text
ConstructionCard.tsx
HomeScreen.tsx
HomeViewModel.ts
theme/*
```

The same rule applies to:

``` text
hero
property-care
piece-works
additional-services
testimonials
vendor
machinery
materials
```

This guarantees that visual replacement remains a content operation
rather than a layout rewrite.

------------------------------------------------------------------------

# 60. Final Architecture {#60-final-architecture}

``` text
                         ┌───────────────────┐
                         │     HomeScreen     │
                         │       View        │
                         └─────────┬─────────┘
                                   │
                                   ▼
                         ┌───────────────────┐
                         │ HomeViewModel     │
                         │ UI State/Actions  │
                         └─────────┬─────────┘
                                   │
                    ┌──────────────┴──────────────┐
                    ▼                             ▼
          ┌──────────────────┐          ┌──────────────────┐
          │ HomeRepository   │          │ LocationService  │
          │ Local/API Data   │          │ GPS/Geocoding    │
          └────────┬─────────┘          └────────┬─────────┘
                   │                             │
                   ▼                             ▼
             API / Local                    Native Location


                         VIEW COMPONENT TREE

                         HomeScreen
                             │
               ┌─────────────┴─────────────┐
               │                           │
          StickyHero                  HomeContent
               │                           │
      ┌────────┼────────┐        ┌─────────┼───────────┐
      │        │        │        │         │           │
 Location  Search   HeroCarousel Construction PropertyCare
                                             │
                 ┌───────────────────────────┼────────────────────────┐
                 │                           │                        │
             PieceWorks              AdditionalServices        Testimonials
                                                                     │
                                                                     ▼
                                                               VideoModal

                 ┌───────────────────────────┬────────────────────────┐
                 │                           │
              Vendor                    Marketplace
                                             │
                                    ┌────────┴────────┐
                                    │                 │
                               Machinery          Materials
```

This structure keeps the UI pixel-focused while making the data,
location, search, video and future API integrations replaceable
independently.
