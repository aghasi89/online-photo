import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ComponentsScreen } from '../scenes/components/components.component';
import { ShoppingCartScreen } from '../scenes/ecommerce/shopping-cart.component';
import { AddNewCardScreen } from '../scenes/ecommerce/add-new-card.component';


const Stack = createStackNavigator();

export const ComponentsNavigator = (): React.ReactElement => (
  <Stack.Navigator headerMode='none'>
    <Stack.Screen name='Services' component={ComponentsScreen}/>
    <Stack.Screen name='NewOrder' component={ShoppingCartScreen}/>
	<Stack.Screen name='SelectAddress' component={AddNewCardScreen}/>

  </Stack.Navigator>
);
