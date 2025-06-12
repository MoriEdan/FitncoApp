import React from 'react';
import { Text, StyleSheet, TouchableOpacity, View, Image } from 'react-native';
import { COLORS, } from '../constants';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
const logoWidth = 60;
const styles = StyleSheet.create({
  wr: {
    width: logoWidth,
    height: logoWidth,
    backgroundColor: COLORS.PRIMARY,
    borderRadius: logoWidth / 2,
    alignItems: 'center',
    justifyContent: 'center'
  },
  logo: {
    width: logoWidth - 5,
    height: logoWidth - 5
  }


});

export const RadialLogo = ({ connected, style, imageStyle }) => {
  const navigation = useNavigation()
  const color = connected ? COLORS.PRIMARY : COLORS.GRAY
  return (

    <View
      style={{ ...styles.wr, ...style }}>
      <Image source={require('../assets/image/logo.png')} style={{ ...styles.logo, ...imageStyle }} />
    </View >
  );
};
