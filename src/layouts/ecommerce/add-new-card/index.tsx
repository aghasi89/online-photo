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
import { Product } from '../shopping-cart/extra/data';
import { createOrder } from '../../../api/api';
export default (props): React.ReactElement => {
	console.log(props);
	
	const styles = useStyleSheet(themedStyles);
	const state = useContext(store);
	const [activeChecked, setActiveChecked] = React.useState(false);
	const [address, setAddress] = React.useState<any>(null);
	const [comment, setComment] = React.useState('');
	const [order,setOrder] = React.useState({
		address: null,
		order_status: null,
		delivery: false,
		comment: "",
	})
	
	const [groupImage,setGroupImage]= React.useState<Product[]>(props.route.params.products)
	
	const total = ()=>{
		let t = 0;
		for (let i = 0; i < groupImage.length; i++) {
			const element = groupImage[i];
			t+=element.totalPrice
		}
		return t;
	}
	
	const onAddButtonPress = (): void => {
		console.log(address,comment,groupImage);
		const sebdInfo = {
			order:{
				address:address.value,
				comment,
			},
			group_image:groupImage.filter(group=>group.images.length>0).map((group:any)=>{
				console.log("{{{{{{{{{{{{{{{{{{{{{{{{",group.amount,group.size.value,group.images);
				
				return  {quantity:group.amount, size:group.size.value,images:group.images.map(image=>image.imageID)}
			})
		}
		createOrder(sebdInfo).then((res)=>{
			console.log(res);
			props.navigation && props.navigation.popToTop();
		}).catch((error)=>{
console.log(error);

		})
		//
	};
	const onActiveCheckedChange = (isChecked) => {
		setActiveChecked(isChecked);
	};
	const dileveryCost= ()=>{
		let cost = 0;
		console.log(address);
		
		if(address && activeChecked){
			for (let i = 0; i < state.cites.length; i++) {
				const element = state.cites[i];
				console.log(element.url,address.city);
				
				if(element.url==address.city){
					return element.delivery_price
				}
			}
		}
		return cost 
	}
	return (
		<KeyboardAvoidingView style={styles.container}>
			<Layout
				style={styles.form}
				level='1'>
				<View style={[styles.item,styles.input]}>
					<Text
						appearance='hint'
					>
						{I18n.t('delivery')}
					</Text>
					<Toggle
						//style={styles.toggle}
						checked={activeChecked}
						onChange={onActiveCheckedChange}>
						
				</Toggle>
				</View>
				<View style={[styles.item,styles.input]}>
					<Text
						appearance='hint'
					>
						{I18n.t('address')}
					</Text>
					<SelectShowcase

						{...{
							data: state.address.map(item=>{
								return {text:`${item.address} , ${item.benefit}`, value:item.url,city:item.city}
							}),
							onSelect: (e) => {
								setAddress(e);
							},
							selectedOption: address,
							disabled:!activeChecked
						}} />
						<View style={{position:'absolute', flex:1, flexDirection:'row', right:0, bottom:-17}}>
						<Text
						appearance='hint'
						
						>
						{I18n.t('dilevery_cost')}
					</Text>
					<Text
						appearance='hint'
						category='b2'
						>
						{` ${dileveryCost()} ${I18n.t('amd')}`}
					</Text>
					</View>
				</View>

					
				<Input
				style= {[styles.input,{alignItems:'baseline',justifyContent:'flex-start',marginTop:20}]}
					multiline={true}
					numberOfLines={4}
					value={comment}
					onChangeText={setComment}
					placeholder={I18n.t('comment')}
				/>

			</Layout>
			<Divider />
			<Button
				style={styles.addButton}
				size='giant'
				onPress={onAddButtonPress}>
				  {`${I18n.t('checkout')} ${total()+dileveryCost()} ${I18n.t('amd')} `}
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
