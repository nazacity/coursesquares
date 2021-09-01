import React, {useEffect} from 'react';

import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';

// Screen
import HomeScreen from './home/HomeScreen';
import CourseDetailScreen from './home/CourseDetailScreen';
import CoursePlayerScreen from './home/CoursePlayerScreen';
import AboutCourseScreen from './home/AboutCourseScreen';
import AuthorDetailScreen from './home/AuthorDetailScreen';

import SellPageScreen from './sellpage/SellPageScreen';
import SellCourseDetailScreen from './sellpage/SellCourseDetailScreen';

import SigninScreen from './authorizing/SigninScreen';
import ForgotPasswordScreen from './authorizing/ForgotPasswordScreen';

import CourseScreen from './course/CourseScreen';

import OtherScreen from './other/OtherScreen';

// theme
import {COLORS} from '../constants';

import LocalizationContext from './LocalizationContext';
import {useSelector, useDispatch} from 'react-redux';

// Icon
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Feather';
import ContactUsScreen from './other/ContactUsScreen';

const HomeStack = createStackNavigator();
const SellPageStack = createStackNavigator();
const CourseStack = createStackNavigator();
const OtherStack = createStackNavigator();
const OnboardingAndAuthorizingStack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

export const MainTabScreen = ({navigation, route}) => {
  const {t} = React.useContext(LocalizationContext);
  const fullscreen = useSelector(state => state.appState.fullscreen);

  return (
    <Tab.Navigator
      activeColor={COLORS.secondary}
      inactiveColor={COLORS.inactiveColor}
      barStyle={{
        backgroundColor: '#fff',
        display: fullscreen ? 'none' : undefined,
      }}>
      <Tab.Screen
        name="sellpage"
        component={SellPageStackScreen}
        options={{
          tabBarLabel: `${t('tab.sellpage')}`,
          tabBarIcon: ({color}) => (
            <FontAwesome5 name="store" color={color} size={20} />
          ),
        }}
      />
      <Tab.Screen
        name="home"
        component={HomeStackScreen}
        options={{
          tabBarLabel: `${t('tab.home')}`,
          tabBarIcon: ({color}) => (
            <FontAwesome5 name="book" color={color} size={20} />
          ),
        }}
      />
      <Tab.Screen
        name="recently"
        component={CourseStackScreen}
        options={{
          tabBarLabel: `${t('tab.recently')}`,
          tabBarIcon: ({color}) => (
            <Feather name="clock" color={color} size={20} />
          ),
        }}
      />
      <Tab.Screen
        name="profile"
        component={OtherStackScreen}
        options={{
          tabBarLabel: `${t('tab.profile')}`,
          tabBarIcon: ({color}) => (
            <Entypo name="menu" color={color} size={20} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export const UnauthorizedTabScreen = ({navigation, route}) => {
  const {t} = React.useContext(LocalizationContext);

  return (
    <Tab.Navigator
      activeColor={COLORS.secondary}
      inactiveColor={COLORS.inactiveColor}
      barStyle={{backgroundColor: '#fff'}}>
      <Tab.Screen
        name="sellpage"
        component={SellPageStackScreen}
        options={{
          tabBarLabel: `${t('tab.sellpage')}`,
          tabBarIcon: ({color}) => (
            <FontAwesome5 name="store" color={color} size={20} />
          ),
        }}
      />
      <Tab.Screen
        name="login"
        component={OnboardingAndAuthorizingStackScreen}
        options={{
          tabBarLabel: `${t('tab.profile')}`,
          tabBarIcon: ({color}) => (
            <Entypo name="menu" color={color} size={20} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const SellPageStackScreen = ({navigation}) => {
  return (
    <SellPageStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: COLORS.pinkPastel,
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
          alignSelf: 'center',
        },
        animationEnabled: false,
        title: '',
      }}>
      <SellPageStack.Screen
        name="SellPage"
        component={SellPageScreen}
        options={{
          headerShown: false,
        }}
      />
      <SellPageStack.Screen
        name="SellCourseDetail"
        component={SellCourseDetailScreen}
        options={{
          headerShown: false,
        }}
      />
    </SellPageStack.Navigator>
  );
};

const HomeStackScreen = ({navigation}) => {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: COLORS.pinkPastel,
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
          alignSelf: 'center',
        },
        animationEnabled: false,
        title: '',
      }}>
      <HomeStack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <HomeStack.Screen
        name="CourseDetail"
        component={CourseDetailScreen}
        options={{
          headerShown: false,
        }}
      />
      <HomeStack.Screen
        name="CoursePlayer"
        component={CoursePlayerScreen}
        options={{
          headerShown: false,
        }}
      />
      <HomeStack.Screen
        name="AboutCourse"
        component={AboutCourseScreen}
        options={{
          headerShown: false,
        }}
      />
      <HomeStack.Screen
        name="AuthorDetail"
        component={AuthorDetailScreen}
        options={{
          headerShown: false,
        }}
      />
    </HomeStack.Navigator>
  );
};

const CourseStackScreen = ({navigation}) => {
  return (
    <CourseStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: COLORS.pinkPastel,
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
          alignSelf: 'center',
        },
        animationEnabled: false,
        title: '',
      }}>
      <CourseStack.Screen
        name="Course"
        component={CourseScreen}
        options={{
          headerShown: false,
        }}
      />
    </CourseStack.Navigator>
  );
};

export const OnboardingAndAuthorizingStackScreen = () => {
  return (
    <OnboardingAndAuthorizingStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <OnboardingAndAuthorizingStack.Screen
        name="Signin"
        component={SigninScreen}
      />
      <OnboardingAndAuthorizingStack.Screen
        name="ForgotPassword"
        component={ForgotPasswordScreen}
      />
    </OnboardingAndAuthorizingStack.Navigator>
  );
};

const OtherStackScreen = ({navigation}) => {
  return (
    <OtherStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <OtherStack.Screen name="other" component={OtherScreen} />
      <OtherStack.Screen name="contactus" component={ContactUsScreen} />
    </OtherStack.Navigator>
  );
};
