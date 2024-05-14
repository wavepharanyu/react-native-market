import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

import { Overlay } from "react-native-elements"
import CustomText from "./CustomText"

const Modal = ({ formType, visible, setVisible }) => {
  if (formType === 'formError'){
    return (
      <Overlay isVisible={visible} onBackdropPress={() => {setVisible(false)}}>
        <View style={{ padding: 20 }}>
          <CustomText style={styles.title}>มีข้อผิดพลาด</CustomText>
          <CustomText style={styles.subTitle}>
            ป้อนข้อมูลผู้ใช้และรหัสผ่านให้ถูกต้องก่อน
          </CustomText>
        </View>
      </Overlay>
    )
  }
  else if (formType === 'signInError'){
    return (
      <Overlay isVisible={visible} onBackdropPress={() => {setVisible(false)}}>
        <View style={{ padding: 20 }}>
          <CustomText style={styles.title}>มีข้อผิดพลาด</CustomText>
          <CustomText style={styles.subTitle}>ไม่พบชื่อผู้ใช้และรหัสผ่านนี้</CustomText>
        </View>
      </Overlay>
    )
  }
  else if (formType === 'signInSuccess') {
    return (
      <Overlay isVisible={visible} onBackdropPress={() => {setVisible(false)}}>
        <View style={{ padding: 20 }}>
          <CustomText style={styles.title}>สำเร็จ</CustomText>
          <CustomText style={styles.subTitle}>ข้อมูลเข้าระบบถูกต้อง</CustomText>
        </View>
      </Overlay>
    )
  }
  else if(formType === 'signUpError') {
    return (
      <Overlay isVisible={visible} onBackdropPress={() => {setVisible(false)}}>
        <View style={{ padding: 20 }}>
          <CustomText style={styles.title}>มีข้อผิดพลาด</CustomText>
          <CustomText style={styles.subTitle}>ไม่สามารถลงทะเบียนได้</CustomText>
        </View>
      </Overlay>
    )
  }
  else if(formType === 'signUpSuccess') {
    return (
      <Overlay isVisible={visible} onBackdropPress={() => {setVisible(false)}}>
        <View style={{ padding: 20 }}>
          <CustomText style={styles.title}>สำเร็จ</CustomText>
          <CustomText style={styles.subTitle}>ลงทะเบียนเรียบร้อยแล้ว</CustomText>
        </View>
      </Overlay>
    )
  }
  else if (formType === 'signUpFormError'){
    return (
      <Overlay isVisible={visible} onBackdropPress={() => {setVisible(false)}}>
        <View style={{ padding: 20 }}>
          <CustomText style={styles.title}>มีข้อผิดพลาด</CustomText>
          <CustomText style={styles.subTitle}>
            ป้อนอีเมล์และรหัสผ่านให้ถูกต้องก่อน
          </CustomText>
        </View>
      </Overlay>
    )
  }
  else{
    return null
  }
}

const styles = StyleSheet.create({
    title:{
        fontSize: 20,
        paddingBottom: 20
    },
    subTitle: {
        fontSize: 16
    }
})

export default Modal
