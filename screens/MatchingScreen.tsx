
// react-native-reanimated + react-native-gesture-handler
import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import {
  GestureDetector,
  GestureHandlerRootView,
  Gesture,
} from 'react-native-gesture-handler';

const { height } = Dimensions.get('window');

const data = [
  { key: '1', text: '첫 번째 화면(reanimated)', backgroundColor: '#ff6666' }, // 빨강 계열
  { key: '2', text: '두 번째 화면(reanimated)', backgroundColor: '#66ff66' }, // 초록 계열
  { key: '3', text: '세 번째 화면(reanimated)', backgroundColor: '#6666ff' }, // 파랑 계열
];
export const MatchingScreen=()=> {
  const translateY = useSharedValue(0);
  const currentPage = useSharedValue(0);

  const gesture = Gesture.Pan()
    .onUpdate((e) => {
      translateY.value = e.translationY + -currentPage.value * height;
    })
    .onEnd(() => {
      if (translateY.value > -currentPage.value * height + height / 3) {
        // 스와이프가 아래로 많이 됐으면 이전 페이지로
        currentPage.value = Math.max(0, currentPage.value - 1);
      } else if (translateY.value < -currentPage.value * height - height / 3) {
        // 스와이프가 위로 많이 됐으면 다음 페이지로
        currentPage.value = Math.min(data.length - 1, currentPage.value + 1);
      }
      translateY.value = withSpring(-currentPage.value * height);
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <GestureDetector gesture={gesture}>
        <Animated.View style={[{ flex: 1 }, animatedStyle]}>
          {data.map((item,i) => (
            <View key={i} style={[styles.page,{backgroundColor:item.backgroundColor}]}>
              <Text style={styles.text}>{item.text}</Text>
            </View>
          ))}
        </Animated.View>
      </GestureDetector>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  page: {
    height,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#333',
  },
  text: {
    fontSize: 32,
    color: 'white',
  },
});


export default MatchingScreen;



/*
//   사용
import React from 'react';
import { Dimensions, FlatList, StyleSheet, View, Text } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../types/navigation'; // RootStackParamList 정의된 곳

type MatchingScreenRouteProp = RouteProp<RootStackParamList, 'Matching'>;

type Props = {
  route: MatchingScreenRouteProp;
};
const { height } = Dimensions.get('window');

const data = [
  { key: '1', text: '첫 번째 화면(FlatList)', backgroundColor: '#ff6666' }, // 빨강 계열
  { key: '2', text: '두 번째 화면(FlatList)', backgroundColor: '#66ff66' }, // 초록 계열
  { key: '3', text: '세 번째 화면(FlatList)', backgroundColor: '#6666ff' }, // 파랑 계열
];
const MatchingScreen = () => {
  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.key}
      pagingEnabled // 페이징 활성화
      horizontal={false} // 수직 스크롤
      snapToInterval={height} // 화면 높이마다 스냅
      decelerationRate="fast"
      showsVerticalScrollIndicator={false}
      renderItem={({ item }) => (
        <View style={[styles.page,{backgroundColor:item.backgroundColor}]}>
          <Text style={styles.text}>{item.text}</Text>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  page: {
    height,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#222',
  },
  text: {
    fontSize: 30,
    color: 'white',
  },
});

export default MatchingScreen;
*/
