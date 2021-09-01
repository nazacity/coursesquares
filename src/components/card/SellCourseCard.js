import React, {useState} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {COLORS, FONTS, SHADOW, SIZES} from '../../constants';
import dayjs from 'dayjs';
import 'dayjs/locale/th';
import {letfTime} from '../../util/time';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const SellCourseCard = ({item, onPress}) => {
  dayjs.locale('th');
  const [favorite, setFavorite] = useState(false);

  const handleFavorite = () => {
    setFavorite(!favorite);
  };
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={[
        {
          width: SIZES.width - 40,
          height: 150,
          backgroundColor: COLORS.white,
          borderRadius: 5,
        },
        SHADOW.default,
      ]}>
      <TouchableOpacity
        activeOpacity={0.8}
        style={{
          position: 'absolute',
          top: 10,
          right: 10,
          zIndex: 10,
          width: 40,
          height: 40,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={handleFavorite}>
        {favorite ? (
          <FontAwesome name="star" color={COLORS.primary} size={24} />
        ) : (
          <FontAwesome name="star-o" color={COLORS.primary} size={24} />
        )}
      </TouchableOpacity>
      <View style={{flexDirection: 'row'}}>
        <Image
          source={{uri: item.image}}
          style={{
            width: 100,
            height: 100,
            resizeMode: 'cover',
            borderTopLeftRadius: 5,
          }}
        />
        <View style={{flex: 1, padding: 10}}>
          <Text style={[FONTS.h2, {color: COLORS.secondary}]}>
            {item.title}
          </Text>

          <Text style={[FONTS.body2, {color: COLORS.thirdary}]}>
            ผู้สอน: {item.author}
          </Text>
        </View>
      </View>
      <View style={{flexDirection: 'row', flex: 1}}>
        <View
          style={{flex: 1, justifyContent: 'center', paddingHorizontal: 20}}>
          <Text style={[FONTS.h3, {color: COLORS.primary}]}>
            ราคา {item.price} บาท
          </Text>
        </View>
        <TouchableOpacity
          activeOpacity={0.8}
          style={{
            backgroundColor: COLORS.green,
            width: 100,
            margin: 10,
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 10,
            borderRadius: 5,
          }}>
          <Text style={[FONTS.h3, {color: COLORS.white}]}>ซื้อคอร์ส</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default SellCourseCard;
