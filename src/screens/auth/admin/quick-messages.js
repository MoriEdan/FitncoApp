import React, { useEffect, useRef, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
  FlatList,
} from 'react-native';
import { ANSWERS, APPROVALS, APPROVE, COLORS, DELETE_ANSWERS, height, NEW_ANSWERS, width } from '../../../constants';
import { Header, Button, CustomRawBottom, Container } from '../../../components';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import ToggleSwitch from 'toggle-switch-react-native'
import {
  HeaderLeftIcon,
  BlackCloseIcon,
  BlackChevronRightIcon,
  CancelIcon,
  CrossIcon,
  PlusIcon,
} from '../../../assets/icons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
const styles = StyleSheet.create({
  content: {
    flex: 1,
    paddingHorizontal: 20,
    height: height * 0.92
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
    height: 50
  },
  text: {
    fontSize: 16,
    color: COLORS.TEXT,
  },
  buttonWr: {
    alignSelf: 'center',
    position: 'absolute',
    bottom: height * 0.05,
  },
  buttonStyle: {
  },

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
    fontSize: 16,
    textAlignVertical: 'center',
    width: width * 0.9,
    borderWidth: 1,
    alignSelf: 'center',
    borderRadius: 10,
    marginBottom: 30,
    marginTop: 15,
    paddingHorizontal: 8
  },
  rawWr: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
    paddingHorizontal: 20
  },
  rawText: {
    color: COLORS.TEXT,
    fontSize: 16
  },
  circle: {
    width: 25,
    height: 25,
    borderWidth: 2,
    borderRadius: 15,
    borderColor: COLORS.GRAY
  },
  selectedCircle: {
    width: 25,
    height: 25,
    borderWidth: 2,
    borderRadius: 15,
    borderColor: COLORS.PRIMARY,
    alignItems: 'center',
    justifyContent: 'center'
  },
  dot: {
    width: 16,
    height: 16,
    borderRadius: 10,
    backgroundColor: COLORS.PRIMARY
  },
  rawHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.TEXT,
    alignSelf: 'center',
    marginVertical: 10
  },
  itemText: {
    color: COLORS.TEXT,
    fontSize: 16
  },
  itemWr: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 5
  },
  rawHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.TEXT,
    alignSelf: 'center',
    marginVertical: 10,
    paddingTop: 15,
  },
  rawButtonWr: {
    alignSelf: 'center'
  }
});


export const QuickMessagesScreen = props => {
  const isFocused = useIsFocused()
  const navigation = useNavigation();
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const waterRef = useRef();

  const [isSectionScreenOpen, setIsSectionsScreenOpen] = useState(false);

  useEffect(() => {
    getData()
  }, [isFocused]);

  const getData = async () => {
    const token = await AsyncStorage.getItem('token')
    axios.get(ANSWERS, { headers: { 'Authorization': 'Bearer ' + token } }).then(res => {
      setMessages(res.data.data)
    }).catch(e => {
      console.log(e)
    })
  }
  const saveMessage = async () => {
    if (message == '') {
      Alert.alert('', 'Mesaj boş geçilemez')
    } else {
      const token = await AsyncStorage.getItem('token')
      axios.post(NEW_ANSWERS, { message: message }, { headers: { 'Authorization': 'Bearer ' + token } }).then(res => {
        setMessage('')
        getData()
        waterRef.current.close()
      }).catch(e => {
        console.log(e)
      })
    }

  }
  const deleteMessage = async (id) => {
    const token = await AsyncStorage.getItem('token')
    axios.post(DELETE_ANSWERS, { id: id }, { headers: { 'Authorization': 'Bearer ' + token } }).then(res => {
      getData()
    }).catch(e => {
      console.log(e)
    })
  }
  const renderItem = ({ item }) => {
    return (
      <View
        style={styles.itemWr}>
        <Text style={styles.itemText}>{item?.message}</Text>
        <TouchableOpacity onPress={() => deleteMessage(item?.id)}>
          <CancelIcon />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <Container style={styles.wr} >
      <Header
        leftIcon={
          <CrossIcon />
        }
        leftOnPress={() => {
          navigation.goBack();
        }}
        rightIcon={
          <PlusIcon />
        }
        rightOnPress={() => {
          isSectionScreenOpen
          waterRef.current.open()
        }}
        text={'Hazır Mesajlar'}
        rightIconStyle={styles.rightIconStyle}
      />
      <ScrollView>
        <View style={styles.content}>
          <View style={styles.filtres}>
            <FlatList
              renderItem={renderItem}
              data={messages}
              contentContainerStyle={{ paddingBottom: 10 }}

            />
          </View>
        </View>
      </ScrollView>
      <CustomRawBottom ref={waterRef}>
        <Text style={styles.rawHeader}>
          {'Lütfen Mesajınızı Giriniz'}
        </Text>
        <TextInput value={message} onChangeText={setMessage} style={styles.input} placeholder='Lütfen Mesajınızı Giriniz' placeholderTextColor={COLORS.GRAY} />
        <View style={styles.rawButtonWr}>
          <Button text={'Kaydet'} onPress={saveMessage} />

        </View>

      </CustomRawBottom>
    </Container>
  );
};
