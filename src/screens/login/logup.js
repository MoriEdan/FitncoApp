import React, {useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Platform,
  ScrollView,
} from 'react-native';
import {
  width,
  height,
  COLORS,
  APPROVALS,
  LOGIN,
  USER,
  STATU,
} from '../../constants';
import {useIsFocused} from '@react-navigation/core';
import {Button, Container, Header, RadialLogo} from '../../components';
import I18n from '../../language';
import {useNavigation} from '@react-navigation/native';
import {HeaderLeftIcon} from '../../assets/icons';

import auth from '@react-native-firebase/auth';
import axios from 'axios';
const styles = StyleSheet.create({
  wr: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  content: {
    flex: 1,
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
    color: COLORS.BLACK,
    fontSize: 14,
    fontWeight: 'bold',
  },
  button: {
    marginVertical: height * 0.01,
    height: 45,
    borderRadius: 25,
  },
  buttonWr: {
    marginTop: Platform.OS == 'ios' ? height * 0.46 : height * 0.4,
  },
});

export const LogupScreen = props => {
  const isFocused = useIsFocused();
  const navigation = useNavigation();

  return (
    <Container style={styles.wr}>
      <ScrollView>
        <View style={styles.content}>
          <Header
            text="Değişime Başla"
            leftIcon={<HeaderLeftIcon />}
            leftOnPress={() => {
              navigation.goBack();
            }}
          />
          <RadialLogo style={styles.logo} />
          <Text style={styles.text}>{'Değişim için harekete geç!'}</Text>
          <View style={styles.buttonWr}>
            <Button
              text={'Giriş Yap'}
              onPress={() => {
                navigation.navigate('Signin');
              }}
              buttonStyle={styles.button}
            />
            <Button
              text={'Kayıt Ol'}
              onPress={() => {
                navigation.navigate('NameSurnameScreen');
              }}
              buttonStyle={styles.button}
            />
          </View>
        </View>
      </ScrollView>
    </Container>
  );
};
