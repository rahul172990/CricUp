import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, FlatList} from 'react-native';
import api from '../api/liveapi';
import LeagueCard from '../components/LeagueCard';
import LiveCard from '../components/LiveCard';
import axios from 'axios';

import Header from '../components/Header';

const Home = (props) => {
  const [results, setResults] = useState([]);
  const leagues = async () => {
    const response = await axios.get(
      'https://api.api-cricket.com/cricket/?method=get_events&APIkey=7c44086faab1b5d1afcd628efa722560d5243d670f7636e959dc77f40a200243&date_start=2020-09-19&date_stop=2020-011-10&league_key=9785',
    );
    setResults(response.data.result);
    console.log(response.data.result);
  };

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     leagues();
  //   }, 5000);
  //   return () => clearInterval(interval);
  // }, []);

  useEffect(() => {
    leagues();
  }, []);

  return (
    <View style={styles.root}>
      <Header navi={props} />
      <View
        style={{
          marginTop: 10,
          height: 250,
        }}>
        <Text style={{fontSize: 18, alignItems: 'center', marginLeft: 20}}>
          Recent Matches
        </Text>

        <FlatList
          contentContainerStyle={{
            paddingHorizontal: 10,
          }}
          horizontal
          showsHorizontalScrollIndicator={false}
          data={results.reverse()}
          keyExtractor={(item) => item.event_key}
          renderItem={(item) => {
            return <LeagueCard data={item.item} />;
          }}
        />
      </View>
      <View style={{height: 250}}>
        <Text
          style={{
            fontSize: 18,
            alignItems: 'center',
            marginLeft: 20,
            marginTop: 0,
          }}>
          Live
        </Text>
        <FlatList
          contentContainerStyle={{
            paddingHorizontal: 10,
          }}
          horizontal
          showsHorizontalScrollIndicator={false}
          data={results}
          keyExtractor={(item) => item.event_key}
          renderItem={(item) => {
            return <LiveCard data1={item.item} />;
          }}
        />
      </View>
    </View>
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

export default Home;
