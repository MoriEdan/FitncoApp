import React, { useEffect, useRef, useState } from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  FlatList,
  TextInput,
  Alert,
  Modal,
  RefreshControl,
} from 'react-native';
import {
  width,
  COLORS,
  getData,
  USER,
  APPROVALS,
  DIETICIANS,
  CLIENTS,
  PAUSE,
  APPROVE,
  height,
  STATUS,
  ARCHIVE,
} from '../../../constants';

import {
  Button,
  Container,
  CustomRawBottom,
  Tabs,
  UserName,
} from '../../../components';
import {
  RefreshIcon,
  FilterIcon,
  SortIcon,
  SendMultiMessageIcon,
  SettingsIcon,
  SearchIcon,
  CheckIcon,
  CancelIcon,
} from '../../../assets/icons';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import axios from 'axios';
import ToggleSwitch from 'toggle-switch-react-native';
import moment from 'moment';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import AsyncStorage from '@react-native-async-storage/async-storage';

const styles = StyleSheet.create({
  wr: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 8,
    paddingVertical: 15,
    paddingHorizontal: 16,
  },
  headerText: {
    color: COLORS.BLACK,
    width: width,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    position: 'absolute',
  },
  headerIcon: {
    marginLeft: 15,
  },
  rightIconWr: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemWr: {
    width: width * 0.9,
    alignSelf: 'center',
    flexDirection: 'row',
    marginVertical: 10,
    backgroundColor: COLORS.WHITE,
    borderRadius: 15,
    paddingVertical: 10,
    paddingHorizontal: 10,
    shadowColor: COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.39,
    shadowRadius: 8.3,
    elevation: 13,
  },
  clientItemWr: {
    width: width * 0.9,
    alignSelf: 'center',
    marginVertical: 10,
    backgroundColor: COLORS.WHITE,
    borderRadius: 15,
    paddingVertical: 10,
    paddingHorizontal: 10,
    shadowColor: COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.39,
    shadowRadius: 8.3,
    elevation: 13,
  },
  selectedItemWr: {
    width: width * 0.9,
    alignSelf: 'center',
    flexDirection: 'row',
    marginVertical: 10,
    backgroundColor: COLORS.GRAY,
    borderRadius: 15,
    paddingVertical: 10,
    paddingHorizontal: 10,
    shadowColor: COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.39,
    shadowRadius: 8.3,
    elevation: 13,
  },
  messageText: {
    color: COLORS.BLACK,
  },
  nameText: {
    color: COLORS.BLACK,
    fontWeight: 'bold',
  },
  timeText: {
    position: 'absolute',
    top: 5,
    right: 8,
    color: COLORS.BLACK,
  },
  textWr: {
    width: width * 0.65,
    marginHorizontal: 15,
  },
  itemImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  imageWr: {
    width: width * 0.2,
    height: width * 0.2,
    borderWidth: 2,
    borderColor: COLORS.PRIMARY,
    borderRadius: width * 0.1,
    overflow: 'hidden',
  },
  selectedImageWr: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mealImage: {
    width: 25,
    height: 28,
    marginRight: 5,
    resizeMode: 'contain',
  },

  mealWr: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  allSelectButton: {
    color: '#2896ff',
  },
  headerLeft: {
    zIndex: 99,
  },
  clientText: {
    color: COLORS.TEXT,
    flex: 1,
  },
  checkWr: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    paddingHorizontal: 10,
  },
  dateModalWr: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.75)',
  },
  dateModalContent: {
    width: width * 0.85,
    backgroundColor: COLORS.WHITE,
    borderRadius: 20,
    padding: 5,
    alignItems: 'center',
  },
  freezeText: {
    color: COLORS.PRIMARY,
    fontWeight: 'bold',
    fontSize: 15,
    paddingHorizontal: 10,
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
});

export const ManagementList = props => {
  const refRBSheet = useRef();
  const filterRawRef = useRef();
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [users, setUsers] = useState([]);
  const [dieticians, setDieticians] = useState([]);
  const [clients, setClients] = useState([]);
  const [activePage, setActivePage] = useState(0);
  const [pausedUser, setPausedUser] = useState(undefined);
  const [dateModalVisible, setDateModalVisible] = useState(false);
  const [order, setOrder] = useState(undefined);
  const [archive, setArchive] = useState(undefined);
  const [pageState, setPageState] = useState(1);
  const [dates, setDates] = useState([]);
  const [isSearch, setIsSearch] = useState(false);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    resetData();
  }, [isFocused]);
  const resetData = () => {
    setLoading(true)
    setOrder(undefined);
    setArchive(undefined);
    setSearch('');
    setIsSearch(false);
    setUsers([]);
    setDieticians([]);
    setClients([]);
    setPageState(1);
    getData();
  };

  useEffect(() => {
    getData();
  }, [order, search, activePage, isFocused]);

  useEffect(() => {
    if (pageState != 1) {
      getData(pageState);
    }
  }, [pageState]);

  const getData = async page => {
    setLoading(true);
    const token = await AsyncStorage.getItem('token');
    if (activePage == 0) {
      await getClients(token, page);
    } else if (activePage == 1) {
      await getDieticians(token, page);
    } else if (activePage == 2) {
      await getApprovals(token, page);
    }
    setLoading(false);
  };
  const getApprovals = async (token, page) => {
    axios
      .get(APPROVALS, {
        params: {
          page: page ? page : 1,
          search: search,
          order: order,
        },
        headers: { Authorization: 'Bearer ' + token },
      })
      .then(res => {
        setUsers(
          page ? [...users, ...res.data.data.items] : res.data.data.items,
        );
      })
      .catch(e => {
        console.log(e);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const getDieticians = async (token, page) => {
    axios
      .get(DIETICIANS, {
        params: { page: page ? page : 1, search: search, order: order },
        headers: { Authorization: 'Bearer ' + token },
      })
      .then(res => {
        setDieticians(
          page ? [...dieticians, ...res.data.data.items] : res.data.data.items,
        );
      })
      .catch(e => {
        console.log(e);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const getClients = async (token, page) => {
    axios
      .get(CLIENTS, {
        params: { page: page ? page : 1, search: search, order: order, archive },
        headers: { Authorization: 'Bearer ' + token },
      })
      .then(res => {
        console.log(res.data.data.items);
        setClients(
          page ? [...clients, ...res.data.data.items] : res.data.data.items,
        );
      })
      .catch(e => {
        console.log(e);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const dissApproveUser = async user => {
    const token = await AsyncStorage.getItem('token');
    const data = {
      user_id: user?.id,
      approve: 0,
      name: user?.name,
      last_name: user?.last_name,
      age: user?.info?.age,
      weight: user?.info?.weight,
      height: user?.info?.height,
      type: user?.info?.type,
      vip: user?.info?.vip,
      target: user?.info?.target,
      can_walk: user?.info?.can_walk,
      gender: user?.info?.gender,
    };
    axios
      .post(APPROVE, data, { headers: { Authorization: 'Bearer ' + token } })
      .then(res => {
        resetData();
      })
      .catch(e => {
        console.log(e.response.data);
        resetData();
      });
  };
  const renderApprove = (item, isApprove) => {
    return (
      <View style={styles.itemWr}>
        <View style={styles.imageWr}>
          <Image style={styles.itemImage} source={{ uri: item?.picture }} />
        </View>
        <View style={styles.textWr}>
          <Text style={styles.nameText}>
            {item?.name + ' ' + item?.last_name}
          </Text>
          <Text style={styles.messageText}>{item?.email}</Text>
          <Text style={styles.messageText}>
            {item?.date ? item?.date : item?.registered}
          </Text>
        </View>
        <Text style={styles.timeText}>{item?.time}</Text>
        {isApprove && (
          <View
            style={{
              position: 'absolute',
              top: 10,
              right: 8,
              flexDirection: 'row',
              width: 60,
              justifyContent: 'space-between',
            }}>
            <TouchableOpacity onPress={() => dissApproveUser(item)}>
              <CancelIcon />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                if (isApprove) {
                  props.navigation.navigate('NewUser', { user: item });
                }
              }}>
              <CheckIcon />
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  };
  const freezeUser = async (isOn, item, index, is_dietician) => {
    const token = await AsyncStorage.getItem('token');
    axios
      .post(
        STATUS,
        {
          status: isOn ? 0 : 1,
          user_id: item?.id,
        },
        { headers: { Authorization: 'Bearer ' + token } },
      )
      .then(res => {
        console.log('-----------------------------------');
        console.log(res.data);
        getData();
      })
      .catch(e => {
        console.log(e);
      });
  };
  const pauseModal = async day => {
    const token = await AsyncStorage.getItem('token');
    axios
      .post(
        PAUSE,
        {
          pause: 1,
          user_id: pausedUser?.id,
          pause_end: day,
          pause_start: dates[0],
        },
        { headers: { Authorization: 'Bearer ' + token } },
      )
      .then(res => {
        //TODO
        //Dondur açma
        //  getData();
        getData();
        setDateModalVisible(false);
      })
      .catch(e => {
        console.log(e);
        setDates([]);
      });
  };
  const renderClient = (item, is_dietician, index) => {
    return (
      <View style={styles.clientItemWr}>
        <View
          onPress={() => {
            props.navigation.navigate('NewUser', { user: item });
          }}
          style={styles.row}>
          <View style={styles.imageWr}>
            <Image style={styles.itemImage} source={{ uri: item?.picture }} />
          </View>
          <View style={styles.textWr}>
            <UserName
              name={item?.full_name}
              type={is_dietician ? 0 : item?.type}
              is_vip={is_dietician ? 0 : item?.vip}
            />
            <Text style={styles.messageText}>{item?.email}</Text>
            <Text style={styles.messageText}>{item?.registered}</Text>
          </View>
          <Text style={styles.timeText}>{item?.time}</Text>
        </View>
        {/*!is_dietician && (
          <View style={styles.checkWr}>
            <Text style={styles.clientText}>
              {!is_dietician ? 'Üyelik Dondur' : 'Dondur'}
            </Text>
            <ToggleSwitch
              isOn={item.pause == 1}
              onColor={COLORS.SUCCESS}
              offColor={COLORS.GRAY}
              size="medium"
              onToggle={isOn => pauseUser(isOn, item)}
            />
          </View>
        )*/}
        {item.pause == 1 && (
          <Text style={styles.freezeText}>
            {item?.pause_dates?.start + ' - ' + item?.pause_dates?.end}
          </Text>
        )}

        <View style={styles.checkWr}>
          <Text style={styles.clientText}>
            {!is_dietician ? 'Üyelik Arşivle' : 'Durdur'}
          </Text>
          <ToggleSwitch
            isOn={!item?.active}
            onColor={COLORS.SUCCESS}
            offColor={COLORS.GRAY}
            size="medium"
            onToggle={isOn => freezeUser(isOn, item, index, is_dietician)}
          />
        </View>
      </View>
    );
  };
  const renderAdmin = ({ item, index }) => {
    if (activePage == 0) {
      return renderClient(item, false, index);
    } else if (activePage == 1) {
      return renderClient(item, true, index);
    } else {
      return renderApprove(item, true);
    }
  };

  return (
    <Container loading={false}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Settings')}
          style={styles.headerLeft}>
          <SettingsIcon />
        </TouchableOpacity>

        {isSearch ? (
          <TextInput
            style={{
              flex: 1,
              backgroundColor: COLORS.WHITE,
              marginHorizontal: 10,
              borderRadius: 50,
              color: COLORS.BLACK,
            }}
            value={search}
            onChangeText={setSearch}
            placeholder="Ara..."
            placeholderTextColor={COLORS.GRAY}
          />
        ) : (
          <Text style={styles.headerText}>Fit'n Co</Text>
        )}
        <View style={styles.rightIconWr}>
          <TouchableOpacity
            onPress={() => {
              if (isSearch) {
                //  getData();
              } else {
                setIsSearch(true);
              }
            }}>
            <SearchIcon style={styles.headerIcon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => refRBSheet.current.open()}>
            <SortIcon style={styles.headerIcon} />
          </TouchableOpacity>
          {activePage == 0 && (
            <TouchableOpacity onPress={() => filterRawRef.current.open()}>
              <FilterIcon style={styles.headerIcon} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {activePage == 0 && (
        <FlatList
          renderItem={renderAdmin}
          data={clients}
          contentContainerStyle={{ paddingBottom: 10 }}
          onEndReached={() => {
            if (!loading) {
              setPageState(pageState + 1);
              console.log('end');
            }
          }}
          refreshControl={
            <RefreshControl
              colors={[COLORS.PRIMARY, COLORS.PRIMARY]}
              refreshing={loading}
              onRefresh={() => resetData()}
            />
          }
          removeClippedSubviews={true} // Unmount components when outside of window
          initialNumToRender={2} // Reduce initial render amount
          maxToRenderPerBatch={1} // Reduce number in each render batch
          updateCellsBatchingPeriod={100} // Increase time between renders
          windowSize={7} // Reduce the window size
          ListHeaderComponent={() => {
            return (
              <Tabs
                tab1={{
                  onPress: () => {
                    setActivePage(0);
                    resetData();
                  },
                  text: 'Danışan',
                }}
                tab2={{
                  onPress: () => {
                    setActivePage(1);
                    resetData();
                  },
                  text: 'Diyetisyen',
                }}
                tab3={{
                  onPress: () => {
                    setActivePage(2);
                    resetData();
                  },
                  text: 'Onay',
                }}
                activePage={activePage}
              />
            );
          }}
        />
      )}
      {activePage == 1 && (
        <FlatList
          renderItem={renderAdmin}
          data={dieticians}
          contentContainerStyle={{ paddingBottom: 10 }}
          onEndReached={() => {
            if (!loading) {
              setPageState(pageState + 1);
            }
          }}
          refreshControl={
            <RefreshControl
              colors={[COLORS.PRIMARY, COLORS.PRIMARY]}
              refreshing={loading}
              onRefresh={() => resetData()}
            />
          }
          removeClippedSubviews={true} // Unmount components when outside of window
          initialNumToRender={2} // Reduce initial render amount
          maxToRenderPerBatch={1} // Reduce number in each render batch
          updateCellsBatchingPeriod={100} // Increase time between renders
          windowSize={7} // Reduce the window size
          ListHeaderComponent={() => {
            return (
              <Tabs
                tab1={{
                  onPress: () => {
                    setActivePage(0);
                    resetData();
                  },
                  text: 'Danışan',
                }}
                tab2={{
                  onPress: () => {
                    setActivePage(1);
                    resetData();
                  },
                  text: 'Diyetisyen',
                }}
                tab3={{
                  onPress: () => {
                    setActivePage(2);
                    resetData();
                  },
                  text: 'Onay',
                }}
                activePage={activePage}
              />
            );
          }}
        />
      )}
      {activePage == 2 && (
        <FlatList
          renderItem={renderAdmin}
          data={users}
          contentContainerStyle={{ paddingBottom: 10 }}
          onEndReached={() => {
            if (!loading) {
              setPageState(pageState + 1);
            }
          }}
          refreshControl={
            <RefreshControl
              colors={[COLORS.PRIMARY, COLORS.PRIMARY]}
              refreshing={loading}
              onRefresh={() => resetData()}
            />
          }
          removeClippedSubviews={true} // Unmount components when outside of window
          initialNumToRender={2} // Reduce initial render amount
          maxToRenderPerBatch={1} // Reduce number in each render batch
          updateCellsBatchingPeriod={100} // Increase time between renders
          windowSize={7} // Reduce the window size
          ListHeaderComponent={() => {
            return (
              <Tabs
                tab1={{
                  onPress: () => {
                    setActivePage(0);
                    resetData();
                  },
                  text: 'Danışan',
                }}
                tab2={{
                  onPress: () => {
                    setActivePage(1);
                    resetData();
                  },
                  text: 'Diyetisyen',
                }}
                tab3={{
                  onPress: () => {
                    setActivePage(2);
                    resetData();
                  },
                  text: 'Onay',
                }}
                activePage={activePage}
              />
            );
          }}
        />
      )}
      <Modal
        animationType="slide"
        transparent={true}
        visible={dateModalVisible}
        onRequestClose={() => {
          setDateModalVisible(!dateModalVisible);
        }}>
        <View style={styles.dateModalWr}>
          <View style={styles.dateModalContent}>
            <Calendar
              onDayPress={day => {
                if (dates.length == 0) {
                  setDates([day.dateString]);
                } else {
                  pauseModal(day.dateString);
                }
              }}
              markedDates={
                dates.length > 0
                  ? {
                    [dates[0]]: { selected: true, selectedColor: 'red' },
                  }
                  : {}
              }
            />
          </View>
        </View>
      </Modal>
      <CustomRawBottom ref={refRBSheet}>
        <Text style={styles.rawHeader}>{'Sıralama'}</Text>
        <TouchableOpacity
          onPress={() => {
            setOrder(1);
          }}
          style={styles.rawWr}>
          <Text style={styles.rawText}>{'Alfabetik Sıralama'}</Text>
          {order == 1 ? (
            <View style={styles.selectedCircle}>
              <View style={styles.dot} />
            </View>
          ) : (
            <View style={styles.circle} />
          )}
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setOrder(2);
          }}
          style={styles.rawWr}>
          <Text style={styles.rawText}>{'Kayıt Sırasına Göre Sıralama'}</Text>
          {order == 2 ? (
            <View style={styles.selectedCircle}>
              <View style={styles.dot} />
            </View>
          ) : (
            <View style={styles.circle} />
          )}
        </TouchableOpacity>
        <View style={styles.buttonWr}>
          <Button
            text={'Onayla'}
            onPress={() => {
              getData();
              refRBSheet.current.close();
            }}
          />
        </View>
      </CustomRawBottom>
      <CustomRawBottom ref={filterRawRef}>
        <Text style={styles.rawHeader}>{'Filtreleme'}</Text>
        <TouchableOpacity
          onPress={() => {
            setArchive(undefined);
          }}
          style={styles.rawWr}>
          <Text style={styles.rawText}>{'Aktif Kullanıcılar'}</Text>
          {archive == undefined ? (
            <View style={styles.selectedCircle}>
              <View style={styles.dot} />
            </View>
          ) : (
            <View style={styles.circle} />
          )}
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setArchive(1);
          }}
          style={styles.rawWr}>
          <Text style={styles.rawText}>{'Arşivlenmiş Kullanıcılar'}</Text>
          {archive == 1 ? (
            <View style={styles.selectedCircle}>
              <View style={styles.dot} />
            </View>
          ) : (
            <View style={styles.circle} />
          )}
        </TouchableOpacity>
        <View style={styles.buttonWr}>
          <Button
            text={'Onayla'}
            onPress={() => {
              getData();
              filterRawRef.current.close();
            }}
          />
        </View>
      </CustomRawBottom>
    </Container>
  );
};
