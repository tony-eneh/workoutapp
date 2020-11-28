import React from 'react';
import {} from 'react-native';
import Header from '../components/Header';
import {Block, Text} from 'galio-framework';

export default function WorkoutSession({navigation, route}) {
  return (
    <>
      <Header title="Workout Session" navigation={navigation} />
      <Block center flex></Block>
    </>
  );
}
