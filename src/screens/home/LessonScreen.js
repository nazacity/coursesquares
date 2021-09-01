import React from 'react';
import {View, Text, TouchableOpacity, FlatList, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {COLORS, FONTS, SHADOW} from '../../constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {fetchLectureInfo} from '../../redux/actions/CourseAction';

const LessonScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const course = useSelector(state => state.course.course);
  const navigateToCoursePlayerScreen = item => {
    dispatch(
      fetchLectureInfo({
        courseId: course.id,
        lectureId: item.lecId,
      }),
    );
    navigation.navigate('CoursePlayer');
  };

  const lessonCard = ({item, index}) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          // navigation.navigate('CoursePlayer');
          console.log({item, index});
          navigateToCoursePlayerScreen(item, index);
        }}
        style={[SHADOW.default, Styles.touchableOpacity]}>
        <View style={Styles.viewTextTitle}>
          <Text style={[FONTS.h3, {color: COLORS.secondary}]}>
            บทที่ {index + 1}: {item.title}
          </Text>
        </View>
        <View style={Styles.viewIonicons}>
          <Ionicons
            name="ios-chevron-forward-outline"
            size={20}
            color={COLORS.secondary}
          />
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View style={Styles.viewFlatList}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={course.lessons}
        contentContainerStyle={{padding: 20}}
        renderItem={lessonCard}
        ItemSeparatorComponent={() => <View style={Styles.margin10} />}
      />
    </View>
  );
};

const Styles = StyleSheet.create({
  touchableOpacity: {
    backgroundColor: COLORS.white,
    borderRadius: 5,
    padding: 20,
    flexDirection: 'row',
  },
  viewTextTitle: {
    flex: 1,
  },
  viewIonicons: {
    borderLeftColor: COLORS.backButtonColor,
    borderLeftWidth: 2,
    paddingLeft: 30,
  },
  viewFlatList: {
    flex: 1,
    backgroundColor: COLORS.backgroundColor,
  },
  listViewItemsOther: {
    marginVertical: 20,
  },
  margin10: {
    margin: 10,
  },
});

export default LessonScreen;
