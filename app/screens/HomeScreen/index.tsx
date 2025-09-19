import React, { useState } from 'react';
import { View, TouchableOpacity, ScrollView, StyleSheet, Text, FlatList } from 'react-native';
import FastImage from 'react-native-fast-image';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParams } from '../../navigation/types';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux';
import {
  MediumText,
  RegularText,
  SmallText,
} from '../../components/MyText';
import useKeyboardTabHide from '../../hooks/useKeyboardTabHide';
// Import components
import SearchBar from '../../components/SearchBar';
import SearchSuggestions from '../../components/SearchSuggestions';
import ItemsCategory from './ItemsCategory';
import FoodItemss from './FoodItemss';
// Import data
import {
  banners,
  featuredProducts,
  recentOrders,
  defaultLocation,
} from '../../constants/dummy';
import { addToCart } from '../../redux/feature/cart/cartSlice';
import { addToWishlist, removeFromWishlist } from '../../redux/feature/wishlistSlice';
import { getallCategories } from '../../api/category';
import { productGetAllByCategoryId } from '../../api/product';
import { getallProducts } from '../../api/product';
import { getImageUrl } from '../../api';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import { COLORS } from '../../styles';

const HomeScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const cartItemCount = useSelector((state: RootState) => state.cart.itemCount);
  const wishlistItems = useSelector((state: RootState) => state.wishlist.items);
  const dispatch = useDispatch();
  // State for category filtering
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showCategoryProducts, setShowCategoryProducts] = useState(false);
  const [showSearchSuggestions, setShowSearchSuggestions] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [categories, setCategories] = useState<{ id: string, name: string }[]>([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [categoriesError, setCategoriesError] = useState<string | null>(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('');
  const [categoryProducts, setCategoryProducts] = useState<any[]>([]);
  const [categoryProductsLoading, setCategoryProductsLoading] = useState(false);
  const [categoryProductsError, setCategoryProductsError] = useState<string | null>(null);

  // State for dynamic featured products
  const [featuredProducts, setFeaturedProducts] = useState<any[]>([]);
  const [featuredLoading, setFeaturedLoading] = useState(true);
  const [featuredError, setFeaturedError] = useState<string | null>(null);

  // State for all products
  const [allProducts, setAllProducts] = useState<any[]>([]);
  const [allProductsLoading, setAllProductsLoading] = useState(true);
  const [allProductsError, setAllProductsError] = useState<string | null>(null);


  // console.log('categories', categoryProducts);

  React.useEffect(() => {
    const fetchCategories = async () => {
      setCategoriesLoading(true);
      setCategoriesError(null);
      try {
        const res = await getallCategories(1, 50); // adjust page/page_size as needed
        // Map API response to expected format
        const mapped = (res.data || []).map((res: any) => ({
          id: res._id,
          name: res.display_name,
          img: res.avatar ? { uri: getImageUrl(res.avatar) } : undefined,
        }));
        setCategories(mapped);
        if (mapped.length > 0) {
          setSelectedCategoryId(mapped[0].id);
        }
      } catch (err: any) {
        setCategoriesError(err.message || 'Failed to load categories');
      } finally {
        setCategoriesLoading(false);
      }
    };
    fetchCategories();
  }, []);

  React.useEffect(() => {
    const fetchFeatured = async () => {
      setFeaturedLoading(true);
      setFeaturedError(null);
      try {
        const res = await getallProducts(1, 10); // adjust page/page_size as needed

        // Debug: Log the first product to see available fields
        if (res.data && res.data.length > 0) {
          console.log('HomeScreen - First product from API:', {
            productId: res.data[0]._id,
            productName: res.data[0].name,
            allFields: Object.keys(res.data[0]),
            hasAvatar: !!res.data[0].avatar,
            hasImage: !!res.data[0].image,
            avatar: res.data[0].avatar,
            image: res.data[0].image,
            // Check for other possible image field names
            hasPhoto: !!res.data[0].photo,
            hasImageUrl: !!res.data[0].imageUrl,
            hasImageUrl2: !!res.data[0].image_url,
            photo: res.data[0].photo,
            imageUrl: res.data[0].imageUrl,
            image_url: res.data[0].image_url,
            // Log the entire first product for inspection
            fullProduct: res.data[0]
          });
        }

        const mapped = (res.data || []).map((item: any) => {
          // Debug: Log each product to see what fields are available
          console.log('HomeScreen - Product fields:', {
            productId: item._id,
            productName: item.name,
            allFields: Object.keys(item),
            hasAvatar: !!item.avatar,
            hasImage: !!item.image,
            hasPhoto: !!item.photo,
            hasImageUrl: !!item.imageUrl,
            avatar: item.avatar,
            image: item.image,
            photo: item.photo,
            imageUrl: item.imageUrl
          });

          return {
            ...item,
            id: item._id || item.id,
            price: item.price !== undefined && !isNaN(Number(item.price)) ? Number(item.price) : undefined,
            originalPrice: item.originalPrice !== undefined && !isNaN(Number(item.originalPrice)) ? Number(item.originalPrice) : undefined,
            storeId: item.restaurantId?._id,
            storeName: item.restaurantId?.display_name || item.restaurantId?.name || 'Unknown Store',
          };
        });
        setFeaturedProducts(mapped);
      } catch (err: any) {
        setFeaturedError(err.message || 'Failed to load featured products');
      } finally {
        setFeaturedLoading(false);
      }
    };
    fetchFeatured();
  }, []);

  React.useEffect(() => {
    const fetchAllProducts = async () => {
      setAllProductsLoading(true);
      setAllProductsError(null);
      try {
        const res = await getallProducts(1, 100); // adjust page/page_size as needed
        const mapped = (res.data || []).map((item: any) => ({
          ...item,
          id: item._id || item.id,
          price: item.price !== undefined && !isNaN(Number(item.price)) ? Number(item.price) : undefined,
          originalPrice: item.originalPrice !== undefined && !isNaN(Number(item.originalPrice)) ? Number(item.originalPrice) : undefined,
          storeId: item.restaurantId?._id,
          storeName: item.restaurantId?.display_name || item.restaurantId?.name || 'Unknown Store',
        }));
        setAllProducts(mapped);
      } catch (err: any) {
        setAllProductsError(err.message || 'Failed to load products');
      } finally {
        setAllProductsLoading(false);
      }
    };
    fetchAllProducts();
  }, []);

  useKeyboardTabHide();

  // Filter products based on selected category
  const filteredProducts = selectedCategory === 'All'
    ? allProducts
    : allProducts.filter(product => product.category === selectedCategory);

  const handleCategoryPress = async (category: { id: string, name: string }) => {
    setSelectedCategoryId(category.id);
    setShowCategoryProducts(true);
    // setCategoryProducts([]);
    setCategoryProductsLoading(true);
    setCategoryProductsError(null);
    try {
      const res = await productGetAllByCategoryId(category.id, 1, 50); // adjust page/page_size as needed
      // Normalize price fields to numbers
      const normalizedProducts = (res.data || []).map((item: any) => ({
        ...item,
        id: item._id || item.id,
        price: item.price !== undefined && !isNaN(Number(item.price)) ? Number(item.price) : undefined,
        originalPrice: item.originalPrice !== undefined && !isNaN(Number(item.originalPrice)) ? Number(item.originalPrice) : undefined,
        storeId: item.restaurantId?._id,
        storeName: item.restaurantId?.display_name || item.restaurantId?.name || 'Unknown Store',
      }));
      setCategoryProducts(normalizedProducts);
    } catch (err: any) {
      setCategoryProductsError(err.message || 'Failed to load products');
    } finally {
      setCategoryProductsLoading(false);
    }
  };

  const handleBannerPress = (banner: any) => {
    // Handle banner press based on actionType
    console.log('Banner pressed:', banner);
  };

  const handleProductPress = (product: any) => {
    navigation.navigate('ProductDetail', { productId: product._id || product.id });
  };

  const handleAddToCart = (product: any) => {
    console.log('HomeScreen - Adding product to cart:', {
      productId: product._id || product.id,
      productName: product.name,
      hasAvatar: !!product.avatar,
      hasImage: !!product.image,
      avatar: product.avatar,
      image: product.image,
      allFields: Object.keys(product)
    });

    // Always set storeId and storeName from restaurantId if present
    const normalizedProduct = {
      ...product,
      id: product._id || product.id,
      storeId: product.restaurantId?._id || product.storeId,
      storeName: product.restaurantId?.display_name || product.restaurantId?.name || product.storeName || 'Unknown Store',
    };

    console.log('HomeScreen - Normalized product for cart:', {
      productId: normalizedProduct.id,
      productName: normalizedProduct.name,
      hasAvatar: !!normalizedProduct.avatar,
      hasImage: !!normalizedProduct.image,
      avatar: normalizedProduct.avatar,
      image: normalizedProduct.image
    });

    dispatch(addToCart({ product: normalizedProduct, quantity: 1 }));
  };

  const handleViewAllProducts = () => {
    navigation.navigate('AllFeaturedProducts');
  };

  const handleOrderPress = (order: any) => {
    // Navigate to order details
    console.log('Order pressed:', order);
  };

  const handleReorderPress = (order: any) => {
    // Reorder functionality
    console.log('Reorder pressed:', order);
  };

  const handleLocationPress = () => {
    navigation.navigate('SetLocation');
  };

  const handleMapPress = () => {
    // Navigate to map screen
    console.log('Map pressed');
  };

  const handleScreenPress = () => {
    setShowSearchSuggestions(false);
  };

  const renderProductItem = ({ item }: { item: any }) => {
    const isInWishlist = wishlistItems.some((w: any) => w._id === item._id);
    return (
      <TouchableOpacity
        style={styles.categoryProductCard}
        onPress={() => handleProductPress(item)}
        activeOpacity={0.8}
      >
        <View style={styles.productImageContainer}>
          <FastImage
            source={item.avatar ? { uri: getImageUrl(item.avatar) } : item.image ? item.image : require('../../../assets/images/FoodItems/img1.png')}
            style={styles.categoryProductImage}
            resizeMode="cover"
          />
          <TouchableOpacity
            style={styles.favoriteButton}
            onPress={(e) => {
              e.stopPropagation();
              if (isInWishlist) {
                dispatch(removeFromWishlist(item._id));
              } else {
                dispatch(addToWishlist(item));
              }
            }}
          >
            <AntDesignIcon name={isInWishlist ? 'heart' : 'hearto'} size={18} color={isInWishlist ? COLORS.primary : '#ccc'} />
          </TouchableOpacity>
          {item.discount && (
            <View style={styles.discountBadge}>
              <SmallText style={styles.discountText}>{item.discount}% OFF</SmallText>
            </View>
          )}
        </View>

        <View style={styles.categoryProductInfo}>
          <RegularText style={styles.categoryProductName} numberOfLines={2}>
            {item.name}
          </RegularText>
          {/* Store/Restaurant Info */}
          {item.storeName ? (
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 6 }}>
              {/*
              {item.storeAvatar && (
                <Image
                  source={{ uri: item.storeAvatar }}
                  style={{ width: 18, height: 18, borderRadius: 9, marginRight: 6 }}
                />
              )}
              */}
              <RegularText style={styles.categoryStoreName}>{item.storeName}</RegularText>
            </View>
          ) : null}

          <View style={styles.categoryRatingContainer}>
            <AntDesignIcon name="star" size={14} color="#FFD700" style={styles.starIcon} />
            <RegularText style={styles.categoryRating}>
              {item.rating} ({item.reviewCount})
            </RegularText>
          </View>

          {/* Price and Add Button Row */}
          <View style={styles.rowBottom}>
            <MediumText style={styles.categoryPrice}>
              {item.price !== undefined && !isNaN(Number(item.price))
                ? `$${Number(item.price).toFixed(2)}`
                : 'N/A'}
            </MediumText>
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
  };

  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={1}
      onPress={handleScreenPress}
    >


      {/* Header with Location and Icons */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.locationContainer}
          onPress={handleLocationPress}
        >
          <View style={styles.locationInfo}>
            <RegularText style={styles.locationText}>
              {defaultLocation.address}
            </RegularText>
            <MediumText style={styles.locationCity}>
              {defaultLocation.city}, {defaultLocation.state}
            </MediumText>
          </View>
          <RegularText style={styles.locationIcon}>
            <AntDesignIcon name="caretdown" size={14} color={  COLORS.black} />
          </RegularText>
        </TouchableOpacity>

        <View style={styles.headerIcons}>
          {/* Bell Icon with Badge */}
          <TouchableOpacity 
            style={styles.iconContainer}
            onPress={() => {
              const tabNavigation = navigation.getParent();
              if (tabNavigation) {
                tabNavigation.navigate('NotificationTab');
              }
            }}
          >
            <MaterialIcons name="notifications-none" size={24} style={styles.iconText} />
            {/* <View style={styles.badge}>
              <SmallText style={styles.badgeText}>3</SmallText>
            </View> */}
          </TouchableOpacity>

          {/* Cart Icon with Badge */}
          <TouchableOpacity
            style={styles.iconContainer}
            onPress={() => {
              // Navigate to cart tab
              const tabNavigation = navigation.getParent();
              if (tabNavigation) {
                tabNavigation.navigate('CartTab');
              }
            }}
          >
            <AntDesignIcon name="shoppingcart" size={24} style={styles.iconText} />
            {cartItemCount > 0 && (
              <View style={styles.badge}>
                <SmallText style={styles.badgeText}>{cartItemCount}</SmallText>
              </View>
            )}
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Search Bar */}
        <SearchBar
          onPress={() => navigation.navigate('Search')}
          onSearch={(query) => {
            setSearchQuery(query);
            if (query.trim()) {
              navigation.navigate('Search');
            }
          }}

          
          onChangeText={(text) => {
            setSearchQuery(text);
            setShowSearchSuggestions(text.length > 0);
          }}
          value={searchQuery}
        />

        {/* Search Suggestions */}
        {showSearchSuggestions && searchQuery.length > 0 && (
          <SearchSuggestions
            onSuggestionPress={(suggestion) => {
              setSearchQuery(suggestion);
              navigation.navigate('Search');
            }}
            popularSearches={[
              'Bananas',
              'Milk',
              'Bread',
              'Eggs',
              'Apples',
              'Chicken',
              'Cheese',
              'Tomatoes',
            ]}
          />
        )}

        {/* Product Categories */}
        {categoriesLoading ? (
          <RegularText style={styles.loadingText}>Loading categories...</RegularText>
        ) : categoriesError ? (
          <RegularText style={styles.errorText}>{categoriesError}</RegularText>
        ) : (
          <ItemsCategory
            categories={categories}
            onCategoryPress={handleCategoryPress}
            selectedCategoryId={selectedCategoryId}
          />
        )}

        {/* Category Products Display */}
        {showCategoryProducts && (
          <View style={styles.categoryProductsSection}>
            <View style={styles.categoryHeader}>
              <MediumText style={styles.categoryTitle}>
                {categories.find(c => c.id === selectedCategoryId)?.name || ''} ({categoryProducts.length} items)
              </MediumText>
              <TouchableOpacity
                onPress={() => setShowCategoryProducts(false)}
                style={styles.closeButton}
              >
                <RegularText style={styles.closeIcon}>✕</RegularText>
              </TouchableOpacity>
            </View>
            {categoryProductsLoading ? (
              <RegularText style={styles.loadingText}>Loading products...</RegularText>
            ) : categoryProductsError ? (
              <RegularText style={styles.errorText}>{categoryProductsError}</RegularText>
            ) : (
              <FlatList
                data={categoryProducts}
                renderItem={renderProductItem}
                keyExtractor={(item) => item.id}
                numColumns={2}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.categoryProductsList}
                columnWrapperStyle={styles.productRow}
              />
            )}
          </View>
        )}

        {/* Food Categories Grid */}
        {!showCategoryProducts && (
          categoriesLoading ? (
            <RegularText style={styles.loadingText}>Loading categories...</RegularText>
          ) : categoriesError ? (
            <RegularText style={styles.errorText}>{categoriesError}</RegularText>
          ) : (
            <FoodItemss categories={categories} />
          )
        )}

        {/* Banners Section */}
        {!showCategoryProducts && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <MediumText style={styles.sectionTitle}>
                <MaterialIcons name="celebration" size={18} /> Special Offers
              </MediumText>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {banners.map((banner) => (
                <TouchableOpacity
                  key={banner.id}
                  style={styles.bannerCard}
                  onPress={() => handleBannerPress(banner)}
                >
                  <FastImage source={banner.image} style={styles.bannerImage} />
                  <View style={styles.bannerOverlay}>
                    <MediumText style={styles.bannerTitle}>{banner.title}</MediumText>
                    <RegularText style={styles.bannerDescription}>{banner.description}</RegularText>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}

        {/* Featured Products */}
        {!showCategoryProducts && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <MediumText style={styles.sectionTitle}>
                Featured Products <MaterialIcons name="auto-awesome" size={18} />
              </MediumText>
              <TouchableOpacity onPress={handleViewAllProducts}>
                <RegularText style={styles.viewAllText}>View all</RegularText>
              </TouchableOpacity>
            </View>
            {featuredLoading ? (
              <RegularText style={styles.loadingText}>Loading featured products...</RegularText>
            ) : featuredError ? (
              <RegularText style={styles.errorText}>{featuredError}</RegularText>
            ) : (
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {featuredProducts.slice(0, 6).map((product) => (
                  <TouchableOpacity
                    key={product._id || product.id}
                    style={styles.productCard}
                    onPress={() => handleProductPress(product)}
                  >
                    <FastImage
                      source={product.avatar ? { uri: getImageUrl(product.avatar) } : product.image ? product.image : require('../../../assets/images/FoodItems/img1.png')}
                      style={styles.productImage}
                    />
                    <View style={styles.productInfo}>
                      <RegularText style={styles.productName} numberOfLines={2}>
                        {product.name}
                      </RegularText>
                      {/* Store/Restaurant Info */}
                      {product.storeName ? (
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 6 }}>
                          {/*
                          {product.storeAvatar && (
                            <Image
                              source={{ uri: product.storeAvatar }}
                              style={{ width: 16, height: 16, borderRadius: 8, marginRight: 6 }}
                            />
                          )}
                          */}
                          <RegularText style={styles.storeName}>{product.storeName}</RegularText>
                        </View>
                      ) : null}
                      <View style={styles.rowBottom}>
                        <MediumText style={styles.productPrice}>
                          {product.price !== undefined && !isNaN(Number(product.price))
                            ? `$${Number(product.price).toFixed(2)}`
                            : 'N/A'}
                        </MediumText>
                        <TouchableOpacity
                          style={styles.addBtn}
                          onPress={() => handleAddToCart(product)}
                        >
                          <AntDesignIcon name="plus" size={20} color="#fff" />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            )}
          </View>
        )}

        {/* Recent Orders */}
        {!showCategoryProducts && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <MediumText style={styles.sectionTitle}>
                <MaterialIcons name="history" size={18} /> Recent Orders
              </MediumText>
              <TouchableOpacity onPress={() => navigation.navigate('RecentOrders')}>
                <RegularText style={styles.viewAllText}>View all</RegularText>
              </TouchableOpacity>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {recentOrders.map((order) => (
                <TouchableOpacity
                  key={order.id}
                  style={styles.orderCard}
                  onPress={() => handleOrderPress(order)}
                >
                  <View style={styles.orderHeader}>
                    <FastImage source={order.storeLogo} style={styles.storeLogo} />
                    <View style={styles.orderInfo}>
                      <RegularText style={styles.orderStoreName}>{order.storeName}</RegularText>
                      <RegularText style={styles.orderNumber}>{order.orderNumber}</RegularText>
                    </View>
                  </View>
                  <View style={styles.orderItems}>
                    {order.items.slice(0, 2).map((item, index) => (
                      <RegularText key={index} style={styles.orderItem}>
                        {item.quantity}x {item.productName}
                      </RegularText>
                    ))}
                  </View>
                  <View style={styles.orderFooter}>
                    <MediumText style={styles.orderTotal}>
                      ${order.totalAmount.toFixed(2)}
                    </MediumText>
                    <TouchableOpacity
                      style={styles.reorderButton}
                      onPress={() => handleReorderPress(order)}
                    >
                      <RegularText style={styles.reorderText}>Reorder</RegularText>
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}

        {/* Map Section */}
        {!showCategoryProducts && (
          <View style={styles.mapSection}>
            <View style={styles.mapHeader}>
              <MediumText style={styles.sectionTitle}>
                <EvilIcons name="location" size={22} style={{ marginBottom: 5 }} color="black" />
                <MediumText style={styles.mapTitle}>Nearby Stores</MediumText>
              </MediumText>
            </View>
            <TouchableOpacity
              style={styles.mapContainer}
              onPress={handleMapPress}
              activeOpacity={0.8}
            >
              <FastImage
                source={{
                  uri: 'https://imgs.search.brave.com/gruGs3ALxEN9xkSwLZPbUaE01H-P6ppVKt8Z23r06HI/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvZW4vdGh1bWIv/NS81Ni9Hb29nbGVf/bWFwc19zY3JlZW5z/aG90LnBuZy8zMzBw/eC1Hb29nbGVfbWFw/c19zY3JlZW5zaG90/LnBuZw'
                }}
                style={styles.mapImage}
                resizeMode="cover"
              />
              <View style={styles.mapOverlay}>
                <RegularText style={styles.mapButtonText}>View Map</RegularText>
              </View>
            </TouchableOpacity>
          </View>
        )}

        {/* Bottom Spacing */}
        <View style={styles.bottomSpacing} ></View>
      </ScrollView>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  locationInfo: {
    flex: 1,
  },
  locationText: {
    color: 'black',
    fontSize: 14,
  },
  locationCity: {
    color: '#666',
    fontSize: 12,
  },
  locationIcon: {
    marginLeft: 8,
    fontSize: 12,
 
    // backgroundColor:'red'
  },
  headerIcons: {
    flexDirection: 'row',
    gap: 20,
  },
  iconContainer: {
    position: 'relative',
    padding: 2,
  },
  iconText: {
    fontSize: 20,
    color:COLORS.black
  },
  badge: {
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
  badgeText: {
    color: 'white',
    fontSize: 10,
  },
  categoryProductsSection: {
    marginVertical: 15,
  },
  categoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 15,
    marginBottom: 15,
  },
  categoryTitle: {
    fontSize: 18,
    color: '#333',
  },
  closeButton: {
    padding: 5,
  },
  closeIcon: {
    fontSize: 20,
    color: '#666',
  },
  categoryProductsList: {
    paddingHorizontal: 15,
  },
  productRow: {
    justifyContent: 'space-between',
  },
  categoryProductCard: {
    width: '48%',
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  productImageContainer: {
    position: 'relative',
    height: 120,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    overflow: 'hidden',
  },
  categoryProductImage: {
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
  favoriteIcon: {
    fontSize: 12,
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
  },
  categoryProductInfo: {
    padding: 12,
  },
  categoryProductName: {
    fontSize: 14,
    color: '#333',
    marginBottom: 4,
    lineHeight: 18,
  },
  categoryStoreName: {
    fontSize: 12,
    color: '#666',
    marginBottom: 6,
  },
  categoryRatingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  starIcon: {
    fontSize: 10,
    marginRight: 4,
  },
  categoryRating: {
    fontSize: 11,
    color: '#666',
  },
  categoryPriceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryPrice: {
    fontSize: 16,
    color: '#333',
    marginRight: 6,
  },
  categoryOriginalPrice: {
    fontSize: 12,
    color: '#999',
    textDecorationLine: 'line-through',
  },
  categoryAddButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    paddingVertical: 6,
    alignItems: 'center',
  },
  categoryAddButtonText: {
    color: 'white',
    fontSize: 12,
  },
  section: {
    marginVertical: 15,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 15,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    color: '#333',
  },
  viewAllText: {
    color: '#666',
    fontSize: 14,
  },
  bannerCard: {
    width: 300,
    height: 150,
    marginLeft: 15,
    borderRadius: 12,
    overflow: 'hidden',
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
  bannerOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.6)',
    padding: 15,
  },
  bannerTitle: {
    color: 'white',
    fontSize: 16,
    marginBottom: 4,
  },
  bannerDescription: {
    color: 'white',
    fontSize: 12,
    opacity: 0.9,
  },
  productCard: {
    width: 160,
    backgroundColor: 'white',
    borderRadius: 12,
    marginLeft: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  productImage: {
    width: '100%',
    height: 120,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  productInfo: {
    padding: 12,
  },
  productName: {
    fontSize: 14,
    color: '#333',
    marginBottom: 4,
  },
  storeName: {
    fontSize: 12,
    color: '#666',
    marginBottom: 6,
  },
  productPrice: {
    fontSize: 16,
    color: '#333',
  },
  orderCard: {
    width: 280,
    backgroundColor: 'white',
    borderRadius: 12,
    marginLeft: 15,
    padding: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  orderHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  storeLogo: {
    width: 40,
    height: 40,
    borderRadius: 8,
    marginRight: 10,
  },
  orderInfo: {
    flex: 1,
  },
  orderStoreName: {
    fontSize: 14,
    color: '#333',
    marginBottom: 2,
  },
  orderNumber: {
    fontSize: 12,
    color: '#666',
  },
  orderItems: {
    marginBottom: 12,
  },
  orderItem: {
    fontSize: 12,
    color: '#666',
    marginBottom: 2,
  },
  orderFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  orderTotal: {
    fontSize: 16,
    color: '#333',
  },
  reorderButton: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  reorderText: {
    color: 'white',
    fontSize: 12,
  },
  mapSection: {
    marginHorizontal: 15,
    marginTop: 10,
    marginBottom: 10,
  },
  mapHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  mapIcon: {
    fontSize: 18,
    marginRight: 8,
  },
  mapTitle: {
    fontSize: 16,
    color: '#333',
  },
  mapContainer: {
    position: 'relative',
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginTop: 10,
  },
  mapImage: {
    width: '100%',
    height: 120,
  },
  mapOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapButtonText: {
    backgroundColor: 'white',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    fontSize: 14,
    color: '#333',
  },
  bottomSpacing: {
    height: 100,
  },
  rowBottom: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 8 },
  addBtn: { width: 32, height: 32, borderRadius: 16, backgroundColor: COLORS.primary, alignItems: 'center', justifyContent: 'center' },
  loadingText: {
    textAlign: 'center',
    paddingVertical: 20,
    color: '#666',
  },
  errorText: {
    textAlign: 'center',
    paddingVertical: 20,
    color: 'red',
  },
});

export default HomeScreen;
