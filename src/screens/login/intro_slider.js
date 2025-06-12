import React, { useEffect } from 'react';
import { StyleSheet, View, Text, ImageBackground, Platform } from 'react-native';
import { width, height, COLORS } from '../../constants';
import { useIsFocused } from '@react-navigation/core';
import Swiper from 'react-native-swiper';
import { Button, Container, Dots, RadialLogo } from '../../components';
import I18n from '../../language';
import { useNavigation } from '@react-navigation/native';
const styles = StyleSheet.create({
  wr: {
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    alignSelf: 'center',
    marginTop: height * 0.08,
    marginBottom: height * 0.03,
  },
  slide: {
    flex: 1
  },
  text: {
    width: width * 0.9,
    alignSelf: 'center',
    textAlign: 'center',
    color: COLORS.BLACK,
    fontSize: 14,
  },
  buttonWr: {
    alignSelf: 'center',
    position: 'absolute',
    bottom: Platform.OS == 'ios' ? height * 0.1 : height * 0.08,
  },
  wrapper: {
    width: width,
    height: height,
  }
});

export const AppIntroSliderScreen = props => {
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const swipes = [
    {
      text: 'Seni burada görmek ne güzel! Sağlıklı bir yaşam için harekete geçerek ve değişime «evet» diyerek kendine en büyük iyiliği yaptın!',
      image: require('../../assets/image/intro-2.png'),
    },
    {
      text: 'Hep yanındayız! Fit’n Co, sağlıklı ve dengeli bir beslenmeyi hayat tarzın haline  getirmen  için gün boyu yanında, elinin altında!',
      image: require('../../assets/image/intro-1.png'),
    },
    {
      text: 'Güçlü iletişim, sağlıklı değişim Fit’n Co ile aramızdaki iletişim güçlendikçe, gelişimin de hızlanacak, sağlıkla gelen değişim yaşam kaliteni yükseltecek!',
      image: require('../../assets/image/intro-3.png'),
    },
  ];
  useEffect(() => { }, [isFocused]);

  return (
    <Container style={styles.wr} type={'view'}>
      <View style={styles.content}>
        <Swiper
          showsButtons={false}
          loop={false}
          dot={<View />}
          activeDot={<View />}>
          {swipes.map((item, index) => {
            return (
              <ImageBackground source={item?.image} style={styles.slide}>
                <RadialLogo style={styles.logo} />
                <Text style={styles.text}>{item?.text}</Text>
                <Dots activeIndex={index} length={swipes.length} />
              </ImageBackground>
            );
          })}
        </Swiper>
        <View style={styles.buttonWr}>
          <Button
            text="Değişime başla"
            onPress={() => {
              navigation.navigate('Logup');
            }}
          />
        </View>
      </View>
    </Container>
  );
};
