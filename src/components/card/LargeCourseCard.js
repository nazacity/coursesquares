import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {COLORS, FONTS, SHADOW, SIZES} from '../../constants';
import * as Progress from 'react-native-progress';
import dayjs from 'dayjs';
import 'dayjs/locale/th';
import {letfTime} from '../../util/time';

const LargeCourseCard = ({item, onPress}) => {
  dayjs.locale('th');
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={[
        {
          width: SIZES.width - 40,
          backgroundColor: COLORS.white,
          borderRadius: 5,
          paddingBottom: 10,
        },
        SHADOW.default,
      ]}>
      <View>
        <Image
          source={{uri: item.image}}
          style={{
            width: SIZES.width - 40,
            height: 150,
            resizeMode: 'cover',
            borderTopLeftRadius: 5,
            borderTopRightRadius: 5,
          }}
        />
      </View>
      <View style={{flex: 1, padding: 10}}>
        <Text style={[FONTS.h2, {color: COLORS.secondary}]}>{item.title}</Text>
        <View style={{flexDirection: 'row', alignItems: 'center', flex: 1}}>
          <Progress.Bar
            progress={item.percentage / 100}
            width={SIZES.width - 220}
            color={COLORS.primary}
            borderWidth={0}
            unfilledColor={COLORS.lightGray}
            height={10}
          />
          <Text style={[FONTS.h3, {color: COLORS.primary, marginLeft: 10}]}>
            {item.percentage}%
          </Text>
        </View>
        <Text style={[FONTS.body2, {color: COLORS.thirdary}]}>
          ผู้สอน: {item.author}
        </Text>
      </View>
      <View style={{flexDirection: 'row', flex: 1, alignItems: 'center'}}>
        <View style={{flex: 1, alignItems: 'center'}}>
          <Text style={[FONTS.h4, {color: COLORS.secondary}]}>
            เหลือเวลาเรียน {letfTime(item.expiriedDate)} วัน
          </Text>
        </View>
        <View style={{flex: 1, alignItems: 'center'}}>
          <Text style={[FONTS.h4, {color: COLORS.secondary}]}>
            เรียนได้ถึง: {dayjs(item.expiriedDate).format('D MMM YY')}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default LargeCourseCard;
