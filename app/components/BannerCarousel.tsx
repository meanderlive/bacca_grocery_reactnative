import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import FastImage from 'react-native-fast-image';
import { Banner } from '../types';
import { MediumText, RegularText } from './MyText';

interface BannerCarouselProps {
  banners: Banner[];
  onBannerPress: (banner: Banner) => void;
}

const { width } = Dimensions.get('window');

const BannerCarousel: React.FC<BannerCarouselProps> = ({ banners, onBannerPress }) => {
  return (
    <View style={styles.container}>
      {banners.map((banner) => (
        <TouchableOpacity
          key={banner.id}
          style={styles.bannerContainer}
          onPress={() => onBannerPress(banner)}
          activeOpacity={0.8}
        >
          <FastImage source={banner.image} style={styles.bannerImage} resizeMode="cover" />
          <View style={styles.overlay}>
            <View style={styles.textContainer}>
              <MediumText style={styles.title}>{banner.title}</MediumText>
              <RegularText style={styles.description}>{banner.description}</RegularText>
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 15,
    marginVertical: 10,
  },
  bannerContainer: {
    width: width - 30,
    height: 150,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  bannerImage: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'flex-end',
  },
  textContainer: {
    padding: 15,
  },
  title: {
    color: 'white',
    fontSize: 18,
    marginBottom: 5,
  },
  description: {
    color: 'white',
    fontSize: 14,
    opacity: 0.9,
  },
});

export default BannerCarousel; 