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
      setSelectedPhoto(res);
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
      });} else {
  launchImageLibrary(imageSelectOptions, res => {
        setPhoto(res);
      });
      }


  };
  const register = async () => {
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
    if (selectedPhoto){
    data.append('pp', {
      type: photo.type,
      name: photo.fileName,
      uri: Platform.OS === 'ios' ? photo.uri.replace('file://', '') : photo.uri,
    });}
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
