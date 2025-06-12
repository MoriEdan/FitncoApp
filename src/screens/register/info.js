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
  TouchableOpacity,
  Platform,
} from 'react-native';
import {width, height, COLORS, APPROVALS, CHECK_EMAIL} from '../../constants';
import {Header, Button, Container, CustomRawBottom} from '../../components';
import {useNavigation} from '@react-navigation/native';
import {useIsFocused} from '@react-navigation/core';
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
    position: 'absolute',
    bottom: height * 0.05,
  },
  buttonStyle: {
    height: 50,
  },
  text: {
    fontSize: 16,
    color: COLORS.TEXT,
  },
  rawWr: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
    paddingHorizontal: 20,
  },
  rawText: {
    color: COLORS.TEXT,
    fontSize: 16,
  },
  circle: {
    width: 25,
    height: 25,
    borderWidth: 2,
    borderRadius: 15,
    borderColor: COLORS.GRAY,
  },
  selectedCircle: {
    width: 25,
    height: 25,
    borderWidth: 2,
    borderRadius: 15,
    borderColor: COLORS.PRIMARY,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    width: 16,
    height: 16,
    borderRadius: 10,
    backgroundColor: COLORS.PRIMARY,
  },
  rawHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.TEXT,
    alignSelf: 'center',
    marginVertical: 10,
  },
});

export const InfoScreen = props => {
  const [state, setState] = useState({
    /* age: '18',
    gender: 'Erkek',
    target: '50',
    weight: '80',
    height: '180',
    canWalk: 'Yürüyüşe Uygun',*/
    age: '',
    gender: '',
    target: '',
    weight: '',
    height: '',
    canWalk: '',
  });
  const nameRef = useRef();
  const surnameRef = useRef();
  const mailRef = useRef();
  const weightRef = useRef();
  const heightRef = useRef();
  const canWalkRef = useRef();
  const refRBSheet = useRef();
  const refGender = useRef();
  const _onChange = (value, name) => setState({...state, [name]: value});
  const [canItProgress, setCanItProgress] = useState(false);
  const [selected, setSelected] = useState('');
  const genders = ['Erkek', 'Kadın'];
  const walks = ['Yürüyüşe Uygun', 'Yürüyüş Yapamaz'];
  useEffect(() => {
    if (
      state.age.length &&
      state.gender.length &&
      state.target.length &&
      state.weight.length &&
      state.height.length &&
      state.canWalk.length
    ) {
      setCanItProgress(true);
    } else {
      setCanItProgress(false);
    }
  }, [state]);

  const isFocused = useIsFocused();
  const navigation = useNavigation();

  useEffect(() => {}, [isFocused]);
  const register = () => {
    navigation.navigate('TimeZoneSearch', {
      ...props.route.params,
      age: state?.age,
      gender: state?.gender,
      target: state?.target,
      weight: state?.weight,
      height: state?.height,
      canWalk: state.canWalk,
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
              value={state?.age}
              returnKeyType="next"
              placeholder="Yaş"
              placeholderTextColor={COLORS.GRAY}
              onChangeText={value => _onChange(value, 'age')}
              ref={nameRef}
              onSubmitEditing={event => surnameRef.current.focus()}
            />

            <>
              <TouchableOpacity
                style={{width: '100%'}}
                onPress={() => {
                  refGender.current.open();
                }}>
                <TextInput
                  style={styles.input}
                  value={state?.gender}
                  pointerEvents="none"
                  placeholder="Cinsiyet"
                  placeholderTextColor={COLORS.GRAY}
                  onChangeText={value => _onChange(value, 'gender')}
                  ref={surnameRef}
                  returnKeyType="next"
                  editable={false}
                  selectTextOnFocus={false}
                  onSubmitEditing={event => mailRef.current.focus()}
                />
              </TouchableOpacity>
              <CustomRawBottom ref={refGender}>
                <Text style={styles.rawHeader}>{'Cinsiyet'}</Text>
                {genders.map(element => {
                  return (
                    <TouchableOpacity
                      onPress={() => {
                        setSelected(element);
                      }}
                      style={styles.rawWr}>
                      <Text style={styles.rawText}>{element}</Text>
                      {selected == element ? (
                        <View style={styles.selectedCircle}>
                          <View style={styles.dot} />
                        </View>
                      ) : (
                        <View style={styles.circle} />
                      )}
                    </TouchableOpacity>
                  );
                })}
                <View style={styles.buttonWr}>
                  <Button
                    text={'Onayla'}
                    onPress={() => {
                      _onChange(selected, 'gender');
                      refGender.current.close();
                    }}
                  />
                </View>
              </CustomRawBottom>
            </>
            <TextInput
              style={styles.input}
              value={state?.target}
              placeholder="Hedef Kilo"
              placeholderTextColor={COLORS.GRAY}
              onChangeText={value => _onChange(value, 'target')}
              ref={mailRef}
              returnKeyType="next"
              onSubmitEditing={event => weightRef.current.focus()}
            />
            <TextInput
              style={styles.input}
              value={state?.weight}
              placeholder="Mevcut Kilo"
              placeholderTextColor={COLORS.GRAY}
              onChangeText={value => _onChange(value, 'weight')}
              ref={weightRef}
              returnKeyType="next"
              onSubmitEditing={event => heightRef.current.focus()}
            />
            <TextInput
              style={styles.input}
              value={state?.height}
              placeholder="Boy"
              placeholderTextColor={COLORS.GRAY}
              onChangeText={value => _onChange(value, 'height')}
              ref={heightRef}
              returnKeyType="next"
              //onSubmitEditing={(event) => (canWalkRef.current.focus())}
            />

            <>
              <TouchableOpacity
                style={{width: '100%'}}
                onPress={() => {
                  refRBSheet.current.open();
                }}>
                <TextInput
                  style={styles.input}
                  value={state?.canWalk}
                  placeholder="Yürüyüşe Uygunluk"
                  placeholderTextColor={COLORS.GRAY}
                  onChangeText={value => _onChange(value, 'canWalk')}
                  ref={surnameRef}
                  returnKeyType="next"
                  pointerEvents="none"
                  editable={false}
                  selectTextOnFocus={false}
                  onSubmitEditing={event => mailRef.current.focus()}
                />
              </TouchableOpacity>
              <CustomRawBottom ref={refRBSheet}>
                <Text style={styles.rawHeader}>{'Yürüyüşe Uygunluk'}</Text>
                {walks.map(element => {
                  return (
                    <TouchableOpacity
                      onPress={() => {
                        setSelected(element);
                      }}
                      style={styles.rawWr}>
                      <Text style={styles.rawText}>{element}</Text>
                      {selected == element ? (
                        <View style={styles.selectedCircle}>
                          <View style={styles.dot} />
                        </View>
                      ) : (
                        <View style={styles.circle} />
                      )}
                    </TouchableOpacity>
                  );
                })}
                <View style={styles.buttonWr}>
                  <Button
                    text={'Onayla'}
                    onPress={() => {
                      _onChange(selected, 'canWalk');
                      refRBSheet.current.close();
                    }}
                  />
                </View>
              </CustomRawBottom>
            </>
          </View>
          <View
            style={[
              {
                alignSelf: 'center',
                marginVertical:
                  Platform.OS == 'ios' ? height * 0.11 : height * 0.05,
              },
            ]}>
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
