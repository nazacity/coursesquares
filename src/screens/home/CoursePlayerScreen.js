import React, {useState, useEffect, useRef} from 'react';
import {TouchableOpacity, StatusBar, BackHandler} from 'react-native';
import {ScrollView} from 'react-native';
import {View, Text, Image} from 'react-native';
import {COLORS, FONTS, SIZES, SHADOW} from '../../constants';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useDispatch, useSelector} from 'react-redux';
import VideoPlayer from '../../components/videoplayer/VideoPlayer';
import Orientation from 'react-native-orientation-locker';
import {setFullscreen} from '../../redux/actions/AppStateAction';
// import Youtube from 'react-native-youtube';
import useOrientation from '../../useHook/useOrientation';

const CoursePlayerScreen = ({navigation}) => {
  const course = useSelector(state => state.course.course);
  const lecture = useSelector(state => state.course.currentLecture);
  const fullscreen = useSelector(state => state.appState.fullscreen);
  const dispatch = useDispatch();
  const {height} = useOrientation();
  const videoRef = useRef();

  function handleOrientation(orientation) {
    orientation === 'LANDSCAPE-LEFT' || orientation === 'LANDSCAPE-RIGHT'
      ? (dispatch(setFullscreen(true)), StatusBar.setHidden(true))
      : (dispatch(setFullscreen(false)), StatusBar.setHidden(false));
  }

  useEffect(() => {
    // This would be inside componentDidMount()
    Orientation.addOrientationListener(handleOrientation);

    return () => {
      // This would be inside componentWillUnmount()
      Orientation.removeOrientationListener(handleOrientation);
    };
  }, []);

  useEffect(() => {
    const backAction = () => {
      if (navigation.isFocused()) {
        if (fullscreen) {
          if (videoRef.current) {
            videoRef.current.methods.toggleFullscreen();
            return true;
          }
          navigation.goBack();
          return true;
        }
      }
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    return () => backHandler.remove();
  }, [fullscreen]);

  const handleEnterFullscreen = () => {
    Orientation.lockToLandscapeLeft();
  };
  const handleExitFullScreen = () => {
    Orientation.unlockAllOrientations();
  };

  return (
    <View style={{backgroundColor: COLORS.backgroundColor}}>
      <View
        style={{
          width: '100%',
          height: fullscreen ? height : 300,
        }}>
        <VideoPlayer
          ref={videoRef}
          style={{
            width: '100%',
            height: '100%',
            resizeMode: 'cover',
          }}
          source={{
            uri: lecture.videoPath,
          }}
          controls={false}
          disableBack={true}
          onEnterFullscreen={handleEnterFullscreen}
          onExitFullscreen={handleExitFullScreen}
          toggleResizeModeOnFullscreen={false}
        />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{padding: 20, backgroundColor: COLORS.white}}>
          <View>
            <Text style={[FONTS.body4, {color: COLORS.thirdary}]}>
              คอร์ส {course?.title}
            </Text>
          </View>
          <View style={{marginVertical: 10}}>
            <Text style={[FONTS.h1, {color: COLORS.secondary}]}>
              บทที่ 1: {course?.lessons[0]?.title}
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            padding: 20,
            backgroundColor: COLORS.white,
            paddingTop: 0,
          }}>
          <View style={{flex: 3}}>
            <Text style={[FONTS.body3, {color: COLORS.secondary}]}>วิดีโอ</Text>
          </View>
          <View style={{flex: 1}}>
            <Text
              style={[
                FONTS.body3,
                {color: COLORS.secondary, textAlign: 'center'},
              ]}>
              เวลา
            </Text>
          </View>
          <View style={{flex: 1}}>
            <Text
              style={[
                FONTS.body3,
                {color: COLORS.secondary, textAlign: 'center'},
              ]}>
              สถานะ
            </Text>
          </View>
        </View>
        <View style={{paddingHorizontal: 20}}>
          {course?.lessons?.map((item, index) => {
            return (
              <React.Fragment key={item.title}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={{
                    flexDirection: 'row',
                    paddingVertical: 20,
                  }}>
                  <View style={{flex: 3}}>
                    <Text style={[FONTS.h3, {color: COLORS.secondary}]}>
                      {item.title}
                    </Text>
                  </View>
                  <View style={{flex: 1}}>
                    <Text
                      style={[
                        FONTS.h3,
                        {color: COLORS.secondary, textAlign: 'center'},
                      ]}>
                      {item.time} น.
                    </Text>
                  </View>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    style={{flex: 1, alignItems: 'center'}}>
                    <View
                      style={[
                        {
                          backgroundColor: COLORS.secondary,
                          width: 20,
                          height: 20,
                          borderRadius: 100,
                          alignItems: 'center',
                          justifyContent: 'center',
                        },
                        SHADOW.default,
                      ]}>
                      <FontAwesome name="play" size={10} color={COLORS.white} />
                    </View>
                  </TouchableOpacity>
                </TouchableOpacity>
                <View
                  style={{
                    borderBottomColor: COLORS.backButtonColor,
                    borderBottomWidth: 2,
                  }}
                />
              </React.Fragment>
            );
          })}
        </View>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              navigation.navigate('CourseDetail');
            }}
            style={{
              flex: 1,
              margin: 10,
              padding: 10,
              borderColor: COLORS.secondary,
              borderRadius: 5,
              borderWidth: 2,
              backgroundColor: COLORS.white,
            }}>
            <Text
              style={[
                FONTS.h3,
                {color: COLORS.secondary, textAlign: 'center'},
              ]}>
              กลับไปบทเรียน
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            style={{
              flex: 1,
              margin: 10,
              padding: 10,
              backgroundColor: COLORS.secondary,
              borderRadius: 5,
            }}>
            <Text
              style={[FONTS.h3, {color: COLORS.white, textAlign: 'center'}]}>
              ไปบทถัดไป
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default CoursePlayerScreen;
