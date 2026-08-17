import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable, Modal, TouchableOpacity, useWindowDimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { colors } from '../../theme/colors';
import { radii } from '../../theme/radii';
import { typography } from '../../theme/typography';
import { TestimonialItem } from '../../features/home/models/home.models';
import { useVideoPlayer, VideoView, VideoThumbnail } from 'expo-video';

const CARD_ASPECT_RATIO = 0.827;

export function TestimonialCard({ item, onPress }: { item: TestimonialItem, onPress?: () => void }) {
  // Read per-render so the card resizes on rotation, split-screen and foldables.
  const { width: screenWidth, height: screenHeight } = useWindowDimensions();

  const cardWidth = Math.min(230, screenWidth * 0.58);
  const cardHeight = Math.round(cardWidth / CARD_ASPECT_RATIO);

  const [modalVisible, setModalVisible] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [thumbnail, setThumbnail] = useState<VideoThumbnail | null>(null);

  const player = useVideoPlayer(item.videoUrl, (player) => {
    player.loop = true;
  });

  // expo-video has no poster prop, so pull a real frame out of the video once it
  // is ready and use that as the card thumbnail.
  useEffect(() => {
    let cancelled = false;

    const grabFrame = () => {
      player.generateThumbnailsAsync(1, { maxWidth: 600 })
        .then(([frame]) => {
          if (!cancelled && frame) setThumbnail(frame);
        })
        .catch(() => {
          // Unsupported (web) or undecodable source - fall back to item.thumbnail.
        });
    };

    if (player.status === 'readyToPlay') grabFrame();

    const sub = player.addListener('statusChange', ({ status }) => {
      if (status === 'readyToPlay') grabFrame();
    });

    return () => {
      cancelled = true;
      sub.remove();
    };
  }, [player]);

  const handlePress = () => {
    if (onPress) {
      onPress();
    } else if (item.videoUrl) {
      setModalVisible(true);
      player.play();
      setIsPlaying(true);
    }
  };

  const togglePlayPause = () => {
    if (isPlaying) {
      player.pause();
      setIsPlaying(false);
    } else {
      player.play();
      setIsPlaying(true);
    }
  };

  const handleClose = () => {
    setModalVisible(false);
    player.pause();
    setIsPlaying(false);
  };

  return (
    <>
      <Pressable onPress={handlePress} style={[styles.card, { width: cardWidth, height: cardHeight }]}>
        <Image
          source={thumbnail ?? item.thumbnail}
          style={StyleSheet.absoluteFill}
          contentFit="cover"
          transition={200}
        />

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
      </Pressable>

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={handleClose}
      >
        <View style={styles.modalOverlay}>
          <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
            <Ionicons name="close" size={32} color={colors.white} />
          </TouchableOpacity>

          <View style={[styles.videoContainer, { width: screenWidth * 0.92, height: screenHeight * 0.7 }]}>
            <Image
              source={thumbnail ?? item.thumbnail}
              style={StyleSheet.absoluteFill}
              contentFit="contain"
            />
            <VideoView
              player={player}
              style={styles.fullVideo}
              nativeControls={false}
              contentFit="contain"
            />
            <Pressable
              style={styles.playPauseOverlay}
              onPress={togglePlayPause}
            >
              {!isPlaying && (
                <Ionicons name="play-circle" size={80} color="white" style={{ opacity: 0.8 }} />
              )}
            </Pressable>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: radii.card,
    overflow: 'hidden',
    backgroundColor: colors.borderLight,
  },
  videoOverlay: {
    ...StyleSheet.absoluteFill,
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    zIndex: 10,
    padding: 10,
  },
  videoContainer: {
    borderRadius: radii.card,
    overflow: 'hidden',
    backgroundColor: 'black',
  },
  fullVideo: {
    flex: 1,
  },
  playPauseOverlay: {
    ...StyleSheet.absoluteFill,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  }
});
