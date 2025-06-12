import React, {useState} from 'react';
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  Modal,
  FlatList,
  SafeAreaView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import {PhotoSelectModal} from '.';
import {
  BlackCloseIcon,
  BreakfastLogIcon,
  CrossIcon,
  DinnerIcon,
  DinnerLogIcon,
  KruvasanIcon,
  LunchLogIcon,
  MealIcon,
  QuestionIcon,
  QuestionLogIcon,
  WalkIcon,
  WalkLogIcon,
  WeightIcon,
  WeightLogIcon,
} from '../assets/icons';
import {COLORS, height, width} from '../constants';
import moment from 'moment';
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
    width: 35,
  },

  image: {
    width: width * 0.49,
    height: height * 0.33,
    resizeMode: 'cover',
    borderRadius: 5,
  },
  dotsWr: {
    width: width,
    height: height * 0.1,
  },
  flatList: {},
  imageWr: {
    width: width * 0.5,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  photoDate: {
    color: COLORS.WHITE,
    position: 'absolute',
    bottom: 5,
    right: 10,
  },
  logWr: {
    backgroundColor: COLORS.WHITE,
    width: 50,
    height: 50,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 5,
    right: 5,
  },
  itemImage: {
    width: width,
    height: height,
    resizeMode: 'contain',
  },
  iconWr: {
    position: 'absolute',

    top: Platform.OS == 'ios' ? 45 : 5,
    right: 5,
    width: 30,
    height: 30,
    backgroundColor: COLORS.BACKGROUND,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
});

export const PhotoModal = ({
  visible,
  setVisible,
  images,
  onEndReached,
  refreshing,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(false);

  const renderItem = ({item}) => (
    <TouchableOpacity
      onPress={() => {
        setSelectedPhoto(item);
        setModalVisible(true);
      }}
      style={styles.imageWr}>
      <View style={{position: 'absolute'}}>
        <ActivityIndicator size="large" color={COLORS.BLACK} />
      </View>
      <Image source={{uri: item?.source}} style={styles.image} />
      <Text style={styles.photoDate}>
        {moment(item?.date).format('DD-MM-YYYY HH:mm')}
      </Text>
      {item?.log != 'none' && (
        <View style={styles.logWr}>{returnIcon(item?.log)}</View>
      )}
    </TouchableOpacity>
  );
  const returnIcon = log => {
    if (log == 'breakfast') {
      return <BreakfastLogIcon color={COLORS.BLACK} />;
    } else if (log == 'lunch') {
      return <LunchLogIcon color={COLORS.BLACK} />;
    } else if (log == 'dinner') {
      return <DinnerLogIcon color={COLORS.BLACK} />;
    } else if (log == 'walking') {
      return <WalkLogIcon color={COLORS.BLACK} />;
    } else if (log == 'weight') {
      return <WeightLogIcon color={COLORS.BLACK} />;
    } else if (log == 'question') {
      return <QuestionLogIcon color={COLORS.BLACK} />;
    }
  };
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={() => setVisible(false)}>
      <SafeAreaView>
        <View style={styles.modalContent}>
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => {
                setVisible(false);
              }}
              style={styles.closeWr}>
              <BlackCloseIcon style={styles.closeIcon} />
            </TouchableOpacity>
            <Text style={styles.headerText}>Fotoğraflar</Text>
            <View style={styles.closeWr} />
          </View>
          <View>
            <FlatList
              contentContainerStyle={styles.flatList}
              data={images}
              numColumns={2}
              keyExtractor={(item, index) => item.id + index.toString()}
              renderItem={renderItem}
              onEndReached={onEndReached}
              refreshing={refreshing}
              initialNumToRender={4} // Reduce initial render amount
              maxToRenderPerBatch={2}
            />
          </View>
          <Modal
            visible={modalVisible}
            animationType="slide"
            onRequestClose={() => setModalVisible(false)}
            transparent={true}>
            <View style={styles.modalContent}>
              <Image
                source={{uri: selectedPhoto?.source}}
                style={styles.itemImage}
              />
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={styles.iconWr}>
                <CrossIcon />
              </TouchableOpacity>
            </View>
          </Modal>
        </View>
      </SafeAreaView>
    </Modal>
  );
};
