import React from 'react';
import {View, Text, FlatList} from 'react-native';
import {COLORS, FONTS} from '../../constants';
import {courses} from '../../constants/fakedata';
import LocalizationContext from '../../screens/LocalizationContext';
import SellCourseCard from '../card/SellCourseCard';
import {useDispatch, useSelector} from 'react-redux';
import {fetchCourse} from '../../redux/actions/CourseAction';
import {useNavigation} from '@react-navigation/native';

const PopularCourse = () => {
  const {t} = React.useContext(LocalizationContext);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const fetchCourseAndNavigate = async () => {
    navigation.navigate('SellCourseDetail');
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.backgroundColor,
      }}>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{padding: 20}}
        ItemSeparatorComponent={() => {
          return <View style={{margin: 10}} />;
        }}
        data={courses}
        renderItem={({item}) => {
          return (
            <SellCourseCard item={item} onPress={fetchCourseAndNavigate} />
          );
        }}
      />
    </View>
  );
};

export default PopularCourse;
