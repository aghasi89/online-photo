import React, { useContext, useState } from 'react';
import { RouteProp } from '@react-navigation/core';
import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { LayoutsNavigator } from './layouts.navigator';
import { ComponentsNavigator } from './components.navigator';
import { ThemesNavigator } from './themes.navigator';
import { HomeBottomNavigation } from '../scenes/home/home-bottom-navigation.component';
import { HomeDrawer } from '../scenes/home/home-drawer.component';
import { LibrariesScreen } from '../scenes/libraries/libraries.component';
import { ServcieNavigator } from './service.navigator';
import { HistoryScreen } from '../scenes/history/history.component';
import { AddressScreen } from '../scenes/address/address.component';
import { NewAddressScreen } from '../scenes/address/new-address.component';
import { store } from '../reducer';
import { getCites, getAddresses, getSizes, getOrders,getStatus } from '../api/api';
const BottomTab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

/*
 * When dev is true in .expo/settings.json (started via `start:dev`),
 * open Components tab as default.
 */
const initialTabRoute: string = __DEV__ ? 'Components' : 'Layouts';

/*
 * Can we access it from `HomeNavigator`?
 */
const ROOT_ROUTES: string[] = ['Home', 'Layouts', 'Components', 'Themes'];

const isOneOfRootRoutes = (currentRoute: RouteProp<any, any>): boolean => {
  return ROOT_ROUTES.find(route => currentRoute.name === route) !== undefined;
};

const TabBarVisibleOnRootScreenOptions = ({ route }): BottomTabNavigationOptions => {
  const currentRoute = route.state && route.state.routes[route.state.index];
  return { tabBarVisible: currentRoute && isOneOfRootRoutes(currentRoute) };
};

const HomeTabsNavigator = (): React.ReactElement => (
  <BottomTab.Navigator
    screenOptions={TabBarVisibleOnRootScreenOptions}
    initialRouteName={initialTabRoute}
    tabBar={props => <HomeBottomNavigation {...props} />}>
	<BottomTab.Screen name='Services' component={ServcieNavigator}/>
    <BottomTab.Screen name='History' component={ComponentsNavigator}/>
  </BottomTab.Navigator>
);
const collectDate = async (dispatch)=>{
	
	try{
    const cites = await getCites()
	const address = await getAddresses()
	const sizes = await  getSizes()
  const history = await  getOrders()
console.log("history",history);

  dispatch({ type: 'SET_ALL_DATA', payload: {history,sizes,address,cites} })
  }catch(error){
    console.log("error",error)
    
  }
  
	
}

export const HomeNavigator = (): React.ReactElement => {
	const { dispatch } = useContext(store);
	const [loaded,setLoaded] = useState(false);
	if(!loaded){
		setLoaded(true)
		collectDate(dispatch).then((a)=>{	
      console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",a);
      
		})
	}
	
	return (
  <Drawer.Navigator
    screenOptions={{ gestureEnabled: true }}
    drawerContent={props => <HomeDrawer {...props}/>}>
    <Drawer.Screen name='Service' component={ServcieNavigator}/>
    <Drawer.Screen name='History' component={HistoryScreen}/>
	<Drawer.Screen name='Address' component={AddressScreen}/>
	<Drawer.Screen name='NewAddress' component={NewAddressScreen}/>
  </Drawer.Navigator>
)};
