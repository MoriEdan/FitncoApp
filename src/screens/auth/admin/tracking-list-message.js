import React, { useEffect, useRef, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import { ANSWERS, COLORS, height, MULTI_MESSAGE } from '../../../constants';
import { Button, Container, CustomRawBottom, Header } from '../../../components';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import {
  MessageSendIcon,
  BlackCloseIcon,
  MessageGraySendIcon,
  BlackCloseWithGrayBgIcon,
  PlusIcon,
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
  usersToMessageWr: {
    paddingVertical: 15,
    flexWrap: 'wrap',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  userWr: {
    color: COLORS.BLACK,
    width: '49%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.PRIMARY,
    borderRadius: 50,
  },
  userAvatarWr: {
    width: 35,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
  },
  userAvatar: {
    height: 30,
    width: 30,
    borderRadius: 15,
    resizeMode: 'cover',
  },
  userName: {
    color: COLORS.TEXT,
  },
  textAreaWr: {
    borderBottomColor: '#000000',
    borderTopColor: COLORS.BOTTOM_COLOR,
    borderTopWidth: 1,
    flex: 1
  },
  textAreaInput: {
    paddingHorizontal: 20,
    fontSize: 18,
    color: COLORS.TEXT,
  },
  plusWr: {
    position: 'absolute',
    top: 25,
    right: 10,
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
    marginBottom: height * 0.04,
    marginTop: height * 0.02,
  },
  buttonStyle: {},
});

export const TrackingListMessageScreen = props => {
  const navigation = useNavigation();
  const [sendMessage, setSendMessage] = useState('');
  const isFocused = useIsFocused();
  const [users, setUsers] = useState([]);
  const refRBSheet = useRef();
  const [messages, setMessages] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(undefined);

  useEffect(() => {
    getData(props.route.params.selectedUsers);
  }, [isFocused]);

  const getData = async users => {
    const token = await AsyncStorage.getItem('token');
    setUsers(users);
    axios
      .get(ANSWERS, { headers: { Authorization: 'Bearer ' + token } })
      .then(res => {
        setMessages(res.data.data);
      })
      .catch(e => {
        console.log(e);
      });
  };
  const sendMultiMessage = async () => {
    const token = await AsyncStorage.getItem('token');
    axios
      .post(
        MULTI_MESSAGE,
        { to: users.map(user => user?.id), content: sendMessage },
        { headers: { Authorization: 'Bearer ' + token } },
      )
      .then(res => {
        navigation.goBack();
      })
      .catch(e => {
        console.log(e);
      });
  };
  const _removeUserInList = id => {
    const newUsers = users.filter(user => user.id !== id);
    setUsers(newUsers);
  };
  return (
    <Container style={styles.wr}>
      <Header
        rightIcon={
          sendMessage.length ? <MessageSendIcon /> : <MessageGraySendIcon />
        }
        rightOnPress={sendMultiMessage}
        leftIcon={<BlackCloseIcon />}
        leftOnPress={() => {
          navigation.goBack();
        }}
        text="Fit'n Co"
      />
      <View style={styles.content}>
        <View style={styles.usersToMessageWr}>
          {users.map((item, index) => {
            return (
              <View style={styles.userWr} key={index}>
                <View style={styles.userAvatarWr}>
                  {console.log(item)}
                  <Image style={styles.userAvatar} source={{ uri: item?.pp }} />
                </View>

                <Text style={styles.userName}>{item.name}</Text>
                <TouchableOpacity onPress={() => _removeUserInList(item.id)}>
                  <BlackCloseWithGrayBgIcon />
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
        <View style={styles.textAreaWr}>
          <TextInput
            style={styles.textAreaInput}
            multiline
            value={sendMessage}
            onChangeText={setSendMessage}
            numberOfLines={3}
            placeholderTextColor={'#B7B7B7'}
            placeholder="Lütfen iletmek istediğiniz mesajı girin."
          />
          <TouchableOpacity
            style={styles.plusWr}
            onPress={() => refRBSheet.current.open()}>
            <PlusIcon />
          </TouchableOpacity>
        </View>
      </View>

      <CustomRawBottom
        height={
          height * 0.17 + messages?.length * height * 0.07 < height * 0.8
            ? height * 0.17 + messages?.length * height * 0.07
            : height * 0.8
        }
        ref={refRBSheet}>
        <ScrollView>
          <Text style={styles.rawHeader}>{'Hazır Mesajlar'}</Text>
          {messages.map(element => {
            return (
              <TouchableOpacity
                onPress={() => {
                  setSelectedMessage(element);
                }}
                style={styles.rawWr}>
                <Text style={styles.rawText}>{element?.message}</Text>
                {selectedMessage?.id == element?.id ? (
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
                setSendMessage(selectedMessage.message);
                setSelectedMessage(undefined);
                refRBSheet.current.close();
              }}
            />
          </View>
        </ScrollView>
      </CustomRawBottom>
    </Container>
  );
};
