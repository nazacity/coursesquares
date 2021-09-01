import React, {useEffect} from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/lib/integration/react';

import {persistor, store} from './src/redux/store';

// SetUp
import Setup from './src/screens/Setup';
import SplashScreen from 'react-native-splash-screen';

import LoadingPage from './src/components/layout/LoadingPage';

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <LoadingPage />
        <Setup />
      </PersistGate>
    </Provider>
  );
};

export default App;
