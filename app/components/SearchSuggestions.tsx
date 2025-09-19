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

interface SearchSuggestionsProps {
  onSuggestionPress: (suggestion: string) => void;
  recentSearches?: string[];
  popularSearches?: string[];
}

const SearchSuggestions = ({
  onSuggestionPress,
  recentSearches = [],
  popularSearches = [
    'Bananas',
    'Milk',
    'Bread',
    'Eggs',
    'Apples',
    'Chicken',
    'Cheese',
    'Tomatoes',
  ],
}: SearchSuggestionsProps) => {
  return (
    <View style={styles.container}>
      {/* Recent Searches */}
      {recentSearches.length > 0 && (
        <View style={styles.section}>
          <MediumText style={styles.sectionTitle}>Recent Searches</MediumText>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {recentSearches.map((search, index) => (
              <TouchableOpacity
                key={index}
                style={styles.suggestionChip}
                onPress={() => onSuggestionPress(search)}
              >
                <RegularText style={styles.searchIcon}>🔍</RegularText>
                <RegularText style={styles.suggestionText}>{search}</RegularText>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}

      {/* Popular Searches */}
      <View style={styles.section}>
        <MediumText style={styles.sectionTitle}>Popular Searches</MediumText>
        <View style={styles.suggestionsGrid}>
          {popularSearches.map((suggestion, index) => (
            <TouchableOpacity
              key={index}
              style={styles.suggestionChip}
              onPress={() => onSuggestionPress(suggestion)}
            >
              <RegularText style={styles.suggestionText}>{suggestion}</RegularText>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    color: COLORS.black,
    marginBottom: 12,
  },
  suggestionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  suggestionChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    marginRight: 8,
    marginBottom: 8,
  },
  searchIcon: {
    fontSize: 12,
    marginRight: 6,
  },
  suggestionText: {
    fontSize: 14,
    color: COLORS.black,
  },
});

export default SearchSuggestions; 