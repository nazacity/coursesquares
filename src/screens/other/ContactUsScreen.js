import React from 'react';
import {View, Text, Image, ScrollView} from 'react-native';
import BackButton from '../../components/layout/BackButton';
import {COLORS, FONTS} from '../../constants';
import Header from '../../components/home/Header';
import LocalizationContext from '../LocalizationContext';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ContactUsScreen = () => {
  const {t} = React.useContext(LocalizationContext);
  return (
    <View style={{flex: 1, backgroundColor: COLORS.white}}>
      <BackButton color={COLORS.primary} />
      <Header title={t('contactus.contactus')} />
      <View style={{alignItems: 'center'}}>
        <Image
          source={require('../../../assets/images/contactuslogo.png')}
          style={{width: 200, height: 200}}
        />
      </View>
      <View style={{padding: 40}}>
        <Text style={[FONTS.body3, {color: COLORS.secondary, marginLeft: 20}]}>
          บริษัท คอร์สสแควร์ จำกัด
        </Text>
        <View
          style={{
            borderBottomWidth: 1,
            borderColor: COLORS.secondary,
            marginVertical: 15,
          }}
        />
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <MaterialCommunityIcons
            name="email"
            color={COLORS.primary}
            size={24}
          />
          <Text
            style={[FONTS.body3, {color: COLORS.secondary, marginLeft: 20}]}>
            E-mail:
          </Text>
          <Text style={[FONTS.body3, {color: COLORS.primary, marginLeft: 20}]}>
            info@coursesquare.co
          </Text>
        </View>
        <View
          style={{
            borderBottomWidth: 1,
            borderColor: COLORS.secondary,
            marginVertical: 15,
          }}
        />
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <FontAwesome5 name="phone" color={COLORS.primary} size={24} />
          <Text
            style={[FONTS.body3, {color: COLORS.secondary, marginLeft: 20}]}>
            Phone:
          </Text>
          <Text style={[FONTS.body3, {color: COLORS.primary, marginLeft: 20}]}>
            0940526052
          </Text>
        </View>
        <View
          style={{
            borderBottomWidth: 1,
            borderColor: COLORS.secondary,
            marginVertical: 15,
          }}
        />
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Ionicons name="chatbubbles-sharp" color={COLORS.primary} size={24} />
          <Text
            style={[FONTS.body3, {color: COLORS.secondary, marginLeft: 20}]}>
            Line ID:
          </Text>
          <Text style={[FONTS.body3, {color: COLORS.primary, marginLeft: 20}]}>
            @coursesquare
          </Text>
        </View>
        <View
          style={{
            borderBottomWidth: 1,
            borderColor: COLORS.secondary,
            marginVertical: 15,
          }}
        />
      </View>
    </View>
  );
};

export default ContactUsScreen;
