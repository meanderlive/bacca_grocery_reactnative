import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, useColorScheme, TextInput } from 'react-native';
import FastImage from 'react-native-fast-image';
import { useNavigation, CommonActions } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParams, TabNavigatorParams } from '../../navigation/types';
import { CompositeNavigationProp } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { getallProducts } from '../../api/product';
import { getImageUrl } from '../../api';
import Feather from 'react-native-vector-icons/Feather';
import { COLORS } from '../../styles';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux';
import { addToCart } from '../../redux/feature/cart/cartSlice';
import { useLayoutEffect } from 'react';
const FeatherIcon: any = Feather;

const CARD_SIZE = 183;
const CARD_MARGIN = 8;
const CARD_HEIGHT = 270;

const pastelColors = [
  '#FDF6EC', // light orange
  '#F0F7FF', // light blue
  '#F6F6FB', // light purple
  '#FDF7F6', // light pink
  '#F6FDF8', // light green
  '#FFF9E6', // light yellow
  '#F6F6F6', // light gray
];

const AllFeaturedProductsScreen = () => {
  type NavProps = CompositeNavigationProp<
    NativeStackNavigationProp<RootStackParams>,
    BottomTabNavigationProp<TabNavigatorParams>
  >;
  const navigation = useNavigation<NavProps>();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const cartItemCount = useSelector((state: RootState) => state.cart.itemCount);
  const dispatch = useDispatch();

  const handleAddToCart = (product: any) => {
    const normalizedProduct = { ...product, id: product._id || product.id };
    dispatch(addToCart({ product: normalizedProduct, quantity: 1 }));
  };

  const [products, setProducts] = useState<any[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await getallProducts(1, 40);
        const normalizedProducts = (res.data || []).map((item: any) => ({
          ...item,
          id: item._id || item.id,
          price: item.price !== undefined && !isNaN(Number(item.price)) ? Number(item.price) : undefined,
          originalPrice: item.originalPrice !== undefined && !isNaN(Number(item.originalPrice)) ? Number(item.originalPrice) : undefined,
          storeName: item.restaurantId?.display_name || item.restaurantId?.name || 'Unknown Store',
        }));
        setProducts(normalizedProducts);
        setFilteredProducts(normalizedProducts);
      } catch (err: any) {
        setError('Failed to load products.');
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    if (!search) {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(
        products.filter((p) =>
          p.name?.toLowerCase().includes(search.toLowerCase())
        )
      );
    }
  }, [search, products]);

  const handleProductPress = (product: any) => {
    navigation.navigate('ProductDetail', { productId: product._id || product.id });
  };

  const renderProductCard = ({ item }: { item: any, index: number }) => {
    return (
      <TouchableOpacity
        style={[
          styles.card,
          {
            backgroundColor: '#fff',
            borderColor: '#E6E6E6',
            shadowColor: '#E6E6E6',
          },
        ]}
        onPress={() => handleProductPress(item)}
        activeOpacity={0.93}
      >
        <View style={styles.productImageContainer}>
          <FastImage
            source={item.avatar ? { uri: getImageUrl(item.avatar) } : require('../../../assets/images/FoodItems/img1.png')}
            style={styles.productImage}
            resizeMode="cover"
          />
        </View>
        <View style={styles.cardContent}>
          <Text style={styles.name} numberOfLines={2}>
            {item.name}
          </Text>
          {/* Store/Restaurant Info */}
          {item.storeName ? (
            <Text style={{ fontSize: 12, color: '#666', marginBottom: 4 }}>{item.storeName}</Text>
          ) : null}
          {item.description ? (
            <Text style={styles.desc} numberOfLines={1}>
              {item.description}
            </Text>
          ) : null}
          <View style={styles.rowBottom}>
            <Text style={styles.price}>₹{item.price ? Number(item.price).toFixed(2) : 'N/A'}</Text>
            <TouchableOpacity style={styles.addBtn} onPress={() => handleAddToCart(item)}>
              <FeatherIcon name="plus" size={22} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  // Set cart icon in header
  useLayoutEffect(() => {
    const handleCartPress = () => {
      try {
        // Reset the navigation stack and navigate to CartTab
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [
              { name: 'MainTab', params: { screen: 'CartTab' } }
            ],
          })
        );
      } catch (error) {
        console.error('Error navigating to cart:', error);
        // Fallback to simple navigation if reset fails
        navigation.navigate('CartTab');
      }
    };

    navigation.setOptions({
      headerStyle: {
        height: 50,
      } as any,
      headerTitleStyle: {
        // marginTop: -5,/
      } as any,
      headerTitleAlign: 'center',
      headerLeft: () => (
        <TouchableOpacity 
          style={{ marginLeft: 15, padding: 5 }}
          onPress={() => navigation.goBack()}
        >
          <FeatherIcon 
            name="arrow-left" 
            size={24} 
            color={COLORS.black} 
          />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <TouchableOpacity
          style={styles.cartIconContainer}
          onPress={handleCartPress}
          testID="cart-icon"
        >
          <FeatherIcon name="shopping-cart" size={26} color={COLORS.black} />
          {cartItemCount > 0 && (
            <View style={styles.cartBadge}>
              <Text style={styles.cartBadgeText}>{cartItemCount}</Text>
            </View>
          )}
        </TouchableOpacity>
      ),
    });
  }, [navigation, cartItemCount, isDark]);

  return (
    <View style={[styles.container, { backgroundColor:   '#F5F6FA' }]}> 
      {/* Search Bar */}
      <View style={[styles.searchBarWrap, { backgroundColor:  '#fff', borderColor:  '#E6E6E6', shadowColor: isDark ? '#000' : '#E6E6E6' }]}> 
        <FeatherIcon name="search" size={20} color={isDark ? '#aaa' : '#888'} style={{ marginLeft: 10 }} />
        <TextInput
          style={[styles.searchBar, { color:  '#23272F' }]}
          placeholder="Search Store"
          placeholderTextColor={isDark ? '#aaa' : '#888'}
          value={search}
          onChangeText={setSearch}
          clearButtonMode="while-editing"
        />
      </View>
      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item._id ? String(item._id) : String(item.id)}
        numColumns={2}
        columnWrapperStyle={styles.row}
        renderItem={renderProductCard}
        contentContainerStyle={{ paddingBottom: 24, paddingTop: 8 }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <Text style={{ color: isDark ? '#aaa' : '#888', textAlign: 'center', marginTop: 40 }}>No products found.</Text>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    letterSpacing: 0.5,
    textAlign: 'center',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: 16,
    minHeight: 40,
  },
  cartIconContainer: {
    padding: 6,
    marginRight: 2,
  },
  cartBadge: {
    position: 'absolute',
    top: 2,
    right: 2,
    backgroundColor: '#FF6B6B',
    borderRadius: 8,
    minWidth: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 3,
  },
  cartBadgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  searchBarWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 14,
    borderWidth: 1,
    marginBottom: 18,
    height: 44,
    paddingHorizontal: 6,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  searchBar: {
    flex: 1,
    height: 44,
    fontSize: 16,
    marginLeft: 8,
    backgroundColor: 'transparent',
    borderRadius: 54,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: CARD_MARGIN,
  },
  card: {
    width: CARD_SIZE,
    height: CARD_HEIGHT,
    borderRadius: 12,
    marginBottom: CARD_MARGIN,
    borderWidth: 1,
    backgroundColor: '#fff',
    borderColor: '#E6E6E6',
    shadowColor: '#E6E6E6',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 1,
    overflow: 'hidden',
  },
  cardContent: {
    flex: 1,
    justifyContent: 'flex-start',
    padding: 12,
  },

  name: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 2,
    textAlign: 'left',
    color: '#23272F',
    minHeight: 38,
  },
  desc: {
    fontSize: 13,
    color: '#888',
    marginBottom: 8,
    textAlign: 'left',
  },
  rowBottom: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 'auto',
    justifyContent: 'space-between',
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#23272F',
    textAlign: 'left',
    marginRight: 8,
  },
  addBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 0,
  },
  productImageContainer: {
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
});

export default AllFeaturedProductsScreen; 