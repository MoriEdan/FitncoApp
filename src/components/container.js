import React, {useState, useEffect} from 'react';
import {
  TextInput,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Keyboard,
  SafeAreaView,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import {COLORS} from '../constants';
const styles = StyleSheet.create({
  android: {flex: 1},
});

export const Container = ({children, style, type, isKeyboard, loading}) => {
  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: COLORS.WHITE,
        }}>
        {console.log('here')}
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  } else if (type == 'view') {
    return (
      <View style={{flex: 1, backgroundColor: COLORS.WHITE, ...style}}>
        <View>
          <StatusBar barStyle="dark-content" />
        </View>
        {children}
      </View>
    );
  } else {
    return isKeyboard ? (
      <SafeAreaView
        style={[styles.android, {backgroundColor: COLORS.WHITE, ...style}]}>
        <View>
          <StatusBar barStyle="dark-content" />
        </View>
        <TouchableOpacity
          style={[styles.android, {backgroundColor: COLORS.WHITE, ...style}]}
          activeOpacity={1}
          onPress={() => {
            Keyboard.dismiss();
          }}>
          {children}
        </TouchableOpacity>
      </SafeAreaView>
    ) : (
      <SafeAreaView
        style={[styles.android, {backgroundColor: COLORS.WHITE, ...style}]}>
        <View>
          <StatusBar barStyle="dark-content" />
        </View>
        {children}
      </SafeAreaView>
    );
  }
};
