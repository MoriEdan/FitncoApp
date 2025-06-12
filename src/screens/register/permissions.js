import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
  Platform,
  Alert,
  View,
  BackHandler,
  Linking,
} from 'react-native';
import {width, height, COLORS, LOGIN, REGISTER} from '../../constants';
import {Header, Button, Container} from '../../components';
import {useNavigation} from '@react-navigation/native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {
  HeaderLeftIcon,
  CameraBlackIcon,
  GalleryBlackIcon,
  BlackNotifIcon,
  BlackMickrophonIcon,
} from '../../assets/icons';
import {
  check,
  request,
  requestNotifications,
  PERMISSIONS,
  RESULTS,
} from 'react-native-permissions';
import axios from 'axios';
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
  texts: {
    height: 110,
    justifyContent: 'space-around',
  },
  boldText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: COLORS.BLACK,
    marginTop: 10,
  },
  desc: {
    textAlign: 'center',
    marginHorizontal: 20,
    lineHeight: 20,
  },
  buttonWr: {
    alignSelf: 'center',
    position: 'absolute',
    bottom: Platform.OS == 'ios' ? height * 0.11 : height * 0.05,
  },
  buttonStyle: {
    backgroundColor: COLORS.LIGHT_GRAY,
  },

  permissions: {
    width: '90%',
    marginTop: 20,
  },
  permissionsItem: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
    paddingVertical: 15,
  },
  permissionsText: {
    marginLeft: 7,
    fontSize: 16,
    color: COLORS.BLACK,
  },
  customCheck: {
    borderRadius: 100,
    borderColor: COLORS.GRAY,
    borderWidth: 1,
    width: 20,
    height: 20,
  },
  checkPosition: {
    position: 'absolute',
    right: 0,
    borderRadius: 100,
  },
  customActiveCheck: {
    fontSize: 22,
    backgroundColor: COLORS.PRIMARY,
    color: 'white',
    borderRadius: 100,
  },
  activeCheckBox: {
    // borderColor: '#FFCB37',
    borderColor: COLORS.PRIMARY,
  },
  notActiveCheckBox: {
    borderColor: COLORS.GRAY,
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
});
const PermissionItem = ({
  item,
  _increaseApprovalClick,
  _increasesLength,
  index,
}) => {
  const [isSelected, setSelection] = useState(false);
  const setArr = bool => {
    setSelection(bool);
    _increaseApprovalClick(prevState => {
      let arr = [...prevState];
      console.log(index);
      arr[index] = bool;
      return arr;
    });
  };
  const requestPermission = () => {
    if (isSelected) {
      setArr(false);
    } else {
      if (item?.isDisabled !== true){
      request(
        Platform.OS == 'ios'
          ? item?.permission?.ios
          : item?.permission?.android,
      ).then(result => {
        console.log(result);
        switch (result) {
          case RESULTS.GRANTED:
            setArr(true);
            break;
          default:

        }
      });
    } else {
       setArr(true);
    }
    }
  };
  const notif = () => {
    if (isSelected) {
      setArr(false);
    } else {
      requestNotifications(['alert', 'badge', 'sound']).then(
        ({status, settings}) => {
          switch (status) {
            case RESULTS.GRANTED:
              setArr(true);
              break;
            default:
              Alert.alert(
                '',
                'Lütfen telefonunuzdan "Bildirim" izinlerini açın.',
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
        },
      );
    }
  };
  return (
    <View style={styles.permissionsItem}>
      {item.icon}
      <Text style={styles.permissionsText}>{item.name}</Text>
      <View style={styles.checkPosition}>
        <TouchableOpacity
          onPress={item?.permission ? requestPermission : notif}
          style={styles.rawWr}>
          {isSelected ? (
            <View style={styles.selectedCircle}>
              <View style={styles.dot} />
            </View>
          ) : (
            <View style={styles.circle} />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};
export const PermissionsScreen = props => {
  useEffect(() => {
    if (props?.route?.params?.type) {
      const backAction = () => {
        return true;
      };

      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        backAction,
      );

      return () => backHandler.remove();
    }
  }, []);
  const navigation = useNavigation();
  const [numberOfApprovedPermits, setNumberOfApprovedPermits] = useState(0);
  const [permissionApproves, setPermissionApproves] = useState([
    false,
    false,
    false,
  ]);

  const permissionDatas = [
    {
      name: 'Kamera',
      icon: <CameraBlackIcon />,
      permission: {
        ios: PERMISSIONS.IOS.CAMERA,
        android: PERMISSIONS.ANDROID.CAMERA,
      },
    },
    {
      name: 'Galeri',
      icon: <GalleryBlackIcon />,
      permission: {
        ios: PERMISSIONS.IOS.PHOTO_LIBRARY,
        android: PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
      },
      isDisabled:true,
    },
    {
      name: 'Bildirimler',
      icon: <BlackNotifIcon />,
    },
  ];

  return (
    <Container style={styles.wr}>
      <View style={styles.content}>
        <Header
          leftIcon={props?.route?.params?.type ? null : <HeaderLeftIcon />}
          leftOnPress={() => {
            navigation.goBack();
          }}
          text="İzinler"
        />
        <View style={[styles.texts, {alignItems: 'center'}]}>
          <Text style={styles.boldText}>Başlamadan önce</Text>
          <Text style={styles.desc}>
            Fit’n Co uygulamasını kullanmaya başlamadan önce aşağıdaki izinleri
            vermelisin.
          </Text>
        </View>
        <View style={styles.permissions}>
          {permissionDatas.map((item, index) => {
            return (
              <PermissionItem
                _increaseApprovalClick={setPermissionApproves}
                _increasesLength={permissionApproves}
                index={index}
                item={item}
              />
            );
          })}
        </View>
        <View style={[styles.buttonWr]}>
          <Button
            buttonStyle={{
              ...styles.buttonStyle,
              backgroundColor:
                   COLORS.PRIMARY,
            }}
            text="Devam et"
            onPress={() => {

                if (props?.route?.params?.type) {
                  if (props?.route?.params.type == 'client') {
                    navigation.navigate('Splash');
                  } else {
                    navigation.navigate('Splash');
                  }
                } else {
                  navigation.navigate('UploadAvatar', {
                    ...props.route.params,
                  });

              }
            }}
          />
        </View>
      </View>
    </Container>
  );
};
