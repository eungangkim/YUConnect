import { useNavigation } from '@react-navigation/native';
import { Button, View } from 'react-native';
import { RootStackParamList } from '../types/navigation';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

const HomeScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  return (
    <View>
      <Button
        title="go Matching Screen"
        onPress={() => {
          navigation.navigate('Matching', { id: 1, name: '김은강' });
        }}
      />
    </View>
  );
};

export default HomeScreen;
