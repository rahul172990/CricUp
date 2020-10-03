import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text} from 'react-native';

import axios from 'axios';

import Header from '../components/Header';

import {DataTable} from 'react-native-paper';

const Standing = (props) => {
  const [results, setResults] = useState([]);
  const leagues = async () => {
    const response = await axios.get(
      'https://api.api-cricket.com/?method=get_standings&league_key=9785&APIkey=7c44086faab1b5d1afcd628efa722560d5243d670f7636e959dc77f40a200243',
    );

    setResults(response.data.result.total);
  };

  useEffect(() => {
    leagues();
  }, []);

  return (
    <View style={styles.root}>
      <Header navi={props} />
      <View style={{height: 50, width: '100%', alignItems: 'center'}}>
        <Text style={{fontSize: 20}}>Points Table</Text>
      </View>

      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Teams</DataTable.Title>
          <DataTable.Title numeric>M</DataTable.Title>
          <DataTable.Title numeric>W</DataTable.Title>
          <DataTable.Title numeric>Pts</DataTable.Title>
          <DataTable.Title numeric>NRR</DataTable.Title>
        </DataTable.Header>

        {results.map((item) => {
          return (
            <DataTable.Row key={item.team_key}>
              <DataTable.Cell>
                {' '}
                {item.standing_team
                  .split(' ')
                  .map(function (item) {
                    return item[0];
                  })
                  .join('')}
              </DataTable.Cell>
              <DataTable.Cell numeric>{item.standing_MP}</DataTable.Cell>
              <DataTable.Cell numeric>{item.standing_W}</DataTable.Cell>
              <DataTable.Cell numeric>{item.standing_Pts}</DataTable.Cell>
              <DataTable.Cell numeric>{item.standing_R}</DataTable.Cell>
            </DataTable.Row>
          );
        })}
      </DataTable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 18,
    paddingTop: 35,
    backgroundColor: '#ffffff',
  },
  HeadStyle: {
    height: 50,
    alignContent: 'center',
    backgroundColor: '#ffe0f0',
  },
  TableText: {
    margin: 5,
  },
});

export default Standing;
