import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Snackbar} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {COLORS, FONTS} from '../../constants';
import {setSnackbarDismiss} from '../../redux/actions/AppStateAction';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const SnackbarNotification = () => {
  const snackbar = useSelector(state => state.appState.snackbar);
  const dispatch = useDispatch();
  const onDismissSnackBar = () => {
    dispatch(setSnackbarDismiss());
  };
  return (
    <Snackbar
      visible={snackbar.display}
      onDismiss={onDismissSnackBar}
      wrapperStyle={{
        top: 40,
      }}
      style={{
        backgroundColor: COLORS.white,
        margin: 20,
        alignItems: 'center',
        justifyContent: 'center',
      }}
      duration={2500}>
      {snackbar.state === 'error' && (
        <FontAwesome5 name="ban" color={COLORS.error} size={20} />
      )}
      {snackbar.state === 'succeeded' && (
        <FontAwesome5 name="check" color={COLORS.success} size={20} />
      )}
      <Text style={{...FONTS.body2, color: COLORS.secondary}}>
        {snackbar.message}
      </Text>
    </Snackbar>
  );
};

export default SnackbarNotification;
