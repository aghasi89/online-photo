import React, { useState, useContext } from 'react';
import { ListRenderItemInfo, StyleSheet, View } from 'react-native';
import {
	Divider,
	List,
	ListItem,
	Text,
	TopNavigation,
	TopNavigationAction,
	useTheme,
	Card,
	Button,

} from '@ui-kitten/components';
import { ThemedIcon } from '../../components/themed-icon.component';

import { ArrowIosBackIcon, ArrowIosForwardIcon, AssetAuthIcon, AssetAuthDarkIcon, CameraIcon } from '../../components/icons';
import { SafeAreaLayout } from '../../components/safe-area-layout.component';
import { WebBrowserService } from '../../services/web-browser.service';
import { Address } from './type';
import I18n from '../../I18n/I18n';
import { PlusIcon } from 'src/layouts/auth/sign-up-2/extra/icons';
import { store } from '../../reducer';

export const AddressScreen = ({ navigation }): React.ReactElement => {
	
	const theme = useTheme();
	const state = useContext(store);

	console.log(state);
	
	
	const renderBackAction = (): React.ReactElement => (
		<TopNavigationAction
			icon={ArrowIosBackIcon}
			onPress={navigation.goBack}
		/>
	);

	const renderForwardIcon = (style): React.ReactElement => (
		<ArrowIosForwardIcon
			{...style}
			width='24'
			height='24'
			fill={theme['text-hint-color']}
		/>
	);
	

	const renderItem = (info: ListRenderItemInfo<Address>): React.ReactElement => {
		const city  =  state.cites.filter(item=>{return item.url == info.item.city})[0].name;
		
		return (
		<Card
			style={styles.item}
		>
			<View style={styles.row}>
				<Text appearance='hint'>
					{`${I18n.t('benefit')} : `}
				</Text>
				<Text >
					{`${info.item.benefit}`}
				</Text>
			</View>
			
			<View style={styles.row}>
				<Text appearance='hint'>
					{`${I18n.t('address')} : `}
				</Text>
				<Text >
					{info.item.address}
				</Text>
			</View>
			<View style={styles.row}>
				<Text appearance='hint'>
					{`${I18n.t('city')} : `}
				</Text>
				<Text >
					{`${I18n.t('city_'+city)}`}
				</Text>
			</View>
		</Card>
	)};
	return (
		<SafeAreaLayout
			style={styles.safeArea}
			insets='top'>
			<TopNavigation
				title={I18n.t('history')}
				leftControl={renderBackAction()}
			/>
			<List
				contentContainerStyle={styles.listContent}
				data={state.address}
				renderItem={renderItem}
			/>
			<Button style={styles.button}   status='danger' 
			onPress = {()=>{
				navigation.navigate('NewAddress')
			}}
			>+</Button>

		</SafeAreaLayout>
	);
};

const styles = StyleSheet.create({
	row:{ 
		flexDirection: 'row' ,
		justifyContent:'space-between',
		marginVertical:2
	},
	button:{
		position:'absolute',
		bottom:5,
		right:5,
		height:50,
		width:50,
		borderRadius:25,
	},
	safeArea: {
		flex: 1,
	},
	headerTitle: {
		paddingHorizontal: 8,
	},
	headerDivider: {
		marginVertical: 8,
	},
	listContent: {
		padding: 8,
	},
	item: {
		marginVertical: 4,
		height: 110,
		flex: 1,
	},
});
