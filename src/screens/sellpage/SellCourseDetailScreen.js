import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import Header from '../../components/home/Header';
import LocalizationContext from '../LocalizationContext';
import {COLORS, FONTS} from '../../constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {courses} from '../../constants/fakedata';
import SellCourseCard from '../../components/card/SellCourseCard';

const SellCourseDetailScreen = ({navigation}) => {
  const {t} = React.useContext(LocalizationContext);
  return (
    <SafeAreaView style={{backgroundColor: COLORS.backgroundColor, flex: 1}}>
      <Header
        title="เนื้อหาในห้องเรียน"
        renderLeft={() => {
          return (
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                position: 'absolute',
                left: 20,
                height: 60,
                zIndex: 100,
              }}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  navigation.goBack();
                }}>
                <Ionicons
                  name="ios-chevron-back"
                  size={30}
                  color={COLORS.secondary}
                  style={{marginLeft: -3, marginTop: -1}}
                />
              </TouchableOpacity>
            </View>
          );
        }}
      />

      <FlatList
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => {
          return <View style={{margin: 10}} />;
        }}
        contentContainerStyle={{padding: 20}}
        ListHeaderComponent={() => (
          <View style={{marginVertical: 20}}>
            <Text style={[FONTS.h2, {color: COLORS.secondary}]}>
              {t('sellsourcedetail.content')}
            </Text>
          </View>
        )}
        ListFooterComponent={() => <View style={{margin: 10}} />}
        data={courses}
        renderItem={({item}) => {
          return <SellCourseCard item={item} />;
        }}
      />
    </SafeAreaView>
  );
};

export default SellCourseDetailScreen;
