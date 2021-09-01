import {
  SET_COURSE,
  SET_LOADING,
  SET_COURSES,
  SET_CURRENT_LECTURE,
} from '../types';
import dayjs from 'dayjs';
import CourseProvider from '../../resources/CourseProvider';
import VideoProvider from '../../resources/VideoProvider';

const CourseService = new CourseProvider();
const VideoService = new VideoProvider();

const mapCsqDate = unformatDate => {
  const [fullTextMonth, date, year, time] = unformatDate.split(' ');
  const fullTextMonthes = [
    'january',
    'febuary',
    'march',
    'april',
    'may',
    'june',
    'july',
    'august',
    'september',
    'october',
    'november',
    'december',
  ];

  const [hour, minute, second] = time.split(':');
  const monthIndex = fullTextMonthes.findIndex(
    each => each === fullTextMonth.toLowerCase(),
  );
  const dateFormatted = date.replace(',', '');

  return dayjs()
    .date(+dateFormatted)
    .month(+monthIndex)
    .year(+year)
    .hour(+hour)
    .minute(+minute)
    .second(+second)
    .format();
};

const mapCourse = payload => {
  const date = new Date();
  const totalMins = Math.floor(payload.cDuration / 60);

  return {
    id: payload.cId,
    title: payload.cName,
    author: `${payload.mFirstName || ''} ${payload.mLastName || ''}`,
    expiriedDate: date.setDate(date.getDate() + 7), // TODO: wait for schema
    percentage:
      Math.floor((payload.lelCompleted / payload.lelTotal) * 100) || 0,
    image: `https://s1-dev.coursesquare.com/${payload.cThumbnailPath}`,
    totalMins,
    price: payload.cPrice,
  };
};

const mapModules = modules => {
  let result = [];
  modules.forEach(module => {
    const mapped = module.lecInfo.map(lec => ({
      ...lec,
      title: lec.lecName,
      id: lec.lecId,
    }));
    result = [...result, ...mapped];
  });

  return result;
};

const createVideoPath = async payload => {
  let videoPath = null;
  if (!payload.vidVideoHLSPath) {
    videoPath = payload.vidVideoPath;
  } else {
    const {response} = await VideoService.createVideoPath({
      videoPath: payload.vidVideoHLSPath,
    });
    videoPath = response.videoPath;
  }

  return videoPath;
};

const mapCurrentLecture = async payload => {
  const videoPath = await createVideoPath(payload);
  return {
    ...payload,
    title: payload.lecName,
    id: payload.lecId,
    videoThumbnailPath: `https://s1-dev.coursesquare.com/${payload.vidThumbnailPath}`,
    videoHSLPath: payload.vidVideoHLSPath
      ? `https://v1.coursesquare.co${payload.vidVideoHLSPath}`
      : null, // TODO change base url
    videoPath,
  };
};

const mapDocuments = materials => {
  return materials.map(material => ({
    title: material.lmName,
    path: `https://s1-dev.coursesquare.com/${material.lmMaterialPath}`,
    id: material.lmId,
  }));
};

const mapCourseDetail = payload => {
  const mFirstName = payload.instructor[0]?.mFirstName || '';
  const mLastName = payload.instructor[0]?.mLastName || '';

  const author = {
    name: `${mFirstName} ${mLastName}`,
    email: payload.instructor[0]?.mEmail,
    phone: payload.instructor[0]?.mPhone,
    about: payload.instructor[0]?.mAbout,
    imageProfile: payload.instructor[0]?.mDisplayPath,
    website: payload.instructor[0]?.mWebsite,
  };
  const expiriedDate = mapCsqDate(payload.endDate);
  const lessons = mapModules(payload.moduleInfo);
  const documents = mapDocuments(payload.material);

  return {
    id: payload.cId,
    image: payload.courseThumbnailUrl,
    title: payload.cName,
    totalMins: Math.floor(payload.cDuration / 60) || 0,
    author,
    expiriedDate,
    lessons,
    documents,
  };
};

export const fetchCourse = (courseId, navigation) => async dispatch => {
  dispatch({
    type: SET_LOADING,
    payload: true,
  });
  try {
    const {response} = await CourseService.getCourseByCourseId(courseId);
    const mappedCourse = mapCourseDetail(response);
    console.log('fetched course detail');
    navigation.navigate('CourseDetail');
    dispatch({
      type: SET_COURSE,
      payload: mappedCourse,
    });
  } catch (error) {
    console.log(error);
  }

  dispatch({
    type: SET_LOADING,
    payload: false,
  });
};

export const fetchLectureInfo = async (courseId, lectureId) => {
  try {
    // dispatch({
    //   type: SET_LOADING,
    //   payload: true,
    // });
    console.log('fetched course lecture');

    const {lectureInfo} =
      await CourseService.getLectureInfoByCourseIdAndLectureId({
        courseId,
        lectureId,
      });

    return mapCurrentLecture(lectureInfo);
  } catch (error) {
    console.log(`[warning]: ${error.message}`);
  }
};

export const fetchCourses = async userId => {
  try {
    const {studyingCourse} = await CourseService.getCoursesByMemberId(userId);
    const mappedCourses = studyingCourse.map(each => mapCourse(each));
    console.log('fetched courses');
    return mappedCourses;
  } catch (error) {
    console.log(error);
  }
};
