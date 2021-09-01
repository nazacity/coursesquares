import React, {useState, useEffect, useRef} from 'react';
import {TouchableOpacity, StatusBar, BackHandler} from 'react-native';
import {ScrollView} from 'react-native';
import {View, Text, Image} from 'react-native';
import {COLORS, FONTS, SIZES, SHADOW} from '../../constants';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useDispatch, useSelector} from 'react-redux';
import VideoPlayer from '../../components/videoplayer/VideoPlayer';
import YoutubeVideoPlayer from 'react-native-youtube';
import Orientation from 'react-native-orientation-locker';
import {setFullscreen} from '../../redux/actions/AppStateAction';
// import Youtube from 'react-native-youtube';
import useOrientation from '../../useHook/useOrientation';
import {fetchLectureInfo} from '../../redux/actions/CourseAction';
import {ActivityIndicator} from 'react-native';
import {getVideoTime, onVideoProgress} from '../../util/videoUtil';

const CoursePlayerScreen = ({navigation, route}) => {
  const [loading, setLoading] = useState(true);
  const [youtube, setYoutube] = useState(null);
  const course = useSelector(state => state.course.course);
  const [data, setData] = useState({
    cId: 0,
    cName: '',
    courseThumbnailUrl: null,
    courseUrl: '',
    id: 0,
    lecFreeFlag: 0,
    lecId: 0,
    lecName: '',
    lecType: 'VIDEO',
    title: '',
    vidId: 0,
    vidThumbnailPath: '',
    vidVideoHLSPath: null,
    vidVideoPath: '',
    videoHSLPath: null,
    videoPath: '',
    videoThumbnailPath: '',
  });

  const fullscreen = useSelector(state => state.appState.fullscreen);
  const dispatch = useDispatch();
  const {height} = useOrientation();
  const videoRef = useRef();
  const {item, index} = route.params;

  const navigateToCoursePlayerScreen = (item, index) => {
    navigation.replace('CoursePlayer', {
      item,
      index,
    });
  };

  function handleOrientation(orientation) {
    orientation === 'LANDSCAPE-LEFT' || orientation === 'LANDSCAPE-RIGHT'
      ? (dispatch(setFullscreen(true)), StatusBar.setHidden(true))
      : (dispatch(setFullscreen(false)), StatusBar.setHidden(false));
  }

  const onFetchLecture = async () => {
    setLoading(true);
    try {
      const res = await fetchLectureInfo(course.id, item.lecId);
      if (res.videoPath.includes('youtube')) {
        const youtubeId = res.videoPath.replace(
          'https://www.youtube.com/watch?v=',
          '',
        );
        setYoutube(youtubeId);
      }
      setData(res);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  console.log(youtube);
  useEffect(() => {
    onFetchLecture();
  }, []);

  useEffect(() => {
    // This would be inside componentDidMount()
    Orientation.addOrientationListener(handleOrientation);

    return () => {
      // This would be inside componentWillUnmount()
      Orientation.removeOrientationListener(handleOrientation);
    };
  }, []);

  const seekTime = async videoId => {
    const t = await getVideoTime(videoId);
    videoRef.current.player.ref.seek(t);
  };

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
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            width: '100%',
            height: fullscreen ? height : 300,
            backgroundColor: COLORS.black,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {loading ? (
            <ActivityIndicator color={COLORS.white} size={30} />
          ) : youtube ? (
            <YoutubeVideoPlayer
              apiKey="AIzaSyDJYUHLLMwHFKv89YmuzBWFZC6lR_WWocE"
              videoId={'KVZ-P-ZI6W4'}
              style={{
                width: '100%',
                height: '100%',
              }}
              autoplay
            />
          ) : (
            <VideoPlayer
              ref={videoRef}
              style={{
                width: '100%',
                height: '100%',
                resizeMode: 'cover',
              }}
              source={{
                uri: data.videoPath,
              }}
              controls={false}
              disableBack={true}
              onEnterFullscreen={handleEnterFullscreen}
              onExitFullscreen={handleExitFullScreen}
              toggleResizeModeOnFullscreen={false}
              onProgress={async ({currentTime}) => {
                await onVideoProgress(currentTime, data.id);
              }}
              onLoad={() => {
                seekTime(data.id);
              }}
              onEnd={() => {
                if (course.lessons.length - 1 !== index) {
                  setTimeout(() => {
                    navigateToCoursePlayerScreen(
                      course.lessons[index + 1],
                      index + 1,
                    );
                  }, 5000);
                }
              }}
            />
          )}
        </View>

        <View style={{padding: 20, backgroundColor: COLORS.white, flex: 1}}>
          <View>
            <Text style={[FONTS.body4, {color: COLORS.thirdary}]}>
              คอร์ส {course?.title}
            </Text>
          </View>
          <View style={{marginVertical: 10}}>
            <Text style={[FONTS.h1, {color: COLORS.secondary}]}>
              {item?.title}
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
              <React.Fragment key={item.id}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={{
                    flexDirection: 'row',
                    paddingVertical: 20,
                  }}
                  onPress={() => {
                    // navigation.navigate('CoursePlayer');
                    navigateToCoursePlayerScreen(item, index);
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
          {course.lessons.length - 1 !== index && (
            <TouchableOpacity
              activeOpacity={0.8}
              style={{
                flex: 1,
                margin: 10,
                padding: 10,
                backgroundColor: COLORS.secondary,
                borderRadius: 5,
              }}
              onPress={() =>
                navigateToCoursePlayerScreen(
                  course.lessons[index + 1],
                  index + 1,
                )
              }>
              <Text
                style={[FONTS.h3, {color: COLORS.white, textAlign: 'center'}]}>
                ไปบทถัดไป
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default CoursePlayerScreen;
