import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {COLORS} from '../../constants';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';

const ShareButton = ({backTo, top}) => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        borderRadius: 50,
        width: 30,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <TouchableOpacity activeOpacity={0.8} onPress={() => {}}>
        <FontAwesome name="share-alt" size={20} color={COLORS.white} />
      </TouchableOpacity>
    </View>
  );
};

export default ShareButton;
