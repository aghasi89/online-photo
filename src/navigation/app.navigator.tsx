import React, {  useState } from 'react';
import { DefaultTheme, NavigationContainer, } from '@react-navigation/native';
import { createStackNavigator } from "@react-navigation/stack";
import { HomeNavigator } from './home.navigator';
import { SignIn } from '../scenes/auth/sign-in';
import { SignUp } from '../scenes/auth/sign-up';
import { getData } from "../api/api";

/*
 * Navigation theming: https://reactnavigation.org/docs/en/next/themes.html
 */
const navigatorTheme = {
	...DefaultTheme,
	colors: {
		...DefaultTheme.colors,
		// prevent layout blinking when performing navigation
		background: 'transparent',
	},
	header: null
};
const Stack = createStackNavigator();
export const AppNavigator = (): React.ReactElement => {
	const [loginIn,setLoginIn] = useState(false)
	getData('token').then(res=>{
		console.log(!!res);
		setLoginIn(!!res);
	})
	console.log("=====",loginIn);
	
	return (
		<NavigationContainer theme={navigatorTheme} >
			{!loginIn?<Stack.Navigator headerMode='none'>
				<Stack.Screen name="Login" component={SignIn} />
				<Stack.Screen name="SignUp" component={SignUp} />
				<Stack.Screen name="Main" component={HomeNavigator} />
			</Stack.Navigator>:<Stack.Navigator headerMode='none'>
				<Stack.Screen name="Main" component={HomeNavigator} />
			</Stack.Navigator>}
		</NavigationContainer>
	)
};

