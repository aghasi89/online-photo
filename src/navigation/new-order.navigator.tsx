import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NewOrderScreen } from '../scenes/services/new-order.component';

const Stack = createStackNavigator();



export const NewOrderNavigator = (): React.ReactElement => (
  <Stack.Navigator headerMode='none'>
    <Stack.Screen name='NewOrder' component={NewOrderScreen}/>
  </Stack.Navigator>
);
