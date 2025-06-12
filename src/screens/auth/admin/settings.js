import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Switch,
  TouchableOpacity,
  Alert,
  Linking,
} from 'react-native';
import {
  APPROVALS,
  COLORS,
  getData,
  height,
  SYSTEM,
  TIMEZONES,
  UPDATE_ME,
  USER,
} from '../../../constants';
import {Header, Button, Container} from '../../../components';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {RadialLogo} from '../../../components';
import {HeaderLeftIcon, BlackChevronRightIcon} from '../../../assets/icons';
import ToggleSwitch from 'toggle-switch-react-native';
import axios from 'axios';
import * as RNLocalize from 'react-native-localize';
import AsyncStorage from '@react-native-async-storage/async-storage';
//import OpenSettings from 'react-native-open-settings';
const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 20,
    height: height * 0.85,
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
    color: COLORS.TEXT,
  },
  timeZones: {
    marginTop: 32,
  },
  logoWr: {
    alignItems: 'center',
    margin: height * 0.05,
  },
  logoText: {color: COLORS.TEXT, marginTop: 15},
  logoImage: {
    width: 65,
    height: 65,
  },
  logo: {
    width: 70,
    height: 70,
    borderRadius: 45,
  },
  buttonWr: {
    alignSelf: 'center',
    position: 'absolute',
    bottom: height * 0.05,
  },
  buttonStyle: {
    backgroundColor: COLORS.LIGHT_GRAY,
    height: 50,
  },
});

export const SettingsScreen = props => {
  const navigation = useNavigation();
  const [isEnabled, setIsEnabled] = useState(undefined);
  const [isEnabledTime, setIsEnabledTime] = useState(false);
  const [user, setUser] = useState(undefined);
  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused) {
      getData();
    }
  }, [isFocused]);
  useEffect(() => {
    if (isFocused) {
      getClosed();
    }
  }, [isFocused]);
  const getClosed = async () => {
    const token = await AsyncStorage.getItem('token');
    axios
      .get(SYSTEM, {headers: {Authorization: 'Bearer ' + token}})
      .then(res => {
        console.log(res.data);
        setIsEnabled(res.data.data.statu == 0);
      })
      .catch(e => {
        console.log(e);
      });
  };
  const getData = async () => {
    const token = await AsyncStorage.getItem('token');
    axios
      .get(USER, {headers: {Authorization: 'Bearer ' + token}})
      .then(res => {
        setUser(res.data.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const toggleSwitch = async status => {
    const token = await AsyncStorage.getItem('token');
    console.log(SYSTEM);
    console.log({
      statu: status ? 1 : 0,
    });
    axios
      .post(
        SYSTEM,
        {
          statu: status ? 1 : 0,
        },
        {headers: {Authorization: 'Bearer ' + token}},
      )
      .then(res => {
        console.log(res.data);
        getClosed();
      })
      .catch(e => {
        console.log(e);
        console.log(e.response.data);
        Alert.alert('Bilinmeyen bir hata oluştu.');
      });
    //setIsEnabled(status);
  };

  const toggleSwitchTime = async isOn => {
    setIsEnabledTime(previousState => !previousState);
    if (isOn) {
      axios.get(TIMEZONES).then(async res => {
        let zone = res.data.data.find(
          item => item.zone == RNLocalize.getTimeZone(),
        );
        if (zone) {
          const token = await AsyncStorage.getItem('token');
          axios
            .post(
              UPDATE_ME,
              {
                timezone: zone?.id,
              },
              {headers: {Authorization: 'Bearer ' + token}},
            )
            .then(res => {
              getData();
            })
            .catch(e => {
              console.log(e);
            });
        }
      });
    }
  };
  return (
    <Container style={styles.wr}>
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
            {/*<TouchableOpacity style={styles.wrapperItem}>
              <Text style={styles.text}>Hizmet Şartları</Text>
              <BlackChevronRightIcon />
      </TouchableOpacity>*/}
            <TouchableOpacity
              onPress={() => {
                //TODO
                Linking.openURL('https://www.fitnco.fit/terms-of-use');
              }}
              style={styles.wrapperItem}>
              <Text style={styles.text}>Gizlilik</Text>
              <BlackChevronRightIcon />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.wrapperItem}
              onPress={() => {
                //OpenSettings.openSettings()
                //Linking.openSettings();
              }}>
              <Text style={styles.text}>Bildirimler</Text>
              <BlackChevronRightIcon />
            </TouchableOpacity>
            {user?.type != 'client' && (
              <>
                <TouchableOpacity
                  onPress={() => navigation.navigate('QuickMessages')}
                  style={styles.wrapperItem}>
                  <Text style={styles.text}>Hazır Mesajlar</Text>
                  <BlackChevronRightIcon />
                </TouchableOpacity>
                <View style={styles.wrapperItem}>
                  <Text style={styles.text}>Sistem Kapatma</Text>
                  {isEnabled != undefined && (
                    <ToggleSwitch
                      isOn={!isEnabled}
                      onColor={COLORS.SUCCESS}
                      offColor={COLORS.LIGHT_GRAY}
                      size="medium"
                      onToggle={toggleSwitch}
                    />
                  )}
                </View>
              </>
            )}
            <TouchableOpacity
              onPress={() => navigation.navigate('SetPass', {user: user})}
              style={styles.wrapperItem}>
              <Text style={styles.text}>Şifremi Değiştir</Text>
              <BlackChevronRightIcon />
            </TouchableOpacity>
            {user?.type == 'client' && (<TouchableOpacity
              onPress={() => Linking.openURL('https://forms.gle/CD5q2TYQYG9rPskw9')}
              style={styles.wrapperItem}>
              <Text style={styles.text}>Hesabımı Sil</Text>
              <BlackChevronRightIcon />
            </TouchableOpacity>)}
          </View>
          {user?.type == 'client' && (
            <>
              <View style={styles.timeZones}>
                <View style={styles.wrapperItem}>
                  <Text style={styles.text}>Otomatik Zaman dilimi</Text>
                  <ToggleSwitch
                    isOn={isEnabledTime}
                    onColor={COLORS.SUCCESS}
                    offColor={COLORS.LIGHT_GRAY}
                    size="medium"
                    onToggle={toggleSwitchTime}
                  />
                </View>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('TimeZoneSearch');
                  }}
                  style={styles.wrapperItem}>
                  <Text style={styles.text}>Zaman Dilimi</Text>
                  <Text style={styles.textOpacity}>{user?.zone?.title}</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
          <View style={styles.logoWr}>
            <RadialLogo style={styles.logo} imageStyle={styles.logoImage} />
            <Text style={[styles.textOpacity, styles.logoText]}>
              Version 1.0.1
            </Text>
          </View>
          <View style={[styles.buttonWr]}>
            <Button
              buttonStyle={styles.buttonStyle}
              text="Çıkış"
              onPress={() => {
                AsyncStorage.removeItem('token');
                navigation.navigate('Login', {screen: 'Splash'});
              }}
            />
          </View>
        </View>
      </ScrollView>
    </Container>
  );
};
