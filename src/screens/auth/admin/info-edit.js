import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { APPROVALS, COLORS, NOTE_UPDATE } from '../../../constants';
import { Container, Header } from '../../../components';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { HeaderLeftIcon } from '../../../assets/icons';
import axios from 'axios';
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
    fontSize: 17,
    color: COLORS.TEXT,
  },
  cancelText: {
    fontSize: 15,
    color: COLORS.LIGHT_BLUE
  },
  doneText: {
    fontSize: 15,
    color: COLORS.GRAY
  },
  input: {
    color: COLORS.TEXT,
    flex: 1,
    fontSize: 16,
    textAlignVertical: 'center',
    paddingHorizontal: 10
  },
});

export const InfoEditScreen = props => {
  const navigation = useNavigation();
  const [text, setText] = useState('');
  const isFocused = useIsFocused()
  useEffect(() => {
    setText(props.route.params?.note)
  }, [isFocused]);
  const updateNote = async () => {
    const token = await AsyncStorage.getItem('token')
    console.log({
      user_id: props.route.params.id,
      notes: text
    })
    axios.post(NOTE_UPDATE, {
      user_id: props.route.params.id,
      notes: text
    }, { headers: { 'Authorization': 'Bearer ' + token } }).then((res) => {
      navigation.goBack()
    }).catch((e) => {
      console.log(e)
      Alert.alert('', 'Bilinmeyen bir hata oluştu.')
    })
  }

  return (

    <Container style={styles.wr} >
      <Header
        leftIcon={<Text style={styles.cancelText}>İptal</Text>}
        leftOnPress={() => {
          navigation.goBack();
        }}
        rightIcon={<Text style={{ ...styles.doneText, color: text === '' ? COLORS.GRAY : COLORS.LIGHT_BLUE }}>Tamam</Text>}
        rightOnPress={() => {
          if (text !== '') {
            updateNote();
          }
        }}
        text="Bilgi"
      />
      <TextInput value={text} onChangeText={(val) => { setText(val) }} style={styles.input} multiline placeholder="Danışan hakkında ilgili bilgileri giriniz." placeholderTextColor={COLORS.GRAY} />
    </Container>
  );
};
