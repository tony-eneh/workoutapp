import React from 'react';
import {} from 'react-native';
import Header from '../components/Header';
import {Block, Text} from 'galio-framework';

export default function AboutApp({navigation, route}) {
  return (
    <>
      <Header title="About App" navigation={navigation} />
      <Block center flex>
        <Text p>copyright Telixia Apps &copyright;2020</Text>
      </Block>
    </>
  );
}
