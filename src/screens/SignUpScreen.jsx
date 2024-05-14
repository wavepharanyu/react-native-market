import React, { useState, useContext } from 'react'
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  Dimensions,
  TextInput,
  Platform,
  StyleSheet,
  ScrollView,
  StatusBar,
} from 'react-native'
import * as Animatable from 'react-native-animatable'
import LinearGradient from 'react-native-linear-gradient'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Feather from 'react-native-vector-icons/Feather'
import MainTheme, { colors } from '../themes/MainTheme'
import CustomText from '../components/CustomText'
import Modal from '../components/Modal'
import { AuthContext } from './../store/Context'

import { auth } from '../firebase/firebase-config'
import { getAuth, createUserWithEmailAndPassword  } from "firebase/auth"

const SignUpScreen = ({ navigation }) => {
  // สร้างตัวแปรรับค่าจากฟอร์ม
  const [data, setData] = useState({
    email: '',
    password: '',
    confirm_password: '',
    check_textInputChange: false,
    secureTextEntry: true,
    confirm_secureTextEntry: true,
    isValidEmail: true,
    isValidPassword: true,
    isValidConfirmPassword: true,
    isValidPasswordMatch: true,
  })

  // สร้างตัวแปรแบบ State ซ่อน/แสดง modal
  const [visible, setVisible] = useState(false)
  const [formType, setFormType] = useState(null)

  // เรียกใช้งาน Context
  const { signUp } = useContext(AuthContext)

  const textInputChange = val => {
    if (val.trim().length >= 4) {
      setData({
        ...data,
        email: val,
        check_textInputChange: true,
        isValidEmail: true,
      })
    } else {
      setData({
        ...data,
        email: val,
        check_textInputChange: false,
        isValidEmail: false,
      })
    }
  }

  const handlePasswordChange = val => {
    if (val.trim().length >= 8) {
      setData({
        ...data,
        password: val,
        isValidPassword: true,
      })
    } else {
      setData({
        ...data,
        password: val,
        isValidPassword: false,
      })
    }
  }

  const handleConfirmPasswordChange = val => {
    if (val.trim().length >= 8) {
      if (val != data.password) {
        setData({
          ...data,
          confirm_password: val,
          isValidConfirmPassword: true,
          isValidPasswordMatch: false,
        })
      } else {
        setData({
          ...data,
          confirm_password: val,
          isValidConfirmPassword: true,
          isValidPasswordMatch: true,
        })
      }
    } else {
      setData({
        ...data,
        confirm_password: val,
        isValidConfirmPassword: false,
        isValidPasswordMatch: true,
      })
    }
  }

  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    })
  }

  const updateConfirmSecureTextEntry = () => {
    setData({
      ...data,
      confirm_secureTextEntry: !data.confirm_secureTextEntry,
    })
  }

  const registerHandle = (email, password) => {
    if (
      !data.isValidEmail ||
      !data.isValidPassword ||
      data.email.length == 0 ||
      data.password.length == 0 ||
      data.confirm_password == 0 ||
      data.password != data.confirm_password
    ) {
      setFormType('signUpFormError')
      setVisible(true)
      return
    } else {
      createUserWithEmailAndPassword(auth, data.email, data.password)
        .then(userCredential => {
          // Signed up
          const user = userCredential.user
          console.log(JSON.stringify(user, null, 2))

          setFormType('signUpSuccess')
          setVisible(true)

          // Register Success เรียก method signup
          signUp(data.email, user.stsTokenManager.accessToken)
        })
        .catch(error => {
          const errorCode = error.code
          const errorMessage = error.message
          console.log(error)
          setFormType('signUpError')
          setVisible(true)
        })
    }
  }

  return (
    <View style={styles.container}>
      <Modal formType={formType} visible={visible} setVisible={setVisible} />
      <StatusBar backgroundColor={colors.background} barStyle="light-content" />
      <View style={styles.header}>
        <CustomText fontWeight="bold" style={styles.text_header}>
          ลงทะเบียนฟรี!
        </CustomText>
      </View>
      <Animatable.View animation="fadeInUpBig" style={styles.footer}>
        <ScrollView>
          <Text style={styles.text_footer}>Email</Text>

          <View style={styles.action}>
            <FontAwesome name="user-o" color={colors.text} size={20} />
            <TextInput
              placeholder="ป้อนอีเมล์"
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={val => textInputChange(val)}
            />

            {data.check_textInputChange ? (
              <Animatable.View animation="bounceIn">
                <Feather name="check-circle" color="green" size={20} />
              </Animatable.View>
            ) : null}
          </View>

          {data.isValidEmail ? null : (
            <Animatable.View animation="fadeInLeftBig" duration={500}>
              <CustomText style={styles.errorMsg}>
                อีเมล์ต้องไม่น้อยกว่า 4 ตัวอักษร
              </CustomText>
            </Animatable.View>
          )}

          <Text
            style={[
              styles.text_footer,
              {
                marginTop: 35,
              },
            ]}>
            Password
          </Text>
          <View style={styles.action}>
            <Feather name="lock" color={colors.textDark} size={20} />
            <TextInput
              placeholder="ป้อนรหัสผ่าน"
              secureTextEntry={data.secureTextEntry ? true : false}
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={val => handlePasswordChange(val)}
            />
            <TouchableOpacity onPress={updateSecureTextEntry}>
              {data.secureTextEntry ? (
                <Feather name="eye-off" color="grey" size={20} />
              ) : (
                <Feather name="eye" color="grey" size={20} />
              )}
            </TouchableOpacity>
          </View>

          {data.isValidPassword ? null : (
            <Animatable.View animation="fadeInLeftBig" duration={500}>
              <CustomText style={styles.errorMsg}>
                รหัสผ่านต้องไม่น้อยกว่า 8 ตัวอักษร
              </CustomText>
            </Animatable.View>
          )}

          <Text
            style={[
              styles.text_footer,
              {
                marginTop: 35,
              },
            ]}>
            Confirm Password
          </Text>
          <View style={styles.action}>
            <Feather name="lock" color={colors.textDark} size={20} />
            <TextInput
              placeholder="ป้อนยืนยันรหัสผ่าน"
              secureTextEntry={data.confirm_secureTextEntry ? true : false}
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={val => handleConfirmPasswordChange(val)}
            />
            <TouchableOpacity onPress={updateConfirmSecureTextEntry}>
              {data.confirm_secureTextEntry ? (
                <Feather name="eye-off" color="grey" size={20} />
              ) : (
                <Feather name="eye" color="grey" size={20} />
              )}
            </TouchableOpacity>
          </View>

          {data.isValidConfirmPassword ? null : (
            <Animatable.View animation="fadeInLeftBig" duration={500}>
              <Text style={styles.errorMsg}>
                รหัสผ่านต้องไม่น้อยกว่า 8 ตัวอักษร
              </Text>
            </Animatable.View>
          )}

          {data.isValidPasswordMatch ? null : (
            <Animatable.View animation="fadeInLeftBig" duration={500}>
              <CustomText style={styles.errorMsg}>รหัสผ่านไม่ตรงกัน</CustomText>
            </Animatable.View>
          )}

          <View style={styles.textPrivate}>
            <CustomText style={styles.color_textPrivate}>
              ท่านรับทราบและยอมรับ
            </CustomText>
            <CustomText fontWeight="bold" style={styles.color_textPrivate}>
              {' '}
              เงื่อนไข
            </CustomText>
            <CustomText style={styles.color_textPrivate}> และ</CustomText>
            <CustomText fontWeight="bold" style={styles.color_textPrivate}>
              {' '}
              นโนบายการใช้งาน
            </CustomText>
          </View>
          <View style={styles.button}>
            <TouchableOpacity
              style={styles.signIn}
              onPress={() => {
                registerHandle(data.email, data.password)
              }}>
              <LinearGradient
                colors={[colors.background1, colors.background]}
                style={styles.signIn}>
                <CustomText fontWeight="bold" style={styles.textSignUp}>
                  ลงทะเบียน
                </CustomText>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={[
                styles.signIn,
                {
                  // borderColor: colors.background,
                  // borderWidth: 1,
                  marginTop: 15,
                },
              ]}>
              <CustomText fontWeight="bold" style={styles.textSignIn}>
                เข้าสู่ระบบ
              </CustomText>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </Animatable.View>
    </View>
  )
}

export default SignUpScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  footer: {
    flex: 3,
    backgroundColor: colors.textLight,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  text_header: {
    color: colors.textLight,
    fontSize: 30,
  },
  text_footer: {
    color: colors.background,
    fontSize: 18,
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.forground3,
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: colors.background,
  },
  errorMsg: {
    color: colors.background2,
    fontSize: 14,
  },
  button: {
    alignItems: 'center',
    marginTop: 50,
  },
  signIn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  textSignUp: {
    fontSize: 18,
    color: colors.textLight,
  },
  textSignIn: {
    fontSize: 18,
    color: colors.background,
  },
  textPrivate: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 20,
  },
  color_textPrivate: {
    color: 'grey',
  },
})
