import React from 'react';
import { Text, StyleSheet, TouchableOpacity, View, Modal } from 'react-native';
import { COLORS, height, width } from '../constants';
import { useNavigation } from '@react-navigation/native';

const styles = StyleSheet.create({
  alertContent: {
    width: width * 0.9,
    backgroundColor: 'rgba(255,255,255,0.8)',
    alignSelf: 'center',
    borderRadius: 15,
    alignItems: 'center',
  },
  blured: {
    width: width,
    height: height,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: height * 0.05,
  },
  header: {
    color: COLORS.GRAY,
    fontSize: 15,
    textAlign: 'center',
    lineHeight: height * 0.06,
    textAlignVertical: 'center',
    borderBottomWidth: 1,
    width: width * 0.9,
    borderColor: '#B7B7B7',
  },
  text: {
    color: COLORS.IOS_BLUE,
    textAlign: 'center',
    fontSize: 16,
    lineHeight: height * 0.08,
    textAlignVertical: 'center',
    borderBottomWidth: 1,
    width: width * 0.9,
    borderColor: '#B7B7B7',
    alignItems: 'center',
    justifyContent: 'center'
  },
  logo: {
    width: 90,
    height: 90,
    borderRadius: 45,
    marginBottom: height * 0.03,
  },
  logoImage: {
    width: 85,
    height: 85,
  },
  closeIcon: {
    fontSize: 35,
  },
  closeWr: {
    position: 'absolute',
    top: 15,
    right: 15,
  },
  cancelWr: {
    width: width * 0.9,
    backgroundColor: COLORS.WHITE,
    alignSelf: 'center',
    borderRadius: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  cancelText: {
    color: COLORS.IOS_BLUE,
    textAlign: 'center',
    fontSize: 16,
    lineHeight: height * 0.08,
    textAlignVertical: 'center',
    borderBottomWidth: 1,
    width: width * 0.9,
    borderColor: COLORS.GRAY,
    fontWeight: 'bold',
  },
});

export const IosPicker = ({ visible, setVisible, header, options }) => {
  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.blured}>
        <View style={styles.alertContent}>
          <Text style={styles.header}>{header}</Text>
          {options.map((element, index) => {
            return (
              <TouchableOpacity key={index} style={{ alignItems: 'center', justifyContent: 'center' }} onPress={() => {
                if (element.text != 'Kamera') {
                  setVisible(false)
                }
                element?.onPress()
              }}>
                <Text
                  style={{
                    ...styles.text,
                    borderBottomWidth: index == options.length - 1 ? 0 : 1,
                  }}>
                  {element?.text}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
        <TouchableOpacity
          onPress={() => setVisible(false)}
          style={styles.cancelWr}>
          <Text style={styles.cancelText}>{'İptal'}</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};
