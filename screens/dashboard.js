import React from 'react';
import {Text} from 'react-native';
import Header from '../components/Header';

export default function Dashboard({navigation, route}) {
  return (
    <>
      <Header title="Dashboard" navigation={navigation} />
      <Text>Dashboard Screen</Text>
    </>
  );
}
