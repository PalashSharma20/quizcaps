import React from 'react';
import {StyleSheet, View, Text, TouchableWithoutFeedback} from 'react-native';

export default ({title, subtitle, buttonText, onPress}) => (
  <View style={styles.centerContainer}>
    <Text style={styles.title}>{title}</Text>
    {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
    <TouchableWithoutFeedback style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{buttonText}</Text>
    </TouchableWithoutFeedback>
  </View>
);

const styles = StyleSheet.create({
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center',
    fontSize: 48,
    color: '#fff',
    marginBottom: 20,
  },
  subtitle: {
    textAlign: 'center',
    fontSize: 20,
    color: '#fff',
    marginBottom: 20,
  },
  button: {
    width: '100%',
    marginBottom: 40,
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 24,
    color: '#fff',
    marginBottom: 40,
    width: '100%',
  },
});
