import React from 'react';
import {View, Text, FlatList} from 'react-native';
import {COLORS, FONTS} from '../../constants';
import {courses} from '../../constants/fakedata';
import SellCourseCard from '../card/SellCourseCard';
import PopularCourse from './PopularCourse';
import {useDispatch, useSelector} from 'react-redux';
import {fetchCourse} from '../../redux/actions/CourseAction';
import LocalizationContext from '../../screens/LocalizationContext';
import {useNavigation} from '@react-navigation/native';

const InterestingCourse = ({header}) => {
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
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => {
          return <View style={{margin: 10}} />;
        }}
        ListHeaderComponent={header()}
        ListFooterComponent={() => <View style={{margin: 10}} />}
        data={courses}
        renderItem={({item}) => {
          return (
            <View style={{paddingHorizontal: 20}}>
              <SellCourseCard item={item} onPress={fetchCourseAndNavigate} />
            </View>
          );
        }}
      />
    </View>
  );
};

export default InterestingCourse;
