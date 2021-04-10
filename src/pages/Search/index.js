import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Keyboard,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import api, { key } from '../../Services/api';
import { LinearGradient } from 'expo-linear-gradient';
import Conditions from '../../componets/Conditions';

export default function Search() {
  const navigation = useNavigation();
  const [input, SetInput] = useState('');
  const [city, SetCity] = useState(null);
  const [error, SetError] = useState(null);

  async function handlesearch() {
    ////https://api.hgbrasil.com/weather?key=f877c41e&city_name=Campinas,SP
    const response = await api.get(`/weather?key=${key}&city_name=${input}`);
    console.log(response.data);
    if (response.data.by === 'default') {
      SetError('Hmmm, cidade não encontrada!');
      SetInput('');
      SetCity(null);
      Keyboard.dismiss();
      return;
    }
    SetCity(response.data);
    SetInput(''), Keyboard.dismiss();
  }
  if (city) {
    return (
      <SafeAreaView style={styles.container}>
        <TouchableOpacity
          style={styles.backbotao}
          onPress={() => navigation.navigate('Home')}
        >
          <Feather name="chevron-left" size={32} color="#000" />
          <Text style={styles.textbotao}>Voltar</Text>
        </TouchableOpacity>
        <View style={styles.searchbox}>
          <TextInput
            style={styles.input}
            value={input}
            onChangeText={(valor) => SetInput(valor)}
            placeholder="Ex. São Paulo , SP"
          />
          <TouchableOpacity style={styles.icon} onPress={handlesearch}>
            <Feather name="search" size={22} color="#FFF" />
          </TouchableOpacity>
        </View>
        <LinearGradient style={styles.header} colors={['#1ed6ff', '#97c1ff']}>
          <Text style={styles.date}> {city.results.date}</Text>
          <Text style={styles.city}>{city.results.city_name}</Text>
          <View>
            <Text style={styles.temp}> {city.results.temp}°</Text>
          </View>
          <Conditions weather={city} />
        </LinearGradient>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={styles.backbotao}
        onPress={() => navigation.navigate('Home')}
      >
        <Feather name="chevron-left" size={32} color="#000" />
        <Text style={styles.textbotao}>Voltar</Text>
      </TouchableOpacity>
      <View style={styles.searchbox}>
        <TextInput
          style={styles.input}
          value={input}
          onChangeText={(valor) => SetInput(valor)}
          placeholder="Ex. São Paulo , SP"
        />
        <TouchableOpacity style={styles.icon} onPress={handlesearch}>
          <Feather name="search" size={22} color="#FFF" />
        </TouchableOpacity>
      </View>
      {error && <Text style={{ marginTop: 25, fontSize: 18 }}> {error}</Text>}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: '10%',
    backgroundColor: '#e8f0ff',
  },
  textbotao: {
    fontSize: 22,
  },
  backbotao: {
    flexDirection: 'row',
    marginLeft: 15,
    alignSelf: 'flex-start',
    alignItems: 'center',
    marginBottom: 10,
  },
  searchbox: {
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#DDD',
    width: '90%',
    height: 50,
    borderRadius: 8,
  },
  input: {
    width: '85%',
    height: 50,
    backgroundColor: '#FFF',
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    padding: 7,
  },
  icon: {
    width: '15%',
    backgroundColor: '#1ED6FF',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  },
  header: {
    marginTop: '5%',
    width: '98%',
    paddingTop: '3%',
    padding: '3%',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 8,
  },
  date: {
    color: '#FFF',
    fontSize: 16,
  },
  city: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
  },
  temp: {
    color: '#FFF',
    fontSize: 90,
    fontWeight: 'bold',
  },
});
