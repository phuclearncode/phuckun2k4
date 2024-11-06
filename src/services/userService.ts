import axios from 'axios';
import { UserData } from '../types/user.types';

const BASE_URL = 'http://localhost:8080/api/v1/user';

export const getUsers = async () => {
    const response = await axios.get(`${BASE_URL}/get-all-users`);
    return response.data;
}

export const getUserById = async (id: number) => {
    const response = await axios.get(`${BASE_URL}/${id}/get-by-id`);
    return response.data;
};

export const createUser = async (userData: UserData) => {
    const response = await axios.post(`${BASE_URL}/add-user`, userData);
    return response.data;
};

export const updateUser = async (id: number, userData: UserData) => {
    const response = await axios.put(`${BASE_URL}/${id}/update-user`, userData);
    return response.data;
};

export const deleteUser = async (id: number) => {
    await axios.delete(`${BASE_URL}/${id}/delete-user`);
};