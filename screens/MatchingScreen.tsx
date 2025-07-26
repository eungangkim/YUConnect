// react-native-reanimated + react-native-gesture-handler
import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
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
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { posts } from '../data/data';
import { MatchingScreenStyle } from '../styles/MatchingScreen';
import ImageWindow from '../Components/ImageWindow';


  const { height: windowHeight } = Dimensions.get('window');
  
export const MatchingScreen = () => {
    const insets = useSafeAreaInsets();
  const usableHeight = windowHeight - insets.top - insets.bottom;

  const translateY = useSharedValue(0);
  const currentPage = useSharedValue(0);

  const gesture = Gesture.Pan()
    .onUpdate(e => {
      translateY.value = e.translationY + -currentPage.value * usableHeight;
    })
    .onEnd(() => {
      if (translateY.value > -currentPage.value * usableHeight + usableHeight / 3) {
        // 스와이프가 아래로 많이 됐으면 이전 페이지로
        currentPage.value = Math.max(0, currentPage.value - 1);
      } else if (translateY.value < -currentPage.value * usableHeight - usableHeight / 3) {
        // 스와이프가 위로 많이 됐으면 다음 페이지로
        currentPage.value = Math.min(posts.length - 1, currentPage.value + 1);
      }
      translateY.value = withSpring(-currentPage.value * usableHeight);
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  const [selectedImages, setSelectedImages] = useState<Array<string | any>>([]);
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <GestureDetector gesture={gesture}>
        <Animated.View style={[{ flex: 1 }, animatedStyle]}>
          {posts.map((item, i) => (
            <View
              key={item.id}
              style={[
                MatchingScreenStyle.page,
                {
                  backgroundColor: item.forLove ? '#e284c4ff' : '#6dc4dcff',
                  height: usableHeight,
                },
              ]}
            >
              <View style={{ borderWidth:1}}>
                <Text>참가한 사용자 목록</Text>
                <View
                  style={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    marginBottom: 20,
                    borderWidth:2,
                  }}
                >
                  {item.userList.map(user => (
                    <TouchableOpacity
                      key={user.id}
                      style={{ marginRight: 10, marginBottom: 10 }}
                      onPress={() => setSelectedImages(user.images)}
                    >
                      <Text style={{ fontWeight: 'bold' }}>{user.name}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
                <ImageWindow images={selectedImages}/>
                <View style={{borderWidth: 2, marginTop: 0 }}>
                <Text style={MatchingScreenStyle.text}>{item.description}</Text>
              </View>
              </View>
              
            </View>
          ))}
        </Animated.View>
      </GestureDetector>
    </GestureHandlerRootView>
  );
};

export default MatchingScreen;

