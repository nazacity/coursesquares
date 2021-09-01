import React from 'react';
import {View, SafeAreaView, FlatList, Text} from 'react-native';
import Header from '../../components/home/Header';
import {COLORS, FONTS} from '../../constants';
import LocalizationContext from '../LocalizationContext';
import {courses} from '../../constants/fakedata';
import RecentSmallCourseCard from '../../components/card/RecentSmallCourseCard';
import RecentLargeCourseCard from '../../components/card/RecentLargeCourseCard';

const CourseScreen = () => {
  const {t} = React.useContext(LocalizationContext);
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.backgroundColor}}>
      <Header title={t('course.recentcourse')} />
      <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{padding: 20}}
        ItemSeparatorComponent={() => {
          return <View style={{margin: 10}} />;
        }}
        ListHeaderComponent={() => {
          return (
            <>
              <View style={{marginBottom: 20}}>
                <Text style={[FONTS.h2, {color: COLORS.thirdary}]}>
                  {t('recentcourse.recentcourse')}
                </Text>
              </View>
              <RecentLargeCourseCard item={courses[0]} />
              <View
                style={{
                  height: 2,
                  backgroundColor: COLORS.thirdary,
                  marginTop: 20,
                  opacity: 0.2,
                }}
              />
              <View style={{marginVertical: 20}}>
                <Text style={[FONTS.h2, {color: COLORS.thirdary}]}>
                  {t('recentcourse.unfinishedcourse')}
                </Text>
              </View>
            </>
          );
        }}
        data={courses}
        renderItem={({item}) => {
          return <RecentSmallCourseCard item={item} />;
        }}
      />
    </SafeAreaView>
  );
};

export default CourseScreen;
