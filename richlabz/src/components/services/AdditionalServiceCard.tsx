import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import { colors } from '../../theme/colors';
import { radii } from '../../theme/radii';
import { typography } from '../../theme/typography';
import { AdditionalServiceItem } from '../../features/home/models/home.models';

export function AdditionalServiceCard({ item }: { item: AdditionalServiceItem }) {
  return (
    <ImageBackground
      source={item.image}
      style={styles.card}
      imageStyle={styles.imageStyle}
    >
      <View style={styles.pill}>
        <Text style={styles.title}>{item.title}</Text>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 196,
    height: 160,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 12,
  },
  imageStyle: {
    borderRadius: radii.card,
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  pill: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: radii.pill,
  },
  title: {
    ...typography.body,
    fontSize: 14,
    fontWeight: '500',
    color: colors.textPrimary,
  },
});
