import axios from 'axios';

export const api = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL
});

export const getRollups = async() =>{
    let url = `/get_rollups_by_coin`

    return api.get(url)
}

export const getTransactions = async() =>{
    let url = `/transactions`

    return api.get(url)
}

export const postTransactions = async() =>{
    let url = `/transactions`

    return api.post(url)
}

export const createSession = async (email, password) =>{
    return api.post('/login', {email, password});
};