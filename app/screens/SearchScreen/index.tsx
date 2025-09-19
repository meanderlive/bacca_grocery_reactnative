import React, { useState, useEffect, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParams } from '../../navigation/types';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux';
import { addToCart } from '../../redux/feature/cart/cartSlice';

import SearchBar from '../../components/SearchBar';
import SearchFilters from '../../components/SearchFilters';
import { MediumText, RegularText } from '../../components/MyText';
import { COLORS } from '../../styles';
import { getallProducts } from '../../api/product';
import { getImageUrl } from '../../api';
import { saveSearchHistory, getSearchHistory } from '../../utils/searchHistory';

interface SearchResult {
  type: 'product' | 'store' | 'category';
  data: any;
}

const SearchScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'products' | 'stores' | 'categories'>('all');
  const [allProducts, setAllProducts] = useState<any[]>([]);
  const [allProductsLoading, setAllProductsLoading] = useState(true);
  const [allProductsError, setAllProductsError] = useState<string | null>(null);

  // Load search history on component mount
  useEffect(() => {
    loadSearchHistory();
    // Fetch all products for searching
    const fetchAllProducts = async () => {
      setAllProductsLoading(true);
      setAllProductsError(null);
      try {
        const res = await getallProducts(1, 100); // adjust page/page_size as needed
        setAllProducts(res.data || []);
      } catch (err: any) {
        setAllProductsError(err.message || 'Failed to load products');
      } finally {
        setAllProductsLoading(false);
      }
    };
    fetchAllProducts();
  }, []);

  const loadSearchHistory = async () => {
    const history = await getSearchHistory();
    setRecentSearches(history);
  };

  // Search functionality
  const performSearch = (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    const lowerQuery = query.toLowerCase();
    const results: SearchResult[] = [];

    // Search in products (dynamic)
    const matchingProducts = allProducts.filter(product =>
      (product.name?.toLowerCase().includes(lowerQuery) ||
        product.description?.toLowerCase().includes(lowerQuery) ||
        (product.categoryId?.display_name || product.categoryId?.name || '').toLowerCase().includes(lowerQuery) ||
        product.storeName?.toLowerCase().includes(lowerQuery))
    );

    matchingProducts.forEach(product => {
      results.push({ type: 'product', data: product });
    });

    // (Optional) If you want to support store/category search, fetch those dynamically as well
    setSearchResults(results);
    setIsSearching(false);
  };

  // Handle search input
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    performSearch(query);
  };

  // Add to recent searches
  const addToRecentSearches = async (query: string) => {
    if (query.trim()) {
      await saveSearchHistory(query);
      await loadSearchHistory();
    }
  };

  // Handle search submission
  const handleSearchSubmit = async () => {
    if (searchQuery.trim()) {
      await addToRecentSearches(searchQuery);
    }
  };

  // Handle result press
  const handleResultPress = (result: SearchResult) => {
    switch (result.type) {
      case 'product':
        navigation.navigate('ProductDetail', { productId: result.data.id });
        break;
      case 'store':
        // Navigate to store detail (you can implement this later)
        console.log('Navigate to store:', result.data.id);
        break;
      case 'category':
        // Navigate to category products (you can implement this later)
        console.log('Navigate to category:', result.data.id);
        break;
    }
  };

  // Calculate result counts for filters
  const resultCounts = {
    all: searchResults.length,
    products: searchResults.filter(result => result.type === 'product').length,
    stores: searchResults.filter(result => result.type === 'store').length,
    categories: searchResults.filter(result => result.type === 'category').length,
  };

  // Filter results based on selected filter
  const filteredResults = selectedFilter === 'all' 
    ? searchResults 
    : searchResults.filter(result => {
        switch (selectedFilter) {
          case 'products':
            return result.type === 'product';
          case 'stores':
            return result.type === 'store';
          case 'categories':
            return result.type === 'category';
          default:
            return true;
        }
      });

  // Handle add to cart
  const handleAddToCart = (product: any) => {
    const normalizedProduct = { ...product, id: product._id || product.id };
    dispatch(addToCart({ product: normalizedProduct, quantity: 1 }));
  };

  // Render product item
  const renderProductItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={styles.productCard}
      onPress={() => handleResultPress({ type: 'product', data: item })}
      activeOpacity={0.8}
    >
      <View style={styles.productImageContainer}>
        <FastImage source={item.avatar ? { uri: getImageUrl(item.avatar) } : require('../../../assets/images/FoodItems/img1.png')} style={styles.productImage} resizeMode="cover" />
        {item.discount && (
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>{item.discount}% OFF</Text>
          </View>
        )}
      </View>
      
      <View style={styles.productInfo}>
        <Text style={styles.productName} numberOfLines={2}>
          {item.name}
        </Text>
        <RegularText style={styles.storeName}>{item.storeName}</RegularText>
        
        <View style={styles.ratingContainer}>
          <Text style={styles.starIcon}>⭐</Text>
          <RegularText style={styles.rating}>
            {item.rating} ({item.reviewCount})
          </RegularText>
        </View>
        
        <View style={styles.priceContainer}>
          <MediumText style={styles.price}>${item.price ? Number(item.price).toFixed(2) : 'N/A'}</MediumText>
          {item.originalPrice && (
            <RegularText style={styles.originalPrice}>
              ${item.originalPrice.toFixed(2)}
            </RegularText>
          )}
        </View>
        
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => handleAddToCart(item)}
        >
          <RegularText style={styles.addButtonText}>Add to Cart</RegularText>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  // Render store item
  const renderStoreItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={styles.storeCard}
      onPress={() => handleResultPress({ type: 'store', data: item })}
      activeOpacity={0.8}
    >
      <FastImage source={item.logo} style={styles.storeLogo} resizeMode="cover" />
      <View style={styles.storeInfo}>
        <Text style={styles.storeName}>{item.name}</Text>
        <RegularText style={styles.storeAddress}>{item.address}</RegularText>
        
        <View style={styles.storeDetails}>
          <View style={styles.ratingContainer}>
            <Text style={styles.starIcon}>⭐</Text>
            <RegularText style={styles.rating}>
              {item.rating} ({item.reviewCount})
            </RegularText>
          </View>
          
          <View style={styles.deliveryInfo}>
            <RegularText style={styles.deliveryText}>
              {item.distance}km • {item.deliveryTime}min
            </RegularText>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  // Render category item
  const renderCategoryItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={styles.categoryCard}
      onPress={() => handleResultPress({ type: 'category', data: item })}
      activeOpacity={0.8}
    >
      <FastImage source={item.icon} style={styles.categoryIcon} resizeMode="cover" />
      <View style={styles.categoryInfo}>
        <Text style={styles.categoryName}>{item.name}</Text>
        <RegularText style={styles.productCount}>
          {item.productCount} products
        </RegularText>
      </View>
    </TouchableOpacity>
  );

  // Render search result
  const renderSearchResult = ({ item }: { item: SearchResult }) => {
    switch (item.type) {
      case 'product':
        return renderProductItem({ item: item.data });
      case 'store':
        return renderStoreItem({ item: item.data });
      case 'category':
        return renderCategoryItem({ item: item.data });
      default:
        return null;
    }
  };

  // Render recent search item
  const renderRecentSearch = ({ item }: { item: string }) => (
    <TouchableOpacity
      style={styles.recentSearchItem}
      onPress={() => handleSearch(item)}
    >
      <Text style={styles.searchIcon}>🔍</Text>
      <RegularText style={styles.recentSearchText}>{item}</RegularText>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Search</Text>
        <View style={styles.placeholder} />
      </View>

              {/* Search Bar */}
        <View style={styles.searchContainer}>
          <SearchBar
            value={searchQuery}
            onChangeText={handleSearch}
            onSearch={handleSearchSubmit}
            placeholder="Search for groceries, stores..."
            showSearchIcon={true}
          />
        </View>

        {/* Search Filters */}
        {searchQuery.length > 0 && searchResults.length > 0 && (
          <SearchFilters
            selectedFilter={selectedFilter}
            onFilterChange={setSelectedFilter}
            resultCounts={resultCounts}
          />
        )}

      {/* Content */}
      {searchQuery.length === 0 ? (
        // Recent searches and suggestions
        <View style={styles.suggestionsContainer}>
          {recentSearches.length > 0 && (
            <View style={styles.section}>
              <MediumText style={styles.sectionTitle}>Recent Searches</MediumText>
              <FlatList
                data={recentSearches}
                renderItem={renderRecentSearch}
                keyExtractor={(item) => item}
                scrollEnabled={false}
              />
            </View>
          )}

          <View style={styles.section}>
            <MediumText style={styles.sectionTitle}>Popular Categories</MediumText>
            {/* <FlatList
              data={categories.slice(0, 6)}
              renderItem={({ item }) => renderCategoryItem({ item })}
              keyExtractor={(item) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.categoriesList}
            /> */}
            <View style={styles.noResultsContainer}>
              <Text style={styles.noResultsIcon}>🔍</Text>
              <MediumText style={styles.noResultsTitle}>No categories found</MediumText>
              <RegularText style={styles.noResultsText}>
                Try searching with different keywords
              </RegularText>
            </View>
          </View>

          <View style={styles.section}>
            <MediumText style={styles.sectionTitle}>Featured Products</MediumText>
            {/* <FlatList
              data={products.slice(0, 4)}
              renderItem={({ item }) => renderProductItem({ item })}
              keyExtractor={(item) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.productsList}
            /> */}
            <View style={styles.noResultsContainer}>
              <Text style={styles.noResultsIcon}>🔍</Text>
              <MediumText style={styles.noResultsTitle}>No products found</MediumText>
              <RegularText style={styles.noResultsText}>
                Try searching with different keywords
              </RegularText>
            </View>
          </View>
        </View>
      ) : (
        // Search results
        <View style={styles.resultsContainer}>
          {isSearching ? (
            <View style={styles.loadingContainer}>
              <Text style={styles.loadingText}>Searching...</Text>
            </View>
          ) : searchResults.length > 0 ? (
            <FlatList
              data={filteredResults}
              renderItem={renderSearchResult}
              keyExtractor={(item, index) => `${item.type}-${item.data.id}-${index}`}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.resultsList}
            />
          ) : (
            <View style={styles.noResultsContainer}>
              <Text style={styles.noResultsIcon}>🔍</Text>
              <MediumText style={styles.noResultsTitle}>No results found</MediumText>
              <RegularText style={styles.noResultsText}>
                Try searching with different keywords
              </RegularText>
            </View>
          )}
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  backButton: {
    padding: 5,
  },
  backIcon: {
    fontSize: 24,
    color: COLORS.black,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.black,
  },
  placeholder: {
    width: 34,
  },
  searchContainer: {
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  suggestionsContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 16,
    color: COLORS.black,
    marginBottom: 15,
  },
  recentSearchItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  searchIcon: {
    fontSize: 16,
    marginRight: 12,
  },
  recentSearchText: {
    fontSize: 14,
    color: COLORS.black,
  },
  categoriesList: {
    paddingRight: 20,
  },
  productsList: {
    paddingRight: 20,
  },
  resultsContainer: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: COLORS.grey,
  },
  resultsList: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  noResultsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  noResultsIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  noResultsTitle: {
    fontSize: 18,
    color: COLORS.black,
    marginBottom: 8,
  },
  noResultsText: {
    fontSize: 14,
    color: COLORS.grey,
    textAlign: 'center',
  },
  // Product styles
  productCard: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  productImageContainer: {
    position: 'relative',
    marginRight: 12,
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  discountBadge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: COLORS.primary,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
  },
  discountText: {
    fontSize: 10,
    color: COLORS.white,
    fontWeight: 'bold',
  },
  productInfo: {
    flex: 1,
    justifyContent: 'space-between',
  },
  productName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.black,
    marginBottom: 4,
  },
  storeName: {
    fontSize: 12,
    color: COLORS.grey,
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  starIcon: {
    fontSize: 12,
    marginRight: 4,
  },
  rating: {
    fontSize: 12,
    color: COLORS.grey,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  price: {
    fontSize: 14,
    color: COLORS.primary,
    marginRight: 8,
  },
  originalPrice: {
    fontSize: 12,
    color: COLORS.grey,
    textDecorationLine: 'line-through',
  },
  addButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  addButtonText: {
    fontSize: 12,
    color: COLORS.white,
    fontWeight: 'bold',
  },
  // Store styles
  storeCard: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  storeLogo: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },
  storeInfo: {
    flex: 1,
    justifyContent: 'space-between',
  },
  storeAddress: {
    fontSize: 12,
    color: COLORS.grey,
    marginBottom: 8,
  },
  storeDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  deliveryInfo: {
    alignItems: 'flex-end',
  },
  deliveryText: {
    fontSize: 12,
    color: COLORS.grey,
  },
  // Category styles
  categoryCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginRight: 12,
    minWidth: 150,
  },
  categoryIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    marginRight: 12,
  },
  categoryInfo: {
    flex: 1,
  },
  categoryName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.black,
    marginBottom: 4,
  },
  productCount: {
    fontSize: 12,
    color: COLORS.grey,
  },
});

export default SearchScreen;
