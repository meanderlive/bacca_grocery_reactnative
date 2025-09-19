import React from 'react';
import { FlatList, StyleSheet, View, TouchableOpacity } from 'react-native';
import { RegularText } from '../../components/MyText';

interface Category {
  id: string;
  name: string;
}

interface ItemsCategoryProps {
  categories: Category[];
  onCategoryPress: (category: Category) => void;
  selectedCategoryId: string;
}

const ItemsCategory: React.FC<ItemsCategoryProps> = ({ categories, onCategoryPress, selectedCategoryId }) => {
  const renderItem = ({ item }: { item: Category }) => (
    <TouchableOpacity 
      style={[
        styles.item,
        selectedCategoryId === item.id && styles.selectedItem
      ]}
      onPress={() => onCategoryPress(item)}
    >
      <RegularText style={[
        styles.label,
        selectedCategoryId === item.id && styles.selectedLabel
      ]}>
        {item.name}
      </RegularText>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={categories}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

export default ItemsCategory;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
  },
  listContainer: {
    paddingHorizontal: 15,
  },
  item: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#f2f2f2',
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  selectedItem: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
  },
  label: {
    fontSize: 14,
    color: '#333',
  },
  selectedLabel: {
    color: 'white',
  },
});
