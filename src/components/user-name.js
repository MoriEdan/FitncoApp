import React, { useState } from 'react';
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  View,
  Image
} from 'react-native';
import { COLORS, TextProps, width } from '../constants';
import I18n from '../language';
const styles = StyleSheet.create({
  nameText: {
    color: COLORS.BLACK,
    fontWeight: 'bold',
    fontSize: 15
  },
  wr: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 20,
    height: 20,
    resizeMode: 'contain'
  }
});

export const UserName = ({
  name,
  is_vip,
  type,
  diet_type
}) => {
  return (
    <View style={styles.wr}>
      <Text style={styles.nameText}>{name}</Text>
      {type == 'online' ?
        <Image source={require('../assets/icons/online.png')} style={styles.icon} /> :
        <Image source={require('../assets/icons/facetoface.png')} style={styles.icon} />}
      {is_vip == 1 && <Image source={require('../assets/icons/vip.png')} style={styles.icon} />}
      {diet_type && diet_type == 1 && <Image source={require('../assets/icons/lolipop.png')} style={styles.icon} />}

    </View>
  );
};
