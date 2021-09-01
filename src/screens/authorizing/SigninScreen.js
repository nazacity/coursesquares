import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {COLORS, FONTS, SIZES} from '../../constants';
import {
  setLoading,
  setSnackbarDisplay,
} from '../../redux/actions/AppStateAction';
import LocalizationContext from '../LocalizationContext';
import {useForm, Controller} from 'react-hook-form';
import FloatingLabelInput from '../../components/floatinglabelinput/FloatingLabelInput';
import {Icon} from 'react-native-elements';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import {user} from '../../constants/fakedata';
// import {
//   AccessToken,
//   GraphRequest,
//   GraphRequestManager,
//   LoginManager,
// } from 'react-native-fbsdk';
import {signIn} from '../../redux/actions/UserAction';
import {setAuthToken} from '../../constants/authentication';
import {fetchCourses} from '../../redux/actions/CourseAction';
import AuthProvider from '../../resources/AuthProvider';
import MemberProvider from '../../resources/MemberProvider';
import Fblogin from './FbLogin';

const AuthService = new AuthProvider();
const MemberService = new MemberProvider();

const SigninScreen = () => {
  const {t} = React.useContext(LocalizationContext);
  const dispatch = useDispatch();
  const {control, handleSubmit, reset} = useForm();
  const navigation = useNavigation();

  const [hidePassword, setHidePassword] = useState(true);

  const [focus, setFocus] = useState({
    email: false,
    password: false,
  });

  const onLoginWithFacebook = async () => {
    // try {
    //   const response = await LoginManager.logInWithReadPermissions(['email']);
    //   if (response.isCancelled) {
    //     dispatch(
    //       setSnackbarDisplay({
    //         state: 'error',
    //         message: t('signin.signinfailed'),
    //       }),
    //     );
    //   } else {
    //     console.log({response});
    //     // AccessToken.getCurrentAccessToken().then(data => {
    //     //   this.setState(prevState => ({
    //     //     ...prevState,
    //     //     fbToken: data.accessToken,
    //     //   }));
    //     //   const infoRequest = new GraphRequest(
    //     //     '/me?fields=email',
    //     //     null,
    //     //     this.responseInfoCallbackFromfacebookLogin,
    //     //   );
    //     //   new GraphRequestManager().addRequest(infoRequest).start();
    //     // });
    //   }
    // } catch (error) {
    //   dispatch(
    //     setSnackbarDisplay({
    //       state: 'error',
    //       message: t('signin.signinfailed'),
    //     }),
    //   );
    // }
  };

  const onSubmit = async data => {
    dispatch(setLoading(true));
    if (!data.username || !data.password) {
      dispatch(
        setSnackbarDisplay({
          state: 'error',
          message: t('signin.nouserorpasserror'),
        }),
      );
    } else {
      try {
        const response = await AuthService.login({
          // email: data.username,
          // password: data.password,
          email: 'mickey.csq@gmail.com',
          password: 'abc1234*',
          memberProfileComId: 3, // TODO: MANY OWNER
        });

        if (response === 'Member not found') {
          dispatch(
            setSnackbarDisplay({
              state: 'error',
              message: t('signin.membernotfound'),
            }),
          );
        } else if (response?.token) {
          await setAuthToken(response.token);
          const _user = await MemberService.getMemberInfo();
          const user = {
            id: _user.mId,
            image: `https://s1-dev.coursesquare.com/${_user.mDisplayPath}`, // TODO: waiting for image storage path
            firstName: _user.mFirstName,
            lastName: _user.mLastName,
            email: _user.mEmail,
          };

          dispatch(signIn(user));
          dispatch(
            setSnackbarDisplay({
              state: 'succeeded',
              message: t('signin.succeeded'),
            }),
          );
        }
      } catch (error) {
        console.log(error);
        dispatch(
          setSnackbarDisplay({
            state: 'error',
            message: t('signin.membernotfound'),
          }),
        );
      }
      dispatch(setLoading(false));
    }
  };

  return (
    <SafeAreaView
      style={{backgroundColor: '#fff', flex: 1, position: 'relative'}}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ImageBackground
          source={require('../../../assets/images/background.png')}
          resizeMode="cover"
          style={{width: SIZES.width, height: SIZES.height}}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={{position: 'absolute', top: 20, right: 20}}>
            <Text style={{...FONTS.body3, color: COLORS.secondary}}>
              {t('signin.help')}
            </Text>
          </TouchableOpacity>
          <View
            style={{
              alignItems: 'center',
              marginTop: SIZES.width / 3,
            }}>
            <Image
              source={require('.././../../assets/images/logo.png')}
              style={{width: 275, height: 53}}
            />
          </View>
          <View style={{marginTop: 40}}>
            <View
              style={{
                marginHorizontal: 30,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <MaterialCommunityIcons
                name="email"
                color={focus.email ? COLORS.primary : COLORS.secondary}
                size={20}
              />
              <View style={{flex: 1}}>
                <Controller
                  control={control}
                  render={({field: {onChange, onBlur, value}}) => (
                    <FloatingLabelInput
                      floatingLabel={t('signin.username')}
                      inputContainerStyle={{borderBottomWidth: 0}}
                      onChangeText={value => onChange(value)}
                      value={value}
                      onFocus={() => {
                        setFocus({...focus, email: true});
                      }}
                      onBlur={() => {
                        setFocus({...focus, email: false});
                      }}
                    />
                  )}
                  name="username"
                  defaultValue=""
                />
              </View>
            </View>
            <View
              style={{
                marginHorizontal: 30,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <FontAwesome5
                name="key"
                color={focus.password ? COLORS.primary : COLORS.secondary}
                size={20}
              />
              <View style={{flex: 1}}>
                <Controller
                  control={control}
                  render={({field: {onChange, onBlur, value}}) => (
                    <FloatingLabelInput
                      floatingLabel={t('signin.password')}
                      inputContainerStyle={{borderBottomWidth: 0}}
                      onChangeText={value => onChange(value)}
                      value={value}
                      rightIcon={
                        <Icon
                          name={hidePassword ? 'eye-off' : 'eye'}
                          type="ionicon"
                          size={24}
                          color={
                            value || focus.password
                              ? COLORS.primary
                              : COLORS.secondary
                          }
                          onPress={() => setHidePassword(!hidePassword)}
                        />
                      }
                      secureTextEntry={hidePassword}
                      onFocus={() => {
                        setFocus({...focus, password: true});
                      }}
                      onBlur={() => {
                        setFocus({...focus, password: false});
                      }}
                    />
                  )}
                  name="password"
                  // rules={{required: true}}
                  defaultValue=""
                />
              </View>
            </View>
            <View
              style={{
                alignItems: 'center',
                marginTop: 40,
                marginHorizontal: 30,
              }}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={handleSubmit(onSubmit)}
                style={{
                  backgroundColor: COLORS.secondary,
                  borderRadius: 50,
                  height: 50,
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '100%',
                }}>
                <Text style={{...FONTS.body1, color: COLORS.white}}>
                  {t('signin.signin')}
                </Text>
              </TouchableOpacity>
              <View style={{marginVertical: 20}}>
                <Text style={{...FONTS.body2, color: COLORS.secondary}}>
                  {t('signin.or')}
                </Text>
              </View>
              {/* Fblogin */}
              <Fblogin />
            </View>
          </View>
          <View style={{flex: 1}} />
          <TouchableOpacity
            activeOpacity={0.8}
            style={{marginTop: 40}}
            onPress={() => {
              navigation.navigate('ForgotPassword');
            }}>
            <Text
              style={{
                ...FONTS.body3,
                color: COLORS.secondary,
                textAlign: 'center',
              }}>
              {t('signin.forgotpassword')}
            </Text>
          </TouchableOpacity>
        </ImageBackground>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SigninScreen;
