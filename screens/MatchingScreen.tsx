import React from 'react';
import { Text, View } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../types/navigation'; // RootStackParamList 정의된 곳

type MatchingScreenRouteProp = RouteProp<RootStackParamList, 'Matching'>;

type Props = {
  route: MatchingScreenRouteProp;
};

const MatchingScreen = ({ route }: Props) => {
  const { id, name } = route.params;

  return (
    <View>
      <Text>id : {id}   name: {name}</Text>
    </View>
  );
};

export default MatchingScreen;
