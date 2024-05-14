import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
// Theme
import { colors } from '../themes/MainTheme'
import CustomText from "./CustomText"

function AppButton({ title, onPress, color = 'background' }) {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: colors[color] }]}
      onPress={onPress}>
      <CustomText fontWeight="bold" style={styles.text}>{title}</CustomText>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    width: '100%',
    marginVertical: 10,
  },
  text: {
    color: colors.white,
    fontSize: 20,
    textTransform: 'uppercase',
  },
})

export default AppButton