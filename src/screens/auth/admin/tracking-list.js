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
  RefreshControl,
} from 'react-native';
import {
  width,
  COLORS,
  USER,
  APPROVALS,
  DIETICIANS,
  CLIENTS,
  PAUSE,
  APPROVE,
  TRACKING,
  RENEWALS,
  height,
  MONTHLY,
} from '../../../constants';

import {
  Button,
  Container,
  CustomRawBottom,
  Tabs,
  UserName,
  TrackingListFilterModal,
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
  PlusIcon,
  BlackNotifIcon,
} from '../../../assets/icons';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import axios from 'axios';
import ToggleSwitch from 'toggle-switch-react-native';
import moment from 'moment';
import {
  BreakfastSmallIcon,
  DinnerSmallIcon,
  LunchSmallIcon,
  SportSmallIcon,
  WalkSmallIcon,
  WaterSmallIcon,
} from '../../../assets/icons/small_icons';
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
    fontSize: 15,
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
    width: width * 0.42,
    alignItems: 'center',
    justifyContent: 'space-around',
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
  iconWr: { position: 'absolute', top: 10, right: 10 },
});

export const TrackingListScreen = props => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [trackings, setTrackings] = useState([]);
  const [renewals, setRenewals] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [clients, setClients] = useState([]);
  const [activePage, setActivePage] = useState(0);
  const [order, setOrder] = useState(undefined);
  const [pageState, setPageState] = useState(1);
  const [loading, setLoading] = useState(true);
  const [selectedFilterRaw, setSelectedFilterRaw] = useState(undefined);
  const refRBSheet = useRef();
  const filterRawRef = useRef();
  const [isSearch, setIsSearch] = useState(false);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState(undefined);
  const [filterValue, setFilterValue] = useState(undefined);
  const [filterModal, setFilterModal] = useState(false);
  const filters = [
    {
      name: '0 Gün Kalanlar',
      value: '',
    },
    {
      name: '1 Gün Kalanlar',
      value: '',
    },
    {
      name: '2 Gün Kalanlar',
      value: '',
    },
    {
      name: '3 Gün Kalanlar',
      value: '',
    },
  ];

  useEffect(() => {
    if (props?.route?.params) {
      setFilter(props?.route?.params?.filter);
      setFilterValue(props?.route?.params?.value);
    }
  }, [props?.route?.params]);

  useEffect(() => {
    resetData();
  }, [isFocused]);

  useEffect(() => {
    getData();
  }, [
    order,
    search,
    activePage,
    selectedFilterRaw,
    isFocused,
    filterValue,
    filter,
  ]);

  useEffect(() => {
    if (pageState != 1) {
      getData(pageState);
    }
  }, [pageState]);

  const getData = async page => {
    setLoading(true);
    const token = await AsyncStorage.getItem('token');
    if (activePage == 0) {
      await getTracking(token, page);
    } else if (activePage == 1) {
      await getRenewals(token, page);
    } else if (activePage == 2) {
      await getMonthly(token, page);
    }
  };
  const getTracking = async (token, page) => {
    axios
      .get(TRACKING, {
        params: {
          can_walk: [filter] == 'walk' && filterValue == 0 ? 1 : undefined,
          page: page ? page : 1,
          search: search,
          order: order,
          [filter]: filterValue,
          //  left: selectedFilterRaw,
        },
        headers: { Authorization: 'Bearer ' + token },
      })
      .then(res => {
        setLoading(false);
        console.log({ Authorization: 'Bearer ' + token });
        console.log({
          can_walk: [filter] == 'walk' && filterValue == 0 ? 1 : undefined,
          page: page ? page : 1,
          search: search,
          order: order,
          [filter]: filterValue,
          //  left: selectedFilterRaw,
        });
        setTrackings(
          page ? [...trackings, ...res.data.data.items] : res.data.data.items,
        );
      })
      .catch(e => {
        setLoading(false);
        console.log(e);
      });
  };
  const getRenewals = async (token, page) => {
    axios
      .get(RENEWALS, {
        params: {
          page: page ? page : 1,
          search: search,
          order: order,
          left: selectedFilterRaw,
        },
        headers: { Authorization: 'Bearer ' + token },
      })
      .then(res => {
        setLoading(false);
        setRenewals(
          page ? [...renewals, ...res.data.data.items] : res.data.data.items,
        );
      })
      .catch(e => {
        setLoading(false);
        console.log(e);
      });
  };
  const getMonthly = async (token, page) => {
    axios
      .get(MONTHLY, {
        params: {
          page: page ? page : 1,
          search: search,
          order: order,
          left: selectedFilterRaw,
        },
        headers: { Authorization: 'Bearer ' + token },
      })
      .then(res => {
        console.log(res.data);
        setLoading(false);
        setClients(
          page ? [...clients, ...res.data.data.items] : res.data.data.items,
        );
      })
      .catch(e => {
        setLoading(false);
        console.log(e);
      });
  };

  const select = item => {
    const selected =
      selectedUsers.find(element => element.id === item.id) != undefined;
    setSelectedUsers(prevState => {
      if (selected) {
        return selectedUsers.filter(element => element != item);
      } else {
        return [...prevState, item];
      }
    });
  };

  const renderTrackings = item => {
    const selected =
      selectedUsers.find(element => element.id === item.id) !== undefined;
    return (
      <TouchableOpacity
        onLongPress={() => select(item)}
        onPress={() => {
          if (selectedUsers.length) {
            select(item);
          } else {
            navigation.navigate('UserProfile', { id: item.id });
          }
        }}
        style={selected ? styles.selectedItemWr : styles.itemWr}>
        <View style={styles.imageWr}>
          <Image style={styles.itemImage} source={{ uri: item?.pp }} />
          {selected && (
            <View style={styles.selectedImageWr}>
              <Image source={require('../../../assets/icons/check.png')} />
            </View>
          )}
        </View>
        <View style={styles.textWr}>
          <UserName
            name={item?.name}
            type={item?.type}
            is_vip={item?.vip}
            diet_type={item?.diet_type}
          />
          {item?.note ? (
            <Text style={styles.messageText}>{item?.note}</Text>
          ) : null}

          <Text style={styles.messageText}>
            {'Program Bitiş Tarihi: ' +
              (item?.diet_end ? item?.diet_end : 'Bulunamadı')}
          </Text>
          {item?.can_walk ? (
            <Text style={styles.messageText}>
              {'Tamamlanan Yürüyüş: ' + item?.walking}
            </Text>
          ) : null}
          <View style={styles.mealWr}>
            <BreakfastSmallIcon
              color={item?.breakfast ? COLORS.PRIMARY : undefined}
            />
            {item?.diet_type != 1 && (
              <LunchSmallIcon
                color={item?.lunch ? COLORS.PRIMARY : undefined}
              />
            )}
            <DinnerSmallIcon
              color={item?.dinner ? COLORS.PRIMARY : undefined}
            />
            {item?.can_walk ? (
              <WalkSmallIcon color={item?.walk ? COLORS.PRIMARY : undefined} />
            ) : null}
            <WaterSmallIcon color={item?.water ? COLORS.PRIMARY : undefined} />
            <SportSmallIcon
              color={item?.sport == 0 ? undefined : COLORS.PRIMARY}
            />
          </View>
        </View>
        <Text style={styles.timeText}>{item?.time}</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('MessageDetail', { id: item.id })}
          style={styles.iconWr}>
          <BlackNotifIcon />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };
  const renderRenewals = item => {
    const selected =
      selectedUsers.find(element => element.id === item.id) !== undefined;
    return (
      <TouchableOpacity
        onPress={() => {
          if (selectedUsers.length) {
            //  select(item);
          } else {
            navigation.navigate('UserProfile', { id: item.id });
          }
        }}
        style={selected ? styles.selectedItemWr : styles.itemWr}>
        <View style={styles.imageWr}>
          <Image style={styles.itemImage} source={{ uri: item?.picture }} />
          {selected && (
            <View style={styles.selectedImageWr}>
              <Image source={require('../../../assets/icons/check.png')} />
            </View>
          )}
        </View>
        <View style={styles.textWr}>
          <UserName
            name={item?.full_name}
            type={item?.type}
            is_vip={item?.vip}
          />
          <Text style={styles.messageText}>{'Program Bitiş Tarihi:'}</Text>
          <Text style={styles.messageText}>
            {item?.date ? item?.date : 'Tanımlanmış program bulunmamaktadır.'}
          </Text>
        </View>
        <Text style={styles.timeText}>{item?.time}</Text>
        <View style={styles.iconWr}>
          <PlusIcon />
        </View>
      </TouchableOpacity>
    );
  };
  const renderClients = item => {
    const selected =
      selectedUsers.find(element => element.id === item.id) !== undefined;
    return (
      <TouchableOpacity
        onPress={() => {
          if (selectedUsers.length) {
            // select(item);
          } else {
            navigation.navigate('UserProfile', { id: item.id });
          }
        }}
        style={selected ? styles.selectedItemWr : styles.itemWr}>
        <View style={styles.imageWr}>
          <Image style={styles.itemImage} source={{ uri: item.picture }} />
          {selected && (
            <View style={styles.selectedImageWr}>
              <Image source={require('../../../assets/icons/check.png')} />
            </View>
          )}
        </View>
        <View style={styles.textWr}>
          <UserName
            name={item?.full_name}
            type={item?.type}
            is_vip={item?.vip}
          />
          {item?.date && (
            <Text style={styles.messageText}>{'Üyelik Yenileme Tarihi:'}</Text>
          )}
          <Text style={styles.messageText}>{item?.date}</Text>
        </View>
        <Text style={styles.timeText}>{item?.time}</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('MessageDetail', { id: item.id })}
          style={styles.iconWr}>
          <BlackNotifIcon />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  const resetData = () => {
    setLoading(true);
    setOrder(undefined);
    setSearch('');
    setIsSearch(false);
    setSelectedUsers([]);
    setTrackings([]);
    setRenewals([]);
    setClients([]);
    setSelectedFilterRaw(undefined);
    setPageState(1);
    setFilter(undefined);
    setFilterValue(undefined);
    getData();
  };
  const render = ({ item }) => {
    if (activePage == 0) {
      return renderTrackings(item);
    } else if (activePage == 1) {
      return renderRenewals(item);
    } else {
      return renderClients(item, true);
    }
  };

  const _selectAllUsersOrClearAllUsers = () => {
    if (selectedUsers.length === trackings.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(trackings);
    }
  };
  return (
    <Container loading={false}>
      <View style={styles.header}>
        {selectedUsers.length > 0 ? (
          <TouchableOpacity
            onPress={_selectAllUsersOrClearAllUsers}
            style={styles.headerLeft}>
            <Text style={styles.allSelectButton}>
              {selectedUsers.length === trackings.length
                ? 'Temizle'
                : 'Tümünü Seç'}
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => resetData()}
            style={styles.headerLeft}>
            <RefreshIcon />
          </TouchableOpacity>
        )}
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
          {selectedUsers.length > 0 ? (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('TrackingListMessage', {
                  selectedUsers: selectedUsers,
                })
              }>
              <SendMultiMessageIcon />
            </TouchableOpacity>
          ) : (
            <>
              <TouchableOpacity
                onPress={() => {
                  if (activePage == 0) {
                    setFilterModal(true);
                  } else {
                    filterRawRef.current.open();
                  }
                }}>
                <FilterIcon style={styles.headerIcon} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setIsSearch(true);
                }}>
                <SearchIcon style={styles.headerIcon} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => refRBSheet.current.open()}>
                <SortIcon style={styles.headerIcon} />
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
      {activePage == 0 && (
        <FlatList
          renderItem={render}
          data={trackings}
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
          // Performance settings
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
                  text: 'Aktif',
                }}
                tab2={{
                  onPress: () => {
                    setActivePage(1);
                    resetData();
                  },
                  text: 'Program Tekrar',
                }}
                tab3={{
                  onPress: () => {
                    setActivePage(2);
                    resetData();
                  },
                  text: 'Üyelik Yenileme',
                }}
                activePage={activePage}
              />
            );
          }}
        />
      )}
      {activePage == 1 && (
        <FlatList
          renderItem={render}
          data={renewals}
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
          // Performance settings
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
                  text: 'Aktif',
                }}
                tab2={{
                  onPress: () => {
                    setActivePage(1);
                    resetData();
                  },
                  text: 'Program Tekrar',
                }}
                tab3={{
                  onPress: () => {
                    setActivePage(2);
                    resetData();
                  },
                  text: 'Üyelik Yenileme',
                }}
                activePage={activePage}
              />
            );
          }}
        />
      )}
      {activePage == 2 && (
        <FlatList
          renderItem={render}
          data={clients}
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
          // Performance settings
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
                  text: 'Aktif',
                }}
                tab2={{
                  onPress: () => {
                    setActivePage(1);
                    resetData();
                  },
                  text: 'Program Tekrar',
                }}
                tab3={{
                  onPress: () => {
                    setActivePage(2);
                    resetData();
                  },
                  text: 'Üyelik Yenileme',
                }}
                activePage={activePage}
              />
            );
          }}
        />
      )}
      <CustomRawBottom height={height * 0.42} ref={refRBSheet}>
        <Text style={styles.rawHeader}>{'Sıralama'}</Text>
        <TouchableOpacity
          onPress={() => {
            setOrder(1);
          }}
          style={styles.rawWr}>
          <Text style={styles.rawText}>{'VIP'}</Text>
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
          <Text style={styles.rawText}>{'Alfabetik Sıralama'}</Text>
          {order == 2 ? (
            <View style={styles.selectedCircle}>
              <View style={styles.dot} />
            </View>
          ) : (
            <View style={styles.circle} />
          )}
        </TouchableOpacity>
        {/*activePage == 2 && (
          <TouchableOpacity
            onPress={() => {
              setOrder(3);
            }}
            style={styles.rawWr}>
            <Text style={styles.rawText}>{'Tanımlı Diyeti Bulunmayanlar'}</Text>
            {order == 3 ? (
              <View style={styles.selectedCircle}>
                <View style={styles.dot} />
              </View>
            ) : (
              <View style={styles.circle} />
            )}
          </TouchableOpacity>
            )*/}
        {/*activePage == 1 && (
          <TouchableOpacity
            onPress={() => {
              setOrder(3);
            }}
            style={styles.rawWr}>
            <Text style={styles.rawText}>
              {'Üyelik Yenileme Tarihine Göre'}
            </Text>
            {order == 3 ? (
              <View style={styles.selectedCircle}>
                <View style={styles.dot} />
              </View>
            ) : (
              <View style={styles.circle} />
            )}
          </TouchableOpacity>
            )*/}
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
      <CustomRawBottom height={height * 0.45} ref={filterRawRef}>
        <Text style={styles.rawHeader}>{'Filtre'}</Text>
        {filters.map((filter, index) => {
          return (
            <TouchableOpacity
              onPress={() => {
                setSelectedFilterRaw(index);
              }}
              style={styles.rawWr}>
              {index != 0 && <Text style={styles.rawText}>{filter.name}</Text>}
              {index == 0 && activePage == 1 && (
                <Text style={styles.rawText}>
                  {'Tanımlı programı bulunmayanlar'}
                </Text>
              )}
              {index == 0 && activePage == 2 && (
                <Text style={styles.rawText}>
                  {'Üyelik Yenileme Tarihi Olmayanlar'}
                </Text>
              )}
              {selectedFilterRaw == index ? (
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
              filterRawRef.current.close();
            }}
          />
        </View>
      </CustomRawBottom>
      <TrackingListFilterModal
        visible={filterModal}
        setVisible={setFilterModal}
        setFilter={setFilter}
        setFilterValue={setFilterValue}
      />
    </Container>
  );
};
