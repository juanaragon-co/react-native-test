import React from 'react';
import { View, Image } from 'react-native'
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Pokemon } from '@/utils/types'
import { Card, Text } from 'react-native-paper'


interface Props {
  pokemon: Pokemon;
  onPress: (pokemon: Pokemon) => void;
}

const PokemonItem: React.FC<Props> = ({ pokemon, onPress }) => {
  return (
    <TouchableOpacity onPress={() => onPress(pokemon)} style={styles.container}
      testID={`pokemon-item-${pokemon.id}`}
    >
      <Card style={styles.card}>
        <Card.Content>
          <View style={styles.row}>
            <Image source={{ uri: pokemon?.sprites?.front_shiny }} style={styles.image} />
            <Text variant="titleLarge" style={styles.title}>{pokemon.name}</Text>
            <Text variant="bodyMedium" style={styles.content}>Height: {pokemon.height}</Text>
          </View>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 8,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 8,
  },
  title: {
    color: '#495057',
    fontSize: 18,
    fontWeight: 'bold',
  },
  content: {
    color: '#6c757d',
    fontSize: 16,
  },
});

export default PokemonItem;

