/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {SafeAreaView, StyleSheet, View, Text, StatusBar} from 'react-native';
import Home from './screens/Home';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import Upcoming from './screens/Upcoming';
import CustomDrawer from './screens/CustomDrawer';
import ProfileScreen from './screens/ProfileScreen';
import StartupScreen from './screens/StartupScreen';

import Standing from './screens/Standing';
import ScoreCard from './screens/ScoreCard';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {Provider} from 'react-redux';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import ReduxThunk from 'redux-thunk';
import authReucer from '../store/reducers/auth';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const rootReducer = combineReducers({
  auth: authReucer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

function drawer() {
  return (
    <Drawer.Navigator
      edgeWidth={-30}
      initialRouteName="home"
      drawerContentOptions={{
        activeTintColor: '#E74C3C',
        inactiveTintColor: 'black',
      }}
      drawerStyle={{
        width: '70%',
      }}
      drawerContent={(props) => <CustomDrawer {...props} />}>
      <Drawer.Screen
        name="home"
        component={Home}
        options={{
          drawerIcon: () => {
            return <Icon name="home-outline" size={24} color="black" />;
          },
        }}
      />
      {/* <Drawer.Screen
        name="profile"
        component={ProfileScreen}
        options={{
          drawerIcon: () => {
            return <Icon name="account-outline" size={24} color="black" />;
          },
        }}
      /> */}
      <Drawer.Screen
        name="upcoming"
        component={Upcoming}
        options={{
          drawerIcon: () => {
            return <Icon name="calendar-month" size={24} color="black" />;
          },
        }}
      />
      <Drawer.Screen
        name="Points Table"
        component={Standing}
        options={{
          drawerIcon: () => {
            return <Icon name="table" size={24} color="black" />;
          },
        }}
      />
      {/* <Drawer.Screen
        name="fixture"
        component={Fixtures}
        options={{
          drawerIcon: () => {
            return <Icon name="calendar-month" size={24} color="black" />;
          },
        }}
      /> */}
    </Drawer.Navigator>
  );
}

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="startup"
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="startup" component={StartupScreen} />
          <Stack.Screen name="login" component={LoginScreen} />
          <Stack.Screen name="signup" component={SignupScreen} />
          <Stack.Screen
            options={{
              headerShown: true,
            }}
            name="scorecard"
            component={ScoreCard}
          />
          <Stack.Screen name="home" component={drawer} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

const styles = StyleSheet.create({});

export default App;
