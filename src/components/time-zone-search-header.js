import React, { useState, useEffect } from 'react';
import {
  TextInput,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
} from 'react-native';
import { COLORS } from '../constants';
import { useNavigation } from '@react-navigation/native';
import IconAnt from 'react-native-vector-icons/AntDesign';
import { SearchIcon } from '../assets/icons';
const styles = StyleSheet.create({
  header: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
  },
  content: {
    marginVertical: 13,
  },
  drow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '94%',
  },
  iconAndInput: {
    backgroundColor: COLORS.LIGHT_GRAY,
    width: '87%',
    paddingHorizontal: 10,
    height: 38,
    borderRadius: 20,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 5,
  },
  input: {
    width: '90%',
    color: COLORS.TEXT
  },
  backBtn: {
    width: '11%',
  },
  backText: {
    textAlign: 'center',
    color: COLORS.BLUE,
  },
  clearIcon: {
    position: 'absolute',
    right: 10,
  },
});

export const TimeZoneSearchHeader = ({ inputValue, setInputValue, cancelPress }) => {
  const [isActiveClearBtn, setIsActiveClearBtn] = useState(false);

  useEffect(() => {
    inputValue.length ? setIsActiveClearBtn(true) : setIsActiveClearBtn(false);
  }, [inputValue]);
  const navigation = useNavigation();

  return (
    <View style={styles.header}>
      <View style={[styles.drow, styles.content]}>
        <View style={[styles.iconAndInput]}>
          <SearchIcon />
          <TextInput
            value={inputValue}
            onChangeText={value => setInputValue(value)}
            style={styles.input}
            placeholder="İstanbul"
            placeholderTextColor={COLORS.GRAY}
          />
          {isActiveClearBtn && (
            <IconAnt
              onPress={() => setInputValue('')}
              style={styles.clearIcon}
              name="closecircleo"
              size={19}
            />
          )}
        </View>
        <TouchableOpacity
          onPress={cancelPress}
          style={styles.backBtn}>
          <Text style={styles.backText}>İptal</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
