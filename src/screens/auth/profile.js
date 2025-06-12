import React, {useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
  TextInput,
  Platform,
  Modal,
  FlatList,
  Linking,
} from 'react-native';
import {
  width,
  COLORS,
  INBOX,
  CLIENT,
  height,
  LOG_WEIGHT,
  CLIENT_PROFILE,
  PROFILE,
  MY_PLANS,
  PLAN,
  UPDATE_ME,
  imageSelectOptions,
  ACTIVE_PLAN,
  MY_PLAN,
  WATER,
  SPORT,
  SYSTEM,
} from '../../constants';
import {
  request,
  PERMISSIONS,
  RESULTS,
} from 'react-native-permissions';
import {LineChart, BarChart} from 'react-native-chart-kit';
import {
  Button,
  Container,
  CustomRawBottom,
  Header,
  IosPicker,
  MealPlan,
  UserAlert,
} from '../../components';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {
  SettingsIcon,
  ProfileEditIcon,
  PlusIcon,
  CalenderIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  BlackNotifIcon,
  WaterIcon,
  KruvasanIcon,
  MealIcon,
  DinnerIcon,
  WalkIcon,
  SportIcon,
  ActiveWaterIcon,
  PlusSimpleIcon,
  CrossIcon,
  YogaIcon,
  TenisIcon,
  YuzmeIcon,
  CardioIcon,
  YogaIconActive,
  TenisIconActive,
  YuzmeIconActive,
  CardioIconActive,
  EliptikIcon,
  BoksIcon,
  EliptikIconActive,
  BoksIconActive,
} from '../../assets/icons';
import DynamicallySelectedPicker from 'react-native-dynamically-selected-picker';

import axios from 'axios';
import moment from 'moment';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {Picker} from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 20,
  },
  wr: {
    flex: 1,
  },
  userId: {
    backgroundColor: COLORS.WHITE,
    shadowColor: COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 10,
    borderRadius: 20,
    padding: 10,
    marginTop: 20,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  userIdImageWr: {
    padding: 8,
  },
  userIdImage: {
    height: 100,
    width: 100,
    borderColor: COLORS.PRIMARY,
    borderWidth: 3,
    borderRadius: 50,
  },
  addPhotoButton: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    width: 30,
    height: 30,
    borderRadius: 20,
    backgroundColor: COLORS.PRIMARY,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addPhotoButtonImage: {
    height: 60,
    width: 60,
    marginRight: -8,
  },
  userIdInfos: {
    marginLeft: 20,
  },
  info: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 2,
  },
  infoTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginRight: 5,
    color: COLORS.TEXT,
  },
  infoDesc: {
    fontSize: 16,
    color: COLORS.TEXT,
  },
  bottomText: {
    fontSize: 14,
    color: COLORS.GRAY,
    marginTop: 5,
    maxWidth: width * 0.42,
  },
  weightStatusChart: {
    marginTop: 30,
  },
  headerTextWr: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerText: {
    fontSize: 18,
    color: COLORS.BLACK,
    fontWeight: 'bold',
  },
  weightChart: {
    display: 'flex',
    marginTop: 20,
    backgroundColor: COLORS.WHITE,
    shadowColor: COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 10,
    borderRadius: 20,
  },
  lineChart: {
    borderRadius: 16,
    marginTop: 10,
    marginBottom: 10,
  },
  dietPlans: {
    marginTop: 30,
  },
  dietPlansWr: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    //marginBottom: 10,
    marginBottom: 0,
  },
  dietPlan: {
    paddingRight: 30,
    paddingVertical: 12,
    padding: 20,
    marginRight: 15,
    borderRadius: 15,
    backgroundColor: COLORS.WHITE,
    shadowColor: COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 10,
    margin: 10,
  },
  dietName: {
    fontSize: 18,
    color: COLORS.BLACK,
    marginBottom: 2,
  },
  dietDate: {
    color: COLORS.BLACK,
  },
  dietPlanScrollView: {
    marginTop: 20,
  },
  dateSelection: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    justifyContent: 'center',
  },
  dateSelectionContent: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  datePlaneIcon: {
    marginRight: 10,
  },
  datePlaneText: {
    color: COLORS.GRAY,
  },
  meals: {
    marginTop: 30,
  },
  mealsWr: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: 20,
    backgroundColor: COLORS.WHITE,
    shadowColor: COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 10,
    borderRadius: 15,
    padding: 22,
  },
  waters: {
    marginTop: 30,
  },
  watersWr: {
    backgroundColor: COLORS.WHITE,
    shadowColor: COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 10,

    borderRadius: 15,

    paddingHorizontal: 20,
    paddingVertical: 17,
    marginTop: 20,
  },
  watersTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  watersBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  watersBottomLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  watersBottomCounter: {
    fontSize: 19,
    marginRight: 5,
    color: COLORS.TEXT,
  },
  watersBottomLeftText: {
    color: COLORS.TEXT,
  },
  watersBottomRight: {
    opacity: 0.6,
    fontSize: 13,
    color: COLORS.TEXT,
  },
  activities: {
    marginTop: 30,
    marginBottom: 20,
  },
  activitiesWr: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  activitie: {
    backgroundColor: COLORS.WHITE,
    shadowColor: COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    padding: 22,
    borderRadius: 15,
  },
  activiteDate: {
    fontSize: 12,
    opacity: 0.5,
    color: COLORS.TEXT,
  },
  activitieImage: {
    marginRight: 15,
  },
  widthActivitie: {width: '48%'},
  rawHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.TEXT,
    alignSelf: 'center',
    marginVertical: 10,
  },
  input: {
    color: COLORS.TEXT,
    borderWidth: 1,
    marginHorizontal: 15,
    borderRadius: 15,
    height: 50,
  },
  buttonWr: {
    alignSelf: 'center',
    position: 'absolute',
    bottom: height * 0.05,
  },
  buttonStyle: {},
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
  modalContent: {
    width: width,
    height: height,
    backgroundColor: COLORS.WHITE,
  },
  iconWr: {
    position: 'absolute',
    top: Platform.OS == 'ios' ? 45 : 5,
    right: 5,
    width: 30,
    height: 30,
    backgroundColor: COLORS.BACKGROUND,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  itemImage: {
    width: width,
    height: height,
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
});
const DietPlan = ({item, setMealVisible, setMeal}) => {
  const dayDiff = (date1, date2) => {
    const moment1 = moment(
      new Date(
        date1.split('.')[2],
        date1.split('.')[1] - 1,
        date1.split('.')[0],
      ),
    );
    const moment2 = moment(
      new Date(
        date2.split('.')[2],
        date2.split('.')[1] - 1,
        date2.split('.')[0],
      ),
    );
    const diff = moment1.diff(moment2, 'days') + 1;
    console.log(diff);
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
    const day1 = date1.split('.')[0];
    const day2 = date2.split('.')[0];
    const month = parseInt(date2.split('.')[1] - 1);
    return day2 + '-' + day1 + ' ' + months[month];
  };
  return (
    <TouchableOpacity
      onPress={() => {
        setMeal(item);
        setMealVisible(true);
      }}
      style={styles.dietPlan}>
      <Text style={styles.dietName}>
        {formatPlanText(item.start, item.date)}
      </Text>
      <Text style={styles.dietDate}>{dayDiff(item.start, item.date)}</Text>
    </TouchableOpacity>
  );
};
export const ProfileScreen = props => {
  const [user, setUser] = useState(undefined);
  const [weight, setWeight] = useState('');
  const [dietPlans, setDietPlans] = useState([]);
  const [mealVisible, setMealVisible] = useState(false);
  const [mealDetail, setMealDetail] = useState([]);
  const [pageState, setPageState] = useState(1);
  const [photoModal, setPhotoModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(moment());
  const [modalVisible, setModalVisible] = useState(false);
  const [modalImage, setModalImage] = useState(false);
  const [sportStep, setSportStep] = useState('type');
  const [selectedSportHour, setSelectedSportHour] = useState(0);
  const [selectedSportMinute, setSelectedSportMinute] = useState(0);
  const [selectedSportType, setSelectedSportType] = useState(0);
  const isFocused = useIsFocused();
  const refRBSheet = useRef();
  const waterRef = useRef();
  const sportRef = useRef();
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertData, setAlertData] = useState(undefined);
  useEffect(() => {
    if (isFocused) {
      setSelectedDate(moment());
      getData();
      getClosed();
    }
  }, [isFocused]);
  useEffect(() => {
    if (isFocused) {
      setPageState(1);
      getDietPlans(1);
    }
  }, [isFocused]);
  useEffect(() => {
    getDietPlans(pageState);
  }, [pageState]);

  const getClosed = async () => {
    const token = await AsyncStorage.getItem('token');
    axios
      .get(SYSTEM, {headers: {Authorization: 'Bearer ' + token}})
      .then(async res => {
        if (res.data.data.statu == 1) {
          setAlertVisible(true);
          setAlertData(res.data.data);
        /*  const date = await AsyncStorage.getItem('date');
          if (date) {
            if (date == moment().add(3, 'hours').format('DD')) {
              console.log(1);
            } else {
              console.log(2);
              AsyncStorage.setItem(
                'date',
                moment().add(3, 'hours').format('DD'),
              );
              setAlertVisible(true);
              setAlertData(res.data.data);
            }
          } else {
            console.log(3);
            AsyncStorage.setItem('date', moment().add(3, 'hours').format('DD'));
            setAlertVisible(true);
            setAlertData(res.data.data);
          }*/
        }
      })
      .catch(e => {
        console.log(e);
      });
  };
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
  const sportIcons = [
    <YogaIconActive color={COLORS.PURPLE} />,
    <TenisIconActive color={COLORS.PURPLE} />,
    <YuzmeIconActive color={COLORS.PURPLE} />,
    <EliptikIconActive color={COLORS.PURPLE} />,
    <BoksIconActive color={COLORS.PURPLE} />,
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
        setSportStep('type');
        sportRef.current.close();
      })
      .catch(e => {
        console.log(e);
      });
  };
  const getData = async date => {
    const token = await AsyncStorage.getItem('token');
    axios
      .get(
        date ? PROFILE + '?date=' + moment(date).format('YYYY-MM-DD') : PROFILE,
        {headers: {Authorization: 'Bearer ' + token}},
      )
      .then(res => {
        setUser(res.data.data);
        console.log(res.data.data?.diet_type);
      })
      .catch(e => {
        console.log(e);
      });
  };
  const getDietPlans = async page => {
    const token = await AsyncStorage.getItem('token');
    console.log({pagination: 10, page: page ? page : 1});
    axios
      .get(MY_PLANS, {
        headers: {Authorization: 'Bearer ' + token},
        params: {pagination: 5, page: page ? page : 1},
      })
      .then(res => {
        console.log(res.data.data.items);
        if (page == 1) {
          setDietPlans(res.data.data.items);
        } else {
          setDietPlans(prevState => [...prevState, ...res.data.data.items]);
        }
      })
      .catch(e => {
        console.log(e.response.data);
      });
  };

  const setMeal = async item => {
    const token = await AsyncStorage.getItem('token');
    axios
      .get(PLAN + item?.id, {headers: {Authorization: 'Bearer ' + token}})
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

  const logWeight = async () => {
    const token = await AsyncStorage.getItem('token');

    axios
      .post(
        LOG_WEIGHT,
        {
          client: props.route.params.id,
          weight: weight,
        },
        {headers: {Authorization: 'Bearer ' + token}},
      )
      .then(res => {
        getData();
        refRBSheet.current.close();
      })
      .catch(e => {
        console.log(e);
        Alert.alert('', 'Bilinmeyen bir hata oluştu.');
      });
  };
  const openCamera = () => {
       request(
          Platform.OS === 'ios' ? PERMISSIONS.IOS.CAMERA : PERMISSIONS.ANDROID.CAMERA
      ).then(result => {
        console.log(result);
        switch (result) {
          case RESULTS.GRANTED:
           setTimeout(()=>launchCamera(imageSelectOptions, res => {
                setPhoto(res);
                setPhotoModal(false);
              }),500);
            break;
          default:
            Alert.alert(
              '',
              'Merhaba, spor ve öğün paylaşımlarınız için izinleri onaylamanız gerekmektedir. Bu izinler sadece fotoğraf gönderimine olanak sağlar ve telefonunuza erişim sağlanmaz. Teşekkür ederiz. Sağlıklı günler, Fit’n Co',
              [
                {
                  text: 'Ok',
                  onPress: () => {
                    //Linking.openSettings();
                  },
                },
              ],
            );
        }
      });

  };
  const setPhoto = async res => {
    if (res?.didCancel) {
      setPhotoModal(false);
    } else {
      setPhotoModal(false);
      const token = await AsyncStorage.getItem('token');
      let data = new FormData();
      const pp = res.assets[0];
      data.append('pp', {
        type: pp.type,
        name: pp.fileName,
        uri: Platform.OS === 'ios' ? pp.uri.replace('file://', '') : pp.uri,
      });
      const response = await fetch(UPDATE_ME, {
        method: 'POST',
        body: data,
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: 'Bearer ' + token,
        },
      });
      const json = await response.json();
      getData();
    }
  };
  const openGallery = () => {
       if (Platform.OS === 'ios'){
      request(
         PERMISSIONS.IOS.PHOTO_LIBRARY
      ).then(result => {
        console.log(result);
        switch (result) {
          case RESULTS.GRANTED:
            launchImageLibrary(imageSelectOptions, res => {
              setPhoto(res);
                setPhotoModal(false);
            });
            break;
          default:
            Alert.alert(
              '',
              'Merhaba, spor ve öğün paylaşımlarınız için izinleri onaylamanız gerekmektedir. Bu izinler sadece fotoğraf gönderimine olanak sağlar ve telefonunuza erişim sağlanmaz. Teşekkür ederiz. Sağlıklı günler, Fit’n Co',
              [
                {
                  text: 'Ok',
                  onPress: () => {
                    //Linking.openSettings();
                  },
                },
              ],
            );
        }
      });
     } else {
      launchImageLibrary(imageSelectOptions, res => {
        setPhoto(res);
      });
    }

  };
  const navigation = useNavigation();

  return (
    <Container
      type={'view'}
      style={{paddingTop: Platform.OS == 'ios' ? 35 : 0}}>
      <Header
        rightIcon={<ProfileEditIcon />}
        rightOnPress={() => {
          navigation.navigate('ProfileEdit');
        }}
        leftIcon={<SettingsIcon />}
        leftOnPress={() => {
          navigation.navigate('Settings');
        }}
        text={user?.full_name}
      />
      {console.log(user)}
      <ScrollView>
        <View style={styles.headerWr}>
          <View style={styles.textWr}>
            <Text style={styles.nameText}>Merhaba {user?.name},</Text>
            <Text style={styles.expText} numberOfLines={1}>
              Yepyeni bir sen için gün boyu yanındayız!
            </Text>

            {user?.date && (
              <Text style={styles.infoText}>
                Üyelik Yenileme Tarihi: {user?.date}
              </Text>
            )}
          </View>
          <View style={styles.imageWr}>
            <Image
              source={require('../../assets/icons/sunny.png')}
              style={styles.statusImage}
            />
          </View>
        </View>
        <View style={styles.content}>
          <View style={styles.userId}>
            <View style={styles.userIdImageWr}>
              <Image style={styles.userIdImage} source={{uri: user?.pp}} />
              <TouchableOpacity
                style={styles.addPhotoButton}
                onPress={() => setPhotoModal(true)}>
                {/*<Image
                    style={styles.addPhotoButtonImage}
                    source={require('../../assets/icons/add-plus.png')}
                  />*/}
                <PlusSimpleIcon />
              </TouchableOpacity>
            </View>
            <View style={styles.userIdInfos}>
              <View style={styles.info}>
                <Text style={styles.infoTitle}>Yaş:</Text>
                <Text style={styles.infoDesc}>{user?.age}</Text>
              </View>
              <View style={styles.info}>
                <Text style={styles.infoTitle}>Kilo:</Text>
                <Text style={styles.infoDesc}>{user?.weight + ' kg'}</Text>
              </View>
              <View style={styles.info}>
                <Text style={styles.infoTitle}>Hedef:</Text>
                <Text style={styles.infoDesc}>{user?.target + ' kg'}</Text>
              </View>
              <View style={styles.info}>
                <Text style={styles.infoTitle}>İlk Kilo:</Text>
                <Text style={styles.infoDesc}>{user?.begining + ' kg'}</Text>
              </View>
              <View style={styles.info}>
                <Text style={styles.infoTitle}>Boy:</Text>
                <Text style={styles.infoDesc}>{user?.height + ' cm'}</Text>
              </View>
              <Text style={styles.bottomText}>
                {user?.zone} {user?.time}
              </Text>
            </View>
          </View>

          <View style={styles.weightStatusChart}>
            <View style={styles.headerTextWr}>
              <Text style={styles.headerText}>Kilo Durum Grafiği </Text>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Messaging');
                }}>
                <PlusIcon />
              </TouchableOpacity>
            </View>
            <View>
              <ScrollView horizontal style={styles.weightChart}>
                {user?.weights &&
                  user?.weights.length > 0 &&
                  user?.weights
                    .filter(element => element?.unit !== null)
                    .map(element => element.unit).length > 0 && (
                    <View>
                      <LineChart
                        data={{
                          legend: ['Kilo', 'Hedef Kilo'],
                          labels: user?.weights
                            .filter(element => element?.unit !== null)
                            .map(
                              (element, index) =>
                                element?.day.split('-')[2] +
                                '/' +
                                element?.day.split('-')[1],
                            )
                            .reverse(),
                          datasets: [
                            {
                              data: user?.weights
                                .filter(element => element?.unit !== null)
                                .map(element => element.unit)
                                .reverse(),
                              //color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
                            },
                            {
                              data: user?.weights
                                .filter(element => element?.unit !== null)
                                .map(element => user?.target)
                                .reverse(),
                              color: (opacity = 1) => COLORS.TEXT,
                              strokeWidth: 5,
                            },
                          ],
                        }}
                        width={
                          user?.weights.length > 7
                            ? user?.weights.length * 0.12 * width
                            : width * 0.88
                        }
                        height={200}
                        yAxisInterval={1}
                        withHorizontalLines={false}
                        getDotColor={() => COLORS.WHITE}
                        chartConfig={{
                          propsForBackgroundLines: {
                            strokeDasharray: '',
                          },
                          useShadowColorFromDataset: false,
                          backgroundColor: COLORS.WHITE,
                          backgroundGradientFrom: COLORS.WHITE,
                          backgroundGradientTo: COLORS.WHITE,
                          color: (opacity = 1) => COLORS.PRIMARY,
                          labelColor: (opacity = 1) => COLORS.TEXT,
                          propsForDots: {
                            r: '6',
                            strokeWidth: '5',
                            stroke: COLORS.PRIMARY,
                          },
                        }}
                        hideLegend={true}
                        segments={2}
                        style={styles.lineChart}
                      />
                    </View>
                  )}
              </ScrollView>
            </View>
          </View>
          <View style={styles.dietPlans}>
            <View style={styles.headerTextWr}>
              <Text style={styles.headerText}>Programlar</Text>
            </View>
            <FlatList
              horizontal
              onEndReached={() => {
                setPageState(pageState + 1);
              }}
              renderItem={({item, index}) => {
                console.log({item, index});
                return (
                  <DietPlan
                    item={item}
                    key={index}
                    setMealVisible={setMealVisible}
                    setMeal={setMeal}
                  />
                );
              }}
              data={dietPlans}
            />

            {/*           <ScrollView
              showsHorizontalScrollIndicator={false}
              horizontal={true}
              onScrollEndDrag={() => {
                // setPageState(pageState + 1);
              }}
              style={styles.dietPlanScrollView}>
              <View style={styles.dietPlansWr}>
                {dietPlans.map((item, index) => {
                  return (
                    <DietPlan
                      item={item}
                      key={index}
                      setMealVisible={setMealVisible}
                      setMeal={setMeal}
                    />
                  );
                })}
              </View>
              </ScrollView>*/}
            <View style={styles.dateSelection}>
              <TouchableOpacity
                onPress={() => {
                  setSelectedDate(prevState => {
                    getData(moment(prevState).subtract(1, 'days'));
                    return moment(prevState).subtract(1, 'days');
                  });
                  getData();
                }}>
                <ChevronLeftIcon />
              </TouchableOpacity>
              <TouchableOpacity style={styles.dateSelectionContent}>
                <CalenderIcon style={styles.datePlaneIcon} />
                <Text style={styles.datePlaneText}>
                  {selectedDate.format('DD MMMM')}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setSelectedDate(prevState => {
                    if (moment().diff(moment(prevState).add(1, 'days')) > 0) {
                      getData(moment(prevState).add(1, 'days'));
                      return moment(prevState).add(1, 'days');
                    } else {
                      getData(moment(prevState));
                      return moment(prevState);
                    }
                  });
                }}>
                <ChevronRightIcon />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.meals}>
            <View style={styles.headerTextWr}>
              <Text style={styles.headerText}>Öğünler</Text>
            </View>
            <View style={styles.mealsWr}>
              <TouchableOpacity
                onPress={() => {
                  if (user?.breakfast == 0) {
                    navigation.navigate('Messaging');
                  } else {
                    setModalImage(user?.breakfast_image);
                    setModalVisible(true);
                  }
                }}
                style={styles.meal}>
                <KruvasanIcon
                  color={user?.breakfast == 0 ? undefined : COLORS.PRIMARY}
                />
              </TouchableOpacity>
              {user?.diet_type != 1 && (
                <TouchableOpacity
                  onPress={() => {
                    if (user?.lunch == 0) {
                      navigation.navigate('Messaging');
                    } else {
                      setModalImage(user?.lunch_image);
                      setModalVisible(true);
                    }
                  }}
                  style={styles.meal}>
                  <MealIcon
                    color={user?.lunch == 0 ? undefined : COLORS.PRIMARY}
                  />
                </TouchableOpacity>
              )}
              <TouchableOpacity
                onPress={() => {
                  if (user?.dinner == 0) {
                    navigation.navigate('Messaging');
                  } else {
                    setModalImage(user?.dinner_image);
                    setModalVisible(true);
                  }
                }}
                style={styles.meal}>
                <DinnerIcon
                  color={user?.dinner == 0 ? undefined : COLORS.PRIMARY}
                />
              </TouchableOpacity>
            </View>
          </View>
          <Modal
            visible={modalVisible}
            animationType="slide"
            onRequestClose={() => setModalVisible(false)}
            transparent={true}>
            <View style={styles.modalContent}>
              <Image source={{uri: modalImage}} style={styles.itemImage} />
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={styles.iconWr}>
                <CrossIcon />
              </TouchableOpacity>
            </View>
          </Modal>
          <View style={styles.waters}>
            <View style={styles.headerTextWr}>
              <Text style={styles.headerText}>Su</Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                if (
                  user?.water < 6 &&
                  moment().add(3, 'hours').format('DD_MM') ==
                    moment(selectedDate).add(3, 'hours').format('DD_MM')
                ) {
                  waterRef.current.open();
                }
              }}
              style={styles.watersWr}>
              <View style={styles.watersTop}>
                {user?.water > 0 ? <ActiveWaterIcon /> : <WaterIcon />}
                {user?.water > 1 ? <ActiveWaterIcon /> : <WaterIcon />}
                {user?.water > 2 ? <ActiveWaterIcon /> : <WaterIcon />}
                {user?.water > 3 ? <ActiveWaterIcon /> : <WaterIcon />}
                {user?.water > 4 ? <ActiveWaterIcon /> : <WaterIcon />}
                {user?.water > 5 ? <ActiveWaterIcon /> : <WaterIcon />}
              </View>
              <View style={styles.watersBottom}>
                <View style={styles.watersBottomLeft}>
                  <Text style={styles.watersBottomCounter}>
                    {user?.water / 2}
                  </Text>
                  <Text style={styles.watersBottomLeftText}>litre</Text>
                </View>
                <Text style={styles.watersBottomRight}>
                  Günlük 3 litre önerilir
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.activities}>
            <View style={styles.headerTextWr}>
              {user?.can_walk != 0 && (
                <Text style={[styles.headerText, styles.widthActivitie]}>
                  Yürüyüş
                </Text>
              )}
              <Text style={[styles.headerText, styles.widthActivitie]}>
                Spor
              </Text>
            </View>
            <View style={styles.activitiesWr}>
              {user?.can_walk != 0 && (
                <TouchableOpacity
                  onPress={() => {
                    if (user?.walking == 1) {
                      setModalImage(user?.walking_image);
                      setModalVisible(true);
                    } else {
                      navigation.navigate('Messaging');
                    }
                  }}
                  style={[styles.activitie, styles.widthActivitie]}>
                  <View style={{marginHorizontal: 10}}>
                    <WalkIcon
                      color={user?.walking == 1 ? COLORS.PRIMARY : undefined}
                    />
                  </View>
                  {/*false ?
                    <Text style={styles.activiteDate}>{user?.sport?.during?.split(':')[0]} saat {user?.sport?.during?.split(':')[1]} dakika</Text> :
                    <Image
                      source={require('../../assets/icons/white-lines.png')}
                  />*/}
                  <Image
                    source={require('../../assets/icons/white-lines.png')}
                  />
                </TouchableOpacity>
              )}
              <TouchableOpacity
                onPress={() => {
                  if (
                    user?.sport == 0 &&
                    moment().add(3, 'hours').format('DD_MM') ==
                      moment(selectedDate).add(3, 'hours').format('DD_MM')
                  ) {
                    setSportStep('type');
                    setSelectedSportHour(0);
                    setSelectedSportMinute(0);
                    sportRef.current.open();
                  }
                }}
                style={[styles.activitie, styles.widthActivitie]}>
                {user?.sport?.sport ? (
                  sportIcons[user?.sport?.sport - 1]
                ) : (
                  <SportIcon
                    color={user?.sport == 0 ? undefined : COLORS.PURPLE}
                  />
                )}
                <Text style={styles.activiteDate}>
                  {user?.sport?.during?.split(':')[0]
                    ? user?.sport?.during.split(':')[0]
                    : 0}{' '}
                  saat{' '}
                  {user?.sport?.during?.split(':')[1]
                    ? user?.sport?.during.split(':')[1]
                    : 0}{' '}
                  dakika
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
      <UserAlert
        visible={alertVisible}
        setVisible={value => setAlertVisible(value)}
        header={'Merhaba,'}
        text={
          alertData?.type == 1
            ? 'Pazar günleri sizlere rahatsızlık vermemek adına, sistemimiz kapalıdır. \n\nMenülerle ilgili danışmak istediğiniz herhangi bir konuda 0555 020 2886 iletişim numarasından bizlere ulaşabilirsiniz. \n\nYarın sabah görüşmek üzere...'
            : 'Tatil günleri sizlere rahatsızlık vermemek adına, sistemimiz kapalıdır. \n\nMenülerle ilgili danışmak istediğiniz herhangi bir konuda 0555 020 2886 iletişim numarasından bizlere ulaşabilirsiniz. \n\nYarın sabah görüşmek üzere...'
        }
      />
      <IosPicker
        visible={photoModal}
        setVisible={value => {
          setPhotoModal(value);
        }}
        header={'Medya Ekle'}
        options={[
          {text: 'Kamera', onPress: openCamera},
          {text: 'Galeri', onPress: openGallery},
        ]}
      />

      <MealPlan
        visible={mealVisible}
        setVisible={value => setMealVisible(value)}
        images={mealDetail}
        setImages={setMealDetail}
      />

      <CustomRawBottom ref={refRBSheet}>
        <Text style={styles.rawHeader}>{'Lütfen kilo bilgisi seçin'}</Text>
        <TextInput
          value={weight}
          onChangeText={val => setWeight(val)}
          style={styles.input}
        />
        <View style={styles.buttonWr}>
          <Button text={'Onayla'} onPress={logWeight} />
        </View>
      </CustomRawBottom>
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
