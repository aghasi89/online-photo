import React, { useState, useContext } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Button, ListItem, ListItemProps, Text, Avatar } from '@ui-kitten/components';
import { CloseIcon, MinusIcon, PlusIcon } from './icons';
import { Product } from './data';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ImagePicker from 'react-native-image-crop-picker';
import { SelectShowcase } from '../../../../scenes/components/select/select-showcase.component';
import { ProfileAvatar } from '../../../../layouts/social/profile-settings-3/extra/profile-avatar.component';
import { CameraIcon } from '../../../../layouts/social/profile-settings-3/extra/icons';
import I18n from "../../../../I18n/I18n";
import { store } from '../../../../reducer';
import { uploadPhoto } from '../../../../api/api';
export type CartItemProps = ListItemProps & {
	index: number;
	product: Product;
	onProductChange: (product: Product, index: number) => void;
	onRemove: (product: Product, index: number) => void;
	onOpenGallery: (index: number) => void;
};
const options = {
	allowsEditing: true,

	title: 'Select Avatar',
	customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
	storageOptions: {
		skipBackup: true,
		path: 'images',
	},
};

export const CartItem = (props: CartItemProps): React.ReactElement => {
	const state = useContext(store);

	const { style, product, index, onProductChange,onOpenGallery, onRemove, ...listItemProps } = props;
	
	const decrementButtonEnabled = (): boolean => {
		return product.amount > 1;
	};
	const [size, setSize] = useState();
	const [avatarSource, setImage] = useState([]);
	const [isOpen, setIsOpen] = useState(false);
	const onRemoveButtonPress = (): void => {
		onRemove(product, index);
	};

	const onMinusButtonPress = (): void => {
		product.amount--;
		onProductChange(product, index);
	};
	const onOpenPicker = ()=>{
		setIsOpen(true)
		ImagePicker.openPicker({
			multiple: true,
			width: 300,
			height: 400,
			cropping: true,
			includeBase64:true
		}).then((image: any[]) => {
			setIsOpen(true)
			product.images= [...product.images,...image]
			uploadPhoto(image[0]) //////   comment for Anna, bdi upload exnin zangvatsov es nkarnery
			if(product.amount==0){
				product.amount = 1;
			}
			onProductChange(product, index);
			//setImage(image)
		});
	}
	const renderPhotoButton = (): React.ReactElement => (
		<Button
		  style={styles.photoButton}
		  status='basic'
		  icon={CameraIcon}
		  onPress={onOpenPicker}
		/>
	  );
	const onPlusButtonPress = (): void => {
		product.amount++;
		onProductChange(product, index);
	};
	console.log(product.size);
	
	return (
		<ListItem
			{...listItemProps}
			style={[styles.container, style]}>
			<TouchableOpacity onPress={() => {
				setTimeout(()=>{
					if(isOpen) return
					if(product.images.length==0){
						onOpenPicker()
					}else{
						onOpenGallery(index)
					}
				},200)
				
			}}>
				<ProfileAvatar
					style={styles.image}
					source={{ uri: product.images[0]?product.images[0].path:null }}
					editButton={renderPhotoButton}
				/>
				{product.images.length>1?<Text style={styles.pluse_count} category='p2' >{`+${product.images.length-1} ${I18n.t('pluse_images')}`}</Text>:null}
			</TouchableOpacity>
			<View style={styles.detailsContainer}>
				<View style={[styles.item]}>
					<Text
						appearance='hint'
						category='p1'
						style={{marginRight:20}}
					>
						{`${I18n.t('size')}`}
					</Text>
					<SelectShowcase
						{...{
							data: state.sizes,
							onSelect: (e:any) => {
								product.price = e.price;
								product.size = e
								onProductChange(product,index)
								setSize(e)
							},
							style:{...{width:125}},
							selectedOption: {...product.size}
							
						}}
						 />
				</View><View style={styles.item}>
				<Text
					appearance='hint'
					category='p1'
					style={{marginRight:20}}
					>
					{I18n.t('price')}						
				</Text>
				<Text category='s1'>
					{product.formattedPrice}
				</Text>
				</View>
				<View style={styles.amountContainer}>
					<Button
						style={[styles.iconButton, styles.amountButton]}
						size='tiny'
						icon={MinusIcon}
						onPress={onMinusButtonPress}
						disabled={!decrementButtonEnabled()}
					/>
					<Text
						style={styles.amount}
						category='s2'>
						{`${product.amount}`}
					</Text>
					<Button
						style={[styles.iconButton, styles.amountButton]}
						size='tiny'
						icon={PlusIcon}
						onPress={onPlusButtonPress}
					/>
					<Text
					appearance="hint"
						category='s2'
						style={{marginLeft:20}}>
						{I18n.t('copy')}
					</Text>
				</View>
			</View>
			{product.images.length>0?<Button
				style={[styles.iconButton, styles.removeButton]}
				appearance='ghost'
				status='basic'
				icon={CloseIcon}
				onPress={onRemoveButtonPress}
			/>:null}
		</ListItem>
	);
};

const styles = StyleSheet.create({
	container: {
		alignItems: 'flex-start',
		paddingHorizontal: 0,
		paddingVertical: 0,
		height:160,
	},
	item: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'flex-start',
		marginVertical: 10,
		marginHorizontal:5,
		width:'70%'
	},
	photoButton: {
		right: 5,
		top: 5,
		width: 48,
		height: 48,
		borderRadius: 24,
	  },
	  pluse_count:{
		color:'#FFF',
		alignItems:'center',
		backgroundColor:'#000000AA',
		justifyContent:'center',
		position:'absolute',
		bottom:20,
		textAlign:'center',
		width:120,
		paddingVertical:5
	  },
	  photo: {
		alignSelf: 'center',
		width: 120,
		height: 120,
		borderRadius: 16,
	  },
	image: {
		width: 120,
		height: 120,
		borderRadius:0,
		borderColor:'#0005',
	},
	detailsContainer: {
		flex: 1,
		height: '100%',
		padding: 16,
	},
	amountContainer: {
		position: 'absolute',
		flexDirection: 'row',
		left: 16,
		bottom: 16,
	},
	amountButton: {
		borderRadius: 16,
	},
	amount: {
		textAlign: 'center',
		width: 40,
	},
	removeButton: {
		position: 'absolute',
		right: 0,
	},
	iconButton: {
		paddingHorizontal: 0,
	},
});
