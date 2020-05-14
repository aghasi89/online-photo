import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import { NewOrderScreen } from '../scenes/services/new-order.component';

const TopTab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();



export const NewOrderNavigator = (): React.ReactElement => (
  <Stack.Navigator headerMode='none'>
    <Stack.Screen name='NewOrder' component={NewOrderScreen}/>
  </Stack.Navigator>
);
