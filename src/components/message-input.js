import React from 'react';
import { StyleSheet, TouchableOpacity, View, TextInput } from 'react-native';
import { COLORS } from '../constants';
import {
  CameraGrayIcon,
  MicrophoneGrayIcon,
  MessageSendIcon,
} from '../assets/icons';
const styles = StyleSheet.create({
  wr: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconWr: {
    flexDirection: 'row',
  },
  icon: {
    marginHorizontal: 10,
    fontSize: 25,
    color: COLORS.GRAY,
  },
  input: {
    flex: 1,
    marginHorizontal: 10,
    height: 45,
    borderRadius: 25,
    marginBottom: 10,
    paddingHorizontal: 15,
    color: COLORS.BLACK,
    backgroundColor: COLORS.WHITE,
    shadowColor: COLORS.GRAY,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
});

export const MessageInput = ({
  keyboardStatus,
  message,
  setMessage,
  send,
  onPressCamera,
  onPressSound,
}) => {
  return (
    <View style={styles.wr}>
      <TextInput
        placeholder="Mesajınızı yazın"
        value={message}
        onChangeText={val => setMessage(val)}
        placeholderTextColor={COLORS.GRAY}
        style={styles.input}
      />
      {message === '' ? (
        <View style={styles.iconWr}>
          <TouchableOpacity onPress={onPressCamera}>
            <CameraGrayIcon style={styles.icon} />
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity onPress={send} style={styles.iconWr}>
          <MessageSendIcon style={{ ...styles.icon, color: COLORS.PRIMARY }} />
        </TouchableOpacity>
      )}
    </View>
  );
};
