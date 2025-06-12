import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  Image,
  Alert,
  Platform,
  View,
} from 'react-native';
import {width, height, COLORS, STATU, LOGIN, USER} from '../../constants';
import {useNavigation} from '@react-navigation/native';
import {useIsFocused} from '@react-navigation/core';
import {Container, Header} from '../../components';
import {RefreshIcon} from '../../assets/icons';
import axios from 'axios';
import {ManagementList} from '..';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
const styles = StyleSheet.create({
  wr: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  content: {
    width,
    height,
    alignItems: 'center',
  },

  boldTitle: {
    fontWeight: 'bold',
    color: COLORS.BLACK,
    fontSize: 26,
    marginTop: 20,
  },
  paragraph: {
    paddingHorizontal: 50,
    textAlign: 'center',
    marginTop: 20,
    color: COLORS.BLACK,
  },
  imageFemaleWr: {
    height: '40%',
    marginTop: 50,
  },
  image: {
    height: '100%',
    resizeMode: 'contain',
  },
  imageLoadingWr: {
    height: '8%',
    marginTop: 40,
  },
});

export const ApprovalScreen = props => {
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const [refresh, setRefresh] = useState(0);

  const controlStatu = async () => {
    const {mail, password} = props.route.params;
    let fcmToken = '';
    try {
      fcmToken = await messaging().getToken();
    } catch (e) {
      fcmToken = 'huawei';
    }

    axios
      .post(LOGIN, {
        email: mail,
        password: password,
        device: fcmToken,
        os: Platform.OS,
      })
      .then(res => {
        AsyncStorage.setItem('token', res?.data?.data?.token);
        axios
          .get(USER, {
            headers: {Authorization: 'Bearer ' + res?.data?.data?.token},
          })
          .then(res => {
            console.log(res.data);
            if (res.data.data.status == 1) {
              AsyncStorage.setItem('type', res?.data?.data?.type);
              if (res.data.data.type == 'client') {
                navigation.navigate('Splash');
              } else {
                navigation.navigate('Splash');
              }
            }
          })
          .catch(e => {
            Alert.alert('', 'Bilinmeyen bir hata oluştu');
          });
      })
      .catch(e => {
        console.log(e);
      });
  };
  return (
    <Container style={styles.wr}>
      <View style={styles.content}>
        <Header
          rightIcon={<RefreshIcon />}
          rightOnPress={() => {
            controlStatu();
          }}
          text="Onay Bekleme"
        />
        <Text style={styles.boldTitle}>Değişim Başlıyor</Text>
        <Text style={styles.paragraph}>
          Fit’n Co uygulamasını kullanmanız için ekibimiz hazırlık yapıyor. Kısa
          bir süre içinde görüşmek üzere...
        </Text>
        <View style={styles.imageFemaleWr}>
          <Image
            style={styles.image}
            source={require('../../assets/image/empty-image.png')}
          />
        </View>
        <View style={styles.imageLoadingWr}>
          <Image
            style={styles.image}
            source={require('../../assets/icons/clock-loading-icon.png')}
          />
        </View>
      </View>
    </Container>
  );
};
