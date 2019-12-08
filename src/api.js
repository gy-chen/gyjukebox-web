import axios from 'axios';

const instance = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL
});

export const PAGING_SIZE = 20;

export const setAuthorizationToken = token => instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;

export const search = async (q, offset = 0) => {
    const rv = await instance.get('/search', { params: { q, offset } });
    return rv.data;
};