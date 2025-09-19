import {Platform, StyleSheet, Text, TextInput, View, TouchableOpacity} from 'react-native';
import React, { useState } from 'react';
import {COLORS} from '../styles';
import AntDesign from 'react-native-vector-icons/AntDesign';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import { FONTS } from '../../assets/fonts';

interface SearchBarProps {
  onPress?: () => void;
  onSearch?: (query: string) => void;
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  showSearchIcon?: boolean;
}

const SearchBar = ({
  onPress, 
  onSearch, 
  placeholder = "Search for groceries, stores...",
  value,
  onChangeText,
  showSearchIcon = true
}: SearchBarProps) => {
  const [searchQuery, setSearchQuery] = useState(value || '');

  const handleTextChange = (text: string) => {
    setSearchQuery(text);
    onChangeText?.(text);
    onSearch?.(text);
  };

  const handleClear = () => {
    setSearchQuery('');
    onChangeText?.('');
    onSearch?.('');
  };

  return (
    <View
      style={{
        position: 'relative',
        width: '92%',
        backgroundColor:"#e6e6e6",
        borderRadius: 30,
        borderColor: COLORS.black,
        alignSelf: 'center',
        flexDirection: 'row',
        alignItems: 'center',
      }}>
      {showSearchIcon && (
        <EvilIcons
          name="search"
          size={26}
          color={COLORS.black}
          style={{
            position: 'absolute',
            left: 12,
            zIndex: 1,
          }}
        />
      )}
      
      <TextInput
        style={[
          {
            flex: 1,
            paddingHorizontal: 20,
            paddingLeft: showSearchIcon ? 50 : 20,
            color:'black',
            height: 50,
            
          },
          Platform.OS === 'ios' ? {height: 50} : {},
        ]}
        placeholder={placeholder}
        placeholderTextColor={COLORS.grey}
        // fontFamily={FONTS['Montserrat-Medium']}
        value={value !== undefined ? value : searchQuery}
        onChangeText={handleTextChange}
        onSubmitEditing={() => onSearch?.(searchQuery)}
        returnKeyType="search"
      />
      
      {searchQuery.length > 0 && (
        <TouchableOpacity
          style={{
            position: 'absolute',
            right: 15,
            zIndex: 1,
          }}
          onPress={handleClear}
        >
          <AntDesign name="close" size={18} color={COLORS.grey} />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({});
