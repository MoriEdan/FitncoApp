import React, {useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
  Platform,
} from 'react-native';
import {APPROVALS, APPROVE, COLORS, height} from '../../../constants';
import {Header, Button, CustomRawBottom, Container} from '../../../components';
import {useIsFocused, useNavigation} from '@react-navigation/native';
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
    marginTop: 30,
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

const UserInfos = ({userInfos, setUserInfos}) => {
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
export const NewUserScreen = props => {
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const [selectedSections, setSelectedSections] = useState([]);
  const [userInfos, setUserInfos] = useState([]);
  const [selectedFilterName, setSelectedFilterName] = useState('');
  const {user} = props.route.params;

  const [isSectionScreenOpen, setIsSectionsScreenOpen] = useState(false);

  useEffect(() => {
    getData();
  }, [isFocused]);

  const getData = async () => {
    const type = await AsyncStorage.getItem('type');
    console.log(type);
    console.log(user);
    /**
     * {"date": "28.02.2022", "email": "Burakcenan@gmail.com2", "id": 1706, "info": {"age": 20, "can_walk": 0, "created_at": "2022-02-28T08:10:37.000000Z", "gender": "male", "height": 180, "id": 167, "notes": null, "target": 36, "type": "online", "updated_at": "2022-02-28T08:10:37.000000Z", "user_id": 1706, "vip": 0, "weight": 60}, "name": "Burak Cenan", "picture": "https://fitnco.lapstech.live//uploads/dOn3QXZxjtqNpsZyHyLTXFOwAwXIeZCpMA64OJBN.jpg"}
     */
    if (type == 'dietician') {
      setUserInfos([
        {
          id: 0,
          name: 'İsim',
          value: user?.name,
        },
        {
          id: 1,
          name: 'Soyisim',
          value: user?.last_name,
        },
        {
          id: 2,
          name: 'Yaş',
          value: user?.info?.age + '',
        },
        {
          id: 3,
          name: 'Cinsiyet',
          value: user?.info?.gender == 'male' ? 'Erkek' : 'Kadın',
          type: 'select',
          selects: ['Erkek', 'Kadın'],
        },
        {
          id: 4,
          name: 'Mevcut Kilo',
          value: user?.info?.weight + '',
        },
        {
          id: 5,
          name: 'Hedef Kilo',
          value: user?.info?.target + '',
        },
        {
          id: 6,
          name: 'Boy',
          value: user?.info?.height + '',
        },
        {
          id: 7,
          name: 'Yürüyüşe Uygunluk',
          value: user?.info?.can_walk == 0 ? false : true,
          type: 'switch',
        },
        {
          id: 8,
          name: 'User Type',
          value: user?.info?.type == 'online' ? 'Online' : 'Yüzyüze',
          type: 'select',
          selects: ['Yüzyüze', 'Online'],
        },
        {
          id: 9,
          name: 'VIP Status',
          value: user?.info?.vip == 0 ? false : true,
          type: 'switch',
        },
      ]);
    } else {
      setUserInfos([
        {
          id: 0,
          name: 'İsim',
          value: user?.name,
        },
        {
          id: 1,
          name: 'Soyisim',
          value: user?.last_name,
        },
        {
          id: 2,
          name: 'Yaş',
          value: user?.info?.age + '',
        },
        {
          id: 3,
          name: 'Cinsiyet',
          value: user?.info?.gender == 'male' ? 'Erkek' : 'Kadın',
          type: 'select',
          selects: ['Erkek', 'Kadın'],
        },
        {
          id: 4,
          name: 'Mevcut Kilo',
          value: user?.info?.weight + '',
        },
        {
          id: 5,
          name: 'Hedef Kilo',
          value: user?.info?.target + '',
        },
        {
          id: 6,
          name: 'Boy',
          value: user?.info?.height + '',
        },
        {
          id: 7,
          name: 'Yürüyüşe Uygunluk',
          value: user?.info?.can_walk == 0 ? false : true,
          type: 'switch',
        },
        {
          id: 8,
          name: 'User Type',
          value: user?.info?.type == 'online' ? 'Online' : 'Yüzyüze',
          type: 'select',
          selects: ['Yüzyüze', 'Online'],
        },
        {
          id: 9,
          name: 'VIP Status',
          value: user?.info?.vip == 0 ? false : true,
          type: 'switch',
        },
        {
          id: 10,
          name: 'Diyetisyen Olarak Seç',
          value: false,
          type: 'switch',
          onPress: dietician,
        },
      ]);
    }
  };
  const dietician = isOn => {
    if (isOn) {
      setUserInfos([
        {
          id: 0,
          name: 'İsim',
          value: user?.name,
        },
        {
          id: 1,
          name: 'Soyisim',
          value: user?.last_name,
        },
        {
          id: 9,
          name: 'Diyetisyen Olarak Seç',
          value: true,
          type: 'switch',
          onPress: dietician,
        },
      ]);
    } else {
      getData();
    }
  };
  const approveUser = async () => {
    const token = await AsyncStorage.getItem('token');

    const type = await AsyncStorage.getItem('type');
    const data =
      userInfos.length > 9
        ? {
            user_id: user?.id,
            approve: 1,
            name: userInfos[0].value,
            last_name: userInfos[1].value,
            age: userInfos[2].value,
            weight: userInfos[4].value,
            height: userInfos[6].value,
            type: userInfos[8].value == 'Online' ? 'online' : 'facetoface',
            vip: userInfos[9].value ? '1' : '0',
            target: userInfos[5].value,
            can_walk: userInfos[7].value ? '1' : '0',
            gender: userInfos[3].value == 'Erkek' ? 'male' : 'female',
            dietician:
              type == 'dietician' ? 0 : userInfos[10].value ? '1' : '0',
          }
        : {
            user_id: user?.id,
            name: userInfos[0].value,
            last_name: userInfos[1].value,
            dietician: userInfos[2].value ? '1' : '0',
            approve: 1,
            age: user?.info?.age,
            weight: user?.info?.weight,
            height: user?.info?.height,
            type: user?.info?.type,
            vip: user?.info?.vip,
            target: user?.info?.target,
            can_walk: user?.info?.can_walk,
            gender: user?.info?.gender,
          };
    console.log(data);
    axios
      .post(APPROVE, data, {headers: {Authorization: 'Bearer ' + token}})
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
        text={'Yeni Danışan'}
        rightIconStyle={styles.rightIconStyle}
      />
      <ScrollView style={{flex: 1}}>
        <View style={styles.content}>
          <View style={styles.filtres}>
            <UserInfos userInfos={userInfos} setUserInfos={setUserInfos} />
          </View>
          <View style={[styles.buttonWr]}>
            <Button
              buttonStyle={styles.buttonStyle}
              text={'Yeni Kullanıcı Onayla'}
              onPress={approveUser}
            />
          </View>
        </View>
      </ScrollView>
    </Container>
  );
};
