import React, { useState } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { RegularText } from '../../components/MyText';

const ExampleScreen = () => {
  const [message, setMessage] = useState('Hello! This is a dynamic prop.');

  return (
    <View style={styles.container}>
      <RegularText style={styles.text}>{message}</RegularText>
      <Button
        title="Change Message"
        onPress={() => setMessage('The prop has been updated dynamically!')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 20,
    marginBottom: 20,
  },
});

export default ExampleScreen; 