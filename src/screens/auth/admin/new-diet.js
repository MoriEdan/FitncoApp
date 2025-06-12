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
  FlatList,
  Modal,
  Platform,
  Linking,
} from 'react-native';
const fs = require('fs');
import {
  ANSWERS,
  APPROVALS,
  APPROVE,
  COLORS,
  DIET,
  DIETICIANS,
  height,
  imageSelectOptions,
  width,
} from '../../../constants';
import {
  request,
  PERMISSIONS,
  RESULTS,
} from 'react-native-permissions';
import {
  Header,
  Button,
  CustomRawBottom,
  IosPicker,
  Container,
} from '../../../components';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import ToggleSwitch from 'toggle-switch-react-native';
import {
  HeaderLeftIcon,
  BlackCloseIcon,
  BlackChevronRightIcon,
  CancelIcon,
  CrossIcon,
  PlusIcon,
  CameraBlackIcon,
  MinusIcon,
} from '../../../assets/icons';
import axios from 'axios';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';
const styles = StyleSheet.create({
  content: {
    flex: 1,
    paddingHorizontal: 20,

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
  itemText: {
    color: COLORS.TEXT,
    fontSize: 15,
    fontWeight: 'bold',
  },
  itemWr: {
    width: width * 0.9,
    alignSelf: 'center',
    marginVertical: 10,
  },
  photoSelectText: {
    color: COLORS.TEXT,
    fontSize: 15,
    fontWeight: 'bold',
    flex: 1,
    paddingHorizontal: 10,
  },
  photoSelectWr: {
    width: width * 0.88,
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  input: {
    width: width * 0.9,
    alignSelf: 'center',
    borderRadius: 25,
    borderWidth: 1,
    borderColor: COLORS.PRIMARY,
    height: 50,
    marginTop: 10,
    paddingHorizontal: 15,
    color: COLORS.TEXT,
  },
  dateModalWr: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.75)',
  },
  dateModalContent: {
    width: width * 0.85,
    backgroundColor: COLORS.WHITE,
    borderRadius: 20,
    padding: 5,
    alignItems: 'center',
  },
  counterWr: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  counterText: {
    color: COLORS.TEXT,
    fontSize: 16,
    marginHorizontal: 10,
  },
  dietItem: {
    backgroundColor: COLORS.PRIMARY,
    borderRadius: 15,
    width: width * 0.5,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dietHeader: {
    color: COLORS.BLACK,
    fontSize: 16,
  },
  dietText: {
    color: COLORS.BLACK,
    fontSize: 14,
  },
  dietWr: {flexDirection: 'row', justifyContent: 'space-between'},
});

export const NewDietScreen = props => {
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const [type, setType] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [date, setDate] = useState('');
  const [dateModalVisible, setDateModalVisible] = useState(false);
  const [markedDates, setMarkedDates] = useState([]);
  const [count, setCount] = useState(1);
  const [photoModal, setPhotoModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState([]);
  const refRBSheet = useRef();
  const buttonPress = type != '' && date != '' && selectedPhoto.length > 0;
  useEffect(() => {}, [isFocused]);

  const openCamera = () => {
      request(
          Platform.OS === 'ios' ? PERMISSIONS.IOS.CAMERA : PERMISSIONS.ANDROID.CAMERA
      ).then(result => {
        console.log(result);
        switch (result) {
          case RESULTS.GRANTED:
             setTimeout(()=>launchCamera(imageSelectOptions, res => {
                setPhoto(res);
                setPhotoModal(false);
              }),500);
            break;
          default:
            Alert.alert(
              '',
              'Merhaba, spor ve öğün paylaşımlarınız için izinleri onaylamanız gerekmektedir. Bu izinler sadece fotoğraf gönderimine olanak sağlar ve telefonunuza erişim sağlanmaz. Teşekkür ederiz. Sağlıklı günler, Fit’n Co',
              [
                {
                  text: 'Ok',
                  onPress: () => {
                    //Linking.openSettings();
                  },
                },
              ],
            );
        }
      });
  };
  const setPhoto = res => {
    if (res?.didCancel) {
      setPhotoModal(false);
    } else {
      setSelectedPhoto([
        ...selectedPhoto,
        {image: res.assets[0], count: count},
      ]);
      setCount(1);
      setPhotoModal(false);
    }
  };
  const openGallery = () => {
       if (Platform.OS === 'ios'){
    request(
         PERMISSIONS.IOS.PHOTO_LIBRARY
      ).then(result => {
        console.log(result);
        switch (result) {
          case RESULTS.GRANTED:
            launchImageLibrary(imageSelectOptions, res => {
              setPhoto(res);
                setPhotoModal(false);
            });
            break;
          default:
            Alert.alert(
              '',
              'Merhaba, spor ve öğün paylaşımlarınız için izinleri onaylamanız gerekmektedir. Bu izinler sadece fotoğraf gönderimine olanak sağlar ve telefonunuza erişim sağlanmaz. Teşekkür ederiz. Sağlıklı günler, Fit’n Co',
              [
                {
                  text: 'Ok',
                  onPress: () => {
                    //Linking.openSettings();
                  },
                },
              ],
            );
        }
      });}
       else {
  launchImageLibrary(imageSelectOptions, res => {
        setPhoto(res);
      });
      }

  };

  const addDiet = async () => {
    if (buttonPress) {
      try {
      setLoading(true);
      const token = await AsyncStorage.getItem('token');
      let data = new FormData();
      data.append('user_id', props.route.params.id);
      data.append('type', type == '3 Öğün' ? 2 : 1);
      data.append('start', date.split(' - ')[0]);
      data.append('end', date.split(' - ')[1]);
    //  data.append('length', selectedPhoto.length);
      selectedPhoto.forEach((element, index) => {
        const photo = element.image;
        data.append('images[' + index + '][]', {
         type: photo.type,
          name: photo.fileName,
          uri: Platform.OS === 'ios' ? photo.uri.replace('file://', '') : photo.uri,
        });
      // data.append('images[' + index + '][]', fs.createReadStream(photo.uri));
        data.append('repeats[' + index + ']', element.count);
      });
      console.log(data);
       /*const response = await axios.post(DIET,data,{
         headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: 'Bearer ' + token,
        }

      });*/
        const response = await fetch(DIET, {
        method: 'POST',
        body: data,
        timeout: 180000,
        headers: { 'Content-Type': 'multipart/form-data',
          Authorization: 'Bearer ' + token,
        }});
        console.log('response');
        console.log(JSON.stringify(response));
        const json = await response.json();
        console.log(json);
        if (json?.data?.length > 0) {
          console.log(response.data);
          Alert.alert('', json.data[0].value);
        } else if (json?.code === 200) {
          navigation.goBack();
        } else {
          Alert.alert('', 'Bilinmeyen bir hata oluştu');
        }
      } catch (e) {
        console.log('e');
        console.log(e);
        Alert.alert('', 'Bilinmeyen bir hata oluştu');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <Container style={styles.wr}>
      <Header
        leftIcon={<CrossIcon />}
        leftOnPress={() => {
          navigation.goBack();
        }}
        text={'Yeni Program'}
        rightIconStyle={styles.rightIconStyle}
      />
      <ScrollView
      //contentContainerStyle={{paddingBottom:200}}
      >
        <View style={styles.content}>
          <View style={styles.filtres}>
            <TouchableOpacity
              onPress={() => {
                refRBSheet.current.open();
              }}
              pointerEvents="none"
              style={styles.itemWr}>
              <Text style={styles.itemText}>{'Program Tipi'}</Text>
              <TextInput
                pointerEvents="none"
                editable={false}
                selectTextOnFocus={false}
                value={type}
                style={styles.input}
                placeholder="İlgili program tipini seçiniz"
                placeholderTextColor={COLORS.GRAY}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setDateModalVisible(true);
              }}
              style={styles.itemWr}>
              <Text style={styles.itemText}>{'Program Tarih Aralığı'}</Text>
              <TextInput
                pointerEvents="none"
                editable={false}
                selectTextOnFocus={false}
                value={date}
                style={styles.input}
                placeholder="00/00/2000 - 00/00/2000"
                placeholderTextColor={COLORS.GRAY}
              />
            </TouchableOpacity>
            {selectedPhoto.map((item, index) => {
              return (
                <View style={styles.dietWr}>
                  <View style={styles.dietItem}>
                    <View>
                      <Text style={styles.dietHeader}>
                        {'Program ' + (index + 1)}
                      </Text>
                      <Text style={styles.dietText}>
                        {'[' + item?.count + ' Tekrar]'}
                      </Text>
                    </View>
                    <TouchableOpacity
                      onPress={() =>
                        setSelectedPhoto(
                          selectedPhoto.filter((element, i) => i != index),
                        )
                      }>
                      <CrossIcon />
                    </TouchableOpacity>
                  </View>
                  <View style={styles.counterWr}>
                    <TouchableOpacity
                      onPress={() => {
                        let photos = [...selectedPhoto];
                        photos[index].count += 1;
                        setSelectedPhoto(photos);
                      }}>
                      <PlusIcon />
                    </TouchableOpacity>
                    <Text style={styles.counterText}>{item?.count}</Text>
                    <TouchableOpacity
                      onPress={() => {
                        let photos = [...selectedPhoto];
                        if (photos[index].count > 1) {
                          photos[index].count -= 1;
                          setSelectedPhoto(photos);
                        }
                      }}>
                      <MinusIcon />
                    </TouchableOpacity>
                  </View>
                </View>
              );
            })}
            <TouchableOpacity
              onPress={() => {
                setPhotoModal(true);
              }}
              style={styles.photoSelectWr}>
              <CameraBlackIcon />
              <Text style={styles.photoSelectText}>{'Görsel Ekle'}</Text>
              <View style={styles.counterWr}>
                <TouchableOpacity onPress={() => setCount(count + 1)}>
                  <PlusIcon />
                </TouchableOpacity>
                <Text style={styles.counterText}>{count}</Text>
                <TouchableOpacity
                  onPress={() => setCount(count > 1 ? count - 1 : count)}>
                  <MinusIcon />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
            <View style={{marginBottom:30}}>
              <Button
                text="Yeni Programı Onayla"
                loading={loading}
                buttonStyle={{
                  backgroundColor: buttonPress
                    ? COLORS.PRIMARY
                    : COLORS.LIGHT_GRAY,
                }}
                onPress={addDiet}
              />
            </View>
          </View>
        </View>
      <CustomRawBottom ref={refRBSheet}>
        <Text style={styles.rawHeader}>{'Program Tipi'}</Text>
        <TouchableOpacity
          onPress={() => {
            setSelectedType('2 Öğün (IF)');
          }}
          style={styles.rawWr}>
          <Text style={styles.rawText}>{'2 Öğün (IF)'}</Text>
          {selectedType == '2 Öğün (IF)' ? (
            <View style={styles.selectedCircle}>
              <View style={styles.dot} />
            </View>
          ) : (
            <View style={styles.circle} />
          )}
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setSelectedType('3 Öğün');
          }}
          style={styles.rawWr}>
          <Text style={styles.rawText}>{'3 Öğün'}</Text>
          {selectedType == '3 Öğün' ? (
            <View style={styles.selectedCircle}>
              <View style={styles.dot} />
            </View>
          ) : (
            <View style={styles.circle} />
          )}
        </TouchableOpacity>
        <View style={styles.buttonWr}>
          <Button
            text={'Onayla'}
            onPress={() => {
              setType(selectedType);
              refRBSheet.current.close();
            }}
          />
        </View>
      </CustomRawBottom>
      <Modal
        animationType="slide"
        transparent={true}
        visible={dateModalVisible}
        onRequestClose={() => {
          setDateModalVisible(!dateModalVisible);
        }}>
        <View style={styles.dateModalWr}>
          <View style={styles.dateModalContent}>
            <Calendar
              onDayPress={day => {
                if (moment(day.timestamp).add(1, 'days') > moment()) {
                  if (markedDates.length == 0) {
                    setMarkedDates([day.dateString]);
                  } else {
                    if (markedDates[0] > day.dateString) {
                      setDate(day.dateString + ' - ' + markedDates[0]);
                    } else {
                      setDate(markedDates[0] + ' - ' + day.dateString);
                    }
                    setMarkedDates([]);
                    setDateModalVisible(false);
                  }
                }
              }}
              markedDates={
                markedDates.length > 0
                  ? {
                      [markedDates[0]]: {selected: true, selectedColor: 'red'},
                    }
                  : {}
              }
            />
          </View>
        </View>
      </Modal>
      <IosPicker
        visible={photoModal}
        setVisible={value => {
          setPhotoModal(value);
        }}
        header={'Medya Ekle'}
        options={[
          {text: 'Kamera', onPress: openCamera},
          {text: 'Galeri', onPress: openGallery},
        ]}
      />
      </ScrollView>
    </Container>
  );
};
