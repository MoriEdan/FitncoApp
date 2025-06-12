import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, Platform } from 'react-native';
import { width, height, COLORS } from '../../constants';
import { Header, Button, Container } from '../../components';
import { useNavigation } from '@react-navigation/native';
import { useIsFocused } from '@react-navigation/core';
import IconAnt from 'react-native-vector-icons/AntDesign';
import {
  HeaderLeftIcon,
  TimeZoneIcon,
  BlackChevronRightIcon,
} from '../../assets/icons';

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
  buttonWr: {
    alignSelf: 'center',
    position: 'absolute',

    bottom: Platform.OS == 'ios' ? height * 0.11 : height * 0.05,
  },
  texts: {
    height: 110,
    justifyContent: 'space-around',
  },
  boldText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: COLORS.BLACK,
  },
  desc: {
    textAlign: 'center',
    marginHorizontal: 70,
    lineHeight: 20,
    color: COLORS.TEXT
  },
  btnTimeZone: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    flexDirection: 'row',
    width: '90%',
    height: 40,
    borderColor: COLORS.PRIMARY,
    borderWidth: 1,
    borderRadius: 50,
    marginTop: 20,
  },
  btnTimeLeft: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  clockIcon: {
    marginRight: 9,
  },
  popupScreen: {
    position: 'absolute',
    top: '0',
    left: '0',
  },
  timeZoneText: {
    color: COLORS.TEXT
  }
});

export const TimeZoneScreen = props => {
  const [timeZone, setTimezone] = useState('İstanbul, Türkiye');

  const isFocused = useIsFocused();
  const navigation = useNavigation();

  useEffect(() => { }, [isFocused]);

  return (
    <Container style={styles.wr} >
      <View style={styles.content}>
        <Header
          leftIcon={<HeaderLeftIcon />}
          leftOnPress={() => {
            navigation.goBack();
          }}
          text="Tarih ve Zaman"
        />
        <View style={[styles.content, styles.texts]}>
          <Text style={styles.boldText}>Zaman Dilimi</Text>
          <Text style={styles.desc}>
            Lütfen bulunmuş olduğunuz zaman dilimini seçiniz.
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('TimeZoneSearch');
          }}
          style={styles.btnTimeZone}>
          <View style={styles.btnTimeLeft}>
            <TimeZoneIcon style={styles.clockIcon} />
            <Text style={styles.timeZoneText}>{timeZone}</Text>
          </View>
          <BlackChevronRightIcon />
        </TouchableOpacity>
        <View style={[styles.buttonWr]}>
          <Button
            text="Devam et"
            onPress={() => {
            }}
          />
        </View>
      </View>
    </Container>
  );
};
