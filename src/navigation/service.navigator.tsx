import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthNavigator } from './auth.navigator';
import { SocialNavigator } from './social.navigator';
import { ArticlesNavigator } from './articles.navigator';
import { MessagingNavigator } from './messaging.navigator';
import { DashboardsNavigator } from './dashboards.navigator';
import { EcommerceNavigator } from './ecommerce.navigator';
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
