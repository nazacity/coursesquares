import React, {useEffect} from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import {COLORS, FONTS} from '../../constants';
import LocalizationContext from '../LocalizationContext';
import SmallCourseCard from '../../components/card/SmallCourseCard';
import LargeCourseCard from '../../components/card/LargeCourseCard';
import {useDispatch, useSelector} from 'react-redux';
import {fetchCourse, fetchCourses} from '../../redux/actions/CourseAction';

const NormalCourseScreen = ({navigation}) => {
  const {t} = React.useContext(LocalizationContext);
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const courses = useSelector(state => state.course.courses);
  // const [currentCourse, setCurrentCourse] = useState({id: -1});

  const fetchCourseAndNavigate = courseId => {
    dispatch(fetchCourse(courseId));

    navigation.navigate('CourseDetail');
  };

  useEffect(() => {
    dispatch(fetchCourses(user.id));
  }, [dispatch, user.id]);

  return (
    <View style={Styles.container}>
      <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={Styles.flatlistContainer}
        ItemSeparatorComponent={() => {
          return <View style={Styles.flatlistItems} />;
        }}
        ListHeaderComponent={() => {
          return (
            <>
              <View style={Styles.listViewItemsNew}>
                <Text style={[FONTS.h2, {color: COLORS.thirdary}]}>
                  {t('normalcourse.newcourse')}
                </Text>
              </View>
              {/* <LargeCourseCard
                item={currentCourse}
                onPress={() => fetchCourseAndNavigate(currentCourse.id)}
              /> */}
              <View style={Styles.listViewItemsOther}>
                <Text style={[FONTS.h2, {color: COLORS.thirdary}]}>
                  {t('normalcourse.othercourse')}
                </Text>
              </View>
            </>
          );
        }}
        data={courses}
        renderItem={({item}) => {
          return (
            <SmallCourseCard
              item={item}
              onPress={() => fetchCourseAndNavigate(item.id)}
            />
          );
        }}
      />
    </View>
  );
};

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.backgroundColor,
  },
  flatlistContainer: {
    padding: 20,
  },
  flatlistItems: {
    margin: 10,
  },
  listViewItemsNew: {
    marginBottom: 20,
  },
  listViewItemsOther: {
    marginVertical: 20,
  },
});

// const mapStateToProps = state => ({
//   courses: state.courses,
// });

// const mapDispatchToProps = dispatch => ({
//   onLoad: () => dispatch(fetchCourses()),
// });

export default NormalCourseScreen;
