import React from 'react';
import {View, Text, ImageBackground} from 'react-native';
import {COLORS, FONTS, SIZES} from '../../constants';
import BackButton2 from '../layout/BackButton2';
import ShareButton from '../layout/ShareButton';
import dayjs from 'dayjs';
import 'dayjs/locale/th';
import LinearGradient from 'react-native-linear-gradient';

const CourseHeader = props => {
  dayjs.locale('th');

  const {item: course} = props;
  return (
    <ImageBackground
      source={{uri: course.image}}
      style={{width: SIZES.width, height: 200, padding: 20}}
      resizeMode="cover">
      <LinearGradient
        colors={['rgba(0,0,0,0.5)', 'rgba(0,0,0,0.5)', 'rgba(0,0,0,1)']}
        start={{x: 0, y: 1}}
        end={{x: 1, y: 1}}
        useAngle
        angle={180}
        style={{
          flex: 1,
          left: 0,
          top: 0,
          width: SIZES.width,
          height: 200,
          position: 'absolute',
        }}
      />
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <BackButton2 />
        <View style={{flex: 1}}>
          <Text style={[FONTS.h2, {color: COLORS.white, textAlign: 'center'}]}>
            คอร์สเรียน
          </Text>
        </View>
        <ShareButton />
      </View>
      <View style={{height: 100}}>
        <Text style={[FONTS.h1, {color: COLORS.white, textAlign: 'center'}]}>
          {course.title}
        </Text>
      </View>
      <View style={{flexDirection: 'row'}}>
        <View style={{flex: 1}}>
          <Text style={[FONTS.h1, {color: COLORS.white, textAlign: 'center'}]}>
            {course?.author?.name || ''}
          </Text>
          <Text
            style={[FONTS.body2, {color: COLORS.white, textAlign: 'center'}]}>
            ผู้สอน
          </Text>
        </View>
        <View style={{flex: 1}}>
          <Text style={[FONTS.h1, {color: COLORS.white, textAlign: 'center'}]}>
            {(course.totalMins / 60).toFixed(0)}ชม.{course.totalMins % 60} น.
          </Text>
          <Text
            style={[FONTS.body2, {color: COLORS.white, textAlign: 'center'}]}>
            ความยาวคอร์ส
          </Text>
        </View>
        <View style={{flex: 1}}>
          <Text style={[FONTS.h1, {color: COLORS.white, textAlign: 'center'}]}>
            {dayjs(course.expiriedDate).format('DD MMM YYYY')}
          </Text>
          <Text
            style={[FONTS.body2, {color: COLORS.white, textAlign: 'center'}]}>
            เรียนได้ถึง
          </Text>
        </View>
      </View>
    </ImageBackground>
  );
};

export default CourseHeader;
