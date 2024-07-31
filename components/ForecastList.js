import React from 'react';
import { View, Text, Image, FlatList, StyleSheet } from 'react-native';

const ForecastList = ({ forecastData }) => {
  return (
    <FlatList
      data={forecastData}
      keyExtractor={(item) => item.dt_txt}
      horizontal
      renderItem={({ item }) => (
        <View style={styles.forecastItem}>
          <Text style={styles.forecastDate}>{new Date(item.dt_txt).toLocaleDateString()}</Text>
          <Text style={styles.forecastTime}>{new Date(item.dt_txt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
          <Image
            style={styles.forecastIcon}
            source={{ uri: `http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png` }}
          />
          <Text style={styles.forecastTemp}>{item.main.temp}°C</Text>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  forecastItem: {
    alignItems: 'center',
    marginHorizontal: 10,
  },
  forecastDate: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  forecastTime: {
    fontSize: 14,
    color: '#555',
  },
  forecastIcon: {
    width: 50,
    height: 50,
  },
  forecastTemp: {
    fontSize: 16,
    marginTop: 5,
  },
});

export default ForecastList;
