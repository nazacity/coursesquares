import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {COLORS, FONTS} from '../../constants';

const CategoryChip = ({item}) => {
  const [select, setSelect] = useState(false);

  const handleSelect = () => {
    setSelect(!select);
  };
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={handleSelect}
      style={{
        backgroundColor: select ? COLORS.primary : COLORS.secondary,
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginRight: 10,
        borderRadius: 5,
      }}>
      <Text style={[FONTS.h3, {color: COLORS.white}]}>{item.title}</Text>
    </TouchableOpacity>
  );
};

export default CategoryChip;
