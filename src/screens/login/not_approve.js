import React, {useEffect} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {width, height, COLORS, APPROVALS, LOGIN, USER} from '../../constants';
import {useIsFocused} from '@react-navigation/core';
import {Button, Container, Header, RadialLogo} from '../../components';
import I18n from '../../language';
import {useNavigation} from '@react-navigation/native';
import {HeaderLeftIcon, RefreshIcon} from '../../assets/icons';

import axios from 'axios';
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
  logo: {
    alignSelf: 'center',
    marginTop: height * 0.06,
    marginBottom: height * 0.06,
  },
  text: {
    width: width * 0.9,
    alignSelf: 'center',
    textAlign: 'center',
    color: COLORS.TEXT,
    fontSize: 23,
    fontWeight: 'bold',
  },
  exp: {
    width: width * 0.9,
    alignSelf: 'center',
    textAlign: 'center',
    color: COLORS.GRAY,
    fontSize: 16,
    marginTop: 10,
  },
  button: {
    marginTop: height * 0.25,
    backgroundColor: COLORS.WHITE,
    borderWidth: 1,
    borderColor: 'rgba(45,35,60,0.24)',
    height: 45,
    borderRadius: 25,
  },
});

export const NotApproveScreen = props => {
  const isFocused = useIsFocused();
  const navigation = useNavigation();

  return (
    <Container style={styles.wr}>
      <View style={styles.content}>
        <Header
          text="Onay Bekleme"
          rightIcon={<RefreshIcon />}
          rightOnPress={() => {
            navigation.goBack();
          }}
        />
        <Text style={styles.text}>Değişim başlıyor</Text>

        <Text style={styles.exp}>
          Senin için en sağlıklı hedefleri belirlemek ve buna yönelik
          planlamaları yapmak için diyetisyenlerimiz hazırlanıyor. Kısa bir süre
          sonra görüşmek üzere.
        </Text>
      </View>
    </Container>
  );
};
