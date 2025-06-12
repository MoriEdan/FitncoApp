import React, {useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {COLORS, height, UPDATE_ME, USER} from '../../constants';
import {Button, Container, CustomRawBottom, Header} from '../../components';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {CheckIcon, HeaderLeftIcon} from '../../assets/icons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
const styles = StyleSheet.create({
  content: {
    flex: 1,
    paddingHorizontal: 20,
    marginBottom: 50,
  },
  wr: {
    flex: 1,
  },
  info: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 0.2,
    borderBottomColor: COLORS.BOTTOM_COLOR,
    paddingVertical: 12,
  },
  infoText: {
    fontSize: 16,
    color: COLORS.TEXT,
  },
  input: {
    color: COLORS.TEXT,
    flex: 1,
    textAlign: 'right',
    fontSize: 16,
    textAlignVertical: 'center',
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
  buttonWr: {
    alignSelf: 'center',
    position: 'absolute',
    bottom: height * 0.05,
  },
  buttonStyle: {},
  saveText: {
    color: COLORS.TEXT,
    fontSize: 15,
  },
});

export const ProfileEditScreen = props => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userHeight, setUserHeight] = useState('');
  const [userWeight, setUserWeight] = useState('');
  const [gender, setGender] = useState('Erkek');
  const refRBSheet = useRef();
  const [age, setAge] = useState('');
  useEffect(() => {
    getData();
  }, [isFocused]);
  const getData = async () => {
    const token = await AsyncStorage.getItem('token');
    axios
      .get(USER, {headers: {Authorization: 'Bearer ' + token}})
      .then(res => {
        const info = res?.data?.data;
        console.log(info);

        setAge(info?.info?.age + '');
        console.log(info?.info?.gender);
        setGender(info?.info?.gender == 'male' ? 'Erkek' : 'Kadın');
        setUserHeight(info?.info?.height + '');
        setUserWeight(info?.info?.target + '');
        setName(info?.name);
        setLastName(info?.last_name);
      })
      .catch(e => {
        console.log(e);
      });
  };
  const save = async () => {
    const token = await AsyncStorage.getItem('token');
    axios
      .post(
        UPDATE_ME,
        {
          timezone: 57,
          gender: gender == 'Erkek' ? 'male' : 'female',
          age: age,
          height: userHeight,
          target: userWeight,
          name: name,
          last_name: lastName,
        },
        {headers: {Authorization: 'Bearer ' + token}},
      )
      .then(res => {
        console.log(res.data);
        navigation.goBack();
      })
      .catch(e => {
        console.log(e);
      });
  };
  const selects = ['Erkek', 'Kadın'];
  return (
    <Container style={styles.wr}>
      <Header
        leftIcon={<HeaderLeftIcon />}
        leftOnPress={() => {
          navigation.goBack();
        }}
        rightIcon={<Text style={styles.saveText}>Kaydet</Text>}
        rightOnPress={save}
        text="Kişisel Bilgi"
      />
      <ScrollView>
        <View style={styles.content}>
          <View style={styles.infos}>
            <View style={styles.info}>
              <Text style={styles.infoText}>Ad</Text>
              <TextInput
                style={styles.input}
                value={name}
                placeholder={'Ad'}
                placeholderTextColor={COLORS.GRAY}
                onChangeText={val => {
                  setName(val);
                }}
              />
            </View>
            <View style={styles.info}>
              <Text style={styles.infoText}>Soyad</Text>
              <TextInput
                style={styles.input}
                value={lastName}
                placeholder={'Soyad'}
                placeholderTextColor={COLORS.GRAY}
                onChangeText={val => {
                  setLastName(val);
                }}
              />
            </View>

            <View style={styles.info}>
              <Text style={styles.infoText}>Boy</Text>
              <TextInput
                style={styles.input}
                value={userHeight}
                placeholder={'Boy'}
                placeholderTextColor={COLORS.GRAY}
                onChangeText={val => {
                  setUserHeight(val);
                }}
              />
            </View>
            <View style={styles.info}>
              <Text style={styles.infoText}>Cinsiyet</Text>
              <TouchableOpacity
                onPress={() => {
                  refRBSheet.current.open();
                }}>
                <Text style={{...styles.infoText, paddingVertical: 8}}>
                  {gender}
                </Text>
              </TouchableOpacity>
              <CustomRawBottom ref={refRBSheet}>
                <Text style={styles.rawHeader}>{'Cinsiyet'}</Text>
                {selects.map(element => {
                  return (
                    <TouchableOpacity
                      onPress={() => {
                        setGender(element);
                      }}
                      style={styles.rawWr}>
                      <Text style={styles.rawText}>{element}</Text>
                      {gender == element ? (
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
                      refRBSheet.current.close();
                    }}
                  />
                </View>
              </CustomRawBottom>
            </View>
            <View style={styles.info}>
              <Text style={styles.infoText}>Yaş</Text>
              <TextInput
                style={styles.input}
                value={age}
                placeholder={'Yaş'}
                placeholderTextColor={COLORS.GRAY}
                onChangeText={setAge}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </Container>
  );
};
