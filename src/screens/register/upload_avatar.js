import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  View,
  Alert,
  Platform,
  Linking,
} from 'react-native';
import {
  width,
  height,
  COLORS,
  imageSelectOptions,
  REGISTER,
} from '../../constants';
import {Header, Button, IosPicker, Container} from '../../components';
import {useNavigation} from '@react-navigation/native';
import {useIsFocused} from '@react-navigation/core';
import {CrossIcon, HeaderLeftIcon} from '../../assets/icons';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import axios from 'axios';
import {
  request,
  PERMISSIONS,
  RESULTS,
} from 'react-native-permissions';
import messaging from '@react-native-firebase/messaging';
import NetInfo from '@react-native-community/netinfo';

const styles = StyleSheet.create({
  wr: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  content: {
    flex: 1,
    alignItems: 'center',
  },
  boldText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: COLORS.BLACK,
    marginTop: 10,
  },
  buttonWr: {
    alignSelf: 'center',
    position: 'absolute',

    bottom: Platform.OS == 'ios' ? height * 0.11 : height * 0.05,
  },
  buttonStyle: {
    backgroundColor: COLORS.LIGHT_GRAY,
  },
  uploadImage: {
    resizeMode: 'cover',
    width: width * 0.35,
    height: width * 0.35,
    marginTop: height * 0.1,
    borderRadius: width * 0.2,
  },
  selectedImage: {
    resizeMode: 'cover',
    width: width * 0.35,
    height: width * 0.35,
    marginTop: height * 0.1,
    borderRadius: width * 0.2,
    borderWidth: 4,
    borderColor: COLORS.PRIMARY,
  },
  crossWr: {
    backgroundColor: COLORS.BLACK,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    position: 'absolute',
    bottom: 2,
    right: 2,
  },
});

export const UploadAvatarScreen = props => {
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const [photoModal, setPhotoModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(undefined);
  const [isUploading, setIsUploading] = useState(false);

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
              'Merhaba, spor ve öğün paylaşımlarınız için izinleri onaylamanız gerekmektedir. Bu izinler sadece fotoğraf gönderimine olanak sağlar ve telefonunuza erişim sağlanmaz. Teşekkür ederiz. Sağlıklı günler, Fit'n Co',
              [
                {
                  text: 'Tamam',
                  onPress: () => {
                    //Linking.openSettings();
                  },
                },
              ],
            );
        }
      });
  };
  const handleImageSelection = async (res) => {
    if (res?.didCancel) {
      setPhotoModal(false);
      return;
    }
    
    try {
      setIsUploading(true);
      setSelectedPhoto(res);
      setPhotoModal(false);
    } catch (error) {
      console.error('İmaj Seçimi Hatası:', error);
      Alert.alert('Hata', 'İmaj seçimi hatası oluştu. Lütfen tekrar deneyiniz.');
    } finally {
      setIsUploading(false);
    }
  };
  const openGallery = async () => {
    if (Platform.OS === 'ios') {
      const hasPermission = await requestPhotoPermission();
      if (hasPermission) {
        launchImageLibrary(imageSelectOptions, res => {
          setPhoto(res);
        });
      }
    } else {
      launchImageLibrary(imageSelectOptions, res => {
        setPhoto(res);
      });
    }
  };
  export const imageSelectOptions = Platform.OS === 'ios' ? {
    saveToPhotos: true,
    mediaType: 'photo',
    includeBase64: false,
    videoQuality: 'medium',
    selectionLimit: 1,
    maxWidth: 600,
    maxHeight: 800,
    quality: 0.5,
    allowsEditing: true,
    presentationStyle: 'fullScreen'
  } : {
    saveToPhotos: true,
    mediaType: 'photo',
    includeBase64: false,
    videoQuality: 'medium',
    selectionLimit: 1,
    maxWidth: 768,
    maxHeight: 1024,
    quality: 0.5
  };
  const register = async () => {
    const isConnected = await checkNetwork();
    if (!isConnected) {
      return;
    }

    setLoading(true);
    const fcmToken = await messaging().getToken();
    const info = props.route.params;
    const photo = selectedPhoto?.assets[0];
    let data = new FormData();
    data.append('name', info?.name);
    data.append('last_name', info?.surname);
    data.append('email', info?.mail);
    data.append('password', info?.password);
    data.append('password_confirmation', info?.password);
    data.append('device', fcmToken);
    data.append('timezone', info?.timeZone);
    data.append('os', Platform.OS);
    data.append('can_walk', info?.canWalk == 'Yürüyüşe Uygun' ? 1 : 0);
    data.append('weight', info?.weight);
    data.append('height', info?.height);
    data.append('age', info?.age);
    data.append('gender', info?.gender == 'Erkek' ? 'male' : 'female');
    data.append('target', info?.target);
    data.append('child', info?.isParent ? 1 : 0);
    if (info?.isParent) {
      data.append('parent', info?.parent);
    }
    if (selectedPhoto) {
      const photo = selectedPhoto.assets[0];
      data.append('pp', {
        type: photo.type,
        name: photo.fileName,
        uri: Platform.OS === 'ios' ? photo.uri : photo.uri,
      });
    }
    /** 
     *     
     * if (selectedPhoto){
    data.append('pp', {
      type: photo.type,
      name: photo.fileName,
      uri: Platform.OS === 'ios' ? photo.uri.replace('file://', '') : photo.uri,
    });}
     * 
    */
    const res = await fetch(REGISTER, {
      method: 'POST',
      body: data,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log(res);
    const json = await res.json();
    if (json?.code == 200) {
      navigation.navigate('Approval', {
        mail: info?.mail,
        password: info?.password,
      });
      setLoading(false);
    } else {
      console.log(json?.data);
      if (json?.data?.length > 0) {
        Alert.alert('', json?.data[0].value);
      } else {
        Alert.alert('', 'Bilinmeyen bir hata oluştu.');
      }
      setLoading(false);
    }
  };
  const requestPhotoPermission = async () => {
    try {
      const result = await request(
        Platform.OS === 'ios' ? PERMISSIONS.IOS.PHOTO_LIBRARY : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE
      );
      
      if (result === RESULTS.GRANTED) {
        return true;
      } else {
        Alert.alert(
          'İzinleri Onaylama',
          'Merhaba, spor ve öğün paylaşımlarınız için izinleri onaylamanız gerekmektedir. Bu izinler sadece fotoğraf gönderimine olanak sağlar ve telefonunuza erişim sağlanmaz. Teşekkür ederiz. Sağlıklı günler, Fitn Co.',
          [
            {
              text: 'Ayarları Aç',
              onPress: () => Linking.openSettings(),
            },
            {
              text: 'İptal',
              style: 'cancel',
            },
          ]
        );
        return false;
      }
    } catch (error) {
      console.error('İzinleri onaylama hatası:', error);
      return false;
    }
  };
  const checkNetwork = async () => {
    const netInfo = await NetInfo.fetch();
    if (!netInfo.isConnected) {
      Alert.alert('İnternet Bağlantısı', 'Lütfen internet bağlantınızı kontrol ediniz ve tekrar deneyiniz.');
      return false;
    }
    return true;
  };
  return (
    <Container style={styles.wr}>
      <View style={styles.content}>
        <Header
          leftIcon={<HeaderLeftIcon />}
          leftOnPress={() => {
            navigation.goBack();
          }}
          text="Kayıt"
        />
        <Text style={styles.boldText}>Fotoğraf Yükleyin</Text>
        {!selectedPhoto?.assets?.length > 0 &&
        !selectedPhoto?.assets[0]?.uri ? (
          <TouchableOpacity onPress={() => setPhotoModal(true)}>
            <Image
              style={styles.uploadImage}
              source={require('../../assets/image/upload-avatar-icon.png')}
            />
          </TouchableOpacity>
        ) : (
          <View>
            <Image
              style={styles.selectedImage}
              source={{uri: selectedPhoto?.assets[0]?.uri}}
            />
            <TouchableOpacity
              onPress={() => setSelectedPhoto(undefined)}
              style={styles.crossWr}>
              <CrossIcon fill={COLORS.WHITE} />
            </TouchableOpacity>
          </View>
        )}

        <View style={[styles.buttonWr]}>
          <Button
            buttonStyle={{
              ...styles.buttonStyle,
              backgroundColor: selectedPhoto
                ? COLORS.PRIMARY
                : COLORS.LIGHT_GRAY,
            }}
            text="Devam et"
            onPress={() => {
            //  if (selectedPhoto) {
                register();
             // }
            }}
            loading={loading}
          />
        </View>
      </View>
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
    </Container>
  );
};
