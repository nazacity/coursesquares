import React from 'react';
import {View, ActivityIndicator} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import {COLORS, SIZES} from '../../constants';
import {useSelector} from 'react-redux';

const LoadingPage = () => {
  const isLoading = useSelector(state => state.appState.isLoading);
  return (
    <Spinner
      visible={isLoading}
      animation="fade"
      customIndicator={
        <View
          style={{
            backgroundColor: COLORS.backgroundColor,
            padding: 20,
            borderRadius: 10,
            flex: 1,
            width: SIZES.width,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ActivityIndicator color={COLORS.primary} size={30} />
        </View>
      }
    />
  );
};

export default LoadingPage;
