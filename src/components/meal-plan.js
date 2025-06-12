import React, { useState } from 'react';
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  Modal,
  Platform,
  ActivityIndicator
} from 'react-native';
import { COLORS, height, PLAN, width } from '../constants';
import { Dots } from '.';
import Swiper from 'react-native-swiper';
import { BlackCloseIcon } from '../assets/icons';
const styles = StyleSheet.create({
  modalContent: {
    width: width,
    height: height,
    backgroundColor: COLORS.WHITE,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: width,
    marginTop: 10,
  },
  countText: {
    color: COLORS.BLACK,
    textAlign: 'center',
    fontSize: 18,
  },
  closeIcon: {
    marginLeft: width * 0.05,
  },
  closeWr: {
    marginTop: Platform.OS == 'ios' ? 50 : 0,
    width: 35,
  },
  imageWr: {
    width: width,
    height: height * 0.8,
    marginTop: 10,
  },
  image: {
    width: width,
    height: height * 0.8,
    resizeMode: 'cover',
  },
  dotsWr: {
    width: width,
    height: height * 0.1,
  },
  repeatText: {
    color: COLORS.WHITE,
    backgroundColor: 'rgba(0,0,0,0.2)',
    position: 'absolute',
    width: 60,
    height: 30,
    textAlignVertical: 'center',
    textAlign: 'center',
    borderRadius: 20,
    top: 10,
    right: 5

  }
});

export const MealPlan = ({ visible, setVisible, images, setImages }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.modalContent}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => {
              if (setImages) {
                setImages([])
                setActiveIndex(0)
              }
              console.log('hers')
              setVisible(false)
            }}
            style={styles.closeWr}>
            <BlackCloseIcon style={styles.closeIcon} />
          </TouchableOpacity>
          <Text style={styles.countText}>
            {activeIndex + 1}/{images.length}
          </Text>
          <View style={styles.closeWr} />
        </View>
        {images.length > 0 && <Swiper
          showsButtons={false}
          loop={false}
          showsPagination={true}
          height={height * 0.8}
          dot={<View />}
          automaticallyAdjustContentInsets={true}
          onMomentumScrollEnd={(event, state) => {
            console.log(state)
            // setActiveIndex(index);
          }}
          onIndexChanged={index => {
            console.log(index)
            setActiveIndex(index);
          }}

          activeDot={<View />}>
          {images.map((item, index) => {
            return (
              <View key={index} source={item?.image} style={styles.slide}>
                <View style={{ position: 'absolute', width: width, height: height * 0.9, alignItems: 'center', justifyContent: 'center' }}>
                  <ActivityIndicator size="large" color={COLORS.BLACK} />
                </View>
                <View style={styles.imageWr}>
                  <Image
                    source={{ uri: item?.image?.image }}
                    style={styles.image}
                  />
                  <Text style={styles.repeatText}>{item?.repeat + ' Tekrar'}</Text>
                </View>
              </View>
            );
          })}
        </Swiper>}
        <View style={styles.dotsWr}>
          <Dots activeIndex={activeIndex} length={images.length} />
        </View>
      </View>
    </Modal >
  );
};
