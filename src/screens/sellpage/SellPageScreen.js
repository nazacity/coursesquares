import React, {useEffect} from 'react';
import {
  BackHandler,
  Alert,
  SafeAreaView,
  Text,
  View,
  FlatList,
} from 'react-native';
import {useDispatch} from 'react-redux';
import Header from '../../components/home/Header';
import CategoryChip from '../../components/sellpage/CategoryChip';
import InterestingCourse from '../../components/sellpage/InterestingCourse';
import PopularCourse from '../../components/sellpage/PopularCourse';
import SellPageSwiper from '../../components/swiper/SellPageSwiper';
import {COLORS, FONTS, SIZES} from '../../constants';
import {categories} from '../../constants/fakedata';
import {setLoading} from '../../redux/actions/AppStateAction';
import LocalizationContext from '../LocalizationContext';

const SellPageScreen = ({navigation}) => {
  const {t} = React.useContext(LocalizationContext);
  const dispatch = useDispatch();
  useEffect(() => {
    setTimeout(() => {
      dispatch(setLoading(false));
    }, 1000);
  }, []);

  useEffect(() => {
    const backAction = () => {
      if (navigation.isFocused()) {
        Alert.alert(t('home.exit'), t('home.sure'), [
          {
            text: t('home.no'),
            onPress: () => null,
            style: 'cancel',
          },
          {text: t('home.yes'), onPress: () => BackHandler.exitApp()},
        ]);
        return true;
      }
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    return () => backHandler.remove();
  }, []);

  return (
    <SafeAreaView style={{backgroundColor: COLORS.backgroundColor, flex: 1}}>
      <Header title="คอร์สเรียน" />
      <InterestingCourse
        header={() => {
          return (
            <View>
              <SellPageSwiper />
              <View style={{paddingLeft: 20, paddingTop: 20}}>
                <Text style={[FONTS.h2, {color: COLORS.secondary}]}>
                  {t('sellpage.popularcourse')}
                </Text>
              </View>
              <PopularCourse />
              <View style={{marginVertical: 20, marginHorizontal: 20}}>
                <Text style={[FONTS.h2, {color: COLORS.secondary}]}>
                  {t('sellpage.category')}
                </Text>
              </View>
              <View
                style={{
                  paddingHorizontal: 20,
                }}>
                <FlatList
                  numColumns={3}
                  data={categories}
                  keyExtractor={item => item.id}
                  ItemSeparatorComponent={() => {
                    return <View style={{margin: 10}} />;
                  }}
                  renderItem={({item}) => {
                    return <CategoryChip item={item} />;
                  }}
                />
              </View>

              <View style={{marginVertical: 20, marginHorizontal: 20}}>
                <Text style={[FONTS.h2, {color: COLORS.secondary}]}>
                  {t('sellpage.interestingcourse')}
                </Text>
              </View>
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
};

export default SellPageScreen;
