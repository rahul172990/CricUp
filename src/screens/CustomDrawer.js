import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  StatusBar,
  Image,
} from 'react-native';
import {DrawerContent, DrawerItem} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/Ionicons';
import img1 from '../images/Cric3.png';
import * as authActions from '../../store/actions/auth';
const CustomDrawer = (props) => {
  return (
    <View style={{flex: 1}}>
      <View
        style={{
          width: '100%',
          height: 120,
          backgroundColor: '#1B2631',
          alignItems: 'center',
        }}>
        <Image style={{height: '100%', width: '60%'}} source={img1} />
      </View>
      <DrawerContent {...props}></DrawerContent>
      <View style={styles.bottom}>
        <DrawerItem
          icon={() => {
            return <Icon name="exit-outline" size={24} color="black" />;
          }}
          label="Sign Out"
          labelStyle={{
            color: 'black',
          }}
          onPress={() => {
            authActions.logout();
            props.navigation.navigate('login');
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bottom: {
    position: 'absolute',
    bottom: 20,
    flexDirection: 'row',
  },
});

export default CustomDrawer;
