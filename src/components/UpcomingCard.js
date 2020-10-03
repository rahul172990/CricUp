import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
const UpcomingCard = ({data}) => {
  const navigation = useNavigation();
  const [check, setCheck] = useState(false);
  const finishedMatches = () => {
    if (data.event_status === null) {
      setCheck(true);
    } else {
      return null;
    }
  };

  useEffect(() => {
    finishedMatches();
  }, []);

  return (
    <>
      {check ? (
        <View style={{flex: 1, alignItems: 'center'}}>
          <View style={styles.root}>
            <View style={styles.upper}>
              <View style={styles.left}>
                <Image
                  style={styles.img}
                  source={{uri: data.event_away_team_logo}}
                />
                <Text numberOfLines={3} style={styles.txt}>
                  {data.event_away_team}
                </Text>
              </View>

              <View style={styles.right}>
                <Image
                  style={styles.img}
                  source={{uri: data.event_home_team_logo}}
                />
                <Text numberOfLines={3} style={styles.txt}>
                  {data.event_home_team}
                </Text>
              </View>
            </View>

            <View style={styles.bottom}>
              <Text style={styles.txt2}>Date: {data.event_date_start}</Text>
            </View>
          </View>
        </View>
      ) : null}
    </>
  );
};

const styles = StyleSheet.create({
  root: {
    height: 170,
    width: 300,
    marginTop: 10,
    marginHorizontal: 10,
    borderRadius: 5,
    elevation: 8,
    backgroundColor: 'white',
  },
  txt: {
    fontSize: 14,
    alignSelf: 'center',
    marginTop: 20,
    marginHorizontal: 10,
    alignSelf: 'center',
    textAlign: 'center',
  },
  txt3: {
    fontSize: 14,
    alignSelf: 'center',
    marginTop: 20,
    marginHorizontal: 10,
    alignSelf: 'center',
    textAlign: 'center',
  },
  img: {
    width: 60,
    overflow: 'hidden',
    borderRadius: 8,
    resizeMode: 'cover',
    aspectRatio: 1,
    height: 60,
    alignSelf: 'center',
    marginTop: 5,
  },
  card: {
    height: '90%',
    width: '100%',
  },
  right: {
    flex: 1,
  },
  left: {
    flex: 1,
  },
  bottom: {
    height: '20%',
    width: '100%',
    alignItems: 'center',
  },
  txt2: {
    fontSize: 14,
    color: '#3498DB',
  },
  upper: {
    height: '80%',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderRadius: 10,
  },
});

export default UpcomingCard;
