import { View, Text, StyleSheet, ImageBackground, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';
import { radii } from '../../theme/radii';
import { typography } from '../../theme/typography';
import { TestimonialItem } from '../../features/home/models/home.models';

export function TestimonialCard({ item, onPress }: { item: TestimonialItem, onPress?: () => void }) {
  return (
    <Pressable onPress={onPress}>
      <ImageBackground
        source={item.thumbnail}
        style={styles.card}
        imageStyle={styles.imageStyle}
      >
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.75)']}
          start={{ x: 0.5, y: 0.25 }}
          end={{ x: 0.5, y: 1 }}
          style={styles.videoOverlay}
        >
          <View style={styles.playIconContainer}>
            <Ionicons name="play-circle-outline" size={48} color={colors.white} />
          </View>
          
          <View style={styles.bottomInfo}>
            <View style={styles.userInfo}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.role}>{item.role}</Text>
            </View>
            <Text style={styles.duration}>{item.duration}</Text>
          </View>
        </LinearGradient>
      </ImageBackground>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 195,
    height: 235,
  },
  imageStyle: {
    borderRadius: radii.card,
  },
  videoOverlay: {
    ...StyleSheet.absoluteFill,
    borderRadius: radii.card,
    padding: 12,
    justifyContent: 'flex-end',
  },
  playIconContainer: {
    ...StyleSheet.absoluteFill,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  userInfo: {
    flex: 1,
  },
  name: {
    ...typography.body,
    fontWeight: '500',
    color: colors.white,
  },
  role: {
    ...typography.small,
    color: colors.white,
    opacity: 0.8,
  },
  duration: {
    ...typography.small,
    color: colors.white,
    opacity: 0.8,
  },
});
