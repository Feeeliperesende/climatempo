import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, StyleSheet, FlatList } from 'react-native';
import Menu from '../../componets/Menu';
import Header from '../../componets/Header';
import Conditions from '../../componets/Conditions';
import Forecast from '../../componets/Forecast';
import * as Location from 'expo-location';
import api, { key } from '../../Services/api';

export default function Home() {
  const [errorMsg, setErrorMsg] = useState(null);
  const [loading, setLoading] = useState(true);
  const [weather, setWeather] = useState([]);
  const [icon, SetIcon] = useState({ name: 'cloud', color: '#FFF' });
  const [background, SetBackground] = useState(['#1ed6ff', '#97c1ff']);
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();

      if (status !== 'granted') {
        setErrorMsg('Permissao negada para acessar localização');
        setLoading(false);
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      // console.log(location.coords);
      //weather?key=f877c41e&lat=-23.682&lon=-46.875
      const response = await api.get(
        `weather?key=${key}&lat=${location.coords.latitude}&lon=${location.coords.longitude}`
      );
      setWeather(response.data);
      if (response.data.results.currently === 'noite') {
        SetBackground(['#0c3747', '#0f2f61']);
      }
      switch (response.data.results.condition_slug) {
        case 'clear_day':
          SetIcon({ name: 'partly-sunny', color: '#FFB300' });
          break;
        case 'rain':
          SetIcon({ name: 'rainy', color: '#FFF' });
          break;
        case 'storm':
          SetIcon({ name: 'rainy', color: '#FFF' });
          break;
      }
      setLoading(false);
    })();
  }, []);
  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={{ fontSize: 17, fontStyle: 'italic' }}>
          Carregando dados ...
        </Text>
      </View>
    );
  }
  return (
    <SafeAreaView style={styles.container}>
      <Menu />
      <Header background={background} weather={weather} icon={icon} />
      <Conditions weather={weather} />
      <FlatList
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        contentContainerStyle={{ paddingBottom: '5%' }}
        style={styles.lista}
        data={weather.results.forecast}
        keyExtractor={(item) => item.date}
        renderItem={({ item }) => <Forecast data={item} />}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E8f0ff',
    padding: '5%',
  },
  lista: {
    marginTop: 10,
    marginLeft: 10,
  },
});

//1:03:53
