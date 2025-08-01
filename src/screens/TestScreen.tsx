import React, { useEffect } from 'react';
import { Button, View } from 'react-native';
import auth, { GoogleAuthProvider } from '@react-native-firebase/auth';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';

export default function TestScreen() {
  useEffect(() => {
    GoogleSignin.configure({
      webClientId: '395581119193-i1453vhpt4evrq5e8q7g2u840on3j8nk.apps.googleusercontent.com',
    });
  }, []);

  const onGoogleButtonPress = async () => {
    try {
      // 1. 구글 로그인 창 열기
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log(userInfo);
      const idToken = userInfo.data?.idToken;
      /*
      if (!idToken) {
        // if you are using older versions of google-signin, try old style result
        idToken = userInfo.idToken;
      }
      */
      if (!idToken) {
        throw new Error('No ID token found');
      }
      // 2. 구글 토큰으로 Firebase 인증 크레덴셜 생성
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      // 3. Firebase에 로그인 요청
      await auth().signInWithCredential(googleCredential);

      console.log('User signed in!');
    } catch (error) {
      const err = error as any;

      if (err.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('사용자가 로그인 취소함');
      } else if (err.code === statusCodes.IN_PROGRESS) {
        console.log('로그인이 이미 진행 중임');
      } else if (err.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('Google Play 서비스가 사용 불가능함');
      } else {
        console.error('기타 오류:', err);
      }
    }
  };

  return (
    <View>
      <Button title="Google Sign-In" onPress={onGoogleButtonPress} />
    </View>
  );
}
