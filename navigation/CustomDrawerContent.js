import React from 'react';
import {StyleSheet, View, Image} from 'react-native';
import {Text} from 'galio-framework';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import theme from '../constants/Theme';
import Avatar from '../assets/Avatar.png';

const navItems = [
  'Dashboard',
  'Workouts',
  'Profile',
  'Settings',
  'AboutApp',
  'Logout',
];

export default function CustomDrawerContent(props) {
  const {navigation, profile} = props;

  //   utility function to render better readable menu items
  const renderLabel = (label) => {
    switch (label) {
      case 'Workouts':
        return 'My Workouts';
      case 'AboutApp':
        return 'About App';
      default:
        return label;
    }
  };

  //   utility function to differentiate logging out from other nav items
  const handlePress = (n, item) => {
    if (item === 'Logout') {
      //   logout user. By resetting global token to null then return
      return;
    }
    n.navigate(item);
  };

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.profile}>
        <Image source={Avatar} style={styles.avatar} resizeMode="contain" />
        <View>
          <Text p>{profile.name}</Text>
          <Text>{profile.email}</Text>
        </View>
      </View>
      {navItems.map((item, index) => (
        <DrawerItem
          key={index}
          {...props}
          label={() => <Text p>{renderLabel(item)}</Text>}
          onPress={() => handlePress(navigation, item)}
          //   demarcate logout from others with a border
          style={index === navItems.length - 1 && styles.borderTop}
        />
      ))}
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  borderTop: {
    borderTopWidth: 2,
    borderTopColor: theme.COLORS.MUTED,
  },
  avatar: {
    height: '100%',
    width: 100,
  },
  profile: {
    height: 80,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    borderBottomWidth: 1,
    padding: 5,
  },
});
