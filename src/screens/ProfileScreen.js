import React from 'react';
import {SafeAreaView, StyleSheet, View, Text, StatusBar} from 'react-native';
import Header from '../components/Header';

const ProfileScreen = (props) => {
  return (
    <View>
      <StatusBar backgroundColor="#1B2631" animated />
      <Header navi={props} />
      <Text>Profile</Text>
      <View
        style={{
          height: 250,
          width: 250,
          elevation: 5,
          backgroundColor: 'white',
        }}>
        <Text>hhhhh</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default ProfileScreen;
