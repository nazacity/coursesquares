import React, {useState} from 'react';
import {useForm, Controller} from 'react-hook-form';
import {View, Text, SafeAreaView, Image, TouchableOpacity} from 'react-native';
import {useDispatch} from 'react-redux';
import FloatingLabelInput from '../../components/floatinglabelinput/FloatingLabelInput';
import BackButton from '../../components/layout/BackButton';
import {COLORS, FONTS, SIZES} from '../../constants';
import {setSnackbarDisplay} from '../../redux/actions/AppStateAction';
import LocalizationContext from '../LocalizationContext';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {ScrollView} from 'react-native';
import {ImageBackground} from 'react-native';
import AuthProvider from '../../resources/AuthProvider';

const AuthService = new AuthProvider();

const ForgotPasswordScreen = ({navigation}) => {
  const {control, handleSubmit, reset} = useForm();
  const {t} = React.useContext(LocalizationContext);
  const dispatch = useDispatch();
  const onSubmit = async data => {
    if (!data.username) {
      dispatch(
        setSnackbarDisplay({
          state: 'error',
          message: t('forgotpassword.nouser'),
        }),
      );
    } else {
      const {response} = await AuthService.resetPassword(data.username);

      if (response?.status === 200) {
        dispatch(
          setSnackbarDisplay({
            state: 'succeeded',
            message: t('forgotpassword.sentemail'),
          }),
        );
        reset();
        navigation.goBack();
      } else if (response?.status === 404) {
        dispatch(
          setSnackbarDisplay({
            state: 'error',
            message: t('forgotpassword.unexistedemail'),
          }),
        );
      }
    }
  };

  const [focus, setFocus] = useState({
    email: false,
  });

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.white}}>
      <BackButton />
      <ScrollView showsVerticalScrollIndicator={false}>
        <ImageBackground
          source={require('../../../assets/images/background.png')}
          resizeMode="cover"
          style={{width: SIZES.width, height: SIZES.height}}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: SIZES.height / 6,
            }}>
            <Image
              source={require('../../../assets/images/forgotpassword.png')}
              style={{width: 150, height: 150}}
            />
          </View>
          <Text
            style={{
              ...FONTS.h1,
              color: COLORS.secondary,
              textAlign: 'center',
              marginVertical: 20,
            }}>
            ลืมรหัสผ่าน
          </Text>
          <Text
            style={{
              ...FONTS.body3,
              color: COLORS.secondary,
              textAlign: 'center',
            }}>
            กรอกอีเมลลด้านล่างโดยระบบจะส่งลิงค์
          </Text>
          <Text
            style={{
              ...FONTS.body3,
              color: COLORS.secondary,
              textAlign: 'center',
            }}>
            เพื่อตั้งรหัสผ่านใหม่ผ่านอีเมล
          </Text>
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
                alignItems: 'center',
                marginTop: 40,
                marginHorizontal: 30,
              }}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={handleSubmit(onSubmit)}
                style={{
                  backgroundColor: COLORS.primary,
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
            </View>
          </View>
        </ImageBackground>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ForgotPasswordScreen;
