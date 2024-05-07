const BASE_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3001';

export const getAllPromos = () => {
	return fetch(`${BASE_URL}/all`)
		.then(response => response.json())
		.then(data => data);
}

export const getAlkostoPromos = () => {
	return fetch(`${BASE_URL}/alkosto`)
		.then(response => response.json())
		.then(data => data);
} 

export const getJumboPromos = () => {
	return fetch(`${BASE_URL}/jumbo`)
		.then(response => response.json())
		.then(data => data);
} 