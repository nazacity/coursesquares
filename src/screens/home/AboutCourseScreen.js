import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {useSelector} from 'react-redux';
import BackButton from '../../components/layout/BackButton';
import {COLORS, FONTS, SIZES} from '../../constants';

const AboutCourseScreen = () => {
  const course = useSelector(state => state.course);
  return (
    <SafeAreaView style={Styles.safeAreaView}>
      <BackButton />
      <Image source={{uri: course.image}} style={Styles.image} />
      <ScrollView style={Styles.padding20} showsVerticalScrollIndicator={false}>
        <View>
          <Text style={[FONTS.h1, {color: COLORS.secondary}]}>
            {course.title}
          </Text>
        </View>
        <View style={Styles.marginVertical10}>
          <Text style={[FONTS.h3, {color: COLORS.primary}]}>
            โดย: {course?.author?.name}
          </Text>
        </View>
        <View style={Styles.marginBottom10}>
          <Text style={[FONTS.h3, {color: COLORS.secondary}]}>
            เกี่ยวกับคอร์ส
          </Text>
          <Text style={[FONTS.body3, {color: COLORS.secondary}]}>
            {course.about}
          </Text>
        </View>
        <View style={Styles.marginBottom10}>
          <Text style={[FONTS.h3, {color: COLORS.secondary}]}>
            คอร์สเหมาะสำหรับ
          </Text>
          <Text style={[FONTS.body3, {color: COLORS.secondary}]}>
            {course.suit}
          </Text>
        </View>
        <View>
          <Text style={[FONTS.h3, {color: COLORS.secondary}]}>
            สิ่งที่ได้จากคอร์สนี้
          </Text>
          <Text style={[FONTS.body3, {color: COLORS.secondary}]}>
            {course.skill}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const Styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: COLORS.backgroundColor,
  },
  image: {
    width: SIZES.width,
    height: 200,
  },
  padding20: {
    padding: 20,
  },
  marginVertical10: {
    marginVertical: 10,
  },
  marginBottom10: {
    marginBottom: 10,
  },
});

export default AboutCourseScreen;
