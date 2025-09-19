import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { COLORS } from '../styles';
import { MediumText, RegularText } from './MyText';

export type FilterType = 'all' | 'products' | 'stores' | 'categories';

interface SearchFiltersProps {
  selectedFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  resultCounts: {
    all: number;
    products: number;
    stores: number;
    categories: number;
  };
}

const SearchFilters = ({
  selectedFilter,
  onFilterChange,
  resultCounts,
}: SearchFiltersProps) => {
  const filters = [
    { key: 'all' as FilterType, label: 'All', count: resultCounts.all },
    { key: 'products' as FilterType, label: 'Products', count: resultCounts.products },
    { key: 'stores' as FilterType, label: 'Stores', count: resultCounts.stores },
    { key: 'categories' as FilterType, label: 'Categories', count: resultCounts.categories },
  ];

  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {filters.map((filter) => (
          <TouchableOpacity
            key={filter.key}
            style={[
              styles.filterChip,
              selectedFilter === filter.key && styles.selectedFilterChip,
            ]}
            onPress={() => onFilterChange(filter.key)}
          >
            <RegularText
              style={[
                styles.filterText,
                selectedFilter === filter.key && styles.selectedFilterText,
              ]}
            >
              {filter.label}
            </RegularText>
            <View
              style={[
                styles.countBadge,
                selectedFilter === filter.key && styles.selectedCountBadge,
              ]}
            >
              <Text
                style={[
                  styles.countText,
                  selectedFilter === filter.key && styles.selectedCountText,
                ]}
              >
                {filter.count}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    marginRight: 12,
  },
  selectedFilterChip: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  filterText: {
    fontSize: 14,
    color: COLORS.black,
    marginRight: 6,
  },
  selectedFilterText: {
    color: COLORS.white,
  },
  countBadge: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
    minWidth: 20,
    alignItems: 'center',
  },
  selectedCountBadge: {
    backgroundColor: COLORS.white,
  },
  countText: {
    fontSize: 12,
    color: COLORS.grey,
    fontWeight: 'bold',
  },
  selectedCountText: {
    color: COLORS.primary,
  },
});

export default SearchFilters; 