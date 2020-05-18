import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ServicesScreen } from '../scenes/services/services.component';
import { NewOrderScreen } from '../scenes/services/new-order.component';
import { AddNewCardScreen } from '../scenes/ecommerce/add-new-card.component';

const Stack = createStackNavigator();

export const ServcieNavigator = (): React.ReactElement => (
  <Stack.Navigator headerMode='none'>
    <Stack.Screen name='Servcies' component={ServicesScreen}/>
	<Stack.Screen name='NewOrder' component={NewOrderScreen}/>
	<Stack.Screen name='SelectAddress' component={AddNewCardScreen}/>
  </Stack.Navigator>
);
