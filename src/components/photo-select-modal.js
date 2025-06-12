import {useIsFocused} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  Modal,
  FlatList,
  Platform,
  Alert,
} from 'react-native';
import {
  BlackCloseIcon,
  BreakfastLogIcon,
  DinnerIcon,
  DinnerLogIcon,
  KruvasanIcon,
  LunchLogIcon,
  MealIcon,
  ProfilePassiveIcon,
  QuestionIcon,
  QuestionLogIcon,
  SendIcon,
  SendMultiMessageIcon,
  SportLogIcon,
  WalkIcon,
  WalkLogIcon,
  WeightIcon,
  WeightLogIcon,
  WhiteCloseIcon,
} from '../assets/icons';
import {COLORS, height, width} from '../constants';
const styles = StyleSheet.create({
  modalContent: {
    width: width,
    height: height,
    backgroundColor: COLORS.BLACK,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: width,
  },
  headerText: {
    color: COLORS.BLACK,
    textAlign: 'center',
    fontSize: 20,
    paddingVertical: 15,
    fontWeight: 'bold',
  },
  closeIcon: {
    marginLeft: width * 0.05,
  },
  closeWr: {
    marginTop: Platform.OS == 'ios' ? 45 : 0,
    width: 35,
  },
  image: {
    width: width,
    height: height * 0.9,
    resizeMode: 'contain',
  },
  pickText: {
    color: COLORS.LIGHT_GRAY,
    fontSize: 16,
    marginLeft: 7,
  },
  pickWr: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
    marginLeft: 10,
    borderRadius: 25,
    backgroundColor: 'rgba(44,44,44,0.8)',
  },
  typeWr: {
    position: 'absolute',
    bottom: height * 0.22,
    width: width * 0.5,
    borderRadius: 10,
    marginLeft: 10,
    backgroundColor: 'rgba(44,44,44,0.8)',
  },
  sendWr: {
    position: 'absolute',
    bottom: height * 0.22,
    right: width * 0.08,
  },
  sendText: {
    color: COLORS.LIGHT_GRAY,
    fontSize: 16,
    marginBottom: 3,
    marginLeft: 7,
  },
  iconWr: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  iconOpenWr: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export const PhotoSelectModal = ({
  visible,
  setVisible,
  selectedPhoto,
  setSelectedPhoto,
  sendPhoto,
  activeDiet,
  user,
}) => {
  const [selected, setSelected] = useState(undefined);

  const types = [
    {
      id: 1,
      name: 'Kahvaltı',
      icon: <BreakfastLogIcon />,
      type: 'breakfast',
      onPress: () => {
        setSelected('breakfast');
      },
    },
    {
      id: 2,
      name: 'Öğle Yemeği',
      icon: <LunchLogIcon />,
      type: 'lunch',
      onPress: () => {
        setSelected('lunch');
      },
    },
    {
      id: 3,
      name: 'Akşam Yemeği',
      icon: <DinnerLogIcon />,
      type: 'dinner',
      onPress: () => {
        setSelected('dinner');
      },
    },
    {
      id: 4,
      name: 'Yürüyüş',
      icon: <WalkLogIcon />,
      type: 'walking',
      onPress: () => {
        setSelected('walking');
      },
    },
    {
      id: 5,
      name: 'Kilo',
      icon: <WeightLogIcon />,
      type: 'weight',
      onPress: () => {
        setSelected('weight');
      },
    },
    {
      id: 6,
      name: 'Soru',
      type: 'question',
      icon: <QuestionLogIcon />,
      onPress: () => {
        setSelected('question');
      },
    },
  ];
  useEffect(() => {
    if (visible) {
      setSelected(undefined);
    }
  }, [visible]);

  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.modalContent}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => setVisible(false)}
            style={styles.closeWr}>
            <WhiteCloseIcon style={styles.closeIcon} />
          </TouchableOpacity>
          <View style={styles.closeWr} />
        </View>
        <View>
          <Image
            style={styles.image}
            source={{uri: selectedPhoto && selectedPhoto?.assets[0]?.uri}}
          />
        </View>
        <View style={styles.typeWr}>
          {types.map(item => {
            const item_select = item?.type == selected;
            if (user?.info?.can_walk === 0 && item.name == 'Yürüyüş') {
              return null;
            } else {
              return (
                <TouchableOpacity
                  onPress={item.onPress}
                  style={{
                    ...styles.pickWr,
                    backgroundColor: item_select ? COLORS.PRIMARY : undefined,
                  }}>
                  <View
                    style={{
                      ...styles.iconWr,
                      backgroundColor: COLORS.WHITE,
                    }}>
                    {item.icon}
                  </View>
                  <Text
                    style={{
                      ...styles.pickText,
                      color: item_select ? COLORS.BLACK : COLORS.WHITE,
                    }}>
                    {item.name}
                  </Text>
                </TouchableOpacity>
              );
            }
          })}
        </View>
        <View style={styles.sendWr}>
          <TouchableOpacity
            onPress={() => {
              if (selected) {
                setSelectedPhoto(selectedPhoto);
                sendPhoto(selectedPhoto?.assets[0], selected);
                setVisible(false);
              } else {
                Alert.alert(
                  '',
                  'Giriş yapmak için kategori seçmeniz gerekmektedir.',
                );
              }
            }}
            style={{
              ...styles.pickWr,
              width: width * 0.3,
              justifyContent: 'space-between',
              paddingVertical: 10,
              alignItems: 'center',
              paddingHorizontal: 10,
            }}>
            <SendIcon color={selected ? COLORS.PRIMARY : COLORS.WHITE} />
            <Text
              style={{
                ...styles.sendText,
                color: selected ? COLORS.PRIMARY : COLORS.WHITE,
              }}>
              Gönder
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};
