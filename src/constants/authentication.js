import AsyncStorage from '@react-native-async-storage/async-storage';
import jwtDecode from 'jwt-decode';

export const setAuthToken = async token => {
  await AsyncStorage.setItem('accessToken', token);
  return getAuthToken();
};

export const getAuthToken = async () => {
  const token = {};
  if (await AsyncStorage.getItem('accessToken')) {
    token.key = 'Authorization';
    token.value = `Bearer ${await AsyncStorage.getItem('accessToken')}`;
  }

  return token;
};

export const getAuthDecode = async () => {
  const token = await AsyncStorage.getItem('accessToken');
  return token ? jwtDecode(token) : null;
};
