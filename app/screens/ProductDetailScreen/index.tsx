import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParams } from '../../navigation/types';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux';
import { addToCart } from '../../redux/feature/cart/cartSlice';
import { addToWishlist, removeFromWishlist } from '../../redux/feature/wishlistSlice';
import { COLORS } from '../../styles';
import { MediumText, RegularText, SmallText } from '../../components/MyText';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import { getallProducts, getProductById } from '../../api/product';
import { BASE_URL, getImageUrl } from '../../api';
import CartConfirmationModal from '../../components/CartConfirmationModal';

const { width } = Dimensions.get('window');

type ProductDetailRouteProp = RouteProp<RootStackParams, 'ProductDetail'>;

const ProductDetailScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const route = useRoute<ProductDetailRouteProp>();
  const dispatch = useDispatch();
  
  const { productId } = route.params;
  // State for dynamic product
  // Try to find product by id or _id (for API data)
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<any[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showCartModal, setShowCartModal] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const [cartItemName, setCartItemName] = useState('');

  // Get cart state from Redux
  const cartItemCount = useSelector((state: RootState) => state.cart.itemCount);
  const wishlistItems = useSelector((state: RootState) => state.wishlist.items);
  const isInWishlist = product ? wishlistItems.some(item => item.id === product.id) : false;

  React.useEffect(() => {
    setLoading(true);
    setError(null);
    // Fetch product details
    getProductById(productId)
      .then(res => {
        if (res.data) {
          const apiProduct = res.data;
          const normalizedProduct = {
            id: apiProduct._id,
            name: apiProduct.name,
            description: apiProduct.description,
            price: apiProduct.price !== undefined && !isNaN(Number(apiProduct.price)) ? Number(apiProduct.price) : undefined,
            originalPrice: apiProduct.originalPrice !== undefined && !isNaN(Number(apiProduct.originalPrice)) ? Number(apiProduct.originalPrice) : undefined,
            image: apiProduct.avatar ? { uri: `${BASE_URL}/assets/images/${apiProduct.avatar}` } : require('../../../assets/images/FoodItems/img1.png'),
            category: apiProduct.categoryId?.display_name || apiProduct.categoryId?.name || '',
            storeId: apiProduct.storeId?._id || '',
            storeName: apiProduct.storeId?.name || 'Grocery Store',
            rating: apiProduct.rating || 4.5,
            reviewCount: apiProduct.reviewCount || 8,
            isAvailable: apiProduct.is_activated !== undefined ? apiProduct.is_activated : true,
            isFavorite: false,
            unit: apiProduct.unit || '',
            discount: apiProduct.discount || undefined,
            inStock: apiProduct.inStock !== undefined ? apiProduct.inStock : true,
          };
          setProduct(normalizedProduct);
          // Fetch related products
          getallProducts(1, 40).then(allRes => {
            const all = allRes.data || [];
            const related = all.filter((p: any) => {
              const cat = p.categoryId?.display_name || p.categoryId?.name || '';
              return cat === normalizedProduct.category && (p._id !== apiProduct._id);
            }).slice(0, 4);
            setRelatedProducts(related);
          });
        } else {
          setError('Product not found');
        }
      })
      .catch(err => {
        setError(err.message || 'Failed to load product');
      })
      .finally(() => setLoading(false));
  }, [productId]);

  if (loading) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Loading product...</Text>
      </View>
    );
  }

  if (error || !product) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error || 'Product not found'}</Text>
      </View>
    );
  }

  // Handle add to cart
  const handleAddToCart = () => {
    if (!product) return;
    
    // Add product to cart with selected quantity
    dispatch(addToCart({
      product: {
        ...product,
        // Ensure we have all required fields
        storeId: product.storeId || 'default-store',
        storeName: product.storeName || 'Default Store',
      },
      quantity: quantity
    }));
    
    // Update local state for the modal
    setCartItemName(product.name);
    setAddedToCart(true);
    setShowCartModal(true);
  };

  // Handle continue shopping
  const handleContinueShopping = () => {
    setShowCartModal(false);
    // Optionally reset quantity
    // setQuantity(1);
  };

  // Handle view cart
  const handleViewCart = () => {
    setShowCartModal(false);
    navigation.navigate('MainTab', { screen: 'CartTab' });
  };

  // Handle buy now
  const handleBuyNow = () => {
    if (!product) return;
    
    // Add to cart first
    dispatch(addToCart({
      product: {
        ...product,
        storeId: product.storeId || 'default-store',
        storeName: product.storeName || 'Default Store',
      },
      quantity: quantity
    }));
    
    // Then navigate to checkout
    navigation.navigate('Checkout');
  };

  // Handle quantity change
  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity < 1) return;
    setQuantity(newQuantity);
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const renderStarRating = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <AntDesign
          key={i}
          name={i <= rating ? 'star' : 'staro'}
          size={16}
          color={i <= rating ? '#FFD700' : '#E0E0E0'}
        />
      );
    }
    return stars;
  };

  // Workaround for AntDesign and Feather icon JSX linter error
  const AntDesignIcon: any = AntDesign;
  const FeatherIcon: any = Feather;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <AntDesignIcon name="arrowleft" size={24} color={COLORS.black} />
        </TouchableOpacity>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.headerIcon} onPress={() => {
            if (isInWishlist) {
              dispatch(removeFromWishlist(product.id));
            } else {
              dispatch(addToWishlist(product));
            }
          }}>
            <AntDesignIcon 
              name={isInWishlist ? 'heart' : 'hearto'} 
              size={24} 
              color={isInWishlist ? COLORS.primary : COLORS.black} 
            />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.headerIcon}
            onPress={() => {
              const tabNavigation = navigation.getParent();
              if (tabNavigation) {
                tabNavigation.navigate('CartTab');
              }
            }}
          >
            <View style={styles.cartIconContainer}>
              <FeatherIcon name="shopping-cart" size={24} color={COLORS.black} />
              {cartItemCount > 0 && (
                <View style={styles.cartBadge}>
                  <Text style={styles.cartBadgeText}>{cartItemCount}</Text>
                </View>
              )}
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Product Images */}
        <View style={styles.imageSection}>
          <FastImage source={product.image} style={styles.mainImage} resizeMode="cover" />
          {product.discount && (
            <View style={styles.discountBadge}>
              <Text style={styles.discountText}>{product.discount}% OFF</Text>
            </View>
          )}
        </View>

        {/* Product Info */}
        <View style={styles.productInfo}>
          <View style={styles.productHeader}>
            <MediumText style={styles.productName}>{product.name}</MediumText>
            <View style={styles.priceContainer}>
              <MediumText style={styles.price}>${product.price.toFixed(2)}</MediumText>
              {product.originalPrice && (
                <RegularText style={styles.originalPrice}>
                  ${product.originalPrice.toFixed(2)}
                </RegularText>
              )}
            </View>
          </View>
          {/* Add to Wishlist Button */}
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              alignSelf: 'flex-start',
              marginVertical: 10,
              paddingHorizontal: 16,
              paddingVertical: 8,
              backgroundColor: isInWishlist ? COLORS.primary : COLORS.white,
              borderRadius: 20,
              borderWidth: 1,
              borderColor: COLORS.primary,
            }}
            onPress={() => {
              if (isInWishlist) {
                dispatch(removeFromWishlist(product.id));
              } else {
                dispatch(addToWishlist(product));
              }
            }}
          >
            <AntDesignIcon
              name={isInWishlist ? 'heart' : 'hearto'}
              size={18}
              color={isInWishlist ? COLORS.white : COLORS.primary}
              style={{ marginRight: 8 }}
            />
            <RegularText style={{ color: isInWishlist ? COLORS.white : COLORS.primary }}>
              {isInWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
            </RegularText>
          </TouchableOpacity>

          {/* Store Info */}
          <View style={styles.storeInfo}>
            <View style={styles.storeDetails}>
              <RegularText style={styles.storeName}>{product.storeName}</RegularText>
              <View style={styles.ratingContainer}>
                {renderStarRating(product.rating)}
                <RegularText style={styles.ratingText}>
                  {product.rating} ({product.reviewCount} reviews)
                </RegularText>
              </View>
            </View>
          </View>

          {/* Description */}
          <View style={styles.descriptionSection}>
            <MediumText style={styles.sectionTitle}>Description</MediumText>
            <RegularText style={styles.description}>{product.description}</RegularText>
          </View>

          {/* Quantity Selector */}
          <View style={styles.quantitySection}>
            <MediumText style={styles.sectionTitle}>Quantity</MediumText>
            <View style={styles.quantityContainer}>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={() => handleQuantityChange(quantity - 1)}
              >
                <AntDesignIcon name="minus" size={20} color={COLORS.black} />
              </TouchableOpacity>
              
              <Text style={styles.quantityText}>{quantity}</Text>
              
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={() => handleQuantityChange(quantity + 1)}
              >
                <AntDesignIcon name="plus" size={20} color={COLORS.black} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Product Details */}
          <View style={styles.detailsSection}>
            <MediumText style={styles.sectionTitle}>Product Details</MediumText>
            <View style={styles.detailRow}>
              <RegularText style={styles.detailLabel}>Category:</RegularText>
              <RegularText style={styles.detailValue}>{product.category}</RegularText>
            </View>
            <View style={styles.detailRow}>
              <RegularText style={styles.detailLabel}>Unit:</RegularText>
              <RegularText style={styles.detailValue}>{product.unit}</RegularText>
            </View>
            <View style={styles.detailRow}>
              <RegularText style={styles.detailLabel}>Availability:</RegularText>
              <RegularText style={[styles.detailValue, { color: product.inStock ? '#4CAF50' : '#FF6B6B' }]}>
                {product.inStock ? 'In Stock' : 'Out of Stock'}
              </RegularText>
            </View>
          </View>

          {/* Related Products */}
          {/* {relatedProducts.length > 0 && (
            <View style={styles.relatedSection}>
              <MediumText style={styles.sectionTitle}>You might also like</MediumText>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {relatedProducts.map((relatedProduct) => (
                  <TouchableOpacity
                    key={relatedProduct.id}
                    style={styles.relatedProduct}
                    onPress={() => navigation.replace('ProductDetail', { productId: relatedProduct.id })}
                  >
                    <FastImage
                      source={relatedProduct.avatar ? { uri: getImageUrl(relatedProduct.avatar) } : require('../../../assets/images/FoodItems/img1.png')}
                      style={styles.relatedImage}
                    />
                    <View style={styles.relatedInfo}>
                      <RegularText style={styles.relatedName}>
                        {relatedProduct.name}
                      </RegularText>
                      <MediumText style={styles.relatedPrice}>
                        {relatedProduct.price !== undefined && !isNaN(Number(relatedProduct.price))
                          ? `$${Number(relatedProduct.price).toFixed(2)}`
                          : 'N/A'}
                      </MediumText>
                    </View>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          )} */}
        </View>

        {/* Bottom Spacing */}
        {/* <View style={styles.bottomSpacing} /> */}
      </ScrollView>

      {/* Action Buttons */}
      <View style={styles.actionContainer}>
        <TouchableOpacity
          style={styles.addToCartButton}
          onPress={handleAddToCart}
        >
          <View style={styles.addToCartContent}>
            <FeatherIcon name="shopping-cart" size={20} color={COLORS.black} />
            <RegularText style={styles.addToCartText}>Add to Cart</RegularText>
            {cartItemCount > 0 && (
              <View style={styles.buttonCartBadge}>
                <Text style={styles.buttonCartBadgeText}>{cartItemCount}</Text>
              </View>
            )}
          </View>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.buyNowButton}
          onPress={handleBuyNow}
        >
          <RegularText style={styles.buyNowText}>Buy Now</RegularText>
        </TouchableOpacity>
      </View>

      {/* Cart Confirmation Modal */}
      <CartConfirmationModal
        visible={showCartModal && addedToCart}
        onContinueShopping={handleContinueShopping}
        onViewCart={handleViewCart}
        itemCount={quantity}
        itemName={cartItemName}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 18,
    color: COLORS.grey,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  backButton: {
    padding: 5,
  },
  headerRight: {
    flexDirection: 'row',
    gap: 15,
  },
  headerIcon: {
    padding: 5,
  },
  cartIconContainer: {
    position: 'relative',
  },
  cartBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: '#FF6B6B',
    borderRadius: 10,
    minWidth: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 3,
  },
  cartBadgeText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
  scrollView: {
    flex: 1,
  },
  imageSection: {
    position: 'relative',
    backgroundColor: 'white',
  },
  mainImage: {
    width: width,
    height: width * 0.8,
    resizeMode: 'contain',
  },
  discountBadge: {
    position: 'absolute',
    top: 20,
    left: 20,
    backgroundColor: '#FF6B6B',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  discountText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  productInfo: {
    backgroundColor: 'white',
    marginTop: 10,
    padding: 20,
  },
  productHeader: {
    marginBottom: 15,
  },
  productName: {
    fontSize: 24,
    color: COLORS.black,
    marginBottom: 10,
    lineHeight: 30,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  price: {
    fontSize: 24,
    color: COLORS.black,
    fontWeight: '600',
  },
  originalPrice: {
    fontSize: 18,
    color: COLORS.grey,
    textDecorationLine: 'line-through',
  },
  storeInfo: {
    marginBottom: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  storeDetails: {
    gap: 8,
  },
  storeName: {
    fontSize: 16,
    color: COLORS.black,
    fontWeight: '500',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  ratingText: {
    fontSize: 14,
    color: COLORS.grey,
  },
  descriptionSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    color: COLORS.black,
    marginBottom: 10,
    fontWeight: '600',
  },
  description: {
    fontSize: 16,
    color: COLORS.black,
    lineHeight: 24,
  },
  quantitySection: {
    marginBottom: 20,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 8,
    alignSelf: 'flex-start',
  },
  quantityButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  quantityText: {
    fontSize: 18,
    color: COLORS.black,
    fontWeight: '600',
    marginHorizontal: 20,
    minWidth: 30,
    textAlign: 'center',
  },
  detailsSection: {
    marginBottom: 20,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  detailLabel: {
    fontSize: 16,
    color: COLORS.grey,
  },
  detailValue: {
    fontSize: 16,
    color: COLORS.black,
    fontWeight: '500',
  },
  relatedSection: {
    marginBottom: 20,
  },
  relatedProduct: {
    width: 150,
    backgroundColor: 'white',
    borderRadius: 12,
    marginRight: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  relatedImage: {
    width: '100%',
    height: 100,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  relatedInfo: {
    padding: 12,
  },
  relatedName: {
    fontSize: 14,
    color: COLORS.black,
    marginBottom: 6,
    lineHeight: 18,
  },
  relatedPrice: {
    fontSize: 16,
    color: COLORS.black,
    fontWeight: '600',
  },
  bottomSpacing: {
    height: 100,
  },
  actionContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    flexDirection: 'row',
    gap: 15,
  },
  addToCartButton: {
    flex: 1,
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: COLORS.primary,
    borderRadius: 16,
    paddingVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  addToCartText: {
    color: COLORS.black,
    fontSize: 16,
    fontWeight: '600',
  },
  addToCartContent: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  buttonCartBadge: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: '#FF6B6B',
    borderRadius: 10,
    minWidth: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 3,
  },
  buttonCartBadgeText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
  buyNowButton: {
    flex: 1,
    backgroundColor: COLORS.primary,
    borderRadius: 16,
    paddingVertical: 15,
    alignItems: 'center',
  },
  buyNowText: {
    color: COLORS.black,
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ProductDetailScreen;