import React from 'react';
import {StyleSheet, View, Image} from 'react-native';
import {Text, Block} from 'galio-framework';
import MenuIcon from '../assets/MenuIcon.png';
import Avatar from '../assets/Avatar.png';
import Logo from '../assets/Logo.png';

export default function Header({title}) {
  return (
    <View style={styles.headerStyle}>
      <View style={styles.appBar}>
        <Image
          source={MenuIcon}
          style={[styles.normalizeImages, styles.menuIcon]}
          resizeMode="contain"
        />
        <Image
          source={Logo}
          style={[styles.normalizeImages, styles.logo]}
          resizeMode="contain"
        />
        <Image
          source={Avatar}
          style={[styles.normalizeImages, styles.avatar]}
          resizeMode="contain"
        />
      </View>
      <Block center style={styles.titleArea}>
        <Text h4>{title}</Text>
      </Block>
    </View>
  );
}

const styles = StyleSheet.create({
  headerStyle: {
    height: 120,
    overflow: 'hidden',
    backgroundColor: 'red',
  },
  appBar: {
    flexDirection: 'row',
    height: 80, //remaining 40 units of height for the title area below to take
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
    backgroundColor: 'white',
    padding: 5,
  },
  titleArea: {
    color: 'yellow',
  },
  menuIcon: {},
  avatar: {},
  logo: {
    flex: 2,
  },
  normalizeImages: {
    width: undefined,
    height: '100%',
    flex: 1,
  },
});
