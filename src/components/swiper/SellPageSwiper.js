import React, {useEffect, useState} from 'react';
import {Text, View, ImageBackground, ActivityIndicator} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import {SHADOW, SIZES, FONTS, COLORS} from '../../constants';
import LinearGradient from 'react-native-linear-gradient';
import dayjs from 'dayjs';
import 'dayjs/locale/th';
import Swiper from 'react-native-swiper';
import {useDispatch, useSelector} from 'react-redux';
import LocalizationContext from '../../screens/LocalizationContext';
import {setLoading} from '../../redux/actions/AppStateAction';
import {courses} from '../../constants/fakedata';

const SellPageSwiper = () => {
  const {t} = React.useContext(LocalizationContext);

  const navigation = useNavigation();
  const [sellCourse, setSellCourse] = useState([]);
  const [loading, setLoading1] = useState(true);
  const dispatch = useDispatch();
  const fetchCourseAndNavigate = async () => {
    navigation.navigate('SellCourseDetail');
  };
  const fetchPromoteActivity = async () => {
    try {
      setTimeout(() => {
        setSellCourse(courses);

        setLoading1(false);
      }, 1500);
    } catch (error) {
      console.log(error);
      setLoading1(false);
    }
  };
  useEffect(() => {
    fetchPromoteActivity();
  }, []);
  const SellCourseCard = ({item, index}) => {
    return (
      <TouchableOpacity activeOpacity={1} onPress={fetchCourseAndNavigate}>
        <ImageBackground
          source={{uri: item.image}}
          style={{
            width: SIZES.width,
            height: 200,
            resizeMode: 'cover',
          }}>
          <LinearGradient
            colors={['rgba(0,0,0,0.0)', 'rgba(0,0,0,0.4)', 'rgba(0,0,0,1)']}
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
            }}
          />
          <View
            style={{
              position: 'absolute',
              bottom: 40,
              left: 20,
            }}>
            <View style={{marginBottom: 10}}>
              <Text
                style={[FONTS.h2, {color: COLORS.white, textAlign: 'left'}]}>
                {item.title}
              </Text>
            </View>
            <View style={{flexDirection: 'row', marginBottom: 10}}>
              {item.category.map(item => {
                return (
                  <View
                    key={item}
                    style={{
                      backgroundColor: COLORS.primary,
                      borderRadius: 20,
                      paddingHorizontal: 10,
                      marginRight: 10,
                    }}>
                    <Text style={[FONTS.h4, {color: COLORS.white}]}>
                      {item}
                    </Text>
                  </View>
                );
              })}
            </View>
            <View>
              <Text
                style={[FONTS.h3, {color: COLORS.white, textAlign: 'left'}]}>
                {item.price} บาท
              </Text>
            </View>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    );
  };

  if (loading) {
    return (
      <View
        style={{
          height: 200,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: COLORS.secondary,
        }}>
        <ActivityIndicator color={COLORS.white} size="large" />
      </View>
    );
  }

  if (sellCourse.length === 0) {
    return (
      <View
        style={{
          height: 200,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: COLORS.secondary,
        }}>
        <Text style={[FONTS.h2, {color: COLORS.white}]}>
          {t('sellpage.nocourse')}
        </Text>
      </View>
    );
  }

  return (
    <View
      style={{
        backgroundColor: COLORS.backgroundColor,
        height: 200,
      }}>
      <Swiper
        height={200}
        autoplay
        dotColor="rgba(255,255,255,0.6)"
        activeDotColor={COLORS.primary}>
        {sellCourse.map((item, index) => {
          return <SellCourseCard key={index} item={item} index={index} />;
        })}
      </Swiper>
    </View>
  );
};

export default SellPageSwiper;
