
import React, {useState} from 'react';
import {
  FlatList,
  TouchableOpacity,
  View,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { RegularText } from '../../components/MyText';

const filterOptions = [
  {label: 'Pickup', icon: 'shopping-outline'},
  {label: 'Uber One', icon: 'car-outline'},
  {label: 'Offers', icon: 'tag-outline'},
  {label: '30 min', icon: 'timer-outline'},
  {label: 'Top Rated', icon: 'star-outline'},
  {label: 'New', icon: 'new-box'},
  {label: 'Trending', icon: 'trending-up'},
];

const FilterBar = () => {
  const [selected, setSelected] = useState('Pickup');

  return (
    <View style={styles.container}>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={filterOptions}
        keyExtractor={(item) => item.label}
        contentContainerStyle={{paddingHorizontal: 10}}
        renderItem={({item}) => {
          const isSelected = item.label === selected;
          return (
            <TouchableOpacity
              style={[styles.button, isSelected && styles.selectedButton]}
              onPress={() => setSelected(item.label)}>
              <Icon
                name={item.icon}
                size={18}
                color={isSelected ? 'white' : 'black'}
                style={{marginRight: 5}}
              />
              <RegularText style={[styles.text, isSelected && styles.selectedText]}>
                {item.label}
              </RegularText>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default FilterBar;

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f1f1f1',
    marginRight: 10,
  },
  selectedButton: {
    backgroundColor: 'black',
  },
  text: {
    color: 'black',
    fontSize: 14,
  },
  selectedText: {
    color: 'white',
  },
});
