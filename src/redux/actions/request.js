import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const url = '';

const createJWTTokenHeaders = async () => {
  const token = await AsyncStorage.getItem('accessToken');
  let headers = '';
  if (token) {
    headers = {
      Authorization: `Bearer ${token}`,
    };
  }

  return headers;
};

export const get = async path => {
  const headers = await createJWTTokenHeaders();
  const res = await axios.get(`${url}${path}`, {headers});
  return res.data;
};

export const post = async (path, body) => {
  const headers = await createJWTTokenHeaders();
  const res = await axios.post(`${url}${path}`, body, {headers});
  return res.data;
};

export const Delete = async path => {
  const headers = await createJWTTokenHeaders();
  const res = await axios.delete(`${url}${path}`, {headers});
  return res.data;
};

export const everyGet = async path => {
  const res = await axios.get(`${url}${path}`);
  return res.data;
};
