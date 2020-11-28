/* eslint-disable react-native/no-inline-styles */
import Dashboard from '../screens/Dashboard';
import Profile from '../screens/Profile';
import Settings from '../screens/Settings';
import Workouts from '../screens/Workouts';
import AboutApp from '../screens/AboutApp';
import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import materialTheme from '../constants/Theme';
import Images from '../constants/Images';
import {Dimensions} from 'react-native';

const {width} = Dimensions.get('screen');

const Drawer = createDrawerNavigator();

// TODO get this user info from app state
const profile = {
  avatar: Images.Profile,
  name: 'Tony Eneh',
  email: 'tony.eneh@kmail.com',
};

const UserScreens = (
  <Drawer.Navigator>
    <Drawer.Screen name="Dashboard" component={Dashboard} />
    <Drawer.Screen name="Workouts" component={Workouts} />
    <Drawer.Screen name="Profile" component={Profile} />
    <Drawer.Screen name="Settings" component={Settings} />
    <Drawer.Screen name="AboutApp" component={AboutApp} />
  </Drawer.Navigator>
);

export default UserScreens;
