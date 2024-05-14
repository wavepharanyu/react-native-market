import React from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  StatusBar,
  Image,
} from 'react-native'
import * as Animatable from 'react-native-animatable'
import LinearGradient from 'react-native-linear-gradient'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import  MainTheme, { colors }  from '../themes/MainTheme'
import CustomText from "../components/CustomText"

const StarterScreen = ({ navigation }) => {

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={colors.background} barStyle="light-content" />
      <View style={styles.header}>
        <Animatable.Image
          animation="bounceIn"
          duraton="1500"
          source={require('../assets/images/logo.png')}
          style={styles.logo}
          resizeMode="stretch"
        />
      </View>
      <Animatable.View
        style={styles.footer}
        animation="fadeInUpBig">
        <CustomText
          fontWeight='bold'
          style={styles.title}>
          ระบบร้านค้าซื้อขายแลกเปลี่ยนสำหรับทุกคน
        </CustomText>
        <CustomText style={styles.text}>เข้าใช้งานด้วยบัญชีของคุณ</CustomText>
        <View style={styles.button}>
          <TouchableOpacity onPress={() => navigation.navigate('SignInScreen')}>
            <LinearGradient
              colors={[colors.background1, colors.background]}
              style={styles.signIn}>
              <CustomText fontWeight="bold" style={styles.textSign}>เริ่มต้นใช้งาน</CustomText>
              <MaterialIcons name="navigate-next" color={colors.textLight} size={20} />
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </Animatable.View>
    </View>
  )
}

export default StarterScreen

const { height } = Dimensions.get('screen')
const height_logo = height * 0.28

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    flex: 1,
    backgroundColor: colors.textLight,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 40,
    paddingHorizontal: 30,
  },
  logo: {
    width: height_logo,
    height: height_logo,
  },
  title: {
    color: colors.textDark,
    fontSize: 30,
  },
  text: {
    color: 'grey',
    marginTop: 5,
  },
  button: {
    alignItems: 'flex-end',
    marginTop: 30,
  },
  signIn: {
    width: 150,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    flexDirection: 'row',
  },
  textSign: {
    color: 'white',
  },
})