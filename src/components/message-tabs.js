import React from 'react';
import { Text, StyleSheet, TouchableOpacity, View } from 'react-native';
import { COLORS, width } from '../constants';
import { useNavigation } from '@react-navigation/native';

const styles = StyleSheet.create({
  tabItemWr: {
    width: width * 0.42,
    backgroundColor: COLORS.PRIMARY,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    borderRadius: 10,
  },
  tabText: {
    color: COLORS.BLACK,
  },
  tabWr: {
    width: width * 0.9,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
});

export const MessageTabs = ({ tab1, tab2, activePage }) => {
  const navigation = useNavigation();
  return (
    <View style={styles.tabWr}>
      <TouchableOpacity
        onPress={tab1.onPress}
        style={{
          ...styles.tabItemWr,
          borderTopLeftRadius: 20,
          borderBottomLeftRadius: 20,
          backgroundColor: activePage == 0 ? COLORS.PRIMARY : COLORS.LIGHT_GRAY,
        }}>
        <Text style={styles.tabText}>{tab1.text}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={tab2.onPress}
        style={{
          ...styles.tabItemWr,
          borderTopRightRadius: 20,
          borderBottomRightRadius: 20,
          backgroundColor: activePage == 1 ? COLORS.PRIMARY : COLORS.LIGHT_GRAY,
        }}>
        <Text style={styles.tabText}>{tab2.text}</Text>
      </TouchableOpacity>
    </View>
  );
};
