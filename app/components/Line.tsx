import {View, Text, StyleProp, ViewStyle} from 'react-native';
import React from 'react';

const Line = ({style}: {style?: StyleProp<ViewStyle>}) => {
  return (
    <View
      style={[
        {
          width: '90%',
          marginVertical: 10,
          backgroundColor: 'rgba(0,0,0,0.1)',
          height: 1,
        },
        style,
      ]}
    />
  );
};

export default Line;
