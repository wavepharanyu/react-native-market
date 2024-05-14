import React from 'react'
import { StyleSheet, Text } from 'react-native'
import CustomText from "../CustomText"

function ErrorMessage({ error, visible }) {
  if (!visible || !error) return null

  return <CustomText style={styles.error}>{error}</CustomText>
}

const styles = StyleSheet.create({
  error: { color: 'red' },
})

export default ErrorMessage