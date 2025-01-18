import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { Pokemon } from '@/utils/types'
import { Card } from 'react-native-paper'


interface Props {
  pokemon: Pokemon;
  onPress: (pokemon: Pokemon) => void;
}

const PokemonItem: React.FC<Props> = ({ pokemon, onPress }) => {
  return (
    <TouchableOpacity onPress={() => onPress(pokemon)}>
      <Card.Title title={pokemon.name}>
      </Card.Title>
    </TouchableOpacity>
  );
};

export default PokemonItem;

