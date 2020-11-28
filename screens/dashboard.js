import React from 'react';
import {Text} from 'react-native';
import Header from '../components/Header';
import EmptyNotice from '../components/NoWorkoutYetNotice';

let workouts;

export default function Dashboard({navigation, route}) {
  return (
    <>
      <Header title="Dashboard" navigation={navigation} />
      {!workouts ? (
        <EmptyNotice navigation={navigation} />
      ) : (
        <Text>Dashboard Screen</Text>
      )}
    </>
  );
}
