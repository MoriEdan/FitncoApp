import React, {useState} from 'react';
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  View,
} from 'react-native';
import {COLORS, TextProps, width} from '../constants';
import I18n from '../language';
const styles = StyleSheet.create({
  buttonStyle: {
    backgroundColor: COLORS.PRIMARY,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    width: width * 0.9,
    height: 40,
  },

  text: {
    color: COLORS.BLACK,
    fontSize: 15,
  },
  icon: {
    position: 'absolute',
    left: 20,
  },
});

export const Button = ({
  buttonStyle,
  textStyle,
  text,
  onPress,
  loading,
  iconName,
  iconType,
  disabled,
}) => {
  return (
    <View>
      {loading ? (
        <View
          disabled={disabled}
          style={{
            ...styles.buttonStyle,
            ...buttonStyle,
          }}>
          <ActivityIndicator size="small" color={COLORS.BLACK} />
        </View>
      ) : (
        <TouchableOpacity
          disabled={disabled}
          onPress={loading ? () => {} : onPress}
          style={{
            ...styles.buttonStyle,
            ...buttonStyle,
          }}>
          <Text style={{...styles.text, ...textStyle}}>{text}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};
