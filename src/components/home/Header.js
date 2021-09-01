import React from 'react';
import {View, Text} from 'react-native';
import {COLORS, FONTS} from '../../constants';
import LocalizationContext from '../../screens/LocalizationContext';

const Header = ({title, renderLeft}) => {
  const {t} = React.useContext(LocalizationContext);
  return (
    <View
      style={{
        backgroundColor: COLORS.white,
        padding: 20,
      }}>
      {renderLeft && renderLeft()}
      <Text style={{...FONTS.h2, color: COLORS.secondary, textAlign: 'center'}}>
        {title}
      </Text>
    </View>
  );
};

export default Header;
