import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import FastImage from 'react-native-fast-image';
import { Product } from '../types';
import { MediumText, RegularText, SmallText } from './MyText';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/feature/cart/cartSlice';
import { COLORS } from '../styles';

interface FeaturedProductsProps {
  products: Product[];
  onProductPress: (product: Product) => void;
  onViewAllPress: () => void;
}

const FeaturedProducts: React.FC<FeaturedProductsProps> = ({ 
  products, 
  onProductPress, 
  onViewAllPress 
}) => {
  const dispatch = useDispatch();

  const handleAddToCart = (product: Product) => {
    // Use type assertion to allow _id access for normalization
    const normalizedProduct = { ...product, id: (product as any)._id || product.id };
    dispatch(addToCart({ product: normalizedProduct, quantity: 1 }));
  };

  const AntDesignIcon: any = AntDesign;

  const renderProduct = ({ item }: { item: Product }) => (
    <TouchableOpacity
      style={styles.productCard}
      onPress={() => onProductPress(item)}
      activeOpacity={0.8}
    >
      <View style={styles.imageContainer}>
        <FastImage source={item.image} style={styles.productImage} resizeMode="cover" />
        <TouchableOpacity
          style={styles.favoriteButton}
          onPress={() => {/* TODO: Toggle favorite */}}
        >
          <AntDesignIcon
            name={item.isFavorite ? 'heart' : 'hearto'}
            size={16}
            color={item.isFavorite ? '#FF6B6B' : '#666'}
          />
        </TouchableOpacity>
        {item.discount && (
          <View style={styles.discountBadge}>
            <SmallText style={styles.discountText}>{item.discount}% OFF</SmallText>
          </View>
        )}
      </View>
      
      <View style={styles.productInfo}>
        <Text style={styles.productName} numberOfLines={2}>
          {item.name}
        </Text>
        <SmallText style={styles.storeName}>{item.storeName}</SmallText>
        
        <View style={styles.ratingContainer}>
          <AntDesignIcon name="star" size={12} color="#FFD700" />
          <SmallText style={styles.rating}>{item.rating} ({item.reviewCount})</SmallText>
        </View>
        
        {/* Price and Add Button Row */}
        <View style={styles.rowBottom}>
          <MediumText style={styles.price}>${item.price.toFixed(2)}</MediumText>
          <TouchableOpacity
            style={styles.addBtn}
            onPress={() => handleAddToCart(item)}
          >
            <AntDesignIcon name="plus" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <MediumText style={styles.title}>Featured Products 🌟</MediumText>
        <TouchableOpacity onPress={onViewAllPress} style={styles.viewAllButton}>
          <RegularText style={styles.viewAllText}>View all</RegularText>
          <AntDesignIcon name="right" size={12} color="#666" />
        </TouchableOpacity>
      </View>
      
      <FlatList
        data={products}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 15,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 15,
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    color: '#333',
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewAllText: {
    color: '#666',
    marginRight: 5,
  },
  listContainer: {
    paddingHorizontal: 15,
  },
  productCard: {
    width: 160,
    backgroundColor: 'white',
    borderRadius: 12,
    marginRight: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  imageContainer: {
    position: 'relative',
    height: 120,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    overflow: 'hidden',
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  favoriteButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 4,
  },
  discountBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: '#FF6B6B',
    borderRadius: 8,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  discountText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
  productInfo: {
    padding: 12,
  },
  productName: {
    fontSize: 14,
    color: '#333',
    marginBottom: 4,
    lineHeight: 18,
  },
  storeName: {
    fontSize: 12,
    color: '#666',
    marginBottom: 6,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  rating: {
    fontSize: 11,
    color: '#666',
    marginLeft: 4,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  price: {
    fontSize: 16,
    color: '#333',
    marginRight: 6,
  },
  originalPrice: {
    fontSize: 12,
    color: '#999',
    textDecorationLine: 'line-through',
  },
  addButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    paddingVertical: 6,
    alignItems: 'center',
  },
  addButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  rowBottom: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  addBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default FeaturedProducts; 