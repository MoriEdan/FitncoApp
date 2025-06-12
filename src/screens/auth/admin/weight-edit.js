import React, {useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import {
  COLORS,
  DELETE_WEIGHTS,
  GET_WEIGHTS,
  height,
  UPDATE_ME,
  UPDATE_WEIGHTS,
  USER,
} from '../../../constants';
import {Button, Container, CustomRawBottom, Header} from '../../../components';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {
  CheckIcon,
  CrossIcon,
  HeaderLeftIcon,
  ProfileEditIcon,
} from '../../../assets/icons';
import axios from 'axios';
import {FlatList} from 'react-native-gesture-handler';
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
    borderWidth: 1,
    marginHorizontal: 15,
    borderRadius: 15,
    height: 50,
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

export const WeightEditScreen = props => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [name, setName] = useState('55');
  const [selectedWeight, setSelectedWeight] = useState(undefined);
  const [pageState, setPageState] = useState(1);
  const [userWeight, setUserWeight] = useState('70');
  const [gender, setGender] = useState('Erkek');
  const [weights, setWeights] = useState([]);
  const [values, setValues] = useState('');
  const refRBSheet = useRef();
  const [age, setAge] = useState('75');
  useEffect(() => {
    if (isFocused) {
      setPageState(1);
      getData();
    }
  }, [isFocused]);
  useEffect(() => {
    if (selectedWeight) {
      refRBSheet.current.open();
    }
  }, [selectedWeight]);
  useEffect(() => {
    console.log('pageState');
    console.log(pageState);
    if (pageState != 1) {
      getData(pageState);
    }
  }, [pageState]);
  const getData = async page => {
    console.log(page);
    const token = await AsyncStorage.getItem('token');
    axios
      .get(GET_WEIGHTS + '/' + props.route.params.id, {
        headers: {Authorization: 'Bearer ' + token},
        params: {page: page ? page : 1, pagination: 15},
      })
      .then(res => {
        console.log(res.data);
        setWeights(prevState =>
          page
            ? [...prevState, ...res?.data?.data?.items]
            : res?.data?.data?.items,
        );
        setValues(prevState =>
          page
            ? [...prevState, ...res?.data?.data?.items.map(item => item?.unit)]
            : res?.data?.data?.items.map(item => item?.unit),
        );
      })
      .catch(e => {
        console.log(e);
      });
  };
  const save = async weight => {
    const token = await AsyncStorage.getItem('token');
    axios
      .post(
        UPDATE_WEIGHTS,
        {
          id: weight?.id,
          weight: weight?.unit,
        },
        {headers: {Authorization: 'Bearer ' + token}},
      )
      .then(res => {
        console.log(res.data);
        refRBSheet.current.close();
        setPageState(1);
        getData();
      })
      .catch(e => {
        console.log(e);
      });
  };
  const deleteWeight = async id => {
    Alert.alert('', 'Kiloyu silmek istediğinize emin misiniz?', [
      {text: 'Hayır', onPress: () => {}},
      {
        text: 'Evet',
        onPress: async () => {
          const token = await AsyncStorage.getItem('token');
          axios
            .post(
              DELETE_WEIGHTS,
              {
                id: id,
              },
              {headers: {Authorization: 'Bearer ' + token}},
            )
            .then(res => {
              console.log(res.data);
              setPageState(1);
              getData();
            })
            .catch(e => {
              console.log(e);
            });
        },
      },
    ]);
  };
  const selects = ['Erkek', 'Kadın'];
  return (
    <Container style={styles.wr}>
      <Header
        leftIcon={<HeaderLeftIcon />}
        leftOnPress={() => {
          navigation.goBack();
        }}
        //  rightIcon={<Text style={styles.saveText}>Kaydet</Text>}
        // rightOnPress={save}
        text="Kilo Düzenle"
      />
      <ScrollView>
        <View style={styles.content}>
          <View style={styles.infos}>
            <FlatList
              renderItem={({item, index}) => {
                return (
                  <View style={styles.info}>
                    <Text style={styles.infoText}>
                      {item?.unit + '(' + item?.date + ')'}
                    </Text>
                    <View style={{flexDirection: 'row'}}>
                      <TouchableOpacity
                        style={{paddingHorizontal: 10}}
                        onPress={() => {
                          setSelectedWeight(item);
                        }}>
                        <ProfileEditIcon />
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => {
                          deleteWeight(item?.id);
                        }}
                        style={{paddingLeft: 10}}>
                        <CrossIcon />
                      </TouchableOpacity>
                    </View>
                  </View>
                );
              }}
              data={weights}
              contentContainerStyle={{paddingBottom: 10}}
              onEndReached={() => {
                console.log('end');
                setPageState(pageState + 1);
              }}
              // Performance settings
              removeClippedSubviews={true} // Unmount components when outside of window
              initialNumToRender={2} // Reduce initial render amount
              maxToRenderPerBatch={1} // Reduce number in each render batch
              updateCellsBatchingPeriod={100} // Increase time between renders
              windowSize={7} // Reduce the window size
            />
          </View>
        </View>
      </ScrollView>
      <CustomRawBottom ref={refRBSheet}>
        <Text style={styles.rawHeader}>{'Lütfen kilo bilgisi seçin'}</Text>
        <TextInput
          value={selectedWeight?.unit}
          onChangeText={val =>
            setSelectedWeight(prevState => {
              return {...prevState, unit: val};
            })
          }
          style={styles.input}
        />
        <View style={styles.buttonWr}>
          <Button text={'Onayla'} onPress={() => save(selectedWeight)} />
        </View>
      </CustomRawBottom>
    </Container>
  );
};
