import React from 'react';
import {StyleSheet, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import Header from '../components/Header';
import {Text} from 'galio-framework';
import theme from '../constants/Theme';

// demo data. Remove later after setting up store
const workouts = [
  {id: 0, date: '11/11/2020', distance: 70, duration: 90},
  {id: 1, date: '02/11/2020', distance: 78, duration: 89},
  {id: 2, date: '01/11/2020', distance: 34, duration: 76},
  {id: 3, date: '30/10/2020', distance: 40, duration: 44},
  {id: 4, date: '28/10/2020', distance: 55, duration: 20},
  {id: 5, date: '26/10/2020', distance: 7, duration: 89},
  {id: 6, date: '25/10/2020', distance: 79, duration: 66},
  {id: 7, date: '24/10/2020', distance: 80, duration: 45},
  {id: 8, date: '11/10/2020', distance: 110, duration: 200},
  {id: 9, date: '02/10/2020', distance: 100, duration: 32},
];

export default function Workouts({navigation, route}) {
  const _renderItem = ({item, index}) => {
    return (
      <View style={styles.item}>
        <Text p style={styles.date}>
          {item.date}
        </Text>
        <View style={styles.distance}>
          <Text h5 center>
            {item.distance}
          </Text>
          <Text>DISTANCE</Text>
        </View>
        <View style={styles.time}>
          <Text h5 center>
            {item.duration}
          </Text>
          <Text>TIME</Text>
        </View>
      </View>
    );
  };

  return (
    <>
      <Header title="Previous Workouts" navigation={navigation} />
      <FlatList
        data={workouts}
        renderItem={_renderItem}
        style={styles.list}
        keyExtractor={(item) => item.id}
      />
    </>
  );
}

const styles = StyleSheet.create({
  list: {
    padding: 20,
    marginBottom: 50,
  },
  item: {
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 5,
  },
  date: {},
  distance: {},
  time: {},
});
