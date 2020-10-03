import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
const LeagueCard = ({data}) => {
  const navigation = useNavigation();
  const [check, setCheck] = useState(false);
  const finishedMatches = () => {
    if (data.event_status === 'Finished') {
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
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.root}
          onPress={() => {
            navigation.navigate('scorecard', {data});
          }}>
          <View style={styles.upper}>
            <View style={styles.left}>
              <Image
                style={styles.img}
                source={{uri: data.event_away_team_logo}}
              />
              <Text numberOfLines={3} style={styles.txt}>
                {data.event_away_team
                  .split(' ')
                  .map(function (item) {
                    return item[0];
                  })
                  .join('')}
              </Text>
              <View
                style={{
                  position: 'absolute',
                  bottom: 20,
                  right: 0,
                  left: 0,
                }}>
                <Text style={styles.txt3}>{data.event_away_final_result}</Text>
              </View>
            </View>

            <View style={styles.right}>
              <Image
                style={styles.img}
                source={{uri: data.event_home_team_logo}}
              />
              <Text numberOfLines={3} style={styles.txt}>
                {data.event_home_team
                  .split(' ')
                  .map(function (item) {
                    return item[0];
                  })
                  .join('')}
              </Text>
              <View
                style={{
                  position: 'absolute',
                  bottom: 20,
                  right: 0,
                  left: 0,
                }}>
                <Text style={styles.txt3}>{data.event_home_final_result}</Text>
              </View>
            </View>
          </View>

          <View style={styles.bottom}>
            <Text numberOfLines={2} style={styles.txt2}>
              {data.event_status_info}
            </Text>
          </View>
        </TouchableOpacity>
      ) : null}
    </>
  );
};

const styles = StyleSheet.create({
  root: {
    height: 200,
    width: 250,
    marginTop: 10,
    marginHorizontal: 10,
    borderRadius: 5,
    elevation: 8,
    backgroundColor: 'white',
  },
  txt: {
    fontSize: 14,
    alignSelf: 'center',
    marginTop: 10,
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
    width: 70,
    overflow: 'hidden',
    borderRadius: 8,
    resizeMode: 'cover',
    aspectRatio: 1,
    height: 70,
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
    borderRadius: 10,
    alignItems: 'center',
  },
  txt2: {
    fontSize: 12,
    textAlign: 'center',
    color: '#3498DB',
    width: '75%',
  },
  upper: {
    height: '80%',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderRadius: 10,
  },
});

export default LeagueCard;
