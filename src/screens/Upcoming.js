import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  StatusBar,
  FlatList,
} from 'react-native';
import UpcomingCard from '../components/UpcomingCard';
import axios from 'axios';
import Header from '../components/Header';
const Upcoming = (props) => {
  const [results, setResults] = useState([]);
  const leagues = async () => {
    const response = await axios.get(
      'https://api.api-cricket.com/cricket/?method=get_events&APIkey=7c44086faab1b5d1afcd628efa722560d5243d670f7636e959dc77f40a200243&date_start=2020-09-19&date_stop=2020-011-10&league_key=9785',
    );

    setResults(response.data.result);
  };

  useEffect(() => {
    leagues();
  }, []);
  return (
    <>
      <View style={styles.root}>
        <Header navi={props} />

        <FlatList
          ListHeaderComponent={
            <Text
              style={{
                fontSize: 22,
                alignItems: 'center',
                alignSelf: 'center',
                marginVertical: 10,
              }}>
              Upcoming Matches
            </Text>
          }
          contentContainerStyle={{
            paddingVertical: 10,
          }}
          data={results}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.event_key}
          renderItem={(item) => {
            return console.log(item.item), (<UpcomingCard data={item.item} />);
          }}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  recent: {
    marginTop: 10,
    height: 250,
    width: '100%',
    backgroundColor: 'red',
  },
});

export default Upcoming;
