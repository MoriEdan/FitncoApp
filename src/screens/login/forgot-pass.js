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
} from 'react-native';
import {width, height, COLORS, LOGIN, USER, RESET_PASS} from '../../constants';
import {Header, Button, Container} from '../../components';
import {useNavigation} from '@react-navigation/native';
import {useIsFocused} from '@react-navigation/core';
import {HeaderLeftIcon} from '../../assets/icons';
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
  texts: {
    height: 110,
    alignItems: 'center',
    justifyContent: 'center',
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
    marginHorizontal: 20,
    lineHeight: 20,
  },
  inputs: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    marginTop: 7,
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
});

export const ForgotPassScreen = props => {
  const [mail, setMail] = useState('');
  const [loading, setLoading] = useState(false);
  const [canItProgress, setCanItProgress] = useState(false);
  useEffect(() => {
    if (mail.length) {
      setCanItProgress(true);
    } else {
      setCanItProgress(false);
    }
  }, [mail]);

  const isFocused = useIsFocused();
  const navigation = useNavigation();

  useEffect(() => {}, [isFocused]);

  const login = () => {
    if (!loading) {
      setLoading(true);
      console.log('here');
      axios
        .post(RESET_PASS, {email: mail})
        .then(res => {
          Alert.alert(
            '',
            'Yeni şifreniz, girmiş olduğunuz maile iletilmiştir. Lütfen tüm gelen kutularınızı kontrol edin ve yeni gelen şifreniz ile giriş işlemini deneyin',
            [
              {
                text: 'Tamam',
                onPress: () => {
                  navigation.navigate('Login');
                },
              },
            ],
          );
        })
        .catch(e => {
          console.log(e);
          if (e.response.data.data) {
            Alert.alert('', e.response.data.data[0].value);
          } else {
            Alert.alert('', 'Bilinmeyen bir hata oluştu.');
          }
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };
  return (
    <Container style={styles.wr} isKeyboard={true}>
      <View style={styles.content}>
        <Header
          text="Şifremi Unuttum"
          leftIcon={<HeaderLeftIcon />}
          leftOnPress={() => {
            navigation.goBack();
          }}
        />
        <View style={[styles.content, styles.texts]}>
          <Text style={styles.boldText}>Merhaba</Text>
        </View>
        <View style={styles.inputs}>
          <TextInput
            style={styles.input}
            value={mail}
            placeholder="Mail Adresiniz"
            placeholderTextColor={COLORS.GRAY}
            onChangeText={value => setMail(value)}
            autoCapitalize="none"
          />
        </View>
        <View style={[styles.content, styles.texts]}>
          <Text style={styles.desc}>
            Lütfen sistemde kayıtlı e-posta adresinizi girin. Aksi takdirde
            şifre sıfırlama işleminiz başarı ile gerçekleştirilemeyecektir.
          </Text>
        </View>
      </View>
      <View style={[styles.buttonWr]}>
        <Button
          disabled={!canItProgress}
          buttonStyle={{
            ...styles.buttonStyle,
            backgroundColor: canItProgress ? COLORS.PRIMARY : COLORS.LIGHT_GRAY,
          }}
          text="Şifremi Sıfırla"
          onPress={login}
          loading={loading}
        />
      </View>
    </Container>
  );
};
