import React from 'react';
import {StyleSheet, View} from 'react-native';
import {COLORS, height} from '../constants';
const styles = StyleSheet.create({
  dotsWr: {
    alignSelf: 'center',
    flexDirection: 'row',
    marginTop: height * 0.03,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 5,
    marginHorizontal: 3,
  },
});
const range = (start, end) => {
  return Array(end - start + 1)
    .fill()
    .map((_, idx) => start + idx);
};
export const Dots = ({activeIndex, length}) => {
  return (
    <View style={styles.dotsWr}>
      {[...range(1, length)].map((item, index) => {
        return (
          <View
            style={{
              ...styles.dot,
              backgroundColor:
                index === activeIndex ? COLORS.PRIMARY : COLORS.BLACK,
            }}
          />
        );
      })}
    </View>
  );
};
