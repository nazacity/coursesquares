import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {COLORS, FONTS, SHADOW, SIZES} from '../../constants';
import dayjs from 'dayjs';
import 'dayjs/locale/th';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const RecentLargeCourseCard = ({item, onPress}) => {
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
      <View style={{flexDirection: 'row', alignItems: 'center', padding: 20}}>
        <View style={{flex: 1}}>
          <Text style={[FONTS.h2, {color: COLORS.secondary}]}>
            {item.title}
          </Text>
          <Text style={[FONTS.body2, {color: COLORS.thirdary}]}>
            Lecture 12: what lesson
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

export default RecentLargeCourseCard;
