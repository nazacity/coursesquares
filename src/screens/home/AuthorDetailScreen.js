import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  ImageBackground,
  StyleSheet,
} from 'react-native';
import {useSelector} from 'react-redux';
import BackButton from '../../components/layout/BackButton';
import {COLORS, FONTS, SIZES} from '../../constants';

const AuthorDetailScreen = () => {
  const course = useSelector(state => state.course.course);
  return (
    <SafeAreaView style={Styles.safeAreaView}>
      <BackButton />
      <ImageBackground
        source={require('../../../assets/images/background2.png')}
        resizeMode="cover"
        style={Styles.imageBackground}>
        <View style={Styles.marginVertical20}>
          <Text style={[FONTS.h4, Styles.textAboutTeacher]}>
            เกี่ยวกับผู้สอน
          </Text>
        </View>
        <View style={Styles.viewImage}>
          <Image
            source={{uri: course?.author?.imageProfile}}
            style={Styles.image}
          />
        </View>

        <View style={Styles.marginBottom10}>
          <Text style={[FONTS.h1, Styles.textCourseAuthorName]}>
            {course?.author?.name}
          </Text>
        </View>
        <View style={Styles.marginBottom10}>
          <Text style={[FONTS.body3, Styles.textCourseAuthorWebsite]}>
            {course?.author?.website}
          </Text>
        </View>
        <View style={Styles.marginBottom10}>
          <Text style={[FONTS.body2, {color: COLORS.secondary}]}>
            {course?.author?.about}
          </Text>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

const Styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: COLORS.backgroundColor,
  },
  imageBackground: {
    width: SIZES.width,
    height: SIZES.height,
    padding: 20,
  },
  viewImage: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 160,
    height: 160,
    borderRadius: 80,
  },
  textCourseAuthorName: {
    color: COLORS.secondary,
    textAlign: 'center',
  },
  textAboutTeacher: {
    color: COLORS.secondary,
    textAlign: 'center',
  },
  textCourseAuthorWebsite: {
    color: COLORS.secondary,
    textAlign: 'center',
  },
  marginBottom10: {
    marginBottom: 10,
  },
  marginVertical20: {
    marginVertical: 20,
  },
});
export default AuthorDetailScreen;
