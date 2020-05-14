import React, { createContext, useReducer } from 'react';
export const initialState: IStore = {

	address: [],
	cites: [],
	history: [],
	userInfo: {
		id: 1,
		name: 'aghas',
		email: 'aghasi89@gmail.com',
		avatar: ''
	},
	sizes: []
	
};
export interface IStore {
	address: any[],
	cites: any[],
	history: History[],
	userInfo: {
		id: number,
		name: string,
		email: string,
		avatar: string
	},
	sizes: any[]
}

const store = createContext(initialState);
const { Provider } = store;

const StateProvider = ({ children }) => {
	console.log(';;;;');

	const [state, dispatch] = useReducer((state, action) => {
		console.log(state,action);
		switch (action.type) {
			case 'SET_ALL_DATA':
				return { ...state, ...action.payload };
			case 'SET_ADDRESSES':
				return { ...state, address: [...action.payload] };
			case 'SET_CITES':
				console.log({ ...state, cites: [...action.payload] });
				
				return { ...state, cites: [...action.payload] };
			case 'SET_ORDERS':
				return { ...state, history: [...action.payload] };
			case 'SET_SIZES':
				return { ...state, sizes: [...action.payload] }
			default:
				return initialState;
		};
	}, initialState);

	return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StateProvider }