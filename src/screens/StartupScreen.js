import React, {useEffect} from 'react';
import {View, ActivityIndicator, StyleSheet, Text} from 'react-native';
import {useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import * as authActions from '../../store/actions/auth';

const StartupScreen = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const tryLogin = async () => {
      const userData = await AsyncStorage.getItem('userData');
      const userData2 = await AsyncStorage.getItem('userData2');
      if (!userData) {
        props.navigation.navigate('login');
        return;
      } else if (!userData2) {
        props.navigation.navigate('login');
        return;
      }
      const transformedData = JSON.parse(userData);
      const {token, userId, expiryDate} = transformedData;
      const expirationDate = new Date(expiryDate);

      if (expirationDate <= new Date() || !token || !userId) {
        props.navigation.navigate('login');
        return;
      }

      props.navigation.navigate('home');
      dispatch(authActions.authenticate(userId, token));
    };

    tryLogin();
  }, [dispatch]);

  return (
    <View style={styles.screen}>
      <ActivityIndicator size="large" color="red" />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default StartupScreen;
