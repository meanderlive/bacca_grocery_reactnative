import {
  TouchableOpacity,
  StyleProp,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import {COLORS} from '../styles';
import {RegularText} from './MyText';

type Props = {
  text: string;
  loading?: boolean;
  disabled?: boolean;
  onPress?: () => void;
  containerStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
};

const PrimaryBtn = ({
  text,
  loading,
  disabled,
  onPress,
  containerStyle,
  textStyle,
}: Props) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[
        {
          marginHorizontal: 15,
          height: 50,
          backgroundColor: disabled ? '#e0e0e0' : COLORS.primary,
          borderRadius: 30,
          justifyContent: 'center',
          alignItems: 'center',
          borderWidth: 2,
          borderColor: disabled ? '#c0c0c0' : 'black',
        },
        containerStyle,
      ]}>
      {loading ? (
        <ActivityIndicator size={'small'} color={'#FFF'} />
      ) : (
        <RegularText
          style={[
            {color: 'black', fontSize: 17, fontWeight: '500', textAlign: 'center', width: '100%'},
            textStyle,
          ]}>
          {text}
        </RegularText>
      )}
    </TouchableOpacity>
  );
};

export default PrimaryBtn;
