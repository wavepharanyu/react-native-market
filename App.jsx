import GlobalFont from "react-native-global-font"
import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import Navigation from "./src/navigations/Navigation"

const App = () => {

  useEffect(() => {
    let fontName = 'NotoSansThai-Regular'
    GlobalFont.applyGlobal(fontName)
  },[])

  return (
    <Navigation/>
  )
}

export default App

const styles = StyleSheet.create({})