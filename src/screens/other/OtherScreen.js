import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Alert,
  View,
  Text,
  SafeAreaView,
} from 'react-native';

import {Avatar} from 'react-native-elements';
import {useDispatch, useSelector} from 'react-redux';
import {COLORS, FONTS} from '../../constants';
import LocalizationContext from '../LocalizationContext';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {signOut} from '../../redux/actions/UserAction';

const OtherScreen = ({navigation}) => {
  const {t} = React.useContext(LocalizationContext);
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();
  const logout = () => {
    Alert.alert(t('other.logout'), t('other.logoutsure'), [
      {
        text: t('other.logoutno'),
        style: 'cancel',
      },
      {
        text: t('other.logoutyes'),
        onPress: () => {
          dispatch(signOut());
        },
      },
    ]);
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.center}>
        <Text style={{...FONTS.h2, color: COLORS.thirdary}}>
          {t('other.profile')}
        </Text>
      </View>
      <View style={styles.center}>
        {user.image ? (
          <Avatar source={{uri: user.image}} rounded size={150} />
        ) : (
          <Avatar
            icon={{name: 'user', type: 'font-awesome'}}
            rounded
            size={150}
            containerStyle={{borderWidth: 5, borderColor: COLORS.white}}
          />
        )}
        <View style={styles.center}>
          <Text style={{...FONTS.h2, color: COLORS.secondary}}>
            {user.firstName} {user.lastName}
          </Text>
          <Text style={{...FONTS.body4, color: COLORS.secondary}}>
            Email: {user.email}
          </Text>
        </View>
      </View>
      <View style={{padding: 20}}>
        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.8}
          onPress={() => {
            navigation.navigate('contactus');
          }}>
          <MaterialCommunityIcons
            name="lightbulb-outline"
            size={20}
            color={COLORS.secondary}
          />
          <Text style={styles.buttonText}>{t('other.contactus')}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.8}
          onPress={logout}>
          <MaterialCommunityIcons
            name="logout-variant"
            size={20}
            color={COLORS.secondary}
          />
          <Text style={styles.buttonText}>{t('other.logout')}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default OtherScreen;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: COLORS.backgroundColor},
  button: {
    backgroundColor: COLORS.white,
    flexDirection: 'row',
    borderRadius: 5,
    alignItems: 'center',
    padding: 20,
    marginBottom: 10,
  },
  buttonText: {
    ...FONTS.body3,
    color: COLORS.secondary,
    marginLeft: 10,
  },
  center: {padding: 20, justifyContent: 'center', alignItems: 'center'},
});
