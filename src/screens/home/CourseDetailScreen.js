import React from 'react';
import {SafeAreaView} from 'react-native';

import {COLORS} from '../../constants';
import LocalizationContext from '../LocalizationContext';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import LessonScreen from './LessonScreen';
import DocumentScreen from './DocumentScreen';
import MoreCourseDetailScreen from './MoreCourseDetailScreen';
import CourseHeader from '../../components/course/CourseHeader';
// import {course} from '../../constants/fakedata';
import {useSelector} from 'react-redux';

const Tab = createMaterialTopTabNavigator();

function CourseTab() {
  const {t} = React.useContext(LocalizationContext);
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: COLORS.secondary,
        inactiveTintColor: COLORS.backButtonColor,
        indicatorStyle: {
          backgroundColor: COLORS.secondary,
        },
      }}>
      <Tab.Screen
        name="LessonScreen"
        component={LessonScreen}
        options={{
          tabBarLabel: `${t('coursedetail.lesson')}`,
        }}
      />
      <Tab.Screen
        name="Document"
        component={DocumentScreen}
        options={{
          tabBarLabel: `${t('coursedetail.document')}`,
        }}
      />
      <Tab.Screen
        name="MoreCourseDetail"
        component={MoreCourseDetailScreen}
        options={{
          tabBarLabel: `${t('coursedetail.morecoursedetail')}`,
        }}
      />
    </Tab.Navigator>
  );
}

const CourseDetailScreen = ({navigation}) => {
  const {t} = React.useContext(LocalizationContext);
  const course = useSelector(state => state.course.course);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.backgroundColor}}>
      <CourseHeader item={course} />
      <CourseTab />
    </SafeAreaView>
  );
};

export default CourseDetailScreen;
