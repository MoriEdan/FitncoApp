import React, { useEffect } from 'react';
import { StyleSheet, View,  Image, Platform } from 'react-native';
import { width, height, COLORS, USER } from '../../constants';
import { useIsFocused } from '@react-navigation/core';
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { Container } from '../../components';
import {
  check,
  request,
  requestNotifications,
  checkPermission,
  PERMISSIONS,
  RESULTS,
  checkNotifications,
} from 'react-native-permissions';
import AsyncStorage from '@react-native-async-storage/async-storage';

const styles = StyleSheet.create({
  wr: {
    flex: 1,
    backgroundColor: COLORS.PRIMARY,
  },
  content: {
    width,
    height,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    resizeMode: 'contain',
    width: width * 0.75,
    height: width * 0.75,
  },
});

export const SplashScreen = props => {
  const isFocused = useIsFocused();
  const route = useRoute();
  const navigation = useNavigation();
  const permissionDatas = [
    {
      permission: {
        ios: PERMISSIONS.IOS.CAMERA,
        android: PERMISSIONS.ANDROID.CAMERA,
      },
    },
   /* {
      permission: {
        ios: PERMISSIONS.IOS.PHOTO_LIBRARY,
        android: PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
      },
    },*/
    {},
  ];
  useEffect(() => {
    if (isFocused) {
      setTimeout(function () {
        navigate();
      }, 1000);
    }
  }, [isFocused]);

  const checkPermission = (item, type) => {
    check(
      Platform.OS == 'ios' ? item?.permission?.ios : item?.permission?.android,
    )
      .then(result => {
        switch (result) {
          case RESULTS.GRANTED:
            // setSelection(true);
            console.log('granded');
            break;
          default:
            if (Platform.OS !== 'ios'){
             // navigation.navigate('Permissions', { type });
            }

          }
      })
      .catch(error => {
        if (Platform.OS !== 'ios'){
        //  navigation.navigate('Permissions', { type });
        }
      });
  };

  const navigate = async () => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      axios
        .get(USER, { headers: { Authorization: 'Bearer ' + token } })
        .then(res => {
          console.log(res.data);
          if (res.data.data.status == 1 || res.data.data.status == 0) {
            AsyncStorage.setItem('type', res?.data?.data?.type);
            if (res?.data?.data?.type == 'client') {
              console.log(res.data.data.status);
              if (res.data.data.status == 0 || res.data.data.status == 1) {
                permissionDatas.forEach(item => {
                  if (item?.permission) {
                    checkPermission(item, res?.data?.data?.type);
                  }
                });
                navigation.navigate('User');
              } else {
                AsyncStorage.clear();
                navigation.navigate('AppIntroSlider');
              }
            } else {
              if (res.data.data.status != 0) {
                permissionDatas.forEach(item => {
                  if (item?.permission) {
                    checkPermission(item, res?.data?.data?.type);
                  }
                });
                navigation.navigate('Admin');
              } else {
                AsyncStorage.clear();
                navigation.navigate('AppIntroSlider');
              }
            }
          } else {
            AsyncStorage.removeItem('token');
            navigation.navigate('AppIntroSlider');
          }
        })
        .catch(e => {
          console.log(e);
          AsyncStorage.removeItem('token');
          navigation.navigate('AppIntroSlider');
        });
    } else {
      AsyncStorage.removeItem('token');
      navigation.navigate('AppIntroSlider');
    }
  };

  return (
    <Container style={styles.wr}>
      <View style={styles.content}>
        <Image
          style={styles.logo}
          source={require('../../assets/image/logo.png')}
        />
      </View>
    </Container>
  );
};
