import React from 'react';
import { Text, StyleSheet, TouchableOpacity, View } from 'react-native';
import { COLORS, height, width } from '../constants';

const styles = StyleSheet.create({
  itemWrStyle: {
    width: width,
    height: height * 0.08,
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.WHITE
  },
  text: {
    color: COLORS.BLACK,
    fontSize: 18,
    fontWeight: 'bold',
  },
  iconWr: {
    backgroundColor: COLORS.WHITE,
    minWidth: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
});

export const Header = ({
  text,
  leftIcon,
  leftOnPress,
  rightIcon,
  rightOnPress,
  rightIconStyle,
}) => {
  return (
    <View style={styles.itemWrStyle}>
      <TouchableOpacity
        style={styles.iconWr}
        onPress={leftOnPress ? leftOnPress : () => { }}>
        {leftIcon && leftIcon}
      </TouchableOpacity>
      <View>
        <Text style={styles.text} numberOfLines={1} ellipsizeMode="tail">
          {text}
        </Text>
      </View>
      <TouchableOpacity
        style={[styles.iconWr, rightIconStyle && rightIconStyle]}
        onPress={rightOnPress ? rightOnPress : () => { }}>
        {rightIcon && rightIcon}
      </TouchableOpacity>
    </View>
  );
};
