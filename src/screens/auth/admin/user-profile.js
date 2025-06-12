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
  Modal,
  Platform,
  FlatList,
} from 'react-native';
import {
  width,
  COLORS,
  INBOX,
  CLIENT,
  height,
  LOG_WEIGHT,
  CLIENT_PROFILE,
  CLIENT_PLANS,
  PLAN,
  DELETE_DIET,
  ACTIVE_PLAN,
} from '../../../constants';
import {LineChart} from 'react-native-chart-kit';
import {
  Button,
  Container,
  CustomRawBottom,
  Header,
  MealPlan,
} from '../../../components';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {
  SettingsIcon,
  ProfileEditIcon,
  PlusIcon,
  CalenderIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  BlackNotifIcon,
  KruvasanIcon,
  MealIcon,
  DinnerIcon,
  WaterIcon,
  WalkIcon,
  SportIcon,
  ActiveWaterIcon,
  CrossIcon,
  YogaIcon,
  TenisIcon,
  YuzmeIcon,
  CardioIcon,
  YogaIconActive,
  TenisIconActive,
  YuzmeIconActive,
  CardioIconActive,
  EliptikIconActive,
  BoksIconActive,
} from '../../../assets/icons';
import DynamicallySelectedPicker from 'react-native-dynamically-selected-picker';

import axios from 'axios';
import moment from 'moment';
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
    bottom: 0,
    right: 0,
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
    color: COLORS.BLACK,
  },
  infoDesc: {
    fontSize: 16,
    color: COLORS.BLACK,
  },
  bottomText: {
    fontSize: 14,
    color: COLORS.GRAY,
    marginTop: 5,
    maxWidth: width * 0.42,
  },
  noteText: {
    fontSize: 14,
    color: COLORS.TEXT,
    maxWidth: width * 0.4,
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
    marginBottom: 10,
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
});
const DietPlan = ({item, setMealVisible, setMeal, onLongPress}) => {
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
    return day1 + '-' + day2 + ' ' + months[month];
  };
  return (
    <TouchableOpacity
      onLongPress={() => {
        console.log('long');
        if (onLongPress) {
          Alert.alert('', 'Program planını silmek istediğinize emin misiniz?', [
            {text: 'Evet', onPress: () => onLongPress(item.id)},
            {text: 'Hayır', onPress: () => {}},
          ]);
        }
      }}
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

export const UserProfileScreen = props => {
  const [user, setUser] = useState(undefined);
  const [isAdmin, setIsAdmin] = useState(false);
  const [weight, setWeight] = useState('');
  const [dietPlans, setDietPlans] = useState([]);
  const [note, setNote] = useState(undefined);
  const [mealVisible, setMealVisible] = useState(false);
  const isFocused = useIsFocused();
  const refRBSheet = useRef();
  const [mealDetail, setMealDetail] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(moment());
  const [modalImage, setModalImage] = useState(false);
  const [pageState, setPageState] = useState(1);
  const sportIcons = [
    <YogaIconActive color={COLORS.PURPLE} />,
    <TenisIconActive color={COLORS.PURPLE} />,
    <YuzmeIconActive color={COLORS.PURPLE} />,
    <EliptikIconActive color={COLORS.PURPLE} />,
    <BoksIconActive color={COLORS.PURPLE} />,
  ];
  useEffect(() => {
    if (props.route.params.id) {
      setSelectedDate(moment());
      //getData(props.route.params.id)
      getData(props.route.params.id);
      setIsAdmin(true);
      setLoading(true);
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
  const getDietPlans = async page => {
    const token = await AsyncStorage.getItem('token');
    axios
      .get(CLIENT_PLANS + props.route.params.id, {
        headers: {Authorization: 'Bearer ' + token},
        params: {pagination: 5, page: page ? page : 1},
      })
      .then(res => {
        console.log(res.data.data.items.length);
        if (page == 1) {
          setDietPlans(res.data.data.items);
        } else {
          setDietPlans(prevState => [...prevState, ...res.data.data.items]);
        }
      })
      .catch(e => {
        console.log(e);
      });
  };
  const getData = async (id, date) => {
    const token = await AsyncStorage.getItem('token');
    axios
      .get(
        date
          ? CLIENT_PROFILE + id + '&date=' + moment(date).format('YYYY-MM-DD')
          : CLIENT_PROFILE + id,
        {headers: {Authorization: 'Bearer ' + token}},
      )
      .then(res => {
        setUser(res.data.data);
      })
      .catch(e => {
        console.log(e);
      });
    axios
      .get(CLIENT + '/' + id, {headers: {Authorization: 'Bearer ' + token}})
      .then(res => {
        setNote(res?.data?.data?.note);
      })
      .catch(e => {
        console.log(e);
      });

    setLoading(false);
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
        // setMealDetail(res.data.data.repeats[0].images)
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
        getData(props.route.params.id);
        refRBSheet.current.close();
      })
      .catch(e => {
        console.log(e);
        Alert.alert('', 'Bilinmeyen bir hata oluştu.');
      });
  };
  const deleteDiet = async id => {
    const token = await AsyncStorage.getItem('token');
    axios
      .post(
        DELETE_DIET,
        {
          plan: id,
        },
        {headers: {Authorization: 'Bearer ' + token}},
      )
      .then(res => {
        console.log(res.data);
        setPageState(1);
        getDietPlans(1);
      })
      .catch(e => {
        console.log(e);
        Alert.alert('', 'Program Silinemedi.');
      });
  };
  const navigation = useNavigation();
  return (
    <Container loading={loading}>
      <Header
        rightIcon={<ProfileEditIcon />}
        rightOnPress={() => {
          if (isAdmin) {
            navigation.navigate('SetUser', {
              user: {
                id: props.route.params.id,
                canWalk: user?.can_walk,
                target: user?.target,
                type: user?.type,
                info: note,
                vip: user?.vip,
                date: user?.date ? user?.date.split('-')[2] : '',
                begining: user?.begining,
              },
            });
          } else {
            navigation.navigate('ProfileEdit');
          }
        }}
        leftIcon={<BlackNotifIcon />}
        leftOnPress={() => {
          props.navigation.navigate('MessageDetail', {
            id: props.route.params.id,
          });
        }}
        text={user?.name}
      />

      <ScrollView>
        <View style={styles.content}>
          <View style={styles.userId}>
            <View style={styles.userIdImageWr}>
              <Image style={styles.userIdImage} source={{uri: user?.pp}} />
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
                <Text style={styles.infoTitle}>İlk Kilo:</Text>
                <Text style={styles.infoDesc}>{user?.begining + ' kg'}</Text>
              </View>
              <View style={styles.info}>
                <Text style={styles.infoTitle}>Boy:</Text>
                <Text style={styles.infoDesc}>{user?.height + ' cm'}</Text>
              </View>
              <Text style={styles.noteText}>{note}</Text>
              <Text style={styles.bottomText}>
                {user?.zone} {user?.time}
              </Text>
            </View>
          </View>

          <View style={styles.weightStatusChart}>
            <View style={styles.headerTextWr}>
              <Text style={styles.headerText}>Kilo Durum Grafiği </Text>
              <View style={{flexDirection: 'row'}}>
                <TouchableOpacity
                  style={{marginRight: 10}}
                  onPress={() => {
                    navigation.navigate('WeightEdit', {
                      id: props.route.params.id,
                    });
                  }}>
                  <ProfileEditIcon />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    /* navigation.navigate('WeightEdit', {
                    id: props.route.params.id,
                  });*/
                    refRBSheet.current.open();
                  }}>
                  <PlusIcon />
                </TouchableOpacity>
              </View>
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
              <TouchableOpacity
                onPress={() => {
                  props.navigation.navigate('NewDiet', {
                    id: props.route.params.id,
                  });
                }}>
                <PlusIcon />
              </TouchableOpacity>
            </View>
            {/* <ScrollView
              showsHorizontalScrollIndicator={false}
              horizontal={true}
              onEndReac
              style={styles.dietPlanScrollView}>
              <View style={styles.dietPlansWr}>
                {dietPlans.map((item, index) => {
                  return (
                    <DietPlan
                      onLongPress={deleteDiet}
                      item={item}
                      key={index}
                      setMealVisible={setMealVisible}
                      setMeal={setMeal}
                    />
                  );
                })}
              </View>
              </ScrollView>*/}
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
                    onLongPress={deleteDiet}
                    key={index}
                    setMealVisible={setMealVisible}
                    setMeal={setMeal}
                  />
                );
              }}
              data={dietPlans}
            />
            <View style={styles.dateSelection}>
              <TouchableOpacity
                onPress={() => {
                  setSelectedDate(prevState => {
                    getData(
                      props.route.params.id,
                      moment(prevState).subtract(1, 'days'),
                    );
                    return moment(prevState).subtract(1, 'days');
                  });
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
                      getData(
                        props.route.params.id,
                        moment(prevState).add(1, 'days'),
                      );
                      return moment(prevState).add(1, 'days');
                    } else {
                      getData(props.route.params.id, moment(prevState));
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
                  if (user?.breakfast === 0 && user.breakfast_image === null) {
                  } else {
                    setModalImage(user?.breakfast_image);
                    setModalVisible(true);
                  }
                }}
                style={styles.meal}>
                <KruvasanIcon
                  color={(user?.breakfast === 0 && user.breakfast_image === null) ? undefined : COLORS.PRIMARY}
                />
              </TouchableOpacity>
              {user?.diet_type != 1 && (
                <TouchableOpacity
                  onPress={() => {
                    if (user?.lunch === 0 && user.lunch_image === null) {
                    } else {
                      setModalImage(user?.lunch_image);
                      setModalVisible(true);
                    }
                  }}
                  style={styles.meal}>
                  <MealIcon
                    color={(user?.lunch === 0 && user.lunch_image === null) ? undefined : COLORS.PRIMARY}
                  />
                </TouchableOpacity>
              )}
              <TouchableOpacity
                onPress={() => {
                  if (user?.dinner === 0 && user.dinner_image === null) {
                  } else {
                    setModalImage(user?.dinner_image);
                    setModalVisible(true);
                  }
                }}
                style={styles.meal}>
                <DinnerIcon
                  color={(user?.dinner === 0 && user.dinner_image === null) ? undefined : COLORS.PRIMARY}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.waters}>
            <View style={styles.headerTextWr}>
              <Text style={styles.headerText}>Su</Text>
            </View>
            <View style={styles.watersWr}>
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
            </View>
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
                <View style={[styles.activitie, styles.widthActivitie]}>
                  <TouchableOpacity
                    onPress={() => {
                      if (user?.walking == 1) {
                        setModalImage(user?.walking_image);
                        setModalVisible(true);
                      } else {
                        navigation.navigate('Messaging');
                      }
                    }}
                    style={{marginHorizontal: 10}}>
                    <WalkIcon
                      color={user?.walking == 1 ? COLORS.PRIMARY : undefined}
                    />
                  </TouchableOpacity>
                  <Image
                    source={require('../../../assets/icons/white-lines.png')}
                  />
                </View>
              )}
              <View style={[styles.activitie, styles.widthActivitie]}>
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
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
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
      <MealPlan
        visible={mealVisible}
        setVisible={value => setMealVisible(value)}
        images={mealDetail}
        setImages={setMealDetail}
      />
    </Container>
  );
};
