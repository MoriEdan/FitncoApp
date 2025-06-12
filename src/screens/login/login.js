import React, {useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  ScrollView,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  View,
  TouchableOpacity,
  Linking,
} from 'react-native';
import {width, height, COLORS, LOGIN, USER, ERROR} from '../../constants';
import {Header, Button, Container} from '../../components';
import {useNavigation} from '@react-navigation/native';
import {useIsFocused} from '@react-navigation/core';
import {HeaderLeftIcon} from '../../assets/icons';
import axios from 'axios';
import messaging from '@react-native-firebase/messaging';
import {
  check,
  request,
  requestNotifications,
  PERMISSIONS,
  RESULTS,
  checkNotifications,
} from 'react-native-permissions';
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
  texts: {
    height: 110,
    justifyContent: 'space-around',
  },
  boldText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: COLORS.BLACK,
  },
  container: {
    flex: 1,
  },
  desc: {
    color: COLORS.TEXT,
    textAlign: 'center',
    marginHorizontal: 70,
    lineHeight: 20,
  },
  inputs: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    marginTop: 7,
    marginTop: height * 0.05,
  },
  input: {
    paddingHorizontal: 20,
    width: '100%',
    borderColor: COLORS.PRIMARY,
    borderWidth: 1,
    borderRadius: 50,
    height: 40,
    color: COLORS.TEXT,
    marginVertical: 10,
  },
  buttonWr: {
    alignSelf: 'center',
    position: 'absolute',
    bottom: Platform.OS == 'ios' ? height * 0.07 : height * 0.05,
  },
  buttonStyle: {
    height: 50,
  },
  forgotPass: {
    width: width * 0.8,
    alignSelf: 'center',
    flexDirection: 'row-reverse',
  },
  forgotText: {
    color: COLORS.PRIMARY,
  },
});

export const LoginScreen = props => {
  const [state, setState] = useState({
    mail: '',
    pass: '',
  });
  const mailRef = useRef();
  const passRef = useRef();
  const _onChange = (value, name) => setState({...state, [name]: value});
  const [canItProgress, setCanItProgress] = useState(false);
  const permissionDatas = [
    {
      permission: {
        ios: PERMISSIONS.IOS.CAMERA,
        android: PERMISSIONS.ANDROID.CAMERA,
      },
    },
    /*{
      permission: {
        ios: PERMISSIONS.IOS.PHOTO_LIBRARY,
        android: PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
      },
    },*/
    {},
  ];
  useEffect(() => {
    if (state.mail.length && state.pass.length) {
      setCanItProgress(true);
    } else {
      setCanItProgress(false);
    }
  }, [state]);

  const isFocused = useIsFocused();
  const navigation = useNavigation();

  useEffect(() => {
    if (isFocused){
      requestNotifications(['alert', 'badge', 'sound']).then(
        ({status, settings}) => {
          switch (status) {
            case RESULTS.GRANTED:
              break;
            default:
          }
        },
      );
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
        //  setTimeout(()=>navigation.navigate('Permissions', { type }),1000);
          }
        }
      })
      .catch(error => {
          if (Platform.OS !== 'ios'){
        //  setTimeout(()=>navigation.navigate('Permissions', { type }),1000);
          }
      });
  };

  const login = async () => {
    let fcmToken = '';
    try {
      fcmToken = await messaging().getToken();
    } catch (e) {
      fcmToken = 'huawei';
    }
    console.log(LOGIN);
    axios
      .post(LOGIN, {
        email: state.mail,
        password: state.pass,
        device: fcmToken,
        os: Platform.OS,
      })
      .then(res => {
        if (res?.data?.data?.token) {
          AsyncStorage.setItem('token', res?.data?.data?.token);
          axios
            .get(USER, {
              headers: {Authorization: 'Bearer ' + res?.data?.data?.token},
            })
            .then(res => {
              AsyncStorage.setItem('type', res?.data?.data?.type);
              if (res?.data?.data?.type == 'client') {

                permissionDatas.forEach(item => {
                  if (res.data.data.status == 0 || res.data.data.status == 1) {
                    if (item?.permission) {
                      checkPermission(item, res?.data?.data?.type);
                    }
                    navigation.navigate('Splash');
                  } else {
                    navigation.navigate('Approval', {
                      mail: state.mail,
                      password: state.pass,
                    });
                  }
                });
              } else {
                if (res.data.data.status != 0) {
                  permissionDatas.forEach(item => {
                    if (item?.permission) {
                      checkPermission(item, res?.data?.data?.type);
                    }
                  });
                  navigation.navigate('Splash');
                } else {
                  Alert.alert('', 'Hatalı kullanıcı adı ve/veya şifre');
                  AsyncStorage.clear();
                }
              }
            })
            .catch(e => {
              Alert.alert('', 'Bilinmeyen bir hata oluştu');
              AsyncStorage.clear();
            });
        } else {
          Alert.alert('', 'Bilinmeyen bir hata oluştu');
          AsyncStorage.clear();
        }
      })
      .catch(e => {
        console.log(e?.response?.data);
        if (e?.response?.data?.code == 403) {
          navigation.navigate('Approval', {
            mail: state.mail,
            password: state.pass,
          });
        } else {
          axios
            .post(ERROR, {error: e.toString()})
            .then(() => {
              console.log('sended');
              Alert.alert('', 'Hatalı kullanıcı adı ve/veya şifre');
              AsyncStorage.clear();
            })
            .catch(e => {
              console.log(e);
              Alert.alert('', 'Hatalı kullanıcı adı ve/veya şifre');
              AsyncStorage.clear();
            });
        }
      });
  };
  return (
    <Container style={styles.wr} isKeyboard={true}>
      <View style={styles.content}>
        <Header
          text="Giriş"
          leftIcon={<HeaderLeftIcon />}
          leftOnPress={() => {
            navigation.goBack();
          }}
        />
        <View style={[styles.content, styles.texts]}>
          <Text style={styles.boldText}>Merhaba</Text>
          <Text style={styles.desc}>Seni burada görmek ne güzel!</Text>
        </View>
        <View style={styles.inputs}>
          <TextInput
            style={styles.input}
            value={state?.mail}
            placeholder="Mail Adresiniz"
            placeholderTextColor={COLORS.GRAY}
            onChangeText={value => _onChange(value, 'mail')}
            ref={mailRef}
            autoCapitalize="none"
            onSubmitEditing={event => passRef.current.focus()}
          />
          <TextInput
            style={styles.input}
            value={state?.pass}
            placeholder="Şifreniz"
            placeholderTextColor={COLORS.GRAY}
            onChangeText={value => _onChange(value, 'pass')}
            ref={passRef}
            secureTextEntry
          />
        </View>

        <TouchableOpacity
          style={styles.forgotPass}
          onPress={() => navigation.navigate('ForgotPass')}>
          <Text style={styles.forgotText}>Şifremi Unuttum</Text>
        </TouchableOpacity>
      </View>
      <View style={[styles.buttonWr]}>
        <Button
          disabled={!canItProgress}
          buttonStyle={{
            ...styles.buttonStyle,
            backgroundColor: canItProgress ? COLORS.PRIMARY : COLORS.LIGHT_GRAY,
          }}
          text="Giriş Yap"
          onPress={login}
        />
      </View>
    </Container>
  );
};
