import React, { useState, useContext } from 'react';
import { ListRenderItemInfo } from 'react-native';
import { Button, Layout, List, StyleService, Text, useStyleSheet, Modal } from '@ui-kitten/components';
import { CartItem } from './extra/cart-item.component';
import { Product } from './extra/data';
import Gallery from 'react-native-image-gallery';
import { CloseIcon, RemoveIcon } from '../../../components/icons';
import I18n from "../../../I18n/I18n";

export default (navigation): React.ReactElement => {
  const styles = useStyleSheet(themedStyle);
  const [products, setProducts] = React.useState<Product[]>([new Product(0,null,0,0,[])]);

  const totalCost = (): number => {
    return products.reduce((acc: number, product: Product): number => acc + product.totalPrice, 0);
  };

  const onItemRemove = (product: Product, index: number): void => {
    products.splice(index, 1);
    setProducts([...products]);
  };

  const onItemChange = (product: Product, index: number): void => {
	products[index] = product;
	let b = products[0].images.length>0;
	if(b){
		setProducts([new Product(0,null,0,0,[]) ,...products]);
	}else
	setProducts([...products]);
  };
  
  const [galleryImagesIndex, setGalleryIndex] = useState(-1);
 const [index, setIndex] = useState(0);
  const renderFooter = (): React.ReactElement => (
    <Layout style={styles.footer}>
      <Text category='h5'>Total Cost:</Text>
      <Text category='h5'>{`$${totalCost()}`}</Text>
    </Layout>
  );
	const removeFromImages = ()=>{
		const product = products[galleryImagesIndex];
		product.images.splice(index,1);
		onItemChange(product,galleryImagesIndex)
	}
	const onChechoutActionPress = ()=>{
		navigation.navigate('SelectAddress',{products});
	}
	const onOpenGallery = (index:number)=>{
		setGalleryIndex(index)
	}
	
  const renderProductItem = (info: ListRenderItemInfo<Product>): React.ReactElement => (
    <CartItem
      style={styles.item}
      index={info.index}
      product={info.item}
      onProductChange={onItemChange}
	  onRemove={onItemRemove}
	  onOpenGallery= {onOpenGallery}
    />
  );
let gallery = null
 if(galleryImagesIndex>-1){
	const images = products[galleryImagesIndex].images.map(item=>({ source: { uri: item.path } }));
	console.log(products,galleryImagesIndex,images);
	
	gallery = <Gallery
	// sensitiveScroll={true}
	
	initialPage={0}
	images={images}
	onPageSelected={
		(index) => {
			setIndex(index)
		}
	}
	loadMinimal={true}
	loadMinimalSize={2}
/>
}
console.log(products);

  return (
    <Layout
      style={styles.container}
      level='2'>
      <List
        data={products}
        renderItem={renderProductItem}
        //ListFooterComponent={renderFooter}
      />
      <Button
        style={styles.checkoutButton}
        size='giant'
		onPress = {onChechoutActionPress}
		>
        {`${I18n.t('checkout')} ${totalCost()} ${I18n.t('amd')} `}
      </Button>
	  <Modal visible={galleryImagesIndex>-1}   backdropStyle={styles.backdrop}
        onBackdropPress={() => setGalleryIndex(-1)}>
			{gallery}
			<Button
				style={[styles.iconButton, styles.closeButton]}
				appearance='ghost'
				status='basic'
				icon={CloseIcon}
				onPress={() => setGalleryIndex(-1)}
			/>
			<Button
				style={[styles.iconButton, styles.removeButton]}
				appearance='ghost'
				status='basic'
				icon={RemoveIcon}
				onPress={() => removeFromImages()}
			/>
			</Modal>
    </Layout>
  );
};

const themedStyle = StyleService.create({
  container: {
    flex: 1,
  },
  iconButton: {
	paddingHorizontal: 0,
},
removeButton: {
	position: 'absolute',
	left: 0,
},
closeButton: {
	position: 'absolute',
	right: 0,
},
  item: {
    borderBottomWidth: 1,
    borderBottomColor: 'background-basic-color-3',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 0.5,
    paddingVertical: 28,
    paddingHorizontal: 16,
  },
  checkoutButton: {
    marginHorizontal: 16,
    marginVertical: 24,
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});

