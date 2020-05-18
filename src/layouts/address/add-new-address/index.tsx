import React, { useContext } from 'react';
import { View } from 'react-native';
import {
	Button,
	Datepicker,
	Divider,
	Input,
	Layout,
	StyleService,
	useStyleSheet,
	CheckBox,
	Toggle,
	Text
} from '@ui-kitten/components';
import { EyeIcon, EyeOffIcon } from './extra/icons';
import { KeyboardAvoidingView } from './extra/3rd-party';
import { SelectShowcase } from "../../../scenes/components/select/select-showcase.component";
import I18n from '../../../I18n/I18n';
import { store } from '../../../reducer';
import { addAddress } from "../../../api/api";
export default ({ navigation }): React.ReactElement => {
	
	const styles = useStyleSheet(themedStyles);

	const state = useContext(store);
	const {dispatch} = state
	const [address, setAddress] = React.useState<string>('');
	const [benefit, setBenefit] = React.useState<string>('');
	const [city, setCity] = React.useState<any>(null);
	
	const useInputState = (initialValue = '') => {
		const [value, setValue] = React.useState(initialValue);
		return { value, onChangeText: setValue };
	};
	const multilineInputState = useInputState();
	const onAddButtonPress = (): void => {
		//dispatch({type:'ADD_ADDRESS',payload:})
		console.log(city);
		
		addAddress({city:city.value,address,benefit}).then(res=>{
			setCity(null);
			setAddress(null);
			setBenefit(null)
			dispatch({type:'SET_ADDRESSES',payload:res})
			navigation && navigation.goBack();
		}).catch(error=>{
			console.log(error.response);
			
		})
		
	};
	const [activeChecked, setActiveChecked] = React.useState(false);

	const onActiveCheckedChange = (isChecked) => {
		setActiveChecked(isChecked);
	};
console.log(state);

	return (
		<KeyboardAvoidingView style={styles.container}>
			<Layout
				style={styles.form}
				level='1'>
				
				<View style={[styles.item,styles.input]}>
					<Text
						appearance='hint'
					>
						{I18n.t('city')}
					</Text>
					<SelectShowcase

						{...{
							data: state.cites.map(item=>{
								return {text:I18n.t('city_'+item.name), value:item.url}
							}),
							onSelect: (e) => {
								setCity(e);
							},
							selectedOption: city
						}} />
				</View>

					
				<Input
					value = {address}
					onChangeText = {setAddress}
					style= {styles.input}
					placeholder={I18n.t('address')}
				/>
				<Input
					value = {benefit}
					onChangeText = {setBenefit}
					style= {styles.input}
					placeholder={I18n.t('benefit')}
					
				/>

			</Layout>
			<Divider />
			<Button
				style={styles.addButton}
				size='giant'
				onPress={onAddButtonPress}>
				{I18n.t('add_new_address')}
      </Button>
		</KeyboardAvoidingView>
	);
};

const themedStyles = StyleService.create({
	item: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		marginVertical: 10
	},
	container: {
		flex: 1,
		backgroundColor: 'background-basic-color-2',
	},
	form: {
		flex: 1,
		paddingHorizontal: 4,
		paddingVertical: 24,
	},
	input: {
		marginHorizontal: 12,
		marginVertical: 8,
	},
	middleContainer: {
		flexDirection: 'row',
	},
	middleInput: {
		width: 128,
	},
	addButton: {
		marginHorizontal: 16,
		marginVertical: 24,
	},
});
