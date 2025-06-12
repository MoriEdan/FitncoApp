import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Switch,
  TouchableOpacity,
} from 'react-native';
import { COLORS, height } from '../../constants';
import { Header, Button, Container } from '../../components';
import { useNavigation } from '@react-navigation/native';
import { RadialLogo } from '../../components';
import { HeaderLeftIcon, BlackChevronRightIcon } from '../../assets/icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
const styles = StyleSheet.create({
  content: {
    flex: 1,
    paddingHorizontal: 20,
    height,
  },
  wr: {
    flex: 1,
  },
  wrapperItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.BOTTOM_COLOR,
    paddingVertical: 13,
  },
  text: {
    fontSize: 17,
    color: COLORS.TEXT,
  },
  textOpacity: {
    opacity: 0.5,
  },
  timeZones: {
    marginTop: 32,
  },
  logoWr: {
    alignItems: 'center',
    margin: height * 0.1,
  },
  logoText: { color: COLORS.TEXT, marginTop: 15 },
  logoImage: {
    width: 65,
    height: 65,
  },
  logo: {
    width: 75,
    height: 75,
    borderRadius: 35,
  },
  buttonWr: {
    alignSelf: 'center',
    position: 'absolute',
    bottom: height * 0.1,
  },
  buttonStyle: {
    backgroundColor: COLORS.LIGHT_GRAY,
    height: 50,
  },
});

export const SettingsScreen = props => {
  const navigation = useNavigation();
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  return (
    <Container style={styles.wr} >
      <Header
        leftIcon={<HeaderLeftIcon />}
        leftOnPress={() => {
          navigation.goBack();
        }}
        text="Ayarlar"
      />
      <ScrollView>
        <View style={styles.content}>
          <View style={styles.infos}>
            <TouchableOpacity style={styles.wrapperItem}>
              <Text style={styles.text}>Terms of Services</Text>
              <BlackChevronRightIcon />
            </TouchableOpacity>
            <TouchableOpacity style={styles.wrapperItem}>
              <Text style={styles.text}>Privacy Policy</Text>
              <BlackChevronRightIcon />
            </TouchableOpacity>
            <TouchableOpacity style={styles.wrapperItem}>
              <Text style={styles.text}>Notifications</Text>
              <BlackChevronRightIcon />
            </TouchableOpacity>
          </View>
          <View style={styles.timeZones}>
            <View style={styles.wrapperItem}>
              <Text style={styles.text}>Otomatik Zaman dilimi</Text>
              <Switch
                trackColor={{ false: '#E5E5E5', true: '#E5E5E5' }}
                thumbColor={isEnabled ? '#white' : '#white'}
                ios_backgroundColor="white"
                onValueChange={toggleSwitch}
                value={isEnabled}
              />
            </View>
            <TouchableOpacity onPress={() => { }} style={styles.wrapperItem}>
              <Text style={styles.text}>Zaman Dilimi</Text>
              <Text style={styles.textOpacity}>İstanbul +03:00</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.logoWr}>
            <RadialLogo style={styles.logo} imageStyle={styles.logoImage} />
            <Text style={[styles.textOpacity, styles.logoText]}>
              Version 1.0.1
            </Text>
          </View>
          <View style={[styles.buttonWr]}>
            <Button
              buttonStyle={styles.buttonStyle}
              text="Çıkış Yap"
              onPress={() => {
                AsyncStorage.removeItem('token');
                navigation.navigate('Login', { screen: 'Splash' });
              }}
            />
          </View>
        </View>
      </ScrollView>
    </Container>
  );
};
