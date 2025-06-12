import React, {useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  ScrollView,
  SafeAreaView,
  KeyboardAvoidingView,
  Alert,
  View,
  Linking,
  Platform,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import {width, height, COLORS, APPROVALS, CHECK_EMAIL} from '../../constants';
import {Header, Button, Container} from '../../components';
import {useNavigation} from '@react-navigation/native';
import {useIsFocused} from '@react-navigation/core';
import axios from 'axios';
import {TouchableOpacity} from 'react-native-gesture-handler';

const styles = StyleSheet.create({
  wr: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  content: {
    flex: 1,
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
    marginVertical: Platform.OS == 'ios' ? height * 0.11 : height * 0.05,
  },
  buttonStyle: {
    height: 50,
  },
  checkBoxWr: {
    width: width * 0.82,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  checkBoxText: {
    color: COLORS.BLACK,
    marginLeft: 10,
  },
  checkBox: {
    borderWidth: 0,
  },
});

export const NameSurnameScreen = props => {
  const [state, setState] = useState({
    /* name: 'Burak',
    surname: 'Cenan',
    mail: 'burakcenan4@gmail.com',
    passagain: '123456',
    pass: '123456',
    parent: '',*/
    name: '',
    surname: '',
    mail: '',
    passagain: '',
    pass: '',
    parent: '',
  });

  const [kvkk, setKvkk] = useState(false);
  const nameRef = useRef();
  const surnameRef = useRef();
  const mailRef = useRef();
  const passRef = useRef();
  const passagainRef = useRef();
  const _onChange = (value, name) => setState({...state, [name]: value});
  const [canItProgress, setCanItProgress] = useState(false);
  const [age, setAge] = useState(false);
  const [approve, setApprove] = useState(false);
  useEffect(() => {
    if (
      state.name.length &&
      state.surname.length &&
      state.mail.length &&
      state.pass.length &&
      state.passagain.length &&
      kvkk
    ) {
      if (age) {
        if (approve && state.parent.length) {
          setCanItProgress(true);
        } else {
          setCanItProgress(false);
        }
      } else {
        setCanItProgress(true);
      }
    } else {
      setCanItProgress(false);
    }
  }, [state, age, approve, kvkk]);

  const isFocused = useIsFocused();
  const navigation = useNavigation();

  const register = () => {
    axios
      .get(CHECK_EMAIL + state?.mail)
      .then(res => {
        if (res.data?.status) {
          if (canItProgress) {
            if (state.pass == state.passagain) {
              navigation.navigate('Info', {
                name: state?.name,
                surname: state?.surname,
                password: state?.pass,
                mail: state?.mail,
                parent: state?.parent,
                isParent: age,
              });
            } else {
              Alert.alert('', 'Şifreniz eşleşmiyor.');
            }
          }
        } else {
          Alert.alert('', 'Mail daha önce kullanılmış ya da uygun değil.');
        }
      })
      .catch(e => {
        Alert.alert('', 'Mail daha önce kullanılmış ya da uygun değil.');
      });
  };
  return (
    <Container style={styles.wr} isKeyboard={true}>
      <ScrollView>
        <View style={styles.content}>
          <Header text="Kayıt" />
          <View style={[styles.content, styles.texts]}>
            <Text style={styles.boldText}>Aramıza hoşgeldin!</Text>
            <Text style={styles.desc}>
              Fit’n Co uygulamasını kullanmaya başlamadan senden birkaç bilgi
              istiyoruz.
            </Text>
          </View>
          <View style={styles.inputs}>
            <TextInput
              style={styles.input}
              value={state?.name}
              returnKeyType="next"
              placeholder="Adınız"
              placeholderTextColor={COLORS.GRAY}
              onChangeText={value => _onChange(value, 'name')}
              ref={nameRef}
              onSubmitEditing={event => surnameRef.current.focus()}
            />
            <TextInput
              style={styles.input}
              value={state?.surname}
              placeholder="Soyadınız"
              placeholderTextColor={COLORS.GRAY}
              onChangeText={value => _onChange(value, 'surname')}
              ref={surnameRef}
              onSubmitEditing={event => mailRef.current.focus()}
            />
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
              onSubmitEditing={event => passagainRef.current.focus()}
            />
            <TextInput
              style={styles.input}
              value={state?.passagain}
              placeholder="Şifreniz (Tekrar)"
              secureTextEntry
              placeholderTextColor={COLORS.GRAY}
              onChangeText={value => _onChange(value, 'passagain')}
              ref={passagainRef}
            />
            {age && (
              <>
                <TextInput
                  style={styles.input}
                  value={state?.parent}
                  placeholder="Veli Adı Soyadı"
                  placeholderTextColor={COLORS.GRAY}
                  onChangeText={value => _onChange(value, 'parent')}
                  ref={passagainRef}
                />
                <View style={styles.checkBoxWr}>
                  <CheckBox
                    value={approve}
                    onValueChange={setApprove}
                    disabled={false}
                    tintColors={{true: COLORS.SUCCESS, false: COLORS.GRAY}}
                    style={styles.checkBox}
                  />
                  <Text style={styles.checkBoxText}>
                    Velisi olarak onaylıyorum.
                  </Text>
                </View>
              </>
            )}
          </View>

          <View style={styles.checkBoxWr}>
            <CheckBox
              value={age}
              onValueChange={setAge}
              disabled={false}
              tintColors={{true: COLORS.SUCCESS, false: COLORS.GRAY}}
              style={styles.checkBox}
            />
            <Text style={styles.checkBoxText}>18 yaşından küçüğüm.</Text>
          </View>
          <View style={styles.checkBoxWr}>
            <CheckBox
              value={kvkk}
              onValueChange={setKvkk}
              disabled={false}
              tintColors={{true: COLORS.SUCCESS, false: COLORS.GRAY}}
              style={styles.checkBox}
            />
            <Text style={styles.checkBoxText}>
              <Text
                style={{color: COLORS.PRIMARY}}
                onPress={() =>
                  Linking.openURL('https://www.fitnco.fit/terms-of-use')
                }>
                Kişisel verilerin korunması
              </Text>{' '}
              hakkında bilgilendirmeyi okudum, onaylıyorum.
            </Text>
          </View>
          <View style={[styles.buttonWr]}>
            <Button
              disabled={!canItProgress}
              buttonStyle={{
                ...styles.buttonStyle,
                backgroundColor: canItProgress
                  ? COLORS.PRIMARY
                  : COLORS.LIGHT_GRAY,
              }}
              text="Devam et"
              onPress={register}
            />
          </View>
        </View>
      </ScrollView>
    </Container>
  );
};
