import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import ProfileScreen from '../screens/ProfileScreen';
import {useNavigation} from '@react-navigation/native';

const ScoreCard = (data) => {
  const navigation = useNavigation();
  const {params} = data.route;
  console.log(params);

  const detail = (card) => {
    return <></>;
  };
  return (
    <>
      <View style={styles.root}>
        <Text
          numberOfLines={2}
          style={{
            alignSelf: 'center',
            color: '#3498DB',
            marginVertical: 20,
            fontSize: 16,
          }}>
          {params.data.event_status_info}
        </Text>
        <View style={styles.heading}>
          <TouchableOpacity
            onPress={() => {
              console.log(params.data.scorecard);
            }}
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-around',
              backgroundColor: 'white',
            }}>
            <Text style={styles.txt}>{params.data.event_home_team}</Text>
            <Text style={styles.txt}>
              {params.data.event_home_final_result}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {}}
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-around',
              backgroundColor: 'white',
              marginTop: 5,
            }}>
            <Text style={styles.txt}>{params.data.event_away_team}</Text>
            <Text style={styles.txt}>
              {params.data.event_away_final_result}
            </Text>
          </TouchableOpacity>
        </View>
        <ScrollView></ScrollView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  heading: {
    height: 100,
    width: '100%',
  },
  txt: {
    fontSize: 16,
    fontWeight: '200',
    alignSelf: 'center',
  },
});

export default ScoreCard;
