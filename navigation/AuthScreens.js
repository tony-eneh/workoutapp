import Login from '../screens/Login';
import Signup from '../screens/Signup';
import Welcome from '../screens/Welcome';
import GoalSetting from '../screens/GoalSetting';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

const AuthScreens = (
  <Stack.Navigator screenOptions={{headerShown: false}}>
    <Stack.Screen name="Welcome" component={Welcome} />
    <Stack.Screen name="Signup" component={Signup} />
    <Stack.Screen name="Login" component={Login} />
    <Stack.Screen name="GoalSetting" component={GoalSetting} />
  </Stack.Navigator>
);

export default AuthScreens;
