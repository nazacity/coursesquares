import React from 'react';
import {View, Text, FlatList} from 'react-native';
import ExpiredSmallCourseCard from '../../components/card/ExpiredSmallCourseCard';
import {COLORS, FONTS} from '../../constants';
import {expiriedCourses} from '../../constants/fakedata';
import LocalizationContext from '../LocalizationContext';

const ExpiriedCourseScreen = () => {
  const {t} = React.useContext(LocalizationContext);
  return (
    <View style={{flex: 1, backgroundColor: COLORS.backgroundColor}}>
      <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{padding: 20}}
        ItemSeparatorComponent={() => {
          return <View style={{margin: 10}} />;
        }}
        data={expiriedCourses}
        renderItem={({item}) => {
          return <ExpiredSmallCourseCard item={item} />;
        }}
      />
    </View>
  );
};

export default ExpiriedCourseScreen;
