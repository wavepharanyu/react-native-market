import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from "@react-navigation/stack"
import StarterScreen from "../screens/StarterScreen"
import SignInScreen from "../screens/SignInScreen"
import SignUpScreen from "../screens/SignUpScreen"


const Stack = createStackNavigator()

const AuthNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="StarterScreen" screenOptions={{headerShown: false}}>
      <Stack.Screen name="StarterScreen" component={StarterScreen}/>
      <Stack.Screen name="SignInScreen" component={SignInScreen}/>
      <Stack.Screen name="SignUpScreen" component={SignUpScreen}/>
    </Stack.Navigator>
  )
}

export default AuthNavigator