import React, {useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
} from 'react-native';
import {APPROVALS, APPROVE, COLORS, height, UPDATE_PASS} from '../../constants';
import {Header, Button, CustomRawBottom, Container} from '../../components';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import ToggleSwitch from 'toggle-switch-react-native';
import {
  HeaderLeftIcon,
  BlackCloseIcon,
  BlackChevronRightIcon,
} from '../../assets/icons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
const styles = StyleSheet.create({
  content: {
    flex: 1,
    paddingHorizontal: 20,
    height: '100%',
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
    height: 50,
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
  buttonStyle: {},

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
    flex: 1,
    textAlign: 'right',
    fontSize: 16,
    textAlignVertical: 'center',
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
});

const UserInfos = ({userInfos, setUserInfos}) => {
  return userInfos.map((item, index) => {
    return (
      <View key={index} style={styles.wrapperItem}>
        <Text style={styles.text}>{item.name}</Text>
        <TextInput
          style={styles.input}
          value={item.value}
          placeholder={item.name}
          secureTextEntry
          placeholderTextColor={COLORS.GRAY}
          onChangeText={val => {
            let newArr = [...userInfos];
            newArr[index].value = val;
            setUserInfos([...newArr]);
          }}
        />
      </View>
    );
  });
};
export const SetPassScreen = props => {
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const [userInfos, setUserInfos] = useState([]);
  const [loading, setLoading] = useState(false);
  const {user} = props.route.params;

  const [isSectionScreenOpen, setIsSectionsScreenOpen] = useState(false);

  useEffect(() => {
    getData();
  }, [isFocused]);

  const getData = () => {
    setUserInfos([
      {
        id: 0,
        name: 'Yeni Şifre',
        value: '',
      },
      {
        id: 0,
        name: 'Yeni Şifre (Tekrar)',
        value: '',
      },
    ]);
  };
  const setPass = async () => {
    if (!loading) {
      setLoading(true);
      const token = await AsyncStorage.getItem('token');
      const data = {
        password: userInfos[0].value,
        password_confirmation: userInfos[1].value,
      };
      console.log(data);
      axios
        .post(UPDATE_PASS, data, {headers: {Authorization: 'Bearer ' + token}})
        .then(res => {
          Alert.alert('', 'Şifreniz başarıyla değiştirilmiştir.', [
            {text: 'Tamam', onPress: () => navigation.goBack()},
          ]);
        })
        .catch(e => {
          console.log(e);
          if (e.response.data.data[0]) {
            Alert.alert('', e.response.data.data[0].value);
          } else {
            Alert.alert('Bilinmeyen bir hata oluştu.');
          }
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };
  return (
    <Container style={styles.wr}>
      <Header
        leftIcon={<HeaderLeftIcon />}
        leftOnPress={() => {
          isSectionScreenOpen
            ? setIsSectionsScreenOpen(false)
            : navigation.goBack();
        }}
        text={'Şifremi Değiştir'}
        rightIconStyle={styles.rightIconStyle}
      />
      <ScrollView style={styles.content}>
        <View style={styles.filtres}>
          <UserInfos userInfos={userInfos} setUserInfos={setUserInfos} />
        </View>
      </ScrollView>
      <View style={[styles.buttonWr]}>
        <Button
          buttonStyle={styles.buttonStyle}
          text={'Şifremi Değiştir'}
          onPress={setPass}
          loading={loading}
        />
      </View>
    </Container>
  );
};
