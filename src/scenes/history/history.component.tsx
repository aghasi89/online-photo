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

} from '@ui-kitten/components';
import { ThemedIcon } from '../../components/themed-icon.component';
import { store } from '../../reducer';

import { ArrowIosBackIcon, ArrowIosForwardIcon, AssetAuthIcon, AssetAuthDarkIcon, CameraIcon } from '../../components/icons';
import { SafeAreaLayout } from '../../components/safe-area-layout.component';
import { WebBrowserService } from '../../services/web-browser.service';
import { History } from './type';
import I18n from '../../I18n/I18n';

export const HistoryScreen = ({ navigation }): React.ReactElement => {
	const state = useContext(store);

	const theme = useTheme();
	const renderBackAction = (): React.ReactElement => (
		<TopNavigationAction
			icon={ArrowIosBackIcon}
			onPress={navigation.goBack}
		/>
	);


	const calculateCount = (item:History)=>{
		console.log("====================",item.packages);
		
		let count = 0;
		for (let i = 0; i < item.packages.length; i++) {
			const element = item.packages[i];
			count+=element.count;
		}
		return count;
	}

	const renderItem = (info: ListRenderItemInfo<History>): React.ReactElement => (
		
		<Card
			style={styles.item}
		>
			<View style={[styles.row]}>
				{info.item.status?<Text >
					{`${I18n.t('status_'+info.item.status)}`}
				</Text>:
				<Text >
				No status
				</Text>}
				
				<Text category='h4' >
					{`${info.item.amount} ${I18n.t('amd')}`}
				</Text>
			</View>
			<Divider/>
			<View style={styles.row}>
				<Text appearance='hint'>
					{`${I18n.t('number_of_order')} : `}
				</Text>
				<Text >
					{`${info.item.id}`}
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
					{`${I18n.t('count')} : `}
				</Text>
				<Text >
					{`${calculateCount(info.item)}`}
				</Text>
			</View>
			<View style={[styles.row,{height:60}]}>
				<Text  appearance='hint'>
					{`${I18n.t('comment')} : `}
				</Text>
				<Text style={{flex:1, textAlign:'left'}} numberOfLines={3} >
					{`${info.item.comment}`}
				</Text>
			</View>

		</Card>
	);
	
	
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
				data={state.history}
				renderItem={renderItem}
			/>
		</SafeAreaLayout>
	);
};

const styles = StyleSheet.create({
	row:{ 
		flexDirection: 'row' ,
		justifyContent:'space-between',
		marginVertical:2
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
		height: 200,
		flex: 1,
	},
});
