import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { Ionicons } from '@expo/vector-icons';

export default function Header({ background, weather, icon }) {
  return (
    <LinearGradient style={styles.header} colors={background}>
      <Text style={styles.date}>{weather.results.date}</Text>
      <Text style={styles.cidade}>{weather.results.city_name}</Text>
      <Ionicons name={icon.name} color={icon.color} size={150} />
      <Text style={styles.tempo}> {weather.results.temp}°</Text>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  header: {
    width: '99%',
    height: '55%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  date: {
    color: '#FFF',
    fontSize: 17,
  },
  cidade: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  tempo: {
    color: '#FFF',
    fontSize: 80,
    fontWeight: 'bold',
  },
});
