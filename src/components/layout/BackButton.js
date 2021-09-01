import React from 'react';
import {View, TouchableOpacity, Platform} from 'react-native';
import {COLORS} from '../../constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';

const BackButton = ({backTo, top}) => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        position: 'absolute',
        top: top ? top : Platform.OS === 'ios' ? 40 : 20,
        left: 10,
        zIndex: 100,
        backgroundColor: COLORS.backButtonColor,
        borderRadius: 50,
        width: 30,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          if (backTo) {
            navigation.replace(backTo);
          } else {
            navigation.goBack();
          }
        }}>
        <Ionicons
          name="ios-chevron-back"
          size={20}
          color={COLORS.white}
          style={{marginLeft: -3, marginTop: -1}}
        />
      </TouchableOpacity>
    </View>
  );
};

export default BackButton;
