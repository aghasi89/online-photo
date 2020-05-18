import axios from "axios";
const BASE_URL='http://annaniks.com:5060/api/'
import AsyncStorage from '@react-native-community/async-storage';
import FormData from 'form-data';

export const  getCites = async  ():Promise<any>=>{
	let cites = await axios.get(BASE_URL+'city/');
	return cites.data.results
}
export const  getSizes = async  ():Promise<any>=>{
	let sizes = await axios.get(BASE_URL+'size/');
	return sizes.data.results.map(item=>{
		console.log(item);
		
		return {text:item.label, value:item.url,price:item.price}
	})
}
const storeData = async (key,value) => {
	try {
	  await AsyncStorage.setItem(key,  JSON.stringify(value))
	} catch (e) {
	  // saving error
	}
  }
  export const getData = async (key) => {
	try {
	  const value = await AsyncStorage.getItem(key)
	  console.log(key,value);
	  
	  if(value !== null) {
		return JSON.parse(value)
	  }
	} catch(e) {
	  // error reading value
	  return null;
	}
	return null;
  }
export const  signup = async  (user:any):Promise<any>=>{
let recive = await axios.post(BASE_URL+'client/',{user});
	await storeData('user',recive.data)
	return recive.data
}

export const  signin = async  (data:any):Promise<any>=>{
	let signin = await axios.post(BASE_URL+'client-login/',data);
	await storeData('token',signin.data.access)
	return signin.data
}
export const  createOrder = async  (data:any):Promise<any>=>{
	
	try {
		const userId = (await getData('user')).id
	data.order.client = `${BASE_URL}client/${userId}/`
	console.log(";;;;;;;;;;;;",data);
	let sizes = await axios.post(BASE_URL+'client-create/order/',data);
	
	
	return sizes.data
	} catch (error) {
		console.log(error);
		return error
	}
}
export const  uploadPhoto = async  (data:any):Promise<any>=>{
	try {
		
		let sizes = await axios.post(BASE_URL+'image/',{path:data.data});
		console.log(sizes);
		return sizes.data
	} catch (error) {
		console.log(error);
		
	}
	
	
	
}
export const  getMe = async  ():Promise<any>=>{
	const token =  await getData('token');
	console.log(token);
	
	let me = await axios.get(BASE_URL+'client-get/me/',
	{ headers: { Authorization: `Bearer ${token}` }});
	await storeData('user',me.data.data)
	return me.data.data
} 

export const  getAddresses = async  ():Promise<any>=>{
	const userId = (await getData('user')).id
	let addresses = await axios.get(BASE_URL+'addresses/?client='+userId);

	return addresses.data.results
}
export const  getOrders = async  ():Promise<any>=>{
	const userId = (await getData('user')).id
	console.log(userId);
	
	let orders = await axios.get(BASE_URL+'order/?client='+userId);
	console.log(orders);
	
	return orders.data.results.map(res=>{
		
		
	const packages = res.group_image.map((elem)=>{
		return {size:elem.size_image_group.label, count:elem.images.length};
	})

		const amount=res.amount
	
const status=res.status?res.status.label:null
	return {...res,packages,status,amount}
	})

}
export const  getStatus = async  ():Promise<any>=>{
	const userId = (await getData('user')).id
	console.log(userId);
	
	let status = await axios.get(BASE_URL+'order/?client='+userId);
	console.log(status.data.results);
	
	return status.data.results.map(res=>{
		console.log(res);
		
	const status={status:res.status.label} 
	return status
	})

}
export const  addAddress = async  (date):Promise<any>=>{
	
	const client = (await getData('user'))
	console.log({...date,client:date.city.split('city')[0]+'client/'+client.id+'/'});
	
	const h = await axios.post(BASE_URL+'addresses/',{...date,client:date.city.split('city')[0]+'client/'+client.id+'/'});
	console.log(h.data);
	
	let addresses = await axios.get(BASE_URL+'addresses/');
	return addresses.data.results
}
