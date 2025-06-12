import React, { useEffect, useRef, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
} from 'react-native';
import {
  APPROVALS,
  APPROVE,
  COLORS,
  height,
  NOTE_UPDATE,
  PROFILE_UPDATE,
} from '../../../constants';
import { Header, Button, CustomRawBottom, Container } from '../../../components';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import ToggleSwitch from 'toggle-switch-react-native';
import {
  HeaderLeftIcon,
  BlackCloseIcon,
  BlackChevronRightIcon,
} from '../../../assets/icons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
const styles = StyleSheet.create({
  content: {
    flex: 1,
    paddingHorizontal: 20,
    height: height * 0.8,
  },
  wr: {
    flex: 1,
  },
  wrapperItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 0.2,
    borderBottomColor: COLORS.GRAY,
    height: 50,
  },
  text: {
    fontSize: 16,
    color: COLORS.TEXT,
  },
  buttonWr: {
    alignSelf: 'center',
    position: 'absolute',
    bottom: height * 0.05,
  },
  buttonStyle: {},

  filterText: {
    fontSize: 17,
    color: COLORS.BLACK,
  },

  checkPosition: {
    position: 'absolute',
    right: 0,
    borderRadius: 100,
  },

  activeCheckBox: {
    // borderColor: '#FFCB37',
    borderColor: COLORS.PRIMARY,
  },
  notActiveCheckBox: {
    borderColor: COLORS.GRAY,
  },
  rightIconStyle: {
    width: 50,
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
});

const UserInfos = ({ userInfos, setUserInfos }) => {
  const refRBSheet = useRef();
  const [selects, setSelects] = useState([]);
  const [selected, setSelected] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(undefined);
  const [header, setHeader] = useState('');

  return userInfos.map((item, index) => {
    return (
      <View key={index} style={styles.wrapperItem}>
        <Text style={styles.text}>{item.name}</Text>
        {item?.type == 'switch' ? (
          <ToggleSwitch
            isOn={item.value}
            onColor={COLORS.SUCCESS}
            offColor={COLORS.LIGHT_GRAY}
            size="medium"
            onToggle={isOn => {
              let newArr = [...userInfos];
              newArr[index].value = isOn;
              setUserInfos([...newArr]);
              if (item?.onPress) {
                item.onPress(isOn);
              }
            }}
          />
        ) : item?.type == 'select' ? (
          <>
            <TouchableOpacity
              onPress={() => {
                setSelects(item.selects);
                setSelectedIndex(index);
                setHeader(item?.name);
                refRBSheet.current.open();
              }}>
              <Text style={styles.text}>{item.value}</Text>
            </TouchableOpacity>
            <CustomRawBottom ref={refRBSheet}>
              <Text style={styles.rawHeader}>{header}</Text>
              {selects.map(element => {
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
                    let newArr = [...userInfos];
                    newArr[selectedIndex].value = selected;
                    setUserInfos([...newArr]);
                    setSelected('');
                    refRBSheet.current.close();
                  }}
                />
              </View>
            </CustomRawBottom>
          </>
        ) : (
          <TextInput
            style={styles.input}
            value={item.value}
            placeholder={item.name}
            placeholderTextColor={COLORS.GRAY}
            onChangeText={val => {
              let newArr = [...userInfos];
              newArr[index].value = val;
              setUserInfos([...newArr]);
            }}
          />
        )}
      </View>
    );
  });
};
export const SetUserScreen = props => {
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const [selectedSections, setSelectedSections] = useState([]);
  const [userInfos, setUserInfos] = useState([]);
  const [selectedFilterName, setSelectedFilterName] = useState('');
  const { user } = props.route.params;

  const [isSectionScreenOpen, setIsSectionsScreenOpen] = useState(false);

  useEffect(() => {
    getData();
  }, [isFocused]);

  const getData = () => {
    console.log('user');
    console.log(user);
    setUserInfos([
      {
        id: 0,
        name: 'Kullanıcı Bilgisi',
        value: user?.info,
      },
      {
        id: 1,
        name: 'Hedef Kilo',
        value: user?.target + '',
      },
      {
        id: 2,
        name: 'Yürüyüşe Uygunluk',
        value: user?.canWalk == 0 ? false : true,
        type: 'switch',
      },
      {
        id: 3,
        name: 'Kullanıcı Tipi',
        value: user?.type == 'online' ? 'Online' : 'Yüzyüze',
        type: 'select',
        selects: ['Yüzyüze', 'Online'],
      },
      {
        id: 4,
        name: 'VIP',
        value: user?.vip == 0 ? false : true,
        type: 'switch',
      },
      {
        id: 5,
        name: 'Üyelik Yenileme Tarihi',
        value: user?.date,
      },
      {
        id: 6,
        name: 'İlk Kilo',
        value: user?.begining,
      },
    ]);
  };

  const saveUser = async () => {
    console.log(parseInt(userInfos[5].value));
    if (parseInt(userInfos[5].value)) {
      const token = await AsyncStorage.getItem('token');
      const data = {
        client: user?.id,
        target: userInfos[1].value,
        type: userInfos[3].value == 'Online' ? 'online' : 'facetoface',
        vip: userInfos[4].value ? '1' : '0',
        can_walk: userInfos[2].value ? '1' : '0',
        payment_day:
          userInfos[5].value == '' ? undefined : parseInt(userInfos[5].value),
        begining: userInfos[6].value,
      };
      console.log(data);
      axios
        .post(
          NOTE_UPDATE,
          {
            user_id: user?.id,
            notes: userInfos[0].value,
          },
          { headers: { Authorization: 'Bearer ' + token } },
        )
        .then(res => { })
        .catch(e => {
          console.log(e);
          Alert.alert('', 'Bilinmeyen bir hata oluştu.');
        });
      axios
        .post(PROFILE_UPDATE, data, {
          headers: { Authorization: 'Bearer ' + token },
        })
        .then(res => {
          navigation.goBack();
        })
        .catch(e => {
          console.log(e.response.data);
          if (e.response.data.data[0]) {
            Alert.alert('', e.response.data.data[0].value);
          } else {
            Alert.alert('Bilinmeyen bir hata oluştu.');
          }
        });
    } else {
      Alert.alert('', 'Üyelik yenileme tarihi rakam olmalı.');
    }
  };
  const resetPass = async () => {
    Alert.alert(
      '',
      'Şifre güncelleme işleminden sonra danışanınız şifre alanına "Fit2024" yazarak giriş yapabilecektir. İşlemi onaylıyor musunuz? ',
      [
        { text: 'Hayır', onPress: () => { } },
        {
          text: 'Evet',
          onPress: async () => {
            const token = await AsyncStorage.getItem('token');
            const data = {
              client: user?.id,
              password: 'Fit2024',
            };
            console.log(data);
            axios
              .post(PROFILE_UPDATE, data, {
                headers: { Authorization: 'Bearer ' + token },
              })
              .then(res => {
                console.log(res.data);
                Alert.alert('', 'Şifre başarıyla  sıfırlandı.');
              })
              .catch(e => {
                console.log(e.response.data);
                if (e.response.data.data[0]) {
                  Alert.alert('', e.response.data.data[0].value);
                } else {
                  Alert.alert('Bilinmeyen bir hata oluştu.');
                }
              });
          },
        },
      ],
    );
  };
  return (
    <Container style={styles.wr}>
      <Header
        leftIcon={<HeaderLeftIcon />}
        leftOnPress={() => {
          isSectionScreenOpen
            ? setIsSectionsScreenOpen(false)
            : navigation.goBack();
        }}
        text={'Danışanı Düzenle'}
        rightIconStyle={styles.rightIconStyle}
      />
      <ScrollView>
        <View style={styles.content}>
          <View style={styles.filtres}>
            <UserInfos userInfos={userInfos} setUserInfos={setUserInfos} />
          </View>
          <View style={[styles.buttonWr]}>
            <Button
              buttonStyle={{ ...styles.buttonStyle, marginBottom: 20 }}
              text={'Şifreyi Sıfırla'}
              onPress={resetPass}
            />
            <Button
              buttonStyle={styles.buttonStyle}
              text={'Kaydet'}
              onPress={saveUser}
            />
          </View>
        </View>
      </ScrollView>
    </Container>
  );
};
