import { View, Text, ActivityIndicator } from 'react-native'
import React, { useState, useEffect, useMemo, useReducer } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import AuthNavigator from './AuthNavigator'
import { AuthContext } from '../store/Context'
import AppNavigator from './AppNavigator'

import AsyncStorage from '@react-native-async-storage/async-storage'

const Navigation = () => {
  const intialLoginState = {
    isLoading: true,
    userName: null,
    userEmail: null,
    userToken: null,
  }

  const loginReducer = (state, action) => {
    switch (action.type) {
      case 'RETRIEVE_TOKEN':
        return {
          ...state,
          userToken: action.token,
          isLoading: false,
        }
      case 'LOGIN':
        return {
          ...state,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        }
      case 'LOGOUT':
        return {
          ...state,
          userName: null,
          userToken: null,
          isLoading: false,
        }
      case 'REGISTER':
        return {
          ...state,
          userEmail: action.id,
          userToken: action.token,
          isLoading: false,
        }

      case 'FINISH_LOADING':
          return {
            ...state,
            isLoading: false,
          }
    }
  }

  const [loginState, dispatch] = useReducer(loginReducer, intialLoginState)

  // เก็บค่าตัวแปร ฟังก์ชั่น เมื่อโหลด component ครั้งแรก
  const initAuthValue = useMemo(
    () => ({
      signIn: async (email, token) => {
        const userToken = token
        const userName = email

        try {
          // เก็บข้อมูล token ลง AsyncStorage
          await AsyncStorage.setItem('userToken', userToken)
        } catch (error) {
          console.log(error)
        }

        dispatch({ type: 'LOGIN', id: userName, token: userToken })
      },
      signUp: async (email, token) => {
        const userToken = token
        try {
          await AsyncStorage.setItem('userToken', userToken)
        } catch (error) {
          console.log(error)
        }
        dispatch({ type: 'REGISTER', id: email, token: userToken })
      },
      signOut: async () => {
        try {
          // เก็บข้อมูล token ลง AsyncStorage
          await AsyncStorage.removeItem('userToken')
        } catch (error) {
          console.log(error)
        }

        dispatch({ type: 'LOGOUT' })
      },
    }),
    [],
  )

  // setTimeout ให้หน้า loading แสดง 0.5 sec
  useEffect(() => {
    setTimeout(async () => {
      dispatch({type: 'FINISH_LOADING'})

      //อ่านค่าจาก AsyncStorage
      let userToken = null
      try {
        userToken = await AsyncStorage.getItem('userToken')
      } catch (error) {
        console.log(error)
      }
      dispatch({ type: 'RETRIEVE_TOKEN', token: userToken })
    }, 500)
  }, [])

  if (loginState.isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    )
  }
  return (
    <AuthContext.Provider value={initAuthValue}>
      <NavigationContainer>
        {loginState.userToken !== null ? <AppNavigator /> : <AuthNavigator />}
      </NavigationContainer>
    </AuthContext.Provider>
  )
}

export default Navigation
