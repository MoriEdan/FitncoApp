import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Modal,
  SafeAreaView
} from 'react-native';
import { COLORS, height } from '../../../constants';
import { Header, Button, Container } from '../../../components';
import { useNavigation } from '@react-navigation/native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {
  HeaderLeftIcon,
  BlackCloseIcon,
  BlackChevronRightIcon,
} from '../../../assets/icons';
const styles = StyleSheet.create({
  content: {
    flex: 1,
    paddingHorizontal: 20,
    height,
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
    paddingVertical: 13,
  },
  text: {
    fontSize: 17,
    color: COLORS.TEXT,
  },
  buttonWr: {
    alignSelf: 'center',
    position: 'absolute',
    bottom: height * 0.2,
  },
  buttonStyle: {
    backgroundColor: COLORS.LIGHT_GRAY,
    height: 50,
  },
  filterItem: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
    paddingVertical: 13,
    borderBottomWidth: 0.2,
    borderBottomColor: COLORS.GRAY,
  },
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
});
const filterDatas = [
  {
    name: 'Öğün Göndermeyenler',
    sections: [
      { name: 'Kahvaltı', filter: 'meal', value: 'breakfast' },
      { name: 'Öğle Yemeği', filter: 'meal', value: 'lunch' },
      { name: 'Akşam Yemeği', filter: 'meal', value: 'dinner' },
    ],
  },
  {
    name: 'Spor ve Yürüyüş',
    sections: [
      { name: 'Yürüyüş Yapamaz', filter: 'can_walk', value: 0 },
      { name: 'Yürüyüş Göndermeyenler', filter: 'walk', value: 0 },
      { name: 'Spor Göndermeyenler', filter: 'spor', value: 0 },
    ],
  },
  {
    name: 'Su',
    sections: [{ name: 'Hiç Su Göndermeyenler', filter: 'water', value: 0 }],
  },
  {
    name: 'Kullanıcı Tipi',
    sections: [
      { name: 'VIP', filter: 'vip', value: 1 },
      { name: 'Online', filter: 'type', value: 'online' },
      { name: 'Yüz yüze', filter: 'type', value: 'facetoface' },
    ],
  },
];
const FilterItem = ({ item }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => {
        console.log('here');
        if (item?.filter && item?.value != null) {
          console.log('here2');
          navigation.navigate('TrackingListScreen', {
            filter: item?.filter,
            value: item?.value,
          });
        }
      }}
      style={styles.wrapperItem}>
      <Text style={styles.filterText}>{item?.name}</Text>
      <BlackChevronRightIcon />
    </TouchableOpacity>
  );
};
const SectionScreen = ({ selectedSections }) => {
  return selectedSections.map((item, index) => {
    return <FilterItem key={index} item={item} />;
  });
};
const FilterNamesScreen = ({ click }) => {
  return filterDatas.map((item, index) => {
    return (
      <TouchableOpacity
        onPress={() => click(item.name, item.sections)}
        key={index}
        style={styles.wrapperItem}>
        <Text style={styles.text}>{item.name}</Text>
        <BlackChevronRightIcon />
      </TouchableOpacity>
    );
  });
};
export const TrackingListFilterScreen = ({ visivle }) => {
  const navigation = useNavigation();
  const [selectedSections, setSelectedSections] = useState([]);
  const [selectedFilterName, setSelectedFilterName] = useState('');

  const [isSectionScreenOpen, setIsSectionsScreenOpen] = useState(false);

  const _onClickFilterName = (filterName, sections) => {
    setSelectedFilterName(filterName);
    setSelectedSections(sections);
    setIsSectionsScreenOpen(true);
  };
  return (
    <Modal visible={true} style={styles.wr}>
      <SafeAreaView style={{ backgroundColor: 'red' }}>
        <Header
          leftIcon={
            isSectionScreenOpen ? (
              <HeaderLeftIcon />
            ) : (
              <BlackCloseIcon />
              // <Image source={require('../../../assets/icons/black-close.png')} />
            )
          }
          leftOnPress={() => {
            isSectionScreenOpen
              ? setIsSectionsScreenOpen(false)
              : navigation.goBack();
          }}
          rightIcon={isSectionScreenOpen && <Text>Temizle</Text>}
          rightOnPress={() => {
            const ref = selectedSections;
            setSelectedSections([]);
            setTimeout(() => {
              setSelectedSections(ref);
            }, 1);
          }}
          text={isSectionScreenOpen ? selectedFilterName : 'Filtrele'}
          rightIconStyle={styles.rightIconStyle}
        />
        <ScrollView>
          <View style={styles.content}>
            <View style={styles.filtres}>
              {isSectionScreenOpen ? (
                <SectionScreen selectedSections={selectedSections} />
              ) : (
                <FilterNamesScreen click={_onClickFilterName} />
              )}
            </View>
            {/*<View style={[styles.buttonWr]}>
            <Button
              buttonStyle={styles.buttonStyle}
              text={isSectionScreenOpen ? 'Uygula' : 'Danışanları Gör'}
              onPress={() => {
                isSectionScreenOpen
                  ? setIsSectionsScreenOpen(false)
                  : console.log('close tracking list filter screen');
              }}
            />
            </View>*/}
          </View>
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
};
