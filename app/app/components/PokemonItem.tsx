import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { Pokemon } from '@/utils/types'


interface Props {
  pokemon: Pokemon;
  onPress: (pokemon: Pokemon) => void;
}

const PokemonItem: React.FC<Props> = ({ pokemon, onPress }) => {
  return (
    <TouchableOpacity onPress={() => onPress(pokemon)}>
      <Text>{pokemon.name} - {pokemon.height}</Text>
    </TouchableOpacity>
  );
};

export default PokemonItem;

