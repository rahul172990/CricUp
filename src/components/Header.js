import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  StatusBar,
} from 'react-native';
import img3 from '../images/Cric3.png';
import Icon from 'react-native-vector-icons/Feather';

const widthA = Dimensions.get('window').width;

const Header = (props) => {
  return (
    <>
      <View style={styles.header}>
        <StatusBar
          barStyle="light-content"
          backgroundColor="#1B2631"
          hidden={false}
        />
        <View
          style={{
            flex: 0.2,
            height: '100%',
            justifyContent: 'center',
          }}>
          <TouchableOpacity
            style={{alignSelf: 'center'}}
            onPress={() => {
              props.navi.navigation.openDrawer();
            }}>
            <Icon name="menu" size={24} color="white" />
          </TouchableOpacity>
        </View>
        <View
          style={{
            flex: 0.8,
            height: '100%',
            width: '30%',
            justifyContent: 'center',
            paddingTop: 5,
            marginLeft: '15%',
          }}>
          <Image
            source={img3}
            style={{
              height: '100%',
              width: widthA / 2.5,
              flexWrap: 'wrap',
            }}
          />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 50,
    width: '100%',
    backgroundColor: '#1B2631',
    flexDirection: 'row',
  },
});

export default Header;
