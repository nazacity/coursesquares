import React from 'react';
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import {useSelector} from 'react-redux';
import {COLORS, FONTS, SHADOW} from '../../constants';
import Ionicons from 'react-native-vector-icons/Ionicons';

const MoreCourseDetailScreen = ({navigation}) => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.backgroundColor,
      }}>
      <ScrollView contentContainerStyle={{padding: 20}}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            navigation.navigate('AboutCourse');
          }}
          style={[
            SHADOW.default,
            {
              backgroundColor: COLORS.white,
              borderRadius: 5,
              padding: 20,
              flexDirection: 'row',
              marginBottom: 20,
            },
          ]}>
          <View style={{flex: 1}}>
            <Text style={[FONTS.h3, {color: COLORS.secondary}]}>
              เกี่ยวกับคอร์ส
            </Text>
          </View>
          <View
            style={{
              borderLeftColor: COLORS.backButtonColor,
              borderLeftWidth: 2,
              paddingLeft: 30,
            }}>
            <Ionicons
              name="ios-chevron-forward-outline"
              size={20}
              color={COLORS.secondary}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            navigation.navigate('AuthorDetail');
          }}
          style={[
            SHADOW.default,
            {
              backgroundColor: COLORS.white,
              borderRadius: 5,
              padding: 20,
              flexDirection: 'row',
              marginBottom: 20,
            },
          ]}>
          <View style={{flex: 1}}>
            <Text style={[FONTS.h3, {color: COLORS.secondary}]}>
              เกี่ยวกับผู้สอน
            </Text>
          </View>
          <View
            style={{
              borderLeftColor: COLORS.backButtonColor,
              borderLeftWidth: 2,
              paddingLeft: 30,
            }}>
            <Ionicons
              name="ios-chevron-forward-outline"
              size={20}
              color={COLORS.secondary}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          style={[
            SHADOW.default,
            {
              backgroundColor: COLORS.white,
              borderRadius: 5,
              padding: 20,
              flexDirection: 'row',
              marginBottom: 20,
            },
          ]}>
          <View style={{flex: 1}}>
            <Text style={[FONTS.h3, {color: COLORS.secondary}]}>
              แชร์คอร์สนี้
            </Text>
          </View>
          <View
            style={{
              borderLeftColor: COLORS.backButtonColor,
              borderLeftWidth: 2,
              paddingLeft: 30,
            }}>
            <Ionicons
              name="ios-chevron-forward-outline"
              size={20}
              color={COLORS.secondary}
            />
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default MoreCourseDetailScreen;
