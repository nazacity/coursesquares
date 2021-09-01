import React, {useEffect} from 'react';
import {BackHandler, Alert, SafeAreaView} from 'react-native';
import {useDispatch} from 'react-redux';
import Header from '../../components/home/Header';
import {COLORS} from '../../constants';
import {setLoading} from '../../redux/actions/AppStateAction';
import LocalizationContext from '../LocalizationContext';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import NormalCourseScreen from './NormalCourseScreen';
import ExpiriedCourseScreen from './ExpiriedCourseScreen';

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
        name="NormalCourse"
        component={NormalCourseScreen}
        options={{
          tabBarLabel: `${t('home.normalcourse')}`,
        }}
      />
      <Tab.Screen
        name="ExpiriedCourse"
        component={ExpiriedCourseScreen}
        options={{
          tabBarLabel: `${t('home.expiriedcourse')}`,
        }}
      />
    </Tab.Navigator>
  );
}

const HomeScreen = ({navigation}) => {
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
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.backgroundColor}}>
      <Header title={t('home.mycourse')} />
      <CourseTab />
    </SafeAreaView>
  );
};

export default HomeScreen;
