import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const Weather = ({ weatherData }) => {
  const { name, main, weather } = weatherData;
  const weatherIconUrl = `http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;

  return (
    <View style={styles.container}>
      <Text style={styles.cityName}>{name}</Text>
      <Text style={styles.temperature}>{main.temp}°C</Text>
      <Text style={styles.description}>{weather[0].description}</Text>
      <Image style={styles.icon} source={{ uri: weatherIconUrl }} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 50,
  },
  cityName: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  temperature: {
    fontSize: 24,
    color: '#555',
    marginTop: 10,
  },
  description: {
    fontSize: 18,
    color: '#777',
    marginTop: 10,
  },
  icon: {
    width: 100,
    height: 100,
    marginTop: 10,
  },
});

export default Weather;
