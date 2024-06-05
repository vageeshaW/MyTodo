// src/components/CustomButton.tsx
import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import {ICustomButtonProps} from './types';

const CustomButton: React.FC<ICustomButtonProps> = ({title, onPress}) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'blue',
    borderColor: 'white',
    borderRadius: 10,
    borderWidth: 2,
    padding: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ff',
    fontSize: 16,
  },
});

export default CustomButton;
