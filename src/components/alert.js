import React from 'react';
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  Modal,
} from 'react-native';
import {COLORS, height, width} from '../constants';
import {useNavigation} from '@react-navigation/native';
import {Button, RadialLogo} from '.';

const styles = StyleSheet.create({
  alertContent: {
    width: width * 0.9,
    backgroundColor: COLORS.WHITE,
    alignSelf: 'center',
    borderRadius: 15,
    alignItems: 'center',
    paddingHorizontal: width * 0.1,
    paddingVertical: height * 0.03,
  },
  blured: {
    width: width,
    height: height,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    color: COLORS.BLACK,
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  text: {
    color: COLORS.BLACK,
    textAlign: 'center',
    fontSize: 16,
    marginBottom: height * 0.07,
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
});

export const UserAlert = ({visible, setVisible, header, text}) => {
  const navigation = useNavigation();
  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.blured}>
        <View style={styles.alertContent}>
          <RadialLogo style={styles.logo} imageStyle={styles.logoImage} />
          <Text style={styles.header}>{header}</Text>
          <Text style={styles.text}>{text}</Text>
          <Button
            text="Tamam"
            buttonStyle={{width: width * 0.8}}
            onPress={() => {
              setVisible(false);
            }}
          />
        </View>
      </View>
    </Modal>
  );
};
