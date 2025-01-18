import React, { useEffect, useState } from 'react';
import { View, FlatList, SafeAreaView, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper'
import { fetchPokemonDetails } from '@/utils/api';
import { sortElements } from '@/utils';
import PokemonItem from '@/app/components/PokemonItem';
import { Pokemon } from '@/utils/types';

export default function HomeScreen() {
  const [favorites, setFavorites] = useState<Pokemon[]>([]);
  const [nonFavorites, setNonFavorites] = useState<Pokemon[]>([]);

  useEffect(() => {
    const fetchPokemons = async () => {
      const promises = Array.from({ length: 10 }, (_, index) => fetchPokemonDetails(index + 1));
      const results = await Promise.all(promises);
      const sortedPokemons = sortElements(results.filter(pokemon => pokemon !== null));
      setNonFavorites(sortedPokemons);
    };

    fetchPokemons();
  }, []);

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
        <View style={styles.row}>
          <Text variant='headlineSmall'>No Favoritos</Text>
          <FlatList
            data={nonFavorites}
            renderItem={renderPokemon}
            keyExtractor={(item) => item.id.toString()}
          />
        </View>
        <View style={styles.row}>
          <Text variant='headlineSmall'>Favoritos</Text>
          <FlatList
            data={favorites}
            renderItem={renderPokemon}
            keyExtractor={(item) => item.id.toString()}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flex: 1,
    padding: 16,
  },
  center: {
    textAlign: 'center',
    fontSize: 18,
    marginBottom: 16,
  },
  rows: {
    flex: 1,
    alignItems: 'center',
  },
  row: {
    flex: 1,
    marginHorizontal: 8,
  },
  header: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
});
