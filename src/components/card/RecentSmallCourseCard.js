import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {COLORS, FONTS, SHADOW, SIZES} from '../../constants';
import dayjs from 'dayjs';
import 'dayjs/locale/th';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const RecentSmallCourseCard = ({item, onPress}) => {
  dayjs.locale('th');
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={[
        {
          width: SIZES.width - 40,

          backgroundColor: COLORS.white,
          borderRadius: 5,
        },
        SHADOW.default,
      ]}>
      <View
        style={{flexDirection: 'row', alignItems: 'center', paddingRight: 20}}>
        <Image
          source={{uri: item.image}}
          style={{
            width: 100,
            height: 100,
            resizeMode: 'cover',
            borderTopLeftRadius: 5,
            borderBottomLeftRadius: 5,
          }}
        />
        <View style={{flex: 1, padding: 10}}>
          <Text style={[FONTS.h2, {color: COLORS.secondary}]}>
            {item.title}
          </Text>

          <Text style={[FONTS.body2, {color: COLORS.thirdary}]}>
            Lecture10: whatever lecture
          </Text>
        </View>
        <View
          style={[
            {
              backgroundColor: COLORS.primary,
              width: 40,
              height: 40,
              borderRadius: 100,
              alignItems: 'center',
              justifyContent: 'center',
            },
            SHADOW.default,
          ]}>
          <FontAwesome
            name="play"
            size={18}
            color={COLORS.white}
            style={{marginLeft: 3}}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default RecentSmallCourseCard;
