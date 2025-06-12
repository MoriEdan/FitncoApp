import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  Keyboard,
  ScrollView,
  
  Platform,
  FlatList,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Modal,
  Linking,
} from 'react-native';
import {
  width,
  height,
  COLORS,
  INBOX,
  CLIENT_MESSAGE,
  MESSAGES,
  SEND_MESSAGE,
  MESSAGES_MEDIA,
  REGISTER,
  USER,
  MY_PLANS,
  imageSelectOptions,
  DELETE_MESSAGE,
  MY_PLAN,
} from '../../constants';
import {
  MessageInput,
  RadialLogo,
  IosPicker,
  PhotoModal,
  PhotoSelectModal,
  Container,
} from '../../components';
import {} from 'react-native-gesture-handler';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {
  BackIcon,
  BlackCloseIcon,
  BreakfastLogIcon,
  CrossIcon,
  DinnerIcon,
  DinnerLogIcon,
  GalleryIcon,
  HeaderLeftIcon,
  KruvasanIcon,
  LunchLogIcon,
  MealIcon,
  QuestionIcon,
  QuestionLogIcon,
  RefreshIcon,
  WalkIcon,
  WalkLogIcon,
  WeightIcon,
  WeightLogIcon,
} from '../../assets/icons';
import {NavigationContainer, useIsFocused} from '@react-navigation/native';
import axios from 'axios';
import moment from 'moment';
import {useSockets} from '../../constants';
import {
  request,
  PERMISSIONS,
  RESULTS,
} from 'react-native-permissions';
import AsyncStorage from '@react-native-async-storage/async-storage';
const styles = StyleSheet.create({
  wr: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  contentIos: {
    flex: 1,
    // height: '85%',
  },
  logo: {
    width: 40,
    height: 40,
    borderRadius: 25,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 8,
    paddingHorizontal: 15,
  },
  logoImage: {
    width: 35,
    height: 35,
  },
  headerText: {
    color: COLORS.BLACK,
    flex: 1,
    marginHorizontal: 8,
    fontSize: 18,
    fontWeight: 'bold',
  },
  headerIcon: {
    fontSize: 25,
  },
  emptyView: {
    height: height * 0.75,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyImage: {
    width: width,
    height: height * 0.4,
    resizeMode: 'contain',
    marginTop: 20,
  },
  emptyText: {
    width: width * 0.8,
    color: COLORS.BLACK,
    textAlign: 'center',
    fontSize: 18,
  },

  messageWr: {
    backgroundColor: COLORS.GRAY,
    maxWidth: width * 0.8,
    minHeight: 30,
    justifyContent: 'center',
    padding: 8,
    borderRadius: 15,
    marginVertical: 5,
    marginHorizontal: 15,
    paddingRight: width * 0.25,
    lineHeight: 17,
  },
  messageText: {
    color: COLORS.TEXT,
  },
  timeText: {
    position: 'absolute',
    bottom: 5,
    right: 8,
    color: COLORS.TEXT,
    fontSize: 14,
  },
  imageWr: {
    width: width * 0.7,
    height: width * 0.7,
    minHeight: 30,
    justifyContent: 'center',
    padding: 8,
    marginVertical: 5,
    marginHorizontal: 15,
    lineHeight: 17,
  },
  photoDate: {
    color: COLORS.WHITE,
    position: 'absolute',
    bottom: 5,
    right: 10,
  },
  logWr: {
    backgroundColor: COLORS.WHITE,
    width: 50,
    height: 50,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 5,
    right: 0,
  },
  image: {
    width: width * 0.7,
    height: width * 0.7,
    resizeMode: 'cover',
    borderRadius: 14,
  },
  itemImage: {
    width: width,
    height: height,
    resizeMode: 'contain',
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
  modalContent: {
    width: width,
    height: height,
    backgroundColor: COLORS.WHITE,
    flex: 1,
  },
});

export const MessagingScreen = props => {
  const [keyboardStatus, setKeyboardStatus] = useState(undefined);
  const [message, setMessage] = useState('');
  const [photoModal, setPhotoModal] = useState(false);
  const [photoModalVisible, setPhotoModalVisible] = useState(false);
  const [photoSelectModalVisible, setPhotoSelectModalVisible] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(false);
  const [visiblePhoto, setVisiblePhoto] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [messages, setMessages] = useState([]);
  const [images, setImages] = useState([]);
  const [user, setUser] = useState(undefined);
  const [activeDiet, setActiveDiet] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const [pageState, setPageState] = useState(1);
  const [mediaPage, setMediaPage] = useState(1);
  const [sendLoading, setSendLoading] = useState(false);
  const isFocused = useIsFocused();
  const [loop, setLoop] = useState(0);
  const {socket} = useSockets();
  useEffect(() => {
    if (isFocused) {
      getData();
      getMedia();
      setMediaPage(1);
      setPageState(1);
    }
  }, [isFocused]);
  useEffect(() => {
    if (pageState != 1) {
      getData(pageState);
    }
  }, [pageState]);
  useEffect(() => {
    if (mediaPage != 1) {
      getMedia(mediaPage);
    }
  }, [mediaPage]);
  const getData = async page => {
    setLoading(true);
    const token = await AsyncStorage.getItem('token');
    getMessages(token, page);
    //  setLoading(false);
  };
  const getMessages = async (token, page) => {
    axios
      .get(CLIENT_MESSAGE, {
        headers: {Authorization: 'Bearer ' + token},
        params: {page: page ? page : 1, pagination: 20},
      })
      .then(res => {
        setMessages(
          page
            ? [
                ...messages,
                ...res.data.data.items.map(item => {
                  return {...item, day: moment(item.date).format('DD')};
                }),
              ]
            : res.data.data.items.map(item => {
                return {...item, day: moment(item.date).format('DD')};
              }),
        );
      })
      .catch(e => {
        console.log(e);
      });
  };
  const getMedia = async page => {
    const token = await AsyncStorage.getItem('token');
    axios
      .get(MESSAGES_MEDIA, {
        headers: {
          Authorization: 'Bearer ' + token,
        },
        params: {page: page ? page : 1},
      })
      .then(res => {
        setImages(
          page ? [...images, ...res.data.data.items] : res.data.data.items,
        );
      })
      .catch(e => {
        console.log(e);
      });
    axios
      .get(USER, {headers: {Authorization: 'Bearer ' + token}})
      .then(res => {
        setUser(res.data.data);
      })
      .catch(e => {
        console.log(e);
      });
    axios
      .get(MY_PLAN, {headers: {Authorization: 'Bearer ' + token}})
      .then(res => {
        setActiveDiet(res.data.data?.type ? res.data.data : {type: 0});
      })
      .catch(e => {
        console.log(e);
      });
  };
  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardStatus(true);
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardStatus(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);
  useEffect(() => {
    /* async function fetchMyAPI() {
      const token = await AsyncStorage.getItem('token');
      axios
        .get(CLIENT_MESSAGE, {
          headers: {Authorization: 'Bearer ' + token},
          params: {page: 1, pagination: 1},
        })
        .then(res => {
          if (
            moment(messages[0]?.date) < moment(res.data.data.items[0]?.date)
          ) {
            setMessages([
              {
                ...res.data.data.items[0],
                day: moment(res.data.data.items[0].date).format('DD'),
              },
              ...messages,
            ]);
          }
        })
        .catch(e => {});
    }
    if (messages.length > 0) {
     const intervalId = setInterval(() => {
        fetchMyAPI(messages);
      }, 1000); // in milliseconds
      return () => clearInterval(intervalId);
    }*/
  }, [messages.length]);

  async function updateMessage() {
    const token = await AsyncStorage.getItem('token');
    axios
      .get(CLIENT_MESSAGE, {
        headers: {Authorization: 'Bearer ' + token},
        params: {page: 1, pagination: 1},
      })
      .then(res => {
        if (moment(messages[0]?.date) < moment(res.data.data.items[0]?.date)) {
          setMessages([
            {
              ...res.data.data.items[0],
              day: moment(res.data.data.items[0].date).format('DD'),
            },
            ...messages,
          ]);
        }
      })
      .catch(e => {});
  }

  /*useEffect(() => {
   // setInterval(() => setLoop(Math.random()), 3000);
  }, []);

  useEffect(() => {
    updateMessage();
  }, [loop]);*/
  const sendPhoto = async (photo, selected) => {
    const token = await AsyncStorage.getItem('token');
    let data = new FormData();

    data.append('type', 'image');
    data.append('file', {
      type: photo.type,
      name: photo.fileName,
      uri: photo.uri,
    });
    data.append('log', selected ? selected : 'none');
    const response = await fetch(SEND_MESSAGE, {
      method: 'POST',
      body: data,
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: 'Bearer ' + token,
      },
    });
    const json = await response.json();
    if (json?.code && json.code == 200) {
      socket.emit('send', {
        from_user: user?.id,
        method: 'POST',
        to_user: null,
        user_type: user?.type,
      });
      getData();
    }
  };
  const send = async () => {
    if (sendLoading) {
      console.log('here');
      return;
    } else {
      setSendLoading(true);
      const token = await AsyncStorage.getItem('token');

      axios
        .post(
          SEND_MESSAGE,
          {
            type: 'text',
            content: message,
          },
          {
            headers: {
              Authorization: 'Bearer ' + token,
            },
          },
        )
        .then(res => {
          socket.emit('send', {
            from_user: user?.id,
            method: 'POST',
            to_user: null,
            user_type: user?.type,
          });
          getData();
          setMessage('');
        })
        .catch(e => {
          console.log(e);
        })
        .finally(() => setSendLoading(false));
    }
  };
  const deleteMessage = async id => {
    Alert.alert('', 'Mesajı silmek istediğinize emin misiniz?', [
      {
        text: 'Evet',
        onPress: async () => {
          const token = await AsyncStorage.getItem('token');
          axios
            .post(
              DELETE_MESSAGE,
              {
                message: id,
              },
              {
                headers: {
                  Authorization: 'Bearer ' + token,
                },
              },
            )
            .then(res => {
              console.log(user?.type);
              socket.emit('send', {
                from_user: user?.id,
                method: 'DELETE',
                to_user: null,
                user_type: user?.type,
              });
              getData();
            })
            .catch(e => {
              Alert.alert('', 'Mesaj Silerken bir hata oluştu');
              console.log(e);
            });
        },
      },
      {
        text: 'Hayır',
        onPress: () => {},
      },
    ]);
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
  const setPhoto = (res, isclose) => {
    if (res?.didCancel) {
    } else {
      setSelectedPhoto(res);
      setPhotoSelectModalVisible(true);
    }
    if (isclose) {
      setPhotoModal(false);
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
  const renderItem = ({item, index}) => {
    const is_mine = item?.from === user?.id;
    const datechanges =
      index == messages.length - 1 || item?.day != messages[index + 1].day;
    if (item?.type != 'image') {
      return (
        <View>
          {datechanges && (
            <Text style={{color: COLORS.GRAY, alignSelf: 'center'}}>
              {moment(item?.date).format('DD-MM-YYYY')}
            </Text>
          )}
          <TouchableOpacity
            onLongPress={() => {
              if (is_mine) {
                deleteMessage(item?.id);
              } else {
                Alert.alert(
                  '',
                  'Yalnızca kendi gönderdiğiniz mesajları silebilirsiniz.',
                );
              }
            }}
            key={item?.message}
            style={{
              ...styles.messageWr,
              backgroundColor: is_mine ? COLORS.PRIMARY : COLORS.LIGHT_GRAY,
              alignSelf: is_mine ? 'flex-end' : 'flex-start',
            }}>
            <Text style={styles.messageText}>{item?.content}</Text>
            <Text style={styles.timeText}>
              {moment(item?.date).format('HH:mm')}
            </Text>
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <View>
          {datechanges && (
            <Text style={{color: COLORS.GRAY, alignSelf: 'center'}}>
              {moment(item?.date).format('DD-MM-YYYY')}
            </Text>
          )}
          <TouchableOpacity
            onLongPress={() => {
              if (is_mine) {
                deleteMessage(item?.id);
              } else {
                Alert.alert(
                  '',
                  'Yalnızca kendi gönderdiğiniz mesajları silebilirsiniz.',
                );
              }
            }}
            onPress={() => {
              setVisiblePhoto(item?.source);
              setModalVisible(true);
            }}
            style={{
              ...styles.imageWr,
              alignSelf: is_mine ? 'flex-end' : 'flex-start',
            }}>
            <Image source={{uri: item?.source}} style={styles.image} />
            <Text style={styles.photoDate}>
              {moment(item?.date).format('DD-MM-YYYY HH:mm')}
            </Text>
            {item?.log != 'none' && (
              <View style={styles.logWr}>{returnIcon(item?.log)}</View>
            )}
          </TouchableOpacity>
        </View>
      );
    }
  };
  const returnIcon = log => {
    if (log == 'breakfast') {
      return <BreakfastLogIcon color={COLORS.BLACK} />;
    } else if (log == 'lunch') {
      return <LunchLogIcon color={COLORS.BLACK} />;
    } else if (log == 'dinner') {
      return <DinnerLogIcon color={COLORS.BLACK} />;
    } else if (log == 'walking') {
      return <WalkLogIcon color={COLORS.BLACK} />;
    } else if (log == 'weight') {
      return <WeightLogIcon color={COLORS.BLACK} />;
    } else if (log == 'question') {
      return <QuestionLogIcon color={COLORS.BLACK} />;
    }
  };
  useEffect(() => {
    socket.on('receive', data => {
      if (isFocused) {
        setPageState(1);
        getData();
      }
    });
  }, []);
  return (
    <Container>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS == 'ios' ? 'padding' : undefined}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => props.navigation.goBack()}
            style={{marginRight: 10}}>
            <HeaderLeftIcon />
          </TouchableOpacity>
          <RadialLogo style={styles.logo} imageStyle={styles.logoImage} />
          <Text style={styles.headerText}>Fit'n Co.</Text>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <TouchableOpacity
              onPress={() => {
                setPageState(1);
                getData();
              }}
              style={{marginHorizontal: 12}}>
              <RefreshIcon />
            </TouchableOpacity>
            <GalleryIcon
              style={styles.headerIcon}
              onPress={() => setPhotoModalVisible(true)}
            />
          </View>
        </View>
        <View style={Platform.OS == 'ios' ? styles.contentIos : styles.content}>
          {!keyboardStatus && messages.length === 0 ? (
            <View style={styles.emptyView}>
              <Text style={styles.emptyText}>Değişim başladı!{'\n'}</Text>
              <Image
                style={styles.emptyImage}
                source={require('../../assets/image/empty-image.png')}
              />
            </View>
          ) : (
            <FlatList
              data={messages}
              keyExtractor={(item, index) => item.id + index.toString()}
              renderItem={renderItem}
              inverted
              style={{flex: 1}}
              onEndReached={() => {
                setPageState(pageState + 1);
              }}
              refreshing={loading}
            />
          )}
        </View>

        <MessageInput
          message={message}
          setMessage={setMessage}
          keyboardStatus={keyboardStatus}
          send={send}
          onPressCamera={() => {
            setPhotoModal(true);
          }}
        />
      </KeyboardAvoidingView>
      <PhotoModal
        visible={photoModalVisible}
        setVisible={value => setPhotoModalVisible(value)}
        images={images}
        onEndReached={() => {
          setMediaPage(mediaPage + 1);
        }}
        refreshing={loading}
      />
      <Modal
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
        transparent={true}>
        <View style={styles.modalContent}>
          <Image source={{uri: visiblePhoto}} style={styles.itemImage} />
          <TouchableOpacity
            onPress={() => setModalVisible(false)}
            style={styles.iconWr}>
            <CrossIcon />
          </TouchableOpacity>
        </View>
      </Modal>
      <PhotoSelectModal
        activeDiet={activeDiet?.type}
        visible={photoSelectModalVisible}
        setVisible={value => setPhotoSelectModalVisible(value)}
        selectedPhoto={selectedPhoto}
        setSelectedPhoto={value => setSelectedPhoto(value)}
        sendPhoto={sendPhoto}
        user={user}
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
    </Container>
  );
};
