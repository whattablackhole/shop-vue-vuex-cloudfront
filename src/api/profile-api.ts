import axios from 'axios';

import { API_PATHS } from '@/constants/api-paths';
import { CartItem } from '@/models/cart-item';

// TODO: ASK, same verb

interface FetchCartResponse {
	data: CartItem[];
}

const fetchCart = async (): Promise<FetchCartResponse> => {
	const mockedUserId =
		localStorage.getItem('user_id') ?? 'e91ff132-3cb2-4857-898f-d1b48a9a916d';
	const result = await axios.get(
		`${API_PATHS.cart}/api/profile/cart?userId=${mockedUserId}`,
		{
			headers: {
				Authorization: `Basic ${localStorage.getItem('authorization_token')}`,
			},
		}
	);
	return {
		data: result.data.data.cart.items.map((item: any) => {
			return { product: item.product, count: item.count } as CartItem;
		}),
	};
};

// add, remove - new items
const updateCart = (items: CartItem[]) => {
	const mockedUserId =
		localStorage.getItem('user_id') ?? 'e91ff132-3cb2-4857-898f-d1b48a9a916d';
	return axios.put(
		`${API_PATHS.cart}/api/profile/cart?userId=${mockedUserId}`,
		{ items },
		{
			headers: {
				Authorization: `Basic ${localStorage.getItem('authorization_token')}`,
			},
		}
	);
};

export const profileApi = {
	fetchCart,
	updateCart,
};
