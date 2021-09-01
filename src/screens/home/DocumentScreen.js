import React from 'react';
import {View, Text, TouchableOpacity, FlatList} from 'react-native';
import {useSelector} from 'react-redux';
import {COLORS, FONTS, SHADOW} from '../../constants';
import Ionicons from 'react-native-vector-icons/Ionicons';

const DocumentScreen = () => {
  const course = useSelector(state => state.course.course);

  const documentCard = ({item, index}) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        style={[
          SHADOW.default,
          {
            backgroundColor: COLORS.white,
            borderRadius: 5,
            padding: 20,
            flexDirection: 'row',
          },
        ]}>
        <View style={{flex: 1}}>
          <Text style={[FONTS.h3, {color: COLORS.secondary}]}>
            {item.title}
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
    );
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.backgroundColor,
      }}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={course.documents}
        contentContainerStyle={{padding: 20}}
        renderItem={documentCard}
        ItemSeparatorComponent={() => <View style={{margin: 10}} />}
      />
    </View>
  );
};

export default DocumentScreen;
