import Dashboard from '../screens/Dashboard';
import Profile from '../screens/Profile';
import Settings from '../screens/Settings';
import Workouts from '../screens/Workouts';
import AboutApp from '../screens/AboutApp';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

const UserScreens = (
  <Stack.Navigator>
    <Stack.Screen name="Dashboard" component={Dashboard} />
    <Stack.Screen name="Workouts" component={Workouts} />
    <Stack.Screen name="Profile" component={Profile} />
    <Stack.Screen name="Settings" component={Settings} />
    <Stack.Screen name="AboutApp" component={AboutApp} />
  </Stack.Navigator>
);

export default UserScreens;
