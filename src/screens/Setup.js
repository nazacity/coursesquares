import React, {useState, useEffect} from 'react';

// Redux
import {useSelector, useDispatch} from 'react-redux';
import {setLoading, setTh, setEn} from '../redux/actions/AppStateAction';

// Translations
import i18n from 'i18n-js';
import '../translations';
import LocalizationContext from './LocalizationContext';

// Screen
import {MainTabScreen, UnauthorizedTabScreen} from './Navigator';

// Navigation
import {NavigationContainer} from '@react-navigation/native';
import SnackbarNotification from '../components/snackbar/SnackbarNotification';
import {StatusBar} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Orientation from 'react-native-orientation-locker';

export default function App() {
  const locale = useSelector(state => state.appState.lang);
  const isSignedIn = useSelector(state => state.appState.isSignedIn);
  const dispatch = useDispatch();
  const localizationContext = React.useMemo(
    () => ({
      t: (scope, options) => i18n.t(scope, {locale, ...options}),
    }),
    [locale],
  );
  const setLang = async () => {
    const lang = await AsyncStorage.getItem('lang');
    if (lang === 'th') {
      dispatch(setTh());
    } else if (lang === 'en') {
      dispatch(setEn());
    }
  };

  useEffect(() => {
    setLang();
  }, []);

  return (
    <LocalizationContext.Provider value={localizationContext}>
      <SnackbarNotification />
      <NavigationContainer>
        {isSignedIn ? <MainTabScreen /> : <UnauthorizedTabScreen />}
      </NavigationContainer>
    </LocalizationContext.Provider>
  );
}
