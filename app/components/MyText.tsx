import {StyleProp, TextStyle, Text} from 'react-native';
import React from 'react';
import {COLORS} from '../styles';
import {FONTS} from '../../assets/fonts';

type Props = {
  children: string | React.ReactNode | any;
  style?: StyleProp<TextStyle>;
  bold?: boolean;
  numberOfLines?: number;
};

export const RegularText = ({children, style, bold, numberOfLines}: Props) => {
  return (
    <Text
      numberOfLines={numberOfLines}
      style={[
        {
          color: COLORS.black,
          fontSize: 16,
          fontFamily: bold ? FONTS['Montserrat-Bold'] : FONTS['Montserrat-Regular'],
        },
        style,
      ]}>
      {children}
    </Text>
  );
};

export const RegularTextGray = ({children, style, bold, numberOfLines}: Props) => {
  return (
    <Text
      numberOfLines={numberOfLines}
      style={[
        {
          color: COLORS.grey,
          fontSize: 16,
          fontFamily: bold ? FONTS['Montserrat-Bold'] : FONTS['Montserrat-Regular'],
        },
        style,
      ]}>
      {children}
    </Text>
  );
};

export const TitleText = ({children, style, bold, numberOfLines}: Props) => {
  return (
    <Text
      numberOfLines={numberOfLines}
      style={[
        {
          color: COLORS.black,
          fontSize: 15,
          fontFamily: bold ? FONTS['Montserrat-Bold'] : FONTS['Montserrat-Regular'],
        },
        style,
      ]}>
      {children}
    </Text>
  );
};

export const SmallText = ({children, style, bold, numberOfLines}: Props) => {
  return (
    <Text
      numberOfLines={numberOfLines}
      style={[
        {
          color: COLORS.grey,
          fontSize: 13,
          fontFamily: bold ? FONTS['Montserrat-Bold'] : FONTS['Montserrat-Regular'],
        },
        style,
      ]}>
      {children}
    </Text>
  );
};

export const SmallText10 = ({children, style, bold, numberOfLines}: Props) => {
  return (
    <Text
      numberOfLines={numberOfLines}
      style={[
        {
          color: COLORS.grey,
          fontSize: 12,
          fontFamily: bold ? FONTS['Montserrat-Bold'] : FONTS['Montserrat-Regular'],
        },
        style,
      ]}>
      {children}
    </Text>
  );
};

export const SmallText10Black = ({children, style, bold, numberOfLines}: Props) => {
  return (
    <Text
      numberOfLines={numberOfLines}
      style={[
        {
          color: COLORS.black,
          fontSize: 12,
          fontFamily: bold ? FONTS['Montserrat-Bold'] : FONTS['Montserrat-Regular'],
        },
        style,
      ]}>
      {children}
    </Text>
  );
};

export const MediumText = ({children, style, bold, numberOfLines}: Props) => {
  return (
    <Text
      numberOfLines={numberOfLines}
      style={[
        {
          color: COLORS.black,
          fontSize: 20,
          fontFamily: bold ? FONTS['Montserrat-Bold'] : FONTS['Montserrat-Medium'],
        },
        style,
      ]}>
      {children}
    </Text>
  );
};

export const BigText = ({children, style, bold, numberOfLines}: Props) => {
  return (
    <Text
      numberOfLines={numberOfLines}
      style={[
        {
          color: COLORS.black,
          fontSize: 30,
          fontFamily: bold ? FONTS['Montserrat-Bold'] : FONTS['Montserrat-Regular'],
        },
        style,
      ]}>
      {children}
    </Text>
  );
};

export const Text25 = ({children, style, bold, numberOfLines}: Props) => {
  return (
    <Text
      numberOfLines={numberOfLines}
      style={[
        {
          color: COLORS.black,
          fontSize: 25,
          fontFamily: bold ? FONTS['Montserrat-Bold'] : FONTS['Montserrat-Regular'],
        },
        style,
      ]}>
      {children}
    </Text>
  );
};
