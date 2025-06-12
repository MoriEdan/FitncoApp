import React, {useState, useRef, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native';
import {
  width,
  height,
  COLORS,
  USER,
  WATER,
  HOME,
  PLAN,
  style,
  SPORT,
  SYSTEM,
  WEBVIEW,
} from '../../constants';
import {Alert, Button, Container, Header, MealPlan} from '../../components';
import {
  GeneralWithNotifIcon,
  PlusIcon,
  BlackCalenderIcon,
  BlackChevronRightIcon,
  WaterIcon,
  ActiveWaterIcon,
  YogaIcon,
  TenisIcon,
  YuzmeIcon,
  CardioIcon,
  CheckIcon,
  ProfileEditIcon,
  SettingsIcon,
  EliptikIcon,
  BoksIcon,
} from '../../assets/icons';
import {CustomRawBottom} from '../../components';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import axios from 'axios';
import moment from 'moment';
import {Picker} from '@react-native-picker/picker';
import {WebView} from 'react-native-webview';
import AsyncStorage from '@react-native-async-storage/async-storage';
const styles = StyleSheet.create({
  wr: {
    flex: 1,
  },
  content: {
    flex: 1,
    height: height * 0.9,
  },
  nameText: {
    color: COLORS.BLACK,
    fontSize: 22,
    fontWeight: 'bold',
  },
  statusText: {
    color: COLORS.BLACK,
    fontSize: 14,
    marginVertical: 8,
  },
  expText: {
    color: COLORS.BLACK,
    fontSize: 12,
    marginBottom: 10,
  },
  headerWr: {
    flexDirection: 'row',
    marginTop: 20,
    width: width * 0.9,
    alignSelf: 'center',
    justifyContent: 'space-between',
  },
  textWr: {
    flex: 3,
  },
  imageWr: {
    flex: 1,
    flexDirection: 'row-reverse',
  },
  statusImage: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  infoText: {
    color: COLORS.GRAY,
  },
  itemHeaderWr: {
    width: width * 0.9,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: height * 0.035,
  },
  headerIcon: {
    width: 25,
    height: 25,
    resizeMode: 'contain',
    marginRight: 3,
  },
  headerText: {
    fontSize: 20,
    color: COLORS.BLACK,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  itemsWr: {
    width: width * 0.9,
    marginTop: 15,
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    borderRadius: 15,
    backgroundColor: COLORS.WHITE,
    shadowColor: COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,

    elevation: 12,
  },
  itemText: {
    color: COLORS.GRAY,
    fontSize: 18,
  },
  dayText: {
    color: COLORS.GRAY,
    fontSize: 15,
    marginLeft: 5,
  },
  itemWr: {
    width: width * 0.82,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.BOTTOM_COLOR,
  },
  itemTextWr: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 1,
  },
  productsWr: {
    width: width * 0.9,
    marginTop: height * 0.035,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    alignItems: 'center',
    borderRadius: 15,
    paddingVertical: 5,
    backgroundColor: COLORS.WHITE,
    shadowColor: COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,

    elevation: 12,
  },
  productImage: {
    width: width * 0.25,
    height: width * 0.25,
    resizeMode: 'contain',
  },
  rawHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.TEXT,
    alignSelf: 'center',
    marginVertical: 10,
    paddingTop: 15,
  },
  waterIconContent: {
    width: width * 0.9,
    alignSelf: 'center',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: COLORS.WHITE,
    shadowColor: COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,
    marginTop: 20,
  },
  sportIconContent: {
    width: width * 0.9,
    alignSelf: 'center',
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  sportIconItem: {
    width: width * 0.25,
    height: width * 0.36,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  sportIconWr: {
    height: '65%',
    justifyContent: 'center',
    width: '93%',
    alignItems: 'center',
    backgroundColor: COLORS.WHITE,
    shadowColor: COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,
    borderRadius: 10,
  },
  sporName: {
    fontSize: 15,
    fontWeight: 'bold',
    color: COLORS.TEXT,
  },
  row: {
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: width * 0.8 - 10,
    marginBottom: 10,
  },
  rowSport: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
  },
  selectedText: {
    color: COLORS.GRAY,
  },
  reccomendedText: {
    color: COLORS.GRAY,
  },
  pickerWr: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pickerText: {
    color: COLORS.TEXT,

    marginHorizontal: 20,
  },
  picker: {
    width: width * 0.3,
    height: height * 0.28,
    borderRadius: 20,
    color: COLORS.BLACK,
  },
});

export const DailyJourneyScreen = props => {
  const isFocused = useIsFocused();
  const [mealVisible, setMealVisible] = useState(false);
  const [user, setUser] = useState(undefined);
  const [sportStep, setSportStep] = useState('type');
  const [mealDetail, setMealDetail] = useState([]);
  const [selectedSportHour, setSelectedSportHour] = useState(0);
  const [selectedSportMinute, setSelectedSportMinute] = useState(0);
  const [selectedSportType, setSelectedSportType] = useState(0);
  const [link, setLink] = useState('');
  //raw refs
  const waterRef = useRef();
  const sportRef = useRef();
  const navigation = useNavigation();
  useEffect(() => {
    getData();
  }, [isFocused]);

  /* const getData = async () => {
    const token = await AsyncStorage.getItem('token');
    axios
      .get(HOME, {headers: {Authorization: 'Bearer ' + token}})
      .then(res => {
        setUser(res.data.data);
      })
      .catch(e => {
        console.log(e);
      });
  };*/
  const getData = async () => {
    const token = await AsyncStorage.getItem('token');
    axios
      .get(WEBVIEW, {headers: {Authorization: 'Bearer ' + token}})
      .then(res => {
        setLink(res?.data?.data?.link);
        console.log(res?.data?.data?.link);
      })
      .catch(e => {
        console.log(e);
      });
  };
  const saveSport = async () => {
    const hour = selectedSportHour ? selectedSportHour : 0;
    const minute = selectedSportMinute ? selectedSportMinute : 0;
    const token = await AsyncStorage.getItem('token');
    axios
      .post(
        SPORT,
        {
          sport: selectedSportType,
          during: hour + ':' + minute,
        },
        {headers: {Authorization: 'Bearer ' + token}},
      )
      .then(res => {
        getData();
        sportRef.current.close();
        setSportStep('type');
      })
      .catch(e => {
        console.log(e);
      });
  };
  const setMeal = async id => {
    const token = await AsyncStorage.getItem('token');
    axios
      .get(PLAN + id, {headers: {Authorization: 'Bearer ' + token}})
      .then(res => {
        setMealDetail(
          res.data.data.repeats.map(item => ({
            image: item.images[0],
            repeat: item.repeat,
          })),
        );
      })
      .catch(e => {
        console.log(e);
      });
  };
  const reminders = [
    {
      text: 'Yürüyüş',
      icon: 'plus-circle',
      onPress: () => {
        props.navigation.navigate('Messaging');
      },
      value: 'walking',
    },
    {
      text: 'Spor',
      icon: 'plus-circle',
      onPress: () => {
        setSportStep('type');
        setSelectedSportHour(0);
        setSelectedSportMinute(0);
        sportRef.current.open();
      },
      value: 'sport',
    },
  ];
  const sports = [
    {
      icon: <YogaIcon />,
      name: 'Pilates',
      click: () => {
        setSportStep('duration');
        setSelectedSportType(1);
      },
    },
    {
      icon: <TenisIcon />,
      name: 'Tenis',
      click: () => {
        setSportStep('duration');
        setSelectedSportType(2);
      },
    },
    {
      icon: <YuzmeIcon />,
      name: 'Yüzme',
      click: () => {
        setSportStep('duration');
        setSelectedSportType(3);
      },
    },
    {
      icon: <EliptikIcon />,
      name: 'Eliptik',
      click: () => {
        setSportStep('duration');
        setSelectedSportType(4);
      },
    },
    {
      icon: <BoksIcon />,
      name: 'Boks',
      click: () => {
        setSportStep('duration');
        setSelectedSportType(5);
      },
    },
  ];

  const products = [
    {
      image: require('../../assets/image/daily-journey-product.png'),
    },
    {
      image: require('../../assets/image/daily-journey-product.png'),
    },
    {
      image: require('../../assets/image/daily-journey-product.png'),
    },
  ];
  const waters = [
    {
      value: '1',
    },
    {
      value: '2',
    },
    {
      value: '3',
    },
    {
      value: '4',
    },
    {
      value: '5',
    },
    {
      value: '6',
    },
  ];
  const setWater = async item => {
    const token = await AsyncStorage.getItem('token');
    waterRef.current.close();
    axios
      .post(
        WATER,
        {
          water: item.value,
        },
        {headers: {Authorization: 'Bearer ' + token}},
      )
      .then(res => {
        getData();
      })
      .catch(e => {
        console.log(e);
      });
  };
  const dayDiff = (date1, date2) => {
    const diff = moment(date2).diff(moment(date1), 'days') + 1;
    return '(' + diff + ' Gün)';
  };
  const formatPlanText = (date1, date2) => {
    const months = [
      'Ocak',
      'Şubat',
      'Mart',
      'Nisan',
      'Mayıs',
      'Haziran',
      'Temmuz',
      'Ağustos',
      'Eylül',
      'Ekim',
      'Kasım',
      'Aralık',
    ];
    const day1 = moment(date1).date();
    const day2 = moment(date2).date();
    const month = moment(date2).month();
    return day1 + '-' + day2 + ' ' + months[month];
  };

  const water = () => {
    const is_selected = user?.water > 5;
    return (
      <View
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          ...styles.itemWr,
          borderBottomWidth: 1,
        }}>
        <View style={styles.itemTextWr}>
          <Text style={styles.itemText}>{'Su'}</Text>
        </View>
        {!is_selected ? (
          <TouchableOpacity
            onPress={() => {
              waterRef.current.open();
            }}>
            <PlusIcon />
          </TouchableOpacity>
        ) : (
          <CheckIcon />
        )}
      </View>
    );
  };
  const diet = () => {
    console.log(user?.active_plan_type);
    const diets = [
      {
        text: 'Kahvaltı',
        icon: 'plus-circle',
        onPress: () => {
          sportRef.current.open();
        },
        value: 'breakfast',
      },
      user?.active_plan_type == 2 && {
        text: 'Öğle Yemeği',
        icon: 'plus-circle',
        onPress: () => {
          sportRef.current.open();
        },
        value: 'lunch',
      },
      {
        text: 'Akşam Yemeği',
        icon: 'plus-circle',
        onPress: () => {
          sportRef.current.open();
        },
        value: 'dinner',
      },
    ];
    const selected = diets.find(element => user?.[element.value] == 0);

    return (
      <View
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          ...styles.itemWr,
          borderBottomWidth: 1,
        }}>
        <View style={styles.itemTextWr}>
          <Text style={styles.itemText}>
            {selected ? selected?.text : 'Öğün'}
          </Text>
        </View>
        {selected ? (
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate('Messaging');
            }}>
            <PlusIcon />
          </TouchableOpacity>
        ) : (
          <CheckIcon />
        )}
      </View>
    );
  };

  return (
    <Container style={styles.wr}>
      <View style={styles.content}>
        <WebView style={{flex: 1}} source={{uri: link}} />
        {/*  <View>
          <View style={styles.itemHeaderWr}>
            <GeneralWithNotifIcon style={styles.headerIcon} />

            <Text style={styles.headerText}>Hatırlatıcılar</Text>
          </View>
          <View style={styles.itemsWr}>
            {diet()}
            {water()}
            {reminders.map((item, index) => {
              const is_selected =
                user?.[item?.value] === undefined || user?.[item?.value] === 0;
              if (user?.can_walk == 0 && item.text == 'Yürüyüş') {
              } else {
                return (
                  <View
                    // eslint-disable-next-line react-native/no-inline-styles
                    style={{
                      ...styles.itemWr,
                      borderBottomWidth: index === reminders.length - 1 ? 0 : 1,
                    }}>
                    <View style={styles.itemTextWr}>
                      <Text style={styles.itemText}>{item.text}</Text>
                      <Text style={styles.dayText}>{item?.dayText}</Text>
                    </View>
                    {is_selected ? (
                      <TouchableOpacity onPress={item.onPress}>
                        <PlusIcon />
                      </TouchableOpacity>
                    ) : (
                      <CheckIcon />
                    )}
                  </View>
                );
              }
            })}
          </View>
        </View>
        {user?.active_plan_id && (
          <View>
            <View style={styles.itemHeaderWr}>
              <BlackCalenderIcon style={styles.headerIcon} />

              <Text style={styles.headerText}>Güncel Plan</Text>
            </View>
            <View style={styles.itemsWr}>
              <TouchableOpacity
                onPress={() => {
                  setMeal(user?.active_plan_id);
                  setMealVisible(true);
                }}
                style={styles.itemWr}>
                <View style={styles.itemTextWr}>
                  <Text style={styles.itemText}>
                    {formatPlanText(
                      user?.active_plan_start,
                      user?.active_plan_end,
                    )}
                  </Text>
                  <Text style={styles.dayText}>
                    {dayDiff(user?.active_plan_start, user?.active_plan_end)}
                  </Text>
                </View>
                <BlackChevronRightIcon />
              </TouchableOpacity>
            </View>
          </View>
        )}}
        {/*<View>
            <View style={styles.productsWr}>
              {products.map((item, index) => {
                return (
                  <View style={{}}>
                    <Image source={item?.image} style={styles.productImage} />
                  </View>
                );
              })}
            </View>
            </View>*/}
      </View>

      <MealPlan
        visible={mealVisible}
        setVisible={value => setMealVisible(value)}
        images={mealDetail}
      />

      <CustomRawBottom ref={waterRef}>
        <Text style={styles.rawHeader}>
          {'Lütfen içtiğin su miktarını gir'}
        </Text>

        <View style={styles.waterIconContent}>
          <View style={styles.row}>
            {waters.map((item, index) => {
              return (
                <TouchableOpacity onPress={() => setWater(item)}>
                  {user?.water > index ? <ActiveWaterIcon /> : <WaterIcon />}
                </TouchableOpacity>
              );
            })}
          </View>
          <View style={{...styles.row, marginBottom: 0, paddingVertical: 7}}>
            <Text style={styles.selectedText}>{user?.water / 2} litre</Text>
            <Text style={styles.reccomendedText}>Günlük 3 litre önerilir.</Text>
          </View>
        </View>
      </CustomRawBottom>
      <CustomRawBottom ref={sportRef} height={height * 0.5}>
        <Text style={styles.rawHeader}>
          {sportStep === 'type'
            ? 'Aşağıdaki spor türlerinden birini seçiniz.'
            : 'Spor yaptığınız süreyi giriniz '}
        </Text>

        <View style={styles.sportIconContent}>
          {sportStep === 'type' ? (
            <View style={styles.rowSport}>
              {sports.map((sport, index) => {
                return (
                  <View key={index} style={styles.sportIconItem}>
                    <TouchableOpacity
                      onPress={sport.click}
                      style={styles.sportIconWr}>
                      {sport.icon}
                    </TouchableOpacity>

                    <Text style={styles.sporName}>{sport.name}</Text>
                  </View>
                );
              })}
            </View>
          ) : (
            <View>
              <View style={styles.pickerWr}>
                <Picker
                  selectedValue={selectedSportHour}
                  style={styles.picker}
                  onValueChange={(itemValue, itemIndex) =>
                    setSelectedSportHour(itemValue)
                  }>
                  {['', '', '', '', '', '', '', '', '', '', '', ''].map(
                    (item, index) => {
                      return (
                        <Picker.Item
                          label={index.toString()}
                          value={index.toString()}
                        />
                      );
                    },
                  )}
                </Picker>
                <Text style={styles.pickerText}>Saat</Text>
                <Picker
                  selectedValue={selectedSportMinute}
                  style={styles.picker}
                  onValueChange={(itemValue, itemIndex) =>
                    setSelectedSportMinute(itemValue)
                  }>
                  {[
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',
                  ].map((item, index) => {
                    return (
                      <Picker.Item
                        label={index.toString()}
                        value={index.toString()}
                      />
                    );
                  })}
                </Picker>
                <Text style={styles.pickerText}>Dakika</Text>
              </View>
              <Button onPress={saveSport} text="Kaydet" />
            </View>
          )}
        </View>
      </CustomRawBottom>
    </Container>
  );
};
