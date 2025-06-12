import React, {useEffect, useState} from 'react';
import {
  FlatList,
  TextInput,
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {
  width,
  COLORS,
  APPROVALS,
  INBOX,
  INBOX_ARCHIVE,
  ARCHIVE,
  height,
} from '../../../constants';
import {} from 'react-native-gesture-handler';
import {RefreshIcon, SearchIcon} from '../../../assets/icons';
import {useIsFocused} from '@react-navigation/native';
import axios from 'axios';
import {useSockets} from '../../../constants';
import moment from 'moment';
import {Container, MessageTabs, Tabs, UserName} from '../../../components';
import {
  ImageSmallIcon,
  VoiceSmallIcon,
} from '../../../assets/icons/small_icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
const styles = StyleSheet.create({
  wr: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 8,
    paddingVertical: 15,
    paddingHorizontal: 15,
  },
  headerText: {
    color: COLORS.BLACK,
    flex: 1,
    marginHorizontal: 8,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  headerIcon: {
    fontSize: 25,
  },
  itemWr: {
    width: width * 0.9,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
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
    color: COLORS.GRAY,
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
    width: width * 0.17,
    height: width * 0.17,
    borderWidth: 2,
    borderColor: COLORS.PRIMARY,
    borderRadius: width * 0.1,
    overflow: 'hidden',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'red',
    marginRight: 5,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export const AdminMessagesScreen = props => {
  const [messages, setMessages] = useState([]);
  const [archivedMessages, setArchivedMessages] = useState([]);
  const [pageState, setPageState] = useState(1);
  const [isSearch, setIsSearch] = useState(false);
  const [search, setSearch] = useState('');
  const [activePage, setActivePage] = useState(0);
  const [loading, setLoading] = useState(true);
  const isFocused = useIsFocused();
  const {socket} = useSockets();
  useEffect(() => {
    resetData();
  }, [isFocused]);

  useEffect(() => {
    getData();
  }, [search, activePage, isFocused]);

  useEffect(() => {
    if (pageState != 1) {
      getData(pageState);
    }
  }, [pageState]);
  const resetData = () => {
    setSearch('');
    setIsSearch(false);
    setMessages([]);
    setArchivedMessages([]);
    setPageState(1);
    getData();
  };

  useEffect(() => {
    //BURASI
    socket.on('receive', data => {
      console.log('data');
       console.log(data);
      if (isFocused) {
       getMessages();
      }
    });
  }, [socket,isFocused]);

  const getData = async page => {
    const token = await AsyncStorage.getItem('token');
    if (activePage == 0) {
      getMessages(token);
    } else if (activePage == 1) {
      getArchive(token, page);
    }
  };

  async function getMessages() {
    const token = await AsyncStorage.getItem('token');
    axios
      .get(INBOX, {
        headers: {Authorization: 'Bearer ' + token},
        params: {page: 1, pagination: 20 * pageState, search: search},
      })
      .then(res => {
        console.log(res.data.data.items[0]?.is_seen);
        setMessages(res.data.data.items);
      })
      .catch(e => {
        console.log(e);
      })
      .finally(() => {
        setLoading(false);
      });
  }
  const getArchive = async (token, page) => {
    axios
      .get(INBOX_ARCHIVE, {
        headers: {Authorization: 'Bearer ' + token},
        params: {page: page ? page : 0, search: search},
      })
      .then(res => {
        setArchivedMessages(
          page
            ? [...archivedMessages, ...res.data.data.items]
            : res.data.data.items,
        );
        console.log(res.data);
      })
      .catch(e => {
        console.log(e);
        console.log(e.response.data);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const archive = async item => {
    console.log(item);
    const token = await AsyncStorage.getItem('token');
    Alert.alert(
      '',
      activePage == 0
        ? 'Mesajı arşivlemek istediğinize emin misiniz?'
        : 'Mesajı arşivden kaldırmak istediğinize emin misiniz?',
      [
        {
          text: 'Evet',
          onPress: () => {
            axios
              .post(
                ARCHIVE,
                {
                  client: item.id,
                  archive: activePage == 0 ? 1 : 0,
                },
                {headers: {Authorization: 'Bearer ' + token}},
              )
              .then(res => {
                setPageState(1);
                getData();
              })
              .catch(e => {
                console.log(e);
              });
          },
        },
        {
          text: 'Hayır',
          onPress: () => {},
        },
      ],
    );
  };
  const formatDate = date => {
    const momentObj = moment(date);
    return momentObj.format('HH:mm');
    //  return date.split(' ')[1].split(':')[0] + ':' + date.split(' ')[1].split(':')[1]
  };
  const renderItem = ({item}) => (
    <TouchableOpacity
      onLongPress={() => archive(item)}
      onPress={() => {
        props.navigation.navigate('MessageDetail', {id: item.id});
      }}
      style={styles.itemWr}>
      {item?.is_seen == 0 ? <View style={styles.dot} /> : null}
      <TouchableOpacity
        onPress={() => {
          props.navigation.navigate('UserProfile', {id: item.id});
        }}
        style={styles.imageWr}>
        <Image style={styles.itemImage} source={{uri: item?.picture}} />
      </TouchableOpacity>
      <View style={styles.textWr}>
        <UserName name={item?.name} is_vip={item?.vip} type={item?.type} />
        <Text
          numberOfLines={1}
          style={{
            ...styles.messageText,
            color: item?.is_seen == 0 ? COLORS.TEXT : COLORS.GRAY,
          }}>
          {item?.info?.notes}
        </Text>
        {item?.message_type == 'image' ? (
          <View style={styles.row}>
            <ImageSmallIcon />
            <Text
              numberOfLines={1}
              style={{
                ...styles.messageText,
                color: item?.is_seen == 0 ? COLORS.TEXT : COLORS.GRAY,
              }}>
              Resim
            </Text>
          </View>
        ) : item.message_type == 'voice' ? (
          <View style={styles.row}>
            <VoiceSmallIcon />
            <Text
              numberOfLines={1}
              style={{
                ...styles.messageText,
                color: item?.is_seen == 0 ? COLORS.TEXT : COLORS.GRAY,
              }}>
              Ses
            </Text>
          </View>
        ) : (
          <Text
            numberOfLines={1}
            style={{
              ...styles.messageText,
              color: item?.is_seen == 0 ? COLORS.TEXT : COLORS.GRAY,
            }}>
            {item?.last}
          </Text>
        )}
      </View>

      <Text style={styles.timeText}>{formatDate(item?.date)}</Text>
    </TouchableOpacity>
  );
  return (
    <Container loading={loading}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            if (!loading) {
              resetData();
            }
          }}>
          <RefreshIcon style={styles.headerIcon} />
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
          <Text style={styles.headerText}>Mesajlar</Text>
        )}
        <TouchableOpacity
          onPress={() => {
            if (isSearch) {
              getData();
            } else {
              setIsSearch(true);
            }
          }}>
          <SearchIcon style={styles.headerIcon} />
        </TouchableOpacity>
      </View>
      {activePage == 0 && (
        <FlatList
          removeClippedSubviews={true} // Unmount components when outside of window
          initialNumToRender={2} // Reduce initial render amount
          maxToRenderPerBatch={1} // Reduce number in each render batch
          updateCellsBatchingPeriod={100} // Increase time between renders
          windowSize={7} // Reduce the window size
          contentContainerStyle={{paddingBottom: 20}}
          onEndReached={() => {
            if (!loading) {
              setPageState(pageState + 1);
            }
          }}
          ListHeaderComponent={() => {
            return (
              <MessageTabs
                tab1={{
                  onPress: () => {
                    setActivePage(0);
                    resetData();
                  },
                  text: 'Mesajlar',
                }}
                tab2={{
                  onPress: () => {
                    setActivePage(1);
                    resetData();
                  },
                  text: 'Arşiv',
                }}
                activePage={activePage}
              />
            );
          }}
          renderItem={renderItem}
          data={messages}
        />
      )}
      {activePage == 1 && (
        <FlatList
          removeClippedSubviews={true} // Unmount components when outside of window
          initialNumToRender={2} // Reduce initial render amount
          maxToRenderPerBatch={1} // Reduce number in each render batch
          updateCellsBatchingPeriod={100} // Increase time between renders
          windowSize={7} // Reduce the window size
          contentContainerStyle={{paddingBottom: 20}}
          onEndReached={() => {
            if (!loading) {
              setPageState(pageState + 1);
            }
          }}
          ListHeaderComponent={() => {
            return (
              <MessageTabs
                tab1={{
                  onPress: () => {
                    setActivePage(0);
                    resetData();
                  },
                  text: 'Mesajlar',
                }}
                tab2={{
                  onPress: () => {
                    setActivePage(1);
                    resetData();
                  },
                  text: 'Arşiv',
                }}
                activePage={activePage}
              />
            );
          }}
          renderItem={renderItem}
          data={archivedMessages}
        />
      )}
    </Container>
  );
};
