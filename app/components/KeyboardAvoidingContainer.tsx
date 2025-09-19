import React, { ReactNode } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, View, StatusBar } from 'react-native';

type KeyboardAvoidingContainerProps = {
  children: ReactNode;
  style?: any;
  keyboardVerticalOffset?: number;
  behavior?: 'padding' | 'height' | 'position';
};

const KeyboardAvoidingContainer = ({ 
  children, 
  style, 
  keyboardVerticalOffset = Platform.OS === 'ios' ? 64 : 0,
  behavior = Platform.OS === 'ios' ? 'padding' : 'height'
}: KeyboardAvoidingContainerProps) => {
  return (
    <KeyboardAvoidingView
      style={[styles.container, style]}
      behavior={behavior}
      keyboardVerticalOffset={keyboardVerticalOffset + (StatusBar.currentHeight || 0)}
      enabled
    >
      <View style={styles.inner}>
        {children}
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    flex: 1,
    justifyContent: 'flex-end',
  },
});

export default KeyboardAvoidingContainer;
