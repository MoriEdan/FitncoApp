import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { COLORS } from '../../constants';
import { Container, Header } from '../../components';
import { useNavigation } from '@react-navigation/native';
import {
  BlackCloseIcon,
  PlusIcon,
  BlackCloseWithGrayBgIcon,
} from '../../assets/icons';
const styles = StyleSheet.create({
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  wr: {
    flex: 1,
  },
  readyMessagesWr: {
    marginTop: 10,
  },
  readyMessage: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomColor: COLORS.BOTTOM_COLOR,
    borderBottomWidth: 1,
    paddingVertical: 12,
  },
  readyText: {
    fontSize: 16,
    color: COLORS.TEXT,
    width: '80%',
  },
  readyDeleteBtn: {},
});

export const ReadyMessagesScreen = props => {
  const navigation = useNavigation();
  const [readyMessages, setReadyMessages] = useState([
    {
      id: 1,
      text: 'Yemek yemeğinizi yemeyi unutmayın.Yemek ile bir bardak su için.',
    },
    {
      id: 2,
      text: 'Yürüyüşünüzü unutmayın.',
    },
    {
      id: 3,
      text: 'Yemek yemeğinizi yemeyi unutmayın.Yemek ile bir bardak su için. ',
    },
    {
      id: 4,
      text: 'Yürüyüşünüzü unutmayın.',
    },
  ]);

  const _removeMessageInList = id => {
    const newMessages = readyMessages.filter(item => item.id !== id);
    setReadyMessages(newMessages);
  };
  return (
    <Container style={styles.wr} >
      <Header
        rightIcon={<PlusIcon />}
        rightOnPress={() => {
          console.log('add ready message');
        }}
        leftIcon={<BlackCloseIcon />}
        leftOnPress={() => {
          navigation.goBack();
        }}
        text="Hazır Mesajlar"
      />
      <View style={styles.content}>
        <View style={styles.readyMessagesWr}>
          {readyMessages.map((item, index) => {
            return (
              <View style={styles.readyMessage} key={index}>
                <Text style={styles.readyText}>{item.text}</Text>
                <TouchableOpacity
                  onPress={() => _removeMessageInList(item.id)}
                  style={styles.readyDeleteBtn}>
                  <BlackCloseWithGrayBgIcon />
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
      </View>
    </Container>
  );
};
