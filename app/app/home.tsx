import React, { useEffect, useState } from 'react';
import { View, FlatList, SafeAreaView, StyleSheet } from 'react-native';
import { Text, Button, IconButton } from 'react-native-paper'
import { fetchPokemonDetails } from '@/utils/api';
import { sortElements } from '@/utils';
import { useNavigation } from 'expo-router';
import PokemonItem from '@/app/components/PokemonItem';
import { Pokemon } from '@/utils/types';

export default function HomeScreen() {
  const [favorites, setFavorites] = useState<Pokemon[]>([]);
  const [nonFavorites, setNonFavorites] = useState<Pokemon[]>([]);

  const navigation = useNavigation();

  useEffect(() => {
    const fetchPokemons = async () => {
      const promises = Array.from({ length: 10 }, (_, index) => fetchPokemonDetails(index + 1));
      const results = await Promise.all(promises);
      const sortedPokemons = sortElements(results.filter(pokemon => pokemon !== null));
      setNonFavorites(sortedPokemons);
    };

    fetchPokemons();
  }, []);

  const handleLogout = () => {
    navigation.navigate('index')
  }

  const handlePress = (pokemon: Pokemon) => {
    if (favorites.includes(pokemon)) {
      setFavorites(favorites.filter(item => item.id !== pokemon.id));
      setNonFavorites(sortElements([...nonFavorites, pokemon]));
    } else {
      setNonFavorites(nonFavorites.filter(item => item.id !== pokemon.id));
      setFavorites(sortElements([...favorites, pokemon]));
    }
  };

  const renderPokemon = ({ item }: { item: Pokemon }) => (
    <PokemonItem pokemon={item} onPress={handlePress} />
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.rows}>
        <Text variant='headlineSmall' style={styles.header}>No Favoritos</Text>
        <View style={styles.row}>
          <FlatList
            data={nonFavorites}
            renderItem={renderPokemon}
            keyExtractor={(item) => item.id.toString()}
          />
        </View>
        <View style={styles.arrowsContainer}>
          <IconButton icon="arrow-up" size={24} onPress={() => { }} />
          <IconButton icon="arrow-down" size={24} onPress={() => { }} />
        </View>
        <Text variant='headlineSmall' style={styles.header}>Favoritos</Text>
        <View style={styles.row}>
          <FlatList
            data={favorites}
            renderItem={renderPokemon}
            keyExtractor={(item) => item.id.toString()}
          />
        </View>
        <Button onPress={handleLogout} buttonColor='#007BFF' textColor='#FFFFFF'>Cerrar sesión</Button>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#E9ECEF',
    justifyContent: 'center',
    flex: 1,
    padding: 16,
  },
  center: {
    textAlign: 'center',
    color: '#495057',
    fontSize: 18,
    marginBottom: 16,
  },
  rows: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  arrowsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 8,
  },
  header: {
    fontSize: 16,
    color: '#495057',
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  row: {
    width: '90%',
    flex: 1,
    marginHorizontal: 8,
    backgroundColor: '#F8F9FA',
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
});
