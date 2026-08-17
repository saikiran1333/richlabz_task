import { View, Text, StyleSheet, Image } from 'react-native';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { radii } from '../../theme/radii';
import { typography } from '../../theme/typography';
import { MaterialItem } from '../../features/home/models/home.models';

export function MaterialCard({ item }: { item: MaterialItem }) {
  return (
    <View style={styles.card}>
      <View style={styles.imageContainer}>
        <Image source={item.image} style={styles.image} resizeMode="cover" />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title} numberOfLines={2}>{item.title}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 138,
    height: 180,
    borderRadius: radii.card,
    backgroundColor: colors.placeholder,
    borderWidth: 1,
    borderColor: colors.borderLight,
    overflow: 'hidden',
  },
  imageContainer: {
    height: 110,
    width: '100%',
    backgroundColor: colors.white,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  textContainer: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    ...typography.body,
    fontSize: 14,
    color: colors.textPrimary,
    textAlign: 'center',
  },
});
