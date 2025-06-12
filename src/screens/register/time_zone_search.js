import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Alert,
  FlatList,
  View,
} from 'react-native';

import {
  width,
  height,
  COLORS,
  getData,
  APPROVALS,
  TIMEZONES,
  UPDATE_ME,
} from '../../constants';
import { Container, TimeZoneSearchHeader } from '../../components';
import axios from 'axios';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const styles = StyleSheet.create({
  wr: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  content: {
    width,
    alignItems: 'center',
  },
  timeLists: {
    width: '90%',
  },
  timeListItem: {
    paddingVertical: 11,
    borderBottomColor: COLORS.LIGHT_GRAY,
    borderBottomWidth: 1,
  },
  timListText: {
    fontSize: 14,
    color: COLORS.BLACK,
  },
});

export const TimeZoneSearchScreen = props => {
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const [timezones, setTimezones] = useState([]);
  const [search, setSearch] = useState('');
  useEffect(() => {
    getData();
    setSearch('');
  }, [isFocused]);

  useEffect(() => {
    getData();
  }, [search]);

  const getData = () => {
    axios.get(TIMEZONES + search).then(res => {
      setTimezones(res.data.data);
    });
  };

  const onItemPress = async item => {
    const token = await AsyncStorage.getItem('token');
    console.log(token);
    //  if (!token) {
    if (!props?.route?.params) {
      axios
        .post(
          UPDATE_ME,
          { timezone: item?.id },
          { headers: { Authorization: 'Bearer ' + token } },
        )
        .then(res => {
          console.log(res.data);
          navigation.goBack();
        })
        .catch(e => {
          console.log(e);
          Alert.alert('', e?.message);
          //  navigation.goBack()
        });
    } else {
      navigation.navigate('Permissions', {
        ...props.route.params,
        timeZone: item?.id,
      });
    }
  };

  const cancelPress = async item => {
    const token = await AsyncStorage.getItem('token');
    //  if (!token) {
    if (token) {
      navigation.goBack();
    } else {
      navigation.goBack();
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => onItemPress(item)}
      style={styles.timeListItem}>
      <Text style={styles.timListText}>{item?.title}</Text>
    </TouchableOpacity>
  );
  return (
    <Container style={styles.wr}>
      <View style={styles.content}>
        <TimeZoneSearchHeader
          inputValue={search}
          setInputValue={setSearch}
          cancelPress={cancelPress}
        />
        <View style={styles.timeLists}>
          <FlatList
            data={timezones}
            keyExtractor={(item, index) => item.id + index.toString()}
            renderItem={renderItem}
          />
        </View>
      </View>
    </Container>
  );
};
